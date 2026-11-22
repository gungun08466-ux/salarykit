import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { pageMetadata, siteOrigin } from '../src/data/pageMetadata.js'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const outputDirectory = path.join(projectRoot, 'dist')
const sourceHtmlPath = path.join(outputDirectory, 'index.html')

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

async function generateRouteHtml() {
  const sourceHtml = await readFile(sourceHtmlPath, 'utf8')
  const nonHomePages = Object.values(pageMetadata).filter(
    (metadata) => metadata.path !== '/',
  )

  for (const metadata of nonHomePages) {
    const routeDirectory = path.join(
      outputDirectory,
      metadata.path.replace(/^\/+|\/+$/g, ''),
    )
    const routeHtmlPath = path.join(routeDirectory, 'index.html')
    const routeHtml = applyMetadata(sourceHtml, metadata)

    await mkdir(routeDirectory, { recursive: true })
    await writeFile(routeHtmlPath, routeHtml, 'utf8')
    console.log(`Generated ${path.relative(projectRoot, routeHtmlPath)}`)
  }
}

await generateRouteHtml()
