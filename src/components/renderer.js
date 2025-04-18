import { sanitizeEntry, getPostId } from './dataManager'

// Shuffles the array
// @param {Array} array - The array to shuffle
// @return {Array}
function shuffle (array) {
  const length = array ? array.length : 0
  if (!length) {
    return []
  }

  const result = [...array]
  for (let index = 0; index < length; index++) {
    const rand = index + Math.floor(Math.random() * (length - index));
    [result[index], result[rand]] = [result[rand], result[index]]
  }

  return result
}

// Templating component
// @param {string} template - HTML template string
// @param {Object} data - Data object
// @returns {string} The compiled template
function templating (template, data) {
  return template
    .replace(/{([a-zA-Z]+)}/g, (_, key) => data[key])
}

// Check if the element is in the viewport
// @param {Object} element - The element object
// @param {Function} fn - The function to execute
// @param {Object} options - The options object
export function isObserver (element, fn, options) {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        fn()
        observer.unobserve(entry.target)
      }
    })
  }, { ...options })

  observer.observe(element)
}

// Create related posts
// @param {Object} config - Configuration object
// @param {Array} entries - Array of entries
// @returns {string} The related posts HTML
export function createRelated ({ config, entries, container }) {
  const { template, textOnlyTemplate, shuffleLevel, maxResults, postId } = config

  if (shuffleLevel) {
    entries = entries.filter((entry) => getPostId(entry) !== postId)
    entries = shuffle(entries).slice(0, maxResults)
  }

  entries = entries.map(entry => {
    return sanitizeEntry(entry, config)
  })

  const html = entries.map(item => {
    return item.featuredImage
      ? templating(template, item)
      : templating(textOnlyTemplate, item)
  }).join('')

  container.innerHTML = html
  container.classList.add('related-loaded')
}
