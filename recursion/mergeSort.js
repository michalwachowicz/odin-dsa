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

const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;

  const mid = parseInt(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
};
