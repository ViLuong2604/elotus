function grayCode(n) {
  if (n <= 0) return;
  let arr = [];

  arr.push("0");
  arr.push("1");

  let i, j;
  for (i = 2; i < 1 << n; i = i << 1) {
    for (j = i - 1; j >= 0; j--) arr.push(arr[j]);

    for (j = 0; j < i; j++) arr[j] = "0" + arr[j];
    for (j = i; j < 2 * i; j++) arr[j] = "1" + arr[j];
  }
  return arr;
}

console.log(grayCode(2));
