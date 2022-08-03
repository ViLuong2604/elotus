function findLength(nums1, nums2) {
  let max = 0;

  let matrix = new Array(nums1.length);
  for (let i = 0; i < nums1.length; i++) {
    matrix[i] = new Array(nums2.length);
    for (let j = 0; j < nums2.length; j++) {
      if (i === 0 || j === 0) {
        matrix[i][j] = nums1[i] === nums2[j] ? 1 : 0;
      } else {
        matrix[i][j] = nums1[i] === nums2[j] ? matrix[i - 1][j - 1] + 1 : 0;
      }

      if (matrix[i][j] > max) {
        max = matrix[i][j];
      }
    }
  }
  return max;
}
const nums1 = [0, 0, 0, 0, 0];
const nums2 = [0, 0, 0, 0, 0];
console.log(findLength(nums1, nums2));
