const LinkedList = require("../linkedlists/linkedList");

class HashMap {
  #buckets;
  #loadFactor;
  #size;

  constructor(capacity = 16, loadFactor = 0.75) {
    if (capacity < 1) throw new Error("Capacity must be a positive number");
    if (loadFactor > 1 || loadFactor < 0.1)
      throw new Error("Load factor must be between 0.1 and 1");

    this.#buckets = Array.from({ length: capacity }, () => new LinkedList());
    this.#loadFactor = loadFactor;
    this.#size = 0;
  }
}
