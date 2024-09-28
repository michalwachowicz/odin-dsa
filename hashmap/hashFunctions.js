const LinkedList = require("../linkedlists/linkedList");

const hash = (key) => {
  if (typeof key === "number") return key;

  let hashCode = 0;
  const primeNumber = 31;

  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
  }

  return hashCode;
};

const generateBucketList = (length) =>
  Array.from({ length }, () => new LinkedList());

module.exports = { hash, generateBucketList };
