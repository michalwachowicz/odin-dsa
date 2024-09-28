class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  #head;
  #tail;

  constructor() {
    this.#head = null;
    this.#tail = null;
  }

  enqueue(value) {
    const node = new Node(value);

    if (!this.#head) {
      this.#head = node;
      this.#tail = node;
    } else {
      this.#tail.next = node;
      this.#tail = node;
    }
  }

  dequeue() {
    if (!this.#head) return null;

    const dequeuedValue = this.#head.value;
    this.#head = this.#head.next;

    if (!this.#head) this.#tail = null;
    return dequeuedValue;
  }
}
