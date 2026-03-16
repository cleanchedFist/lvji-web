import { message } from 'antd';
import fuzzyMatching from './fuzzyMatching';

async function getPdfContent(Application: any) {
  const pagesCount = await Application.ActivePDF?.PagesCount;
  if (pagesCount) {
    let content = '';
    for (let i = 0; i < pagesCount; i++) {
      // 模拟异步操作
      const { content: textData } = (await Application.ActivePDF.PageTextData(i + 1))?.[0];
      const arr = textData.split('\r');
      arr.shift();
      content += arr.join('\r');
    }
    return content;
  }
  return '';
}

async function fixText(Application: any, text: string) {
  if (!Application) {
    return;
  }

  const content = await getPdfContent(Application);
  const fixedText = fuzzyMatching(text, content, 'pdf');
  return fixedText?.replace(/\r/g, '').replace(/\n/g, '');
}

async function focusText(Application: any, text: string) {
  if (!Application) {
    return;
  }
  // 搜索并高亮文本
  const fixedText = await fixText(Application, text);
  if (!fixedText) {
    message.warning('因格式问题匹配原文失败，请手动定位查找');
    return;
  }
  await Application.ActivePDF.Find(fixedText);
}

export async function locate(Application: any, revised: boolean, id: number, text: string) {
  if (revised) {
  } else {
    focusText(Application, text);
  }
}

export async function accept(
  Application: any,
  text: string,
  revisedText: string,
  id: number,
  onEnd: (success: boolean) => void,
) {}

export async function reject(Application: any, id: number, onEnd: (success: boolean) => void) {}
