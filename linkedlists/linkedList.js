class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    const node = new Node(value);

    if (!this.tail) {
      this.head = node;
      this.tail = node;
      this.size = 1;
      return;
    }

    this.tail.next = node;
    this.tail = this.tail.next;
    this.size += 1;
  }
}
