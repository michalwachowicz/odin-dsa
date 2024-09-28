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
}
