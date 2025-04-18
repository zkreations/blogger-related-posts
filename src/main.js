import { defaults } from './config/defaults'
import { getDataAttributes } from './components/dataManager'
import { fetchPosts } from './components/feedManager'
import { isObserver, createRelated } from './components/renderer'

class RelatedPosts {
  constructor (options = {}) {
    this.currentUrl = new URL(window.location.href)

    this.config = {
      ...defaults,
      ...options,
      homeUrl: this.currentUrl.origin
    }

    this.container = document.querySelector(this.config.relatedSelector)
  }

  async init () {
    if (!this.container) return

    const config = {
      ...this.config,
      ...getDataAttributes(this.container)
    }

    if (config.observer) {
      isObserver(this.container, async () => this.#create(config), {
        rootMargin: config.rootMargin
      })
      return
    }

    this.#create(config)
  }

  // Create related posts
  // @param {Object} config - Configuration object
  async #create (config) {
    const entries = await fetchPosts(config)
    if (!entries || !entries.length) return

    createRelated({
      entries,
      config,
      container: this.container
    })
  }
}

export default RelatedPosts
