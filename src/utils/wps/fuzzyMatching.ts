/**
 * 从合同文档中匹配特定文本，忽略换行符和非打印字符的差异
 * @param {string} targetText - 想要查找的目标文本
 * @param {string} fullContent - 合同文档的全量内容
 * @param {string} type - pdf or doc
 * @returns {string[] | null} - 返回匹配到的原始文本数组
 */
export default function fuzzyMatchingDoc(target: string, full: string, type?: string) {
  if (!target || !full) return null;

  // 1. 定义需要转义的正则特殊字符
  const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // 2. 预处理：提取目标文本中的“核心文字块”
  // 过滤掉起头的序号（如 1. 2、）以及所有的空白字符
  // 我们将目标文本拆分成纯文字数组
  const cleanTarget = target
    // .replace(/^[\d\s\.、．]+/, '') // 去掉目标字符串开头的数字序号
    .replace(/[\d\.]+/g, ' '); // 去掉全文的数字序号，有可能会去掉纯数字

  const gapPattern = /(?:[\s\r\n\t\u200b]*(?:\d+[\d\.、．]*[\.、．]?)?[\s\r\n\t\u200b]*)/.source;

  // 将文字块转义后用 gapPattern 连起来
  const splitStr = type === 'pdf' ? '' : /\s+/;
  const regexStr = cleanTarget
    .split(splitStr)
    .filter((word) => word.trim().length > 0)
    .map((char) => escapeRegExp(char))
    .join(gapPattern);
  // 3. 构造模糊匹配正则
  // 每个文字块之间允许填充：任意空白、换行、以及可能的数字序号
  const regex = new RegExp(regexStr, 'g');
  // 4. 执行匹配
  return full.match(regex)?.[0];
}

export function ultimateFuzzyMatch(target: string, full: string) {
  const n = target.length;
  const m = full.length;

  // 1. 构建 DP 矩阵
  // 为了支持“前缀缺失”和“从任意位置开始”，我们将第一行初始化为 0 (不惩罚)
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    // 第一列代表 target 有字符但 full 为空，属于缺失，给予惩罚
    dp[i][0] = i * -1;
    for (let j = 1; j <= m; j++) {
      const isCharMatch =
        target[i - 1] === full[j - 1] || (/\s/.test(target[i - 1]) && /\s/.test(full[j - 1]));

      if (isCharMatch) {
        dp[i][j] = dp[i - 1][j - 1] + 2; // 匹配成功，加分
      } else {
        // 核心：取 缺失(上) 或 冗余(左) 的最大值
        dp[i][j] = Math.max(dp[i - 1][j] - 1, dp[i][j - 1] - 0.5);
      }
    }
  }

  // 2. 回溯找到匹配的区间
  let i = n;
  // 找到最后一行中得分最高的列，作为匹配的结束位置 (end)
  let j = 0;
  let maxScore = -Infinity;
  for (let col = 1; col <= m; col++) {
    if (dp[n][col] > maxScore) {
      maxScore = dp[n][col];
      j = col;
    }
  }

  const endIndex = j - 1; // full 中的结束索引
  let startIndex = j - 1; // 准备回溯寻找开始索引
  let missingFromTarget = [];

  while (i > 0 && j > 0) {
    const isCharMatch =
      target[i - 1] === full[j - 1] || (/\s/.test(target[i - 1]) && /\s/.test(full[j - 1]));

    if (isCharMatch) {
      startIndex = j - 1; // 只要有匹配，就不断更新可能的起始点
      i--;
      j--;
    } else if (dp[i][j] === dp[i - 1][j] - 1) {
      // target 的字符在 full 中没找到 (缺失)
      missingFromTarget.push({ pos: i - 1, char: target[i - 1] });
      i--;
    } else {
      // full 中的字符多余，向左跳过
      j--;
    }
  }
  return {
    score: maxScore,
    // full 中匹配到的物理范围
    matchRange: {
      start: startIndex,
      end: endIndex,
      substring: full.substring(startIndex, endIndex + 1),
    },
    // target 中哪些字符没被匹配上
    missing: missingFromTarget.reverse(),
  };
}
