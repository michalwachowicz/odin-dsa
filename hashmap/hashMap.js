const LinkedList = require("../linkedlists/linkedList");

class Entry {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}

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

  #hash(key) {
    if (typeof key === "number") return key;

    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  get(key) {
    const index = this.#hash(key) % this.#buckets.length;
    const list = this.#buckets[index];

    if (!list || list.isEmpty()) return undefined;

    const entry = list.find((entry) => entry.key === key);
    return entry ? entry.value : undefined;
  }
}
