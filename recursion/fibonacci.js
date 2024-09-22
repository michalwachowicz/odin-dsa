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
