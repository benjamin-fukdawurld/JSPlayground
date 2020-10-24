export default class Level {
    #resources;
    #resourceCount;
    #resourceLoaded;
    constructor() {
        this.#resources = [];
        this.#resourceCount = 0;
        this.#resourceLoaded = 0;
    }

    get ready() { return this.#resourceCount === this.#resourceLoaded; }

    addResource(priority, resource) {
        this.#resources[priority] = this.#resources[priority] || [];
        this.#resources[priority].push({ resource: resource, ready: false });
        this.#resourceCount++;
    }

    onResourceLoaded(resource) {
        for (let resources of this.#resources) {
            for (let current of resources) {
                if (current.resource === resource) {
                    current.ready = true;
                    this.#resourceLoaded++;
                    return;
                }
            }
        }
    }

    render(context) {
        if (!this.ready)
            return;

        for (let resources of this.#resources) {
            for (let current of resources) {
                context.drawImage(current.resource, 0, 0, window.innerWidth, window.innerHeight);
            }
        }
    }
}
