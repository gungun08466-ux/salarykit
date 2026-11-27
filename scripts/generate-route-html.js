import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { createServer } from 'vite'
import { pageMetadata, siteOrigin } from '../src/data/pageMetadata.js'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const outputDirectory = path.join(projectRoot, 'dist')
const sourceHtmlPath = path.join(outputDirectory, 'index.html')
const salaryHikePath = pageMetadata.salaryHike.path

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }

    return entities[character]
  })
}

function replaceUniqueTag(html, tagName, attributeName, attributeValue, replacement) {
  const tagPattern = new RegExp(`<${tagName}\\b[^>]*>`, 'gi')
  const attributePattern = new RegExp(
    `\\b${attributeName}\\s*=\\s*(["'])${attributeValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\1`,
    'i',
  )
  const matchingTags = Array.from(html.matchAll(tagPattern)).filter(([tag]) =>
    attributePattern.test(tag),
  )

  if (matchingTags.length !== 1) {
    throw new Error(
      `Expected one <${tagName}> with ${attributeName}="${attributeValue}", found ${matchingTags.length}.`,
    )
  }

  return html.replace(matchingTags[0][0], replacement)
}

function replaceUniqueTitle(html, title) {
  const titlePattern = /<title\b[^>]*>[\s\S]*?<\/title>/gi
  const matches = Array.from(html.matchAll(titlePattern))

  if (matches.length !== 1) {
    throw new Error(`Expected one title element, found ${matches.length}.`)
  }

  return html.replace(titlePattern, `<title>${escapeHtml(title)}</title>`)
}

function applyMetadata(html, metadata) {
  const canonicalUrl = new URL(metadata.path, siteOrigin).href
  const escapedTitle = escapeHtml(metadata.title)
  const escapedDescription = escapeHtml(metadata.description)
  const escapedCanonicalUrl = escapeHtml(canonicalUrl)
  let result = replaceUniqueTitle(html, metadata.title)

  result = replaceUniqueTag(
    result,
    'meta',
    'name',
    'description',
    `<meta name="description" content="${escapedDescription}" />`,
  )
  result = replaceUniqueTag(
    result,
    'meta',
    'name',
    'robots',
    '<meta name="robots" content="index, follow" />',
  )
  result = replaceUniqueTag(
    result,
    'link',
    'rel',
    'canonical',
    `<link rel="canonical" href="${escapedCanonicalUrl}" />`,
  )
  result = replaceUniqueTag(
    result,
    'meta',
    'property',
    'og:title',
    `<meta property="og:title" content="${escapedTitle}" />`,
  )
  result = replaceUniqueTag(
    result,
    'meta',
    'property',
    'og:description',
    `<meta property="og:description" content="${escapedDescription}" />`,
  )
  result = replaceUniqueTag(
    result,
    'meta',
    'property',
    'og:url',
    `<meta property="og:url" content="${escapedCanonicalUrl}" />`,
  )
  result = replaceUniqueTag(
    result,
    'meta',
    'name',
    'twitter:card',
    '<meta name="twitter:card" content="summary" />',
  )
  result = replaceUniqueTag(
    result,
    'meta',
    'name',
    'twitter:title',
    `<meta name="twitter:title" content="${escapedTitle}" />`,
  )
  result = replaceUniqueTag(
    result,
    'meta',
    'name',
    'twitter:description',
    `<meta name="twitter:description" content="${escapedDescription}" />`,
  )

  return result
}

function addPrerenderedContent(html, markup, footerYear) {
  const rootPattern = /<div id="root"><\/div>/g
  const matchingRoots = Array.from(html.matchAll(rootPattern))

  if (matchingRoots.length !== 1) {
    throw new Error(
      `Expected one empty root element, found ${matchingRoots.length}.`,
    )
  }

  const rootElement = `<div id="root" data-prerendered-route="${salaryHikePath}" data-footer-year="${escapeHtml(footerYear)}">${markup}</div>`

  return html.replace(rootPattern, rootElement)
}

async function renderSalaryHikePage(viteServer) {
  const { default: App } = await viteServer.ssrLoadModule('/src/App.jsx')
  const footerYear = String(new Date().getFullYear())
  const markup = renderToString(
    React.createElement(
      React.StrictMode,
      null,
      React.createElement(
        StaticRouter,
        { location: salaryHikePath },
        React.createElement(App, { footerYear }),
      ),
    ),
  )

  if (
    !markup.includes('<h1') ||
    !markup.includes('Salary Hike Calculator') ||
    !markup.includes('Current annual salary') ||
    !markup.includes('Salary hike calculator FAQs')
  ) {
    throw new Error('Salary hike prerender did not contain the expected page content.')
  }

  return { markup, footerYear }
}

async function generateRouteHtml() {
  const sourceHtml = await readFile(sourceHtmlPath, 'utf8')
  const nonHomePages = Object.values(pageMetadata).filter(
    (metadata) => metadata.path !== '/',
  )

  const viteServer = await createServer({
    ssr: { resolve: { externalConditions: ['module'] } },
    server: { middlewareMode: true },
    appType: 'custom',
  })

  try {
    for (const metadata of nonHomePages) {
      const routeDirectory = path.join(
        outputDirectory,
        metadata.path.replace(/^\/+|\/+$/g, ''),
      )
      const routeHtmlPath = path.join(routeDirectory, 'index.html')
      let routeHtml = applyMetadata(sourceHtml, metadata)

      if (metadata.path === salaryHikePath) {
        const { markup, footerYear } = await renderSalaryHikePage(viteServer)
        routeHtml = addPrerenderedContent(routeHtml, markup, footerYear)
      }

      await mkdir(routeDirectory, { recursive: true })
      await writeFile(routeHtmlPath, routeHtml, 'utf8')
      console.log(`Generated ${path.relative(projectRoot, routeHtmlPath)}`)
    }
  } finally {
    await viteServer.close()
  }
}

await generateRouteHtml()
