const { buildTree, cleanArray } = require("./treeUtils");

class Tree {
  constructor(arr) {
    this.root = buildTree(cleanArray(arr));
  }
}
