class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  #head;
  #tail;
  #size;

  constructor() {
    this.#head = null;
    this.#tail = null;
    this.#size = 0;
  }

  append(value) {
    const node = new Node(value);

    if (!this.#tail) {
      this.#head = node;
      this.#tail = node;
    } else {
      this.#tail.next = node;
      this.#tail = node;
    }

    this.#size += 1;
  }

  prepend(value) {
    const node = new Node(value);

    if (!this.#head) {
      this.#head = node;
      this.#tail = node;
    } else {
      node.next = this.#head;
      this.#head = node;
    }

    this.#size += 1;
  }

  at(index) {
    if (index < 0 || index >= this.#size) return null;

    let node = this.#head;
    for (let i = 0; i < index; i++) node = node.next;

    return node;
  }

  pop() {
    if (!this.#head) return undefined;
    if (this.#head === this.#tail) {
      const value = this.#head.value;

      this.#head = null;
      this.#tail = null;
      this.#size = 0;

      return value;
    }

    let current = this.#head;
    while (current.next !== this.#tail) {
      current = current.next;
    }

    const value = this.#tail.value;

    current.next = null;
    this.#tail = current;
    this.#size -= 1;

    return value;
  }

  contains(value) {
    if (!this.#head) return false;
    let current = this.#head;

    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }

    return false;
  }

  find(value) {
    if (!this.#head) return null;

    let current = this.#head;
    let index = 0;

    while (current) {
      if (current.value === value) return index;

      current = current.next;
      index += 1;
    }

    return null;
  }

  size() {
    return this.#size;
  }

  head() {
    return this.#head;
  }

  tail() {
    return this.#tail;
  }
}
