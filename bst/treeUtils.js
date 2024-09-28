const HashSet = require("../hash/hashSet");
const TreeNode = require("./treeNode");

const buildTree = (arr) => {
  if (arr.length === 0) return null;

  const mid = parseInt((arr.length - 1) / 2);
  const root = new TreeNode(arr[mid]);

  root.left = buildTree(arr.slice(0, mid));
  root.right = buildTree(arr.slice(mid + 1));

  return root;
};

const cleanArray = (arr) =>
  [...HashSet.from(arr)].sort((a, b) => (a < b ? -1 : 1));

module.exports = { buildTree, cleanArray };
