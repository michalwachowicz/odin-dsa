const { hash, generateBucketList } = require("./hashFunctions");

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

    this.#buckets = generateBucketList(capacity);
    this.#loadFactor = loadFactor;
    this.#size = 0;
  }

  #grow(size = this.#size) {
    if (size / this.#buckets.length <= this.#loadFactor) return;
    const copy = this.#buckets;

    this.#buckets = generateBucketList(copy.length * 2);
    for (let list of copy) {
      while (list && list.size()) {
        const entry = list.pop();
        const index = hash(entry.key) % this.#buckets.length;

        this.#buckets[index].append(entry);
      }
    }
  }

  indexOf(key) {
    return hash(key) % this.#buckets.length;
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

  has(key) {
    return !!this.getEntry(key);
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

  remove(key) {
    const index = this.indexOf(key);
    const bucket = this.#buckets[index];

    if (!bucket || bucket.isEmpty()) return;

    this.#buckets[index].remove((entry) => entry.key === key);
    this.#size -= 1;
  }

  length() {
    return this.#size;
  }

  clear() {
    this.#buckets.forEach((bucket) => {
      while (!bucket.isEmpty()) bucket.pop();
    });

    this.#buckets = generateBucketList(this.#buckets.length);
    this.#size = 0;
  }

  entries() {
    const entries = [];

    this.#buckets.forEach((list) => {
      for (let entry of list) entries.push(entry);
    });

    return entries;
  }

  keys() {
    return this.entries().map((entry) => entry.key);
  }

  values() {
    return this.entries().map((entry) => entry.value);
  }
}
