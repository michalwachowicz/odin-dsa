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

    this.#buckets = this.#generateBucketList(capacity);
    this.#loadFactor = loadFactor;
    this.#size = 0;
  }

  #generateBucketList(length) {
    return Array.from({ length }, () => new LinkedList());
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

  #grow(size = this.#size) {
    if (size / this.#buckets.length <= this.#loadFactor) return;
    const copy = this.#buckets;

    this.#buckets = this.#generateBucketList(copy.length * 2);
    for (let list of copy) {
      while (list && list.size()) {
        const entry = list.pop();
        const index = this.#hash(entry.key) % this.#buckets.length;

        this.#buckets[index].append(entry);
      }
    }
  }

  indexOf(key) {
    return this.#hash(key) % this.#buckets.length;
  }

  getEntry(key) {
    const index = this.indexOf(key);
    const list = this.#buckets[index];

    if (!list || list.isEmpty()) return undefined;
    return list.find((entry) => entry.key === key);
  }

  get(key) {
    const entry = this.getEntry(key);
    return entry ? entry.value : undefined;
  }

  put(key, value) {
    let entry = this.getEntry(key);

    if (entry) {
      entry.value = value;
      return;
    }

    this.#grow(this.#size + 1);

    const index = this.indexOf(key);
    entry = new Entry(key, value);

    this.#buckets[index].append(entry);
    this.#size += 1;
  }
}
