declare module 'blogger-related-posts' {
  interface RelatedOptions {
    relatedSelector?: string;
    template?: string;
    textOnlyTemplate?: string;
    defaultImage?: string;
    directory?: string;
    imageParams?: string;
    maxResults?: number;
    observer?: boolean;
    orderby?: string;
    postId?: number;
    rootMargin?: string;
    shuffleLevel?: number;
    summaryLength?: number;
    tags?: string[];
    ytThumbnail?: string;
  }

  class BloggerRelated {
    constructor(options?: RelatedOptions);
    init(): Promise<void>;
  }

  export default BloggerRelated;
}
