const TreeNode = require("./treeNode");
const { buildTree, cleanArray, prettyPrint } = require("./treeUtils");

class Tree {
  constructor(arr) {
    this.root = buildTree(cleanArray(arr));
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

  #getSuccessor(node) {
    node = node.right;
    while (node !== null && node.left !== null) node = node.left;

    return node;
  }
}
