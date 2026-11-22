import { useEffect } from 'react'
import { siteOrigin } from '../data/pageMetadata.js'

function getUniqueHeadTag(selector, tagName, attributes) {
  const matches = document.head.querySelectorAll(selector)
  const tag = matches[0] || document.createElement(tagName)

  if (matches.length === 0) {
    Object.entries(attributes).forEach(([name, value]) => {
      tag.setAttribute(name, value)
    })
    document.head.append(tag)
  } else {
    Array.from(matches)
      .slice(1)
      .forEach((duplicate) => duplicate.remove())
  }

  return tag
}

function restoreAttribute(element, attribute, value) {
  if (value === null) {
    element.removeAttribute(attribute)
  } else {
    element.setAttribute(attribute, value)
  }
}

export function usePageMetadata({ title, description, path }) {
  useEffect(() => {
    const canonicalUrl = new URL(path, siteOrigin).href
    const tags = {
      description: getUniqueHeadTag(
        'meta[name="description"]',
        'meta',
        { name: 'description' },
      ),
      canonical: getUniqueHeadTag(
        'link[rel="canonical"]',
        'link',
        { rel: 'canonical' },
      ),
      ogTitle: getUniqueHeadTag(
        'meta[property="og:title"]',
        'meta',
        { property: 'og:title' },
      ),
      ogDescription: getUniqueHeadTag(
        'meta[property="og:description"]',
        'meta',
        { property: 'og:description' },
      ),
      ogUrl: getUniqueHeadTag(
        'meta[property="og:url"]',
        'meta',
        { property: 'og:url' },
      ),
      twitterTitle: getUniqueHeadTag(
        'meta[name="twitter:title"]',
        'meta',
        { name: 'twitter:title' },
      ),
      twitterDescription: getUniqueHeadTag(
        'meta[name="twitter:description"]',
        'meta',
        { name: 'twitter:description' },
      ),
    }
    const previousTitle = document.title
    const previousAttributes = Object.fromEntries(
      Object.entries(tags).map(([name, element]) => [
        name,
        element.getAttribute(name === 'canonical' ? 'href' : 'content'),
      ]),
    )

    document.title = title
    tags.description.setAttribute('content', description)
    tags.canonical.setAttribute('href', canonicalUrl)
    tags.ogTitle.setAttribute('content', title)
    tags.ogDescription.setAttribute('content', description)
    tags.ogUrl.setAttribute('content', canonicalUrl)
    tags.twitterTitle.setAttribute('content', title)
    tags.twitterDescription.setAttribute('content', description)

    return () => {
      document.title = previousTitle
      Object.entries(tags).forEach(([name, element]) => {
        restoreAttribute(
          element,
          name === 'canonical' ? 'href' : 'content',
          previousAttributes[name],
        )
      })
    }
  }, [description, path, title])
}
