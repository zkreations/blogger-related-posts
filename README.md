# blogger-related-post

<img src="https://raw.githubusercontent.com/zkreations/blogger-related-posts/main/logo.png" align="left" />

[![V](https://img.shields.io/npm/v/blogger-related-posts)](https://www.npmjs.com/package/blogger-related-posts) [![L](https://img.shields.io/npm/l/blogger-related-posts)](LICENSE)

**Blogger Related Posts** is a plugin that easily generates related posts for Blogger using an enhanced algorithm based on date or relevance. [Live Demo →](https://www.zkreations.com/2025/04/mejores-entradas-relacionadas-blogger.html)

## Features

- **Simple to use**: Just include the script and call the `init` method.
- **Customizable**: You can customize the related posts using options and data attributes.
- **Lightweight**: The script is small and does not require any dependencies.
- **Lazy loading**: Efficient loading of related posts using IntersectionObserver.
- **Shuffle**: Randomize the order of related posts using a shuffle algorithm.

## Requirements

- The blog must be public and have feeds enabled.

## Installation

### npm

```bash
npm i blogger-related-posts
```

### cdn

```html
<script src="https://cdn.jsdelivr.net/npm/blogger-related-posts@1/dist/main.min.js"></script>
```

## How to use

You can use **blogger-related-posts** as an ES6 module or as a global script. For example:

```javascript
import BloggerRelated from 'blogger-related-posts'

new BloggerRelated().init()
```

If you are using it as a global script, you can access it via the `BloggerRelated` global variable:

```javascript
new BloggerRelated().init()
```

if you want to run JavaScript code after the related posts are generated, you can use the `init` method, which returns a promise that resolves when the related posts are ready:

```javascript
new BloggerRelated().then(() => {
  // Your code here
})
```

Now, you need create a container for the related posts (with the id `blog-related` by default). For example:

```html
<div id="blog-related"></div>
```

## Options

You can customize **blogger-related-posts** using the following options:

| Option                | Type    | Description                                      | Default                |
|-----------------------|---------|--------------------------------------------------|------------------------|
| `relatedSelector`     | String  | Selector for the related posts container         | `#blog-related`        |
| `template`            | String  | Template for the related posts                   | See [defaults.js](src/config/defaults.js) |
| `textOnlyTemplate`    | String  | Template for the related posts without image     | See [defaults.js](src/config/defaults.js) |
| `defaultImage`        | String  | Default image for the related posts              | `''`                   |
| `directory`           | String  | Directory for the related posts                  | `summary`              |
| `imageParams`         | String  | [Image parameters](http://zkreations.com/image-params) for the related posts | `w300-h225-p-k-no-nu-rw-l80-e30` |
| `maxResults`          | Number  | Maximum number of related posts                  | `5`                    |
| `observer`            | Boolean | Use IntersectionObserver for lazy loading        | `true`                 |
| `orderby`             | String  | Order by relevance or date                       | `relevance`            |
| `postId`              | Number  | Post ID for the current post                     | `0`                    |
| `rootMargin`          | String  | Root margin for the IntersectionObserver         | `200px`                |
| `shuffleLevel`        | Number  | Shuffle level for the related posts              | `5`                    |
| `summaryLength`       | Number  | Maximum length of the summary                    | `120`                  |
| `tags`                | Array   | Tags for the related posts                       | `[]`                   |
| `ytThumbnail`         | String  | YouTube thumbnail type                           | `mqdefault`            |

For example, to customize the number of visible pagination links and disable update checking:

```javascript
new BloggerRelated({
  maxResults: 10,
  tags: ['tag1', 'tag2']
}).init()
```

Additionally, you can configure the instance in the HTML using `data-*` attributes on the container. For example:

```html
<div id="blog-related" data-max-results="10" data-tags='["tag1", "tag2"]'></div>
```

## Templating

These elements are used in the HTML of the templates and return the corresponding value:

| Element           | Description                        |
|-------------------|------------------------------------|
| `{postId}`        | Entry ID                          |
| `{title}`         | Entry title                       |
| `{published}`     | Entry publication date            |
| `{summary}`       | Entry summary                     |
| `{postUrl}`       | Entry URL                         |
| `{authorImage}`   | Entry author's image              |
| `{authorName}`    | Entry author's name               |
| `{authorUrl}`     | Entry author's URL                |
| `{featuredImage}` | Entry featured image              |

When writing the template, you can include these elements in the HTML. For example:

```html
<a href="{postUrl}">
  <img src="{featuredImage}" alt="{title}" />
  <h2>{title}</h2>
  <p>{summary}</p>
  <p>By {authorName}</p>
  <p>Published on {published}</p>
</a>
```

## Methods

All methods are available through the instance of `BloggerRelated`:

| Method     | Description                   | Returns |
|------------|-------------------------------|---------|
| `init()`   | Initializes the related posts    | [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) |


## Supporting

If you want to help me keep this and other related projects always up to date, you can [buy me a coffee](https://ko-fi.com/zkreations) ☕. I will be very grateful 👏.

## License

**blogger-numeric-pager** is licensed under the MIT License
