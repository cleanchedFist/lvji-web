import { message } from 'antd';
import { diffChars } from 'diff';
import { ultimateFuzzyMatch } from './fuzzyMatching';

async function fixText(Application: any, text: string) {
  if (!Application) {
    return;
  }

  // 搜索并高亮文本

  const r = await Application.ActiveDocument?.Find?.Execute(text, true);

  // 判断是否有查找结果，如果没有的话，使用公共子串矫正查找对象
  if (!r || !r[0]) {
    message.warning('因排版或格式差异，未发现完全一致的内容，通过模糊匹配为您匹配到对应内容。');
    const range = await Application.ActiveDocument.Content;
    const content = await range.Text;
    const fixedText = ultimateFuzzyMatch(text, content)?.matchRange?.substring;
    return fixedText;
  }
  return text;
}

async function find(Application: any, text: string) {
  if (!Application) {
    return;
  }
  const r = await Application.ActiveDocument.Find.Execute(text, true);
  return r;
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
  const r = await find(Application, fixedText);
  if (r?.[0]) {
    const { pos, len } = r[0];
    const range = await Application.ActiveDocument.Range(pos, pos + len);
    // 滚动文档窗口, 显示指定的区域
    await Application.ActiveDocument.ActiveWindow.ScrollIntoView(range);
  } else {
    message.warning('因格式问题匹配原文失败，请手动定位查找');
  }
}

export async function locate(Application: any, revised: boolean, id: number, text: string) {
  if (revised) {
    const bookmark = await Application.ActiveDocument.Bookmarks.Item('WebOffice' + id);
    const range = bookmark.Range;
    await Application.ActiveDocument.ActiveWindow.ScrollIntoView(range);
    await bookmark.Select();
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
) {
  const hide = message.loading('修订中...');
  const app = Application;
  const fixedText = await fixText(Application, text);
  if (!fixedText) {
    message.warning('因格式问题匹配原文失败，修订失败');
    onEnd(false);
    return;
  }
  const r = await find(Application, fixedText);
  if (r[0]) {
    const { pos } = r[0];
    const normalize = (str: string) => str.replace(/[\r\n]/g, '\n');

    const diff = diffChars(normalize(fixedText), normalize(revisedText));
    // 如果开始位置 === 数千位置，则 start + 1
    // 如果 开始 到 count的位置包含 书签位置，则下一次的start + 1
    const operatorsInfo = await app.ActiveDocument.GetComments({ Offset: 0, Limit: 100 });

    const commentsPos: number[] = operatorsInfo.map((i: any) => i.pos + i.len);
    let start = pos;
    for (let i = 0; i < diff.length; i++) {
      const item = diff[i];
      let isEndChange = false;
      if (commentsPos.includes(start)) {
        start += 1;
      } else {
        isEndChange = commentsPos.some((pos) => pos > start && pos < start + item.count);
      }
      if (item.added) {
        const range = await app.ActiveDocument.Range(start, start);
        range.Text = item.value;
        start += item.count;
        await app.ActiveDocument.Save();
      } else if (item.removed) {
        const range = await app.ActiveDocument.Range(
          start,
          isEndChange ? start + item.count + 1 : start + item.count,
        );
        range.Text = '';
        start += isEndChange ? item.count + 1 : item.count;
        await app.ActiveDocument.Save();
      } else {
        start += item.count;
      }
    }
    const bookmarks = await app.ActiveDocument.Bookmarks;
    // 判断书签是否存在，存在的话删除

    const isExist = await app.ActiveDocument.Bookmarks.Exists('WebOffice' + id);
    if (isExist) {
      await app.ActiveDocument.Bookmarks.Item('WebOffice' + id).Delete();
    }
    await bookmarks.Add({
      Name: 'WebOffice' + id,
      Range: {
        Start: pos,
        End: start,
      },
    });
    onEnd(true);
    hide();
  } else {
    message.warning('因格式问题匹配原文失败，修订失败');
    onEnd(false);
    hide();
  }
}

export async function reject(Application: any, id: number, onEnd: (success: boolean) => void) {
  const hide = message.loading('撤销中...');
  const app = Application;
  const bookmark = await app.ActiveDocument.Bookmarks.Item('WebOffice' + id);
  const start = await bookmark.Start;
  const end = await bookmark.End;
  const revisions = await app.ActiveDocument.Revisions;
  const count = await revisions.Count;

  let arr = [];
  for (let i = 1; i <= count; i++) {
    const revision = await revisions.Item(i);
    const range = await revision.Range;
    const rangeS = await range.Start;
    const rangeE = await range.End;
    if ((rangeS >= start && rangeS <= end) || (rangeE >= start && rangeE <= end)) {
      arr.push(revision);
    }
  }
  for (let j = arr.length; j > 0; j--) {
    await arr[j - 1].Reject();
    await new Promise((resolve) => {
      setTimeout(resolve, 200);
    });
  }

  onEnd(true);
  hide();
}
