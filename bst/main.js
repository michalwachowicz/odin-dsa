const Tree = require("./binarySearchTree");

const printOrders = (tree) => {
  console.log("Level Order (breadth-first):");
  tree.levelOrder(console.log);

  console.log("Pre-order (depth-first):");
  tree.preOrder(console.log);

  console.log("In-order (depth-first):");
  tree.inOrder(console.log);

  console.log("Post-order (depth-first):");
  tree.postOrder(console.log);
};

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67]);
console.log(`Balanced: ${tree.isBalanced()}`);
printOrders(tree);

[100, 101, 102, 103].forEach((item) => tree.insert(item));
console.log(`Balanced: ${tree.isBalanced()}`);

tree.rebalance();
console.log(`Balanced: ${tree.isBalanced()}`);
printOrders(tree);
