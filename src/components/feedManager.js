// Create a query string for the search API based on the provided labels
// @param {array} labels - The array of labels to include in the query
// @returns {string} The query string
function createQueryByTags (labels) {
  if (labels.length === 0) return ''
  return JSON.parse(labels).map((label) => `label:"${label}"`).join('|')
}

// Fetch posts from the Blogger API
// @param {Object} config - The configuration object
// @returns {Promise<Array>} The fetched posts
export async function fetchPosts (config) {
  const {
    homeUrl,
    maxResults,
    shuffleLevel,
    orderby,
    tags
  } = config

  const labels = createQueryByTags(tags)
  const query = labels ? `&q=${labels}` : ''
  const totalPosts = maxResults + shuffleLevel
  const url = `${homeUrl}/feeds/posts/default?alt=json&max-results=${totalPosts}&orderby=${orderby}${query}`
  const response = await fetch(url)
  const data = await response.json()

  return data.feed.entry
}
