const TreeNode = require("./treeNode");
const HashSet = require("../hash/hashSet");
const Queue = require("../queue/queue");

class Tree {
  constructor(arr) {
    const cleanArr = [...HashSet.from(arr)].sort((a, b) => (a < b ? -1 : 1));
    this.root = this.#buildTree(cleanArr);
  }

  insert(value, node = this.root) {
    if (node === null) return new TreeNode(value);
    if (node.data === value) return node;

    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else {
      node.right = this.insert(value, node.right);
    }

    return node;
  }

  delete(value, node = this.root) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this.delete(value, node.left);
    } else if (value > node.data) {
      node.right = this.delete(value, node.right);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      let successor = this.#getSuccessor(node);

      node.data = successor.data;
      node.right = this.delete(successor.data, node.right);
    }

    return node;
  }

  find(value, node = this.root) {
    if (node === null) return null;
    if (node.data === value) return node;

    return value < node.data
      ? this.find(value, node.left)
      : this.find(value, node.right);
  }

  levelOrder(cb) {
    if (!cb) throw new Error("Callback function must be present.");
    if (!this.root) return;

    const queue = new Queue();
    queue.enqueue(this.root);

    while (!queue.isEmpty()) {
      const current = queue.dequeue();
      cb(current.data);

      if (current.left) queue.enqueue(current.left);
      if (current.right) queue.enqueue(current.right);
    }
  }

  inOrder(cb, node = this.root) {
    if (!cb) throw new Error("Callback function must be present.");
    if (node === null) return;

    this.inOrder(cb, node.left);
    cb(node.data);
    this.inOrder(cb, node.right);
  }

  preOrder(cb, node = this.root) {
    if (!cb) throw new Error("Callback function must be present.");
    if (node === null) return;

    cb(node.data);
    this.inOrder(cb, node.left);
    this.inOrder(cb, node.right);
  }

  postOrder(cb, node = this.root) {
    if (!cb) throw new Error("Callback function must be present.");
    if (node === null) return;

    this.inOrder(cb, node.left);
    this.inOrder(cb, node.right);
    cb(node.data);
  }

  height(node = this.root) {
    if (node === null) return 0;

    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  depth(node, root = this.root) {
    if (!this.root) return -1;
    if (node == this.root) return 0;

    const leftDepth = this.depth(node, root.left);
    const rightDepth = this.depth(node, root.right);

    if (leftDepth === -1 && rightDepth === -1) return -1;

    return 1 + Math.max(leftDepth, rightDepth);
  }

  isBalanced(node = this.root) {
    const left = this.height(node.left);
    const right = this.height(node.right);

    return Math.max(left, right) - Math.min(left, right) <= 1;
  }

  rebalance() {
    const arr = this.toArray();
    this.root = this.#buildTree(arr);
  }

  toArray(node = this.root, result = []) {
    if (node === null) return result;

    this.toArray(node.left, result);
    result.push(node.data);
    this.toArray(node.right, result);

    return result;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  #buildTree(arr) {
    if (arr.length === 0) return null;

    const mid = parseInt((arr.length - 1) / 2);
    const root = new TreeNode(arr[mid]);

    root.left = this.#buildTree(arr.slice(0, mid));
    root.right = this.#buildTree(arr.slice(mid + 1));

    return root;
  }

  #getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) node = node.left;

    return node;
  }
}
