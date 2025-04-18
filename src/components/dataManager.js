// Normalize data from dataset attributes
// @param {string} value - The value to normalize
// @returns {boolean|number|null} - The normalized value
function normalizeData (value) {
  const trimmed = value.trim()

  const predefinedValues = {
    true: true,
    false: false,
    null: null
  }

  if (trimmed in predefinedValues) {
    return predefinedValues[trimmed]
  }

  if (!isNaN(trimmed)) return Number(trimmed)
  if (trimmed === '') return null

  return trimmed
}

// Get data attributes
// @param {Object} options - The options object
// @param {Object} options.dataset - The dataset object
// @returns {Object} The data attributes
export function getDataAttributes ({ dataset = {} } = {}) {
  return Object.fromEntries(
    Object.entries(dataset).map(
      ([key, value]) => [key, normalizeData(value)]
    )
  )
}

// Get the post ID from the entry object
// @param {Object} entry - The entry object
// @returns {string} The post ID
export function getPostId (entry) {
  return entry.id.$t.split('.post-')[1]
}

// Get the alternate link from the entry's links
// @param {Array} links - The array of links
// @returns {string} The alternate link
function getAlternateLink (links) {
  for (const link of links) {
    if (link.rel === 'alternate') {
      return link.href
    }
  }
}

// Format a date
// @param {string} date - The date to format
// @returns {string} The formatted date
function dateFormat (date) {
  const lang = document.documentElement.lang
  return new Date(date).toLocaleDateString(lang, {
    month: 'long',
    day: '2-digit',
    year: 'numeric'
  })
}

// Remove HTML tags from a string
// @param {string} html - The HTML string
// @returns {string} The string without HTML tags
function removeTags (html) {
  return html.replace(/<[^>]*>?/g, '')
}

// Check if a URL matches a pattern
// @param {string} url - The URL to check
// @param {RegExp} pattern - The pattern to match
// @returns {boolean} True if the URL matches the pattern, false otherwise
function urlMatchesPattern (url, pattern) {
  return typeof url === 'string' && pattern.test(url)
}

// Resize an image
// @param {string} url - The image URL
// @param {Array} options - The resize options
// @returns {string} The resized image URL
export function resizeImage (url, options = []) {
  if (options.length === 0) return url

  const [resizeOption, youtubeOption] = options

  const YOUTUBE_PATTERN = /(youtube\.com\/vi\/[^/]+\/)([a-z]+)\.jpg$/
  const OLD_URL_PATTERN = /(bp\.blogspot\.com\/(?:[^/]+\/){4})([\w-]+)/
  const NEW_URL_PATTERN = /(googleusercontent\.com\/(?:pw\/|img\/a\/)([\w-]+))(.*)$/
  const GENERAL_PATTERN = /(googleusercontent\.com\/img\/b\/(?:[^/]+\/){2})([\w-]+)/

  if (urlMatchesPattern(url, NEW_URL_PATTERN) && resizeOption) {
    return url.replace(NEW_URL_PATTERN, `$1=${resizeOption}`)
  }

  if (urlMatchesPattern(url, OLD_URL_PATTERN) && resizeOption) {
    return url.replace(OLD_URL_PATTERN, `$1${resizeOption}`)
  }

  if (urlMatchesPattern(url, YOUTUBE_PATTERN) && youtubeOption) {
    return url.replace(YOUTUBE_PATTERN, `$1${youtubeOption}.jpg`)
  }

  return url.replace(GENERAL_PATTERN, `$1${resizeOption}`)
}

// Get the first image from a string of HTML
// @param {string} content - The HTML string
// @returns {string} The URL of the first image
function getFeaturedImage (content) {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  return doc.querySelector('img')?.src || ''
}

// Extract the image from an entry
// @param {Object} entry - The entry object
// @param {string} content - The content of the entry
// @returns {string} The image URL
function extractImage (entry, content) {
  return entry.media$thumbnail?.url || getFeaturedImage(content) || ''
}

// Get the content or summary text from an entry
// @param {Object} entry - The entry object
// @returns {string} The content or summary text
function getContent (entry) {
  return entry.content?.$t || entry.summary?.$t || ''
}

// Truncate a string to a specified length and add ellipsis if necessary
// @param {string} str - The string to truncate
// @param {number} length - The maximum length of the truncated string
// @returns {string} The truncated string with ellipsis if needed
function truncate (str, length) {
  if (typeof str !== 'string' || length <= 0) return ''

  return str.length > length
    ? `${str.slice(0, length)}...`
    : str
}

// Set the default avatar
// @param {string} authorImage - The author image URL
// @returns {string} The author image URL
function getAuthorImage (authorImage) {
  const isPlaceholderImage = imageUrl =>
    ['g/blank.gif', 'g/b16-rounded.gif']
      .some(placeholder => imageUrl.includes(placeholder))

  return !isPlaceholderImage(authorImage)
    ? authorImage
    : ''
}

// Get the author name
// @param {string} authorName - The author name
// @returns {string} The author name or an empty string if unknown
function getAuthorName (authorName) {
  return authorName === 'Unknown' ? '' : authorName
}

// Get the author's URL
// @param {Object} author - The author object
// @returns {string} The author URL
function getAuthorUrl (author) {
  return author.uri?.$t || ''
}

// Sanitize an entry
// @param {Object} entry - The entry object
// @param {Object} config - The configuration object
// @returns {Object} The sanitized entry
export function sanitizeEntry (entry, config = {}) {
  const [author] = entry.author
  const postId = getPostId(entry)
  const htmlContent = getContent(entry)
  const title = entry.title.$t
  const published = dateFormat(entry.published.$t)
  const summary = truncate(removeTags(htmlContent), config.summaryLength)
  const postUrl = getAlternateLink(entry.link)
  const authorImage = getAuthorImage(author.gd$image.src)
  const authorName = getAuthorName(author.name.$t)
  const authorUrl = getAuthorUrl(author)
  const featuredImage = resizeImage(extractImage(entry, htmlContent), [config.imageParams, config.ytThumbnail])

  return {
    postId,
    title,
    published,
    summary,
    postUrl,
    authorImage,
    authorName,
    authorUrl,
    featuredImage
  }
}
