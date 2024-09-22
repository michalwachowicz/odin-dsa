#!/usr/bin/node

const fibs = (num) => {
  if (num < 1) return [];
  if (num === 1) return [0];

  const arr = [0, 1];

  for (let i = 2; i < num; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }

  return arr;
};

const fibsRec = (num) => {
  if (num < 1) return [];
  if (num === 1) return [0];
  if (num === 2) return [0, 1];

  const arr = fibsRec(num - 1);
  arr.push(arr[arr.length - 1] + arr[arr.length - 2]);

  return arr;
};
