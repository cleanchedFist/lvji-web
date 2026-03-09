/**
 * 从合同文档中匹配特定文本，忽略换行符和非打印字符的差异
 * @param {string} targetText - 想要查找的目标文本
 * @param {string} fullContent - 合同文档的全量内容
 * @returns {string[] | null} - 返回匹配到的原始文本数组
 */
export default function fuzzyMatching(target: string, full: string) {
  if (!target || !full) return null;

  // 1. 定义需要转义的正则特殊字符
  const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // 2. 预处理：提取目标文本中的“核心文字块”
  // 过滤掉起头的序号（如 1. 2、）以及所有的空白字符
  // 我们将目标文本拆分成纯文字数组
  const words = target
    // .replace(/^[\d\s\.、．]+/, '') // 去掉目标字符串开头的数字序号
    .replace(/[\d\.]+/g, ' ') // 去掉全文的数字序号，有可能会去掉纯数字
    .split(/\s+/) // 按空格/换行拆分
    .filter((word) => word.length > 0);

  // 3. 构造模糊匹配正则
  // 每个文字块之间允许填充：任意空白、换行、以及可能的数字序号
  const gapPattern = /(?:[\s\r\n\t]*(?:\d+[\d\.、．]*[\.、．]?)?[\s\r\n\t]*)/.source;

  // 将文字块转义后用 gapPattern 连起来
  const regexStr = words.map((word) => escapeRegExp(word)).join(gapPattern);
  const regex = new RegExp(regexStr, 'g');
  // 4. 执行匹配
  return full.match(regex)?.[0];
}
