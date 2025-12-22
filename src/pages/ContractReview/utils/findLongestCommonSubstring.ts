/**
 * 检查 shortStr 中是否存在长度为 len 的子串同时也存在于 longStr 中
 */
function findCommonOfLength(shortStr: string, longStr: string, len: number) {
  // 遍历短字符串中所有长度为 len 的子串
  for (let i = 0; i <= shortStr.length - len; i++) {
    let sub = shortStr.substring(i, i + len);
    // 使用原生 includes，在超长字符串中这非常快
    if (longStr.includes(sub)) {
      return sub;
    }
  }
  return null;
}

/**
 * 查找两个字符串的最长公共子串
 * @param {string} str1
 * @param {string} str2
 * @returns {string} 最长公共子串
 */
export default function findLongestCommonSubstring(str1: string, str2: string) {
  // 1. 识别长短字符串，确保我们在较短的字符串上进行切割
  let shortStr = str1.length <= str2.length ? str1 : str2;
  let longStr = str1.length > str2.length ? str1 : str2;

  let left = 1;
  let right = shortStr.length;
  let longestSub = '';

  // 2. 二分搜索可能的子串长度
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let foundSub = findCommonOfLength(shortStr, longStr, mid);

    if (foundSub) {
      longestSub = foundSub; // 找到了，尝试更长的
      left = mid + 1;
    } else {
      right = mid - 1; // 没找到，缩短长度
    }
  }

  return longestSub;
}
