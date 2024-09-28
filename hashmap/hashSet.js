const { hash, generateBucketList } = require("./hashFunctions");

class HashSet {
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
        const key = list.pop();
        const index = hash(entry.key) % this.#buckets.length;

        this.#buckets[index].append(key);
      }
    }
  }

  indexOf(key) {
    return hash(key) % this.#buckets.length;
  }

  contains(key) {
    for (let bucket of this.#buckets) {
      for (let entry of bucket) {
        if (entry === key) return true;
      }
    }

    return false;
  }

  add(key) {
    if (this.contains(key)) return;

    this.#grow(this.#size + 1);
    const index = this.indexOf(key);

    this.#buckets[index].append(key);
    this.#size += 1;
  }

  remove(key) {
    const index = this.indexOf(key);
    const bucket = this.#buckets[index];

    if (!bucket || bucket.isEmpty()) return;

    this.#buckets[index].remove((entry) => entry === key);
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

  keys() {
    const keys = [];

    this.#buckets.forEach((list) => {
      for (let key of list) keys.push(key);
    });

    return keys;
  }
}
