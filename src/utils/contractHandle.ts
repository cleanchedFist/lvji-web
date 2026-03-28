import {
  downloadClientFile,
  downloadReview,
  downReviewReport,
  getFileInfo,
} from '@/services/ant-design-pro/api';
import { message } from 'antd';

export const contractDownload = async (props: {
  fileId: number;
  contractName: string;
  reviewId: string | number;
}) => {
  const hide = message.loading('正在导出');
  try {
    if (!props) return true;
    const { data: fileInfo } = await getFileInfo(props.fileId);
    const data = await downloadReview(props.reviewId);
    const result = blobFileDownload(data, props.contractName, fileInfo?.type);
    hide();
    return result;
  } catch (e) {
    hide();
    return false;
  }
};

const blobFileDownload = (data: BlobPart, name: string, type: string) => {
  try {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.id = '22342eafhajkfnasjfd';
    link.download = `${name}.${type || 'docx'}`;
    document.body.appendChild(link);
    link.click();

    // 释放资源
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
    message.success('导出成功');
    return true;
  } catch (error) {
    message.error('导出失败，请重试');
    return false;
  }
};

export const clientFileDownload = async (props: { fileId: number; contractName: string }) => {
  const hide = message.loading('正在导出');
  try {
    const { data: fileInfo } = await getFileInfo(props.fileId);
    const data = await downloadClientFile(props.fileId);
    // const _url = url.replace('https://yema-1252530263.cos.ap-chengdu.myqcloud.com', '/cos-proxy');
    // const data = await getFileBlob(_url);
    const result = blobFileDownload(data, props.contractName, fileInfo?.type);
    hide();
    return result;
  } catch (e) {
    hide();
    return false;
  }
};

export const reviewReportDownload = async (props: {
  fileId: number;
  contractName: string;
  reviewId: string | number;
}) => {
  const hide = message.loading('正在导出');
  try {
    const data = await downReviewReport(+props.reviewId);
    const result = blobFileDownload(data, `审查报告-${props.contractName}`, 'doc');
    hide();
    return result;
  } catch (e) {
    hide();
    return false;
  }
};
