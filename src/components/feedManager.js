// Create a query string for the search API based on the provided title
// @param {string} title - The title to include in the query
// @param {number} textLength - The minimum length of words to include in the query
// @returns {string} The query string
function createQueryByTitle (title) {
  return title
    .split(/\W+/)
    .filter(word => word.length > 4)
    .join(' ')
}

// Create a query string for the search API based on the provided labels
// @param {array} labels - The array of labels to include in the query
// @returns {string} The query string
function createQueryByTags (labels) {
  if (labels.length === 0) return ''
  return JSON.parse(labels).map((label) => `label:"${label}"`).join('|')
}

// Validate the directory parameter
// @param {string} directory - The directory to validate
// @returns {string} The validated directory
function directoryValidation (directory) {
  const trimmed = directory.trim().toLowerCase()

  const validDirectories = ['summary', 'default', 'full']
  if (validDirectories.includes(trimmed)) {
    return trimmed
  }

  return 'summary'
}

// Fetch posts from the Blogger API
// @param {Object} config - The configuration object
// @returns {Promise<Array>} The fetched posts
export async function fetchPosts (config) {
  const {
    directory,
    homeUrl,
    maxResults,
    orderby,
    postTitle,
    shuffleLevel,
    tags
  } = config

  const dir = directoryValidation(directory)
  const labels = createQueryByTags(tags)
  const title = createQueryByTitle(postTitle)
  const query = labels ? `&q=${labels}` : `&q=${title}`
  const totalPosts = maxResults + shuffleLevel
  const url = `${homeUrl}/feeds/posts/${dir}?alt=json&max-results=${totalPosts}&orderby=${orderby}${query}`
  const response = await fetch(url)
  const data = await response.json()

  return data.feed.entry
}
