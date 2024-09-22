#!/usr/bin/node

const merge = (arr1, arr2) => {
  const arr = [];

  let i = 0;
  let j = 0;

  while (i < arr1.length && j < arr2.length) {
    arr.push(arr1[i] <= arr2[j] ? arr1[i++] : arr2[j++]);
  }

  return [...arr, ...arr1.slice(i), ...arr2.slice(j)];
};
