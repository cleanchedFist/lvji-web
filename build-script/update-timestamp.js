const fs = require('fs');
const path = require('path');

// 定义存储时间戳的文件路径（可以根据需要改为 .json 或 .ts）
const targetFile = path.join(__dirname, '../src/utils/timestamp.ts');

// 获取当前时间戳（也可以格式化为 YYYY-MM-DD HH:mm:ss）
const timestamp = Date.now(); 
const content = `// 自动生成的文件，请勿手动修改\nexport const CODE_UPDATE_TIME = ${timestamp};\n`;

try {
  fs.writeFileSync(targetFile, content, 'utf8');
  console.log(`\x1b[32m%s\x1b[0m`, `[Success] 时间戳已成功更新为: ${new Date(timestamp).toLocaleString()}`);
} catch (err) {
  console.error('[Error] 更新时间戳失败:', err);
  process.exit(1);
}