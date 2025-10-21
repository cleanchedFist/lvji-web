import { updateAdvice } from '@/services/ant-design-pro/api';
import { useWebOffice } from '@/store/wps';
import {
  DownOutlined,
  EditOutlined,
  FileDoneOutlined,
  ProfileOutlined,
  PushpinOutlined,
} from '@ant-design/icons';
import { Button, Collapse, Input, Modal, Skeleton, message } from 'antd';
import { diffChars } from 'diff';
import { useMemo, useState } from 'react';

const panelStyle: React.CSSProperties = {
  marginBottom: 24,
  borderWidth: '1px',
  borderRadius: '6px',
  background: '#fff',
};

function Quote({ text }) {
  const [expend, setExpend] = useState(false);
  const showText = useMemo(() => {
    return expend ? text : text.slice(0, 36) + '...';
  }, [expend, text]);
  return (
    <div className="pl-3 border-l-2 border-[#c9cdd4] text-[#86909c] text-sm">
      {expend ? <div>{showText}</div> : showText}
      <Button type="link" size="small" onClick={() => setExpend((v) => !v)}>
        展开
      </Button>
    </div>
  );
}

function Item({ data }) {
  const { id, text, basis } = data;
  const [revisedText, setRevisedText] = useState(data.revisedText);
  const [compareContent, setCompareContent] = useState(data.compareContent);
  const [expand, setExpand] = useState(true);
  const { instance } = useWebOffice();
  const [revised, setRevised] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editVisible, setEditVisible] = useState<boolean>(false);
  const [editVale, setEditValue] = useState('');

  const showRevise = useMemo(() => {
    return text && revisedText && text !== revisedText;
  }, [text, revisedText]);

  // function handleCopy() {
  //   copy(revisedText);
  //   message.success('复制成功');
  // }
  async function focusText() {
    if (!instance?.Application) {
      return;
    }
    const app = instance.Application;

    // 搜索并高亮文本
    const r = await app.ActiveDocument.Find.Execute(text, true);

    if (r[0]) {
      const { pos, len } = r[0];
      const range = await app.ActiveDocument.Range(pos, pos + len);
      // 滚动文档窗口, 显示指定的区域
      await app.ActiveDocument.ActiveWindow.ScrollIntoView(range);
    } else {
      message.warning('因格式问题匹配原文失败，请手动定位查找');
    }
  }

  async function find(text) {
    if (!instance) {
      return;
    }
    const app = instance.Application;

    const r = await app.ActiveDocument.Find.Execute(text, true);
    return r;
  }

  async function accept() {
    const app = instance.Application;
    const r = await find(text);
    if (r[0]) {
      const { pos } = r[0];
      const diff = diffChars(text, revisedText);
      let start = pos;
      for (let i = 0; i < diff.length; i++) {
        const item = diff[i];
        if (item.added) {
          const range = await app.ActiveDocument.Range(start, start);
          range.Text = item.value;
          start += item.count;
          await app.ActiveDocument.Save();
        } else if (item.removed) {
          const range = await app.ActiveDocument.Range(start, start + item.count);
          range.Text = '';
          start += item.count;
          await app.ActiveDocument.Save();
        } else {
          start += item.count;
        }
      }
      const bookmarks = await app.ActiveDocument.Bookmarks;
      await bookmarks.Add({
        Name: 'WebOffice' + id,
        Range: {
          Start: pos,
          End: start,
        },
      });
      setRevised(true);
    }
  }

  async function reject() {
    const app = instance.Application;
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

    setRevised(false);
  }

  async function locate() {
    const app = instance.Application;
    if (revised) {
      await app.ActiveDocument.Bookmarks.Item('WebOffice' + id).Select();
    } else {
      focusText();
    }
  }

  async function edit() {
    if (revised) {
      reject();
    } else {
      accept();
    }
  }

  function showEdit() {
    setEditValue(revisedText);
    setEditVisible(true);
  }
  function handleEditChange(e) {
    setEditValue(e.target.value);
  }
  async function editAdvice() {
    try {
      setLoading(true);
      const result = await await updateAdvice({
        chunkId: id,
        revisedContent: editVale,
      });
      setRevisedText(editVale);
      setCompareContent(result.data.compareContent);
      setEditVisible(false);
      setLoading(false);
    } catch (error) {
      message.error('修改失败，请重试');
      setLoading(false);
    }
  }

  return (
    <>
      <Quote text={text} />
      <div
        className="mt-2 p-4 rounded-md bg-gradient-to-br from-[#f2fbf7] to-[#f1f4fd]"
        dangerouslySetInnerHTML={{ __html: compareContent }}
      />
      <div className="mt-4 flex items-center gap-2">
        <div
          className="flex items-center gap-1 cursor-pointer hover:text-[#009e59]"
          onClick={locate}
        >
          <PushpinOutlined style={{ color: '#009e59' }} />
          <span>定位到原文</span>
        </div>
        {/* {showRevise && (
          <div
            className="flex items-center gap-1 cursor-pointer hover:text-[#009e59]"
            onClick={handleCopy}
          >
            <CopyOutlined style={{ color: '#009e59' }} />
            <span>复制修改建议</span>
          </div>
        )} */}
        <div className="ml-auto flex items-center gap-1 cursor-pointer">
          <Button icon={<EditOutlined style={{ color: '#009e59' }} />} onClick={showEdit}>
            修改
          </Button>
        </div>
        {showRevise && (
          <div className="ml-1 flex items-center gap-1 cursor-pointer">
            <Button icon={<FileDoneOutlined style={{ color: '#009e59' }} />} onClick={edit}>
              {revised ? '撤销修订' : '接受修订'}
            </Button>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={() => setExpand((v) => !v)}
        >
          <span className="font-bold">审查依据</span>
          <DownOutlined rotate={expand ? 0 : -90} style={{ fontSize: 12 }} />
        </div>
        <div className="mt-2">
          <div className="flex flex-wrap gap-2">
            {basis.map((item, index) => {
              if (expand) {
                return (
                  <div key={index} className="w-full border p-4 rounded-lg">
                    <div className="inline-flex items-center gap-1 border px-2 py-1 rounded-2xl">
                      <ProfileOutlined style={{ color: '#009e59' }} />
                      <span>{item.tag}</span>
                    </div>
                    <div className="font-bold mt-2">{item.title}</div>
                    <div className="text-[#4e5969] mt-2">{item.desc}</div>
                  </div>
                );
              }
              return (
                <div key={index} className="flex items-center gap-1 border px-2 py-1 rounded-2xl">
                  <ProfileOutlined style={{ color: '#009e59' }} />
                  <span>{item.tag}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Modal
        title="修改建议"
        width={600}
        okButtonProps={{ loading }}
        open={editVisible}
        onOk={editAdvice}
        onCancel={() => setEditVisible(false)}
      >
        <div className="py-4">
          <Input.TextArea value={editVale} rows={5} onChange={handleEditChange} />
        </div>
      </Modal>
    </>
  );
}

function Title({ index, data }) {
  return (
    <div className="flex items-center gap-x-1">
      {`${index + 1}. ${data.reviewSummary}`}
      {data.riskLevel === '高风险' && (
        <div className="px-[2px] text-red-500 border-red-500 border bg-red-100 font-medium rounded whitespace-nowrap">
          高风险
        </div>
      )}
    </div>
  );
}

export default function (props) {
  const items = useMemo(() => {
    return props.items
      .filter((item) => item.originalContent && item.revisedContent)
      .map((item, index) => {
        const data = {
          id: item.id,
          text: item.originalContent,
          revisedText: item.revisedContent,
          compareContent: item.compareContent,
          basis: [
            {
              tag: item.evidenceType,
              title: item.evidenceSummary,
              desc: item.evidenceContent,
            },
          ],
        };
        return {
          key: index,
          label: <Title index={index} data={item} />,
          children: <Item data={data} />,
          style: panelStyle,
        };
      });
  }, [props.items]);
  const defaultKeys = useMemo(() => {
    return props.items.map((_, index) => index);
  }, [props.items]);
  if (!items.length) {
    return <Skeleton />;
  }
  return (
    <div className="[&_.red-txt]:text-red-600 [&_.green-txt]:text-blue-400 [&_.green-txt]:line-through">
      <Collapse
        bordered={false}
        defaultActiveKey={defaultKeys}
        expandIconPosition="end"
        style={{ background: '#f7f8fa' }}
        items={items}
      />
    </div>
  );
}
