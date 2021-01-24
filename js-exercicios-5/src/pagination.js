
const Request = require("./request")

const DEFAULT_OPTIONS = {
    maxRetries: 4,
    retryTimeout: 1000,
    maxRequestTimeout: 1000,
    threshold: 200
}

class Pagination {
    constructor(options = DEFAULT_OPTIONS) {
        this.request = new Request()

        this.maxRetries = options.maxRetries
        this.retryTimeout = options.retryTimeout
        this.maxRequestTimeout = options.maxRequestTimeout
        this.threshold = options.threshold
    }

    async handleRequest({ url, page, retries = 1 }) {
        try {
            const finalUrl = `${url}?tid=${page}`
            const result = await this.request.makeRequest({
                url: finalUrl,
                method: 'get',
                timeout: this.maxRequestTimeout
            })

            return result

        } catch (error) {
            if (retries === this.maxRetries) {
                console.error(`[${retries}] max retries reached!`)
                throw error
            }

            console.error(`[${retries}] an error: [${error.message}] has happened! trying again in ${this.retryTimeout}ms`)
            await Pagination.sleep(this.retryTimeout)

            return this.handleRequest({ url, page, retries: retries += 1 })
        }
    }
    static sleep(ms) {
        return new Promise(r => setTimeout(r, ms))
    }

   //** async * getPaginated({ url, page }) {

        const result = await this.handleRequest({ url, page })
        const lastId = result[result.length - 1]?.tid ?? 0

        // ultimo é por volta de 770K
        if (lastId === 0) return;

        yield result
        await Pagination.sleep(this.threshold)
        yield* this.getPaginated({ url, page: lastId })/***//

    }
}

module.exports = Pagination
