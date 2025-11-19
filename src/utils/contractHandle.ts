import { downloadReview } from '@/services/ant-design-pro/api';
import { message } from 'antd';
export const contractDownload = async (props: API.ContractDownloadProps) => {
  const hide = message.loading('正在导出');
  if (!props) return true;
  try {
    const data = await downloadReview(props.reviewId);
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${props.contractName}.docx`;
    document.body.appendChild(link);
    link.click();

    // 释放资源
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
    hide();
    message.success('导出成功');
    return true;
  } catch (error) {
    hide();
    message.error('导出失败，请重试');
    return false;
  }
};

export default {
  contractDownload,
};
