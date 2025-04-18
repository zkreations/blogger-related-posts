// Define the default values for the blogger-related-posts configuration
// @type {Object}
export const defaults = {
  relatedSelector: '#blog-related',
  template: '<a class="related-item" href="{postUrl}"><div class="related-image"><img class="related-image-src" src="{featuredImage}" alt="thumbnail"></div><div class="related-title">{title}</div></a>',
  textOnlyTemplate: '<a class="related-item" href="{postUrl}"><div class="related-title">{title}</div></a>',
  defaultImage: '',
  directory: 'summary',
  imageParams: 'w300-h225-p-k-no-nu-rw-l80-e30',
  maxResults: 5,
  observer: true,
  orderby: 'relevance',
  postId: 0,
  rootMargin: '200px',
  shuffleLevel: 5,
  summaryLength: 120,
  tags: [],
  ytThumbnail: 'mqdefault'
}
