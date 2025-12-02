import formatTime from '@/pages/ContractCataloge/utils/formatTime';
import { removeReview } from '@/services/ant-design-pro/api';
import { contractDownload } from '@/utils/contractHandle';
import { deleteModalConfig } from '@/utils/modalConfig';
import type { ProColumns } from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Modal, message } from 'antd';
import { FileText } from 'lucide-react';

const handleRemove = async (row: API.AnalysisListItem) => {
  const hide = message.loading('正在删除');
  if (!row) return true;
  try {
    await removeReview(row.reviewId);
    hide();
    message.success('删除成功');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

function handleDel(row: API.AnalysisListItem, action: any) {
  Modal.confirm({
    title: '确认删除审查结果?',
    content: '删除后将不能再恢复数据.',
    ...deleteModalConfig,
    async onOk() {
      const success = await handleRemove(row);
      if (success) {
        action?.reload();
      }
    },
  });
}

function handleExport(row: API.AnalysisListItem) {
  contractDownload({ contractName: row.contractName, reviewId: row.reviewId });
}

function handleView(row: API.AnalysisListItem) {
  history.push(`/clm/contract/view/${row.reviewId}`, { name: row.contractName });
}

function handleReview(row: API.AnalysisListItem) {
  history.push(`/clm/reviews/step/${row.fileId}`);
}

const statusMap = {
  '0': {
    text: '审查通过',
    iconColor: '#10b981',
    bgColor: '#d1fae5',
    fontColor: '#047857',
  },
  '1': {
    text: '进行中',
    iconColor: '#3b82f6',
    bgColor: '#dbeafe',
    fontColor: '#1d4ed8',
  },
  '2': {
    text: '审核失败',
    iconColor: '#f43f5e',
    bgColor: '#ffe4e6',
    fontColor: '#be123c',
  },
};
type StatusKey = keyof typeof statusMap;

const columns: ProColumns<API.AnalysisListItem>[] = [
  {
    title: '合同标题',
    dataIndex: 'contractName',
    render: (dom) => {
      return <span className="font-bold">{dom}</span>;
    },
    search: false,
  },
  {
    title: '文件名称',
    dataIndex: 'fileName',
    fieldProps: {
      placeholder: '请输入文件名称查询...',
    },
    render: (text) => {
      return (
        <div className="text-slate-500 flex items-center gap-2">
          <FileText className="text-slate-400 w-[14px] h-[14px]" />
          {text}
        </div>
      );
    },
  },
  {
    title: '分析主体',
    dataIndex: 'contractParty',
    search: false,
  },
  {
    title: '状态',
    dataIndex: 'status',
    hideInForm: true,
    search: false,
    colSize: 2,
    width: 150,
    render: (dom: any, entity: API.AnalysisListItem) => {
      const { status } = entity as { status: StatusKey; [key: string]: any };

      return (
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: statusMap[status]?.iconColor }}
          ></div>
          <span
            className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 "
            style={{ background: statusMap[status]?.bgColor, color: statusMap[status]?.fontColor }}
          >
            {statusMap[status]?.text}
          </span>
        </div>
      );
    },
  },
  {
    title: '审查时间',
    dataIndex: 'createTimeStamp',
    valueType: 'dateTime',
    search: false,
    render: (dom: any, entity) => {
      return (
        <div className="text-slate-400 font-mono text-xs">{formatTime(entity.createTimeStamp)}</div>
      );
    },
  },
  {
    title: '操作',
    dataIndex: 'option',
    valueType: 'option',
    width: 220,

    render: (text: any, record: API.AnalysisListItem, index: number, action: any) => [
      <span
        key={1}
        onClick={() => handleView(record)}
        className="text-indigo-600 hover:text-indigo-700 font-medium text-xs hover:underline cursor-pointer"
      >
        查看
      </span>,
      <span
        key={2}
        onClick={() => handleDel(record, action)}
        className="text-rose-500 hover:text-rose-700 font-medium text-xs hover:underline cursor-pointer"
      >
        删除
      </span>,
      record.status === '2' && (
        <span
          key={3}
          onClick={() => handleReview(record)}
          className="text-orange-500 hover:text-orange-700 font-medium text-xs hover:underline cursor-pointer"
        >
          重新审查
        </span>
      ),
      <span
        key={4}
        onClick={() => handleExport(record)}
        className="text-slate-500 hover:text-slate-700 font-medium text-xs hover:underline cursor-pointer"
      >
        导出报告
      </span>,
    ],
  },
];

export default columns;
