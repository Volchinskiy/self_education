const arr = [];

for (let i = 1; i < 101; i++) {
  arr.push({ number: i, square: i ** 2 });
}

console.table(arr);
