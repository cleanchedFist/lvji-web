// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { UploadFile } from 'antd';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/user-service/getUserDetail', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams) {
  return request('/api/user-service/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

export function smsLogin(body: API.LoginParams) {
  return request('/api/user-service/login/sms', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

export async function regist(body: API.LoginParams) {
  return request<API.LoginResult>('/api/user-service/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

export async function lawyerRegist(body: API.LoginParams) {
  return request<API.LoginResult>('/api/user-service/register/lawyer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: {
  [key: string]: any;
}): Promise<{ success: boolean; data: API.NoticeList }> {
  // return request<API.NoticeList>('/api/notices', {
  //   method: 'GET',
  //   ...(options || {}),
  // });

  return new Promise((resolve) => {
    const data = {
      success: true,
      data: {
        current: 1,
        size: 8,
        total: 8,
        records: [
          // 1. 通知类 (notification)
          {
            id: '000000001',
            avatar:
              'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/MSbNSpbNargAAAAAAAAAAAAAFl94AQBr',
            title: '你收到了 14 份新周报',
            description: '这种产品自动化程度高，可以大大提升效率。',
            datetime: '2026-06-10',
            type: 'notification' as API.NoticeItemType,
          },
          {
            id: '000000002',
            avatar:
              'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/h7bSREvN1cAAAAAAAAAAAAAAFl94AQBr',
            title: '你推荐的 林白已 通过第三轮面试',
            description: '这种产品自动化程度高，可以大大提升效率。',
            datetime: '2026-06-09',
            type: 'notification' as API.NoticeItemType,
          },
          {
            id: '000000003',
            avatar:
              'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/jB8vS5tdZ6wAAAAAAAAAAAAAFl94AQBr',
            title: '这种模板可以区分已读和未读状态',
            description: '这种产品自动化程度高，可以大大提升效率。',
            datetime: '2026-06-08',
            read: true,
            type: 'notification' as API.NoticeItemType,
          },

          // 2. 消息类 (message)
          {
            id: '000000006',
            avatar:
              'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/n4ofSB13UAYAAAAAAAAAAAAAFl94AQBr',
            title: '曲丽丽 评论了你',
            description: '描述信息描述信息描述信息描述信息描述信息',
            datetime: '2026-06-10',
            type: 'message' as API.NoticeItemType,
            clickClose: true,
          },
          {
            id: '000000007',
            avatar:
              'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/2wXbRR76mN8AAAAAAAAAAAAAFl94AQBr',
            title: '朱偏右 回复了你',
            description: '这种产品自动化程度高，可以大大提升效率。',
            datetime: '2026-06-10',
            type: 'message' as API.NoticeItemType,
          },

          // 3. 待办/事件类 (event)
          {
            id: '000000009',
            title: '任务名称',
            description: '任务需要在 2026-06-12 20:00 前启动',
            extra: '未开始',
            status: 'todo',
            type: 'event' as API.NoticeItemType,
          },
          {
            id: '000000010',
            title: '第三方紧急代码变更',
            description: '冠华提交于 2026-06-09，需在 2026-06-11 前完成代码变更测试',
            extra: '马上到期',
            status: 'urgent',
            type: 'event' as API.NoticeItemType,
          },
          {
            id: '000000011',
            title: '信息安全考试',
            description: '指派竹尔于 2026-06-05 前完成更新并发布',
            extra: '已耗时 4 天',
            status: 'doing',
            type: 'event' as API.NoticeItemType,
          },
        ],
      },
    };

    setTimeout(() => resolve(data), 1000);
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request('/api/rule-service/update-small-rule', {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request('/api/rule-service/add-small-rule', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

/** 获取合同列表 GET /api/contract */
export async function contract(params: any, options?: { [key: string]: any }) {
  const { pageSize, title: words, ...rest } = params;
  return request<API.ContractList>('/api/llm-service/retrieval', {
    method: 'GET',
    params: {
      size: params.pageSize,
      words,
      ...rest,
    },
    ...(options || {}),
  });
}

export async function contractDetail(id: string) {
  return request<{ data: API.ContractListItem }>(`/api/llm-service/retrieval/${id}`, {
    method: 'GET',
  });
}

export async function contractPre(id: string) {
  return request(`/api/llm-service/pre/review/${id}`, {
    method: 'GET',
  });
}

export async function getContractReviewResult(id: string) {
  return request(`/api/llm-service/get/reviewed/${id}`, {
    method: 'GET',
  });
}

export async function updateContract(options?: { [key: string]: any }) {
  return request('/api/llm-service/update', {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}

export async function removeContract(id: string) {
  return request<Record<string, any>>(`/api/llm-service/delete/${id}`, {
    method: 'DELETE',
  });
}

export async function removeReview(id: string) {
  return request<Record<string, any>>(`/api/llm-service/delete/review/${id}`, {
    method: 'DELETE',
  });
}

export async function downloadReview(id: number | string) {
  return request<BlobPart>(`/api/llm-service/download/${id}`, {
    method: 'GET',
    responseType: 'blob',
  });
}

/** 获取审查结果列表 GET /api/analysis todo: 是否已废弃*/
export async function analysis(
  params: {
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.AnalysisList>('/api/analysis', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function analysisDetail(id: string) {
  return request<API.AnalysisListItem>(`/api/analysis/${id}`, {
    method: 'GET',
  });
}

/**
 * 合同类型列表
 */
export async function contractTypeList() {
  return request<API.ContractTypeList>('/api/llm-service/get/types', {
    method: 'GET',
  });
}

// 统计数据
export async function retrievalCount() {
  return request('/api/llm-service/retrieval/count', {
    method: 'GET',
  });
}

// 首页统计数据
export async function retrievalAll() {
  return request('/api/llm-service/retrieval/all', {
    method: 'GET',
  });
}

/**
 * 获取策略列表
 */
export async function strategyList(words?: string) {
  return request<API.StrategyList>('/api/rule-service/getStrategiesByPage', {
    method: 'GET',
    params: {
      current: 1,
      size: 999,
      words,
    },
  });
}

/**
 * 获取规则列表
 */
export async function scenarioList(words?: string) {
  return request<API.ScenarioList>('/api/rule-service/table/gets', {
    method: 'GET',
    params: {
      current: 1,
      size: 999,
      words,
    },
  });
}

/**
 * 某个规则集的全部规则
 */
export async function ruleList(id: string) {
  return request<API.RuleList>(`/api/rule-service/table/get/${id}`, {
    method: 'GET',
  });
}

/**
 * 删除规则
 */
export async function removeRule(id: string) {
  return request<Record<string, any>>('/api/rule-service/delete-small-rule', {
    method: 'DELETE',
    params: {
      smallRuleId: id,
    },
  });
}

/**
 * 规则类型列表
 */
export async function ruleTypeList() {
  return request<API.RuleTypeList>('/api/rule_type/list', {
    method: 'GET',
  });
}

/**
 * 新增策略
 */
export async function strategyAdd(options?: { [key: string]: any }) {
  return request('/api/rule-service/addStrategy', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

export async function removeStrategy(id: string) {
  return request('/api/rule-service/deleteStrategy', {
    method: 'DELETE',
    params: {
      id,
    },
  });
}

export async function removeBigRule(id: string) {
  return request(`/api/rule-service/table/del/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 修改策略
 */
export async function strategyUpdate(options?: { [key: string]: any }) {
  return request('/api/rule-service/updateStrategy', {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}

export async function strategyDetail(id: string) {
  return request<{ data: API.StrategyItem }>('/api/rule-service/getStrategyDetail', {
    method: 'GET',
    params: {
      id,
    },
  });
}

/**
 * 新增规则
 */
export async function scenarioAdd(options?: { [key: string]: any }) {
  return request('/api/rule-service/table/add', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

interface FieldsValueType {
  model?: string;
  versionId?: string;
  reviewerId?: number;
  demand?: string;
  chooseParty?: string;
  dirId?: number;
}

/**
 * 上传文件
 */
export async function uploadContract(
  file: UploadFile,
  { model, versionId, reviewerId, demand, chooseParty }: FieldsValueType,
) {
  const formData = new FormData();
  if (file && file.originFileObj) {
    formData.append('docxFile', file.originFileObj);
    versionId && formData.append('version', `${versionId}`);
    model && formData.append('model', `${model}`);
    reviewerId && formData.append('reviewerId', `${reviewerId}`);
    demand && formData.append('demand', `${demand}`);
    chooseParty && formData.append('chooseParty', `${chooseParty}`);
  }
  return request('/api/llm-service/upload/dir', {
    method: 'POST',
    data: formData,
    requestType: 'form',
  });
}

export async function getResultList(params: any) {
  return request<API.ReviewList>('/api/llm-service/resultList', {
    method: 'GET',
    params: {
      current: params.current,
      size: params.pageSize,
      words: params.fileName,
    },
  });
}

export async function updateAdvice(options?: { [key: string]: any }) {
  return request('/api/llm-service/updateAdvice', {
    method: 'PUT',
    data: {
      ...(options || {}),
    },
  });
}

// 目录接口
export async function getDirList(params: any, options?: { [key: string]: any }) {
  const { pageSize, name: words, ...rest } = params;
  return request('/api/llm-service/dir/all/list', {
    method: 'GET',
    params: {
      size: params.pageSize,
      words,
      ...rest,
    },
  });
}

export async function getAssignedDirList(params: any, options?: { [key: string]: any }) {
  const { pageSize, name: words, ...rest } = params;
  return request('/api/llm-service/dir/all/lawyer/list', {
    method: 'GET',
    params: {
      size: params.pageSize,
      words,
      ...rest,
    },
  });
}

/**
 * 上传目录下的单独版本
 */
export async function uploadVersion(
  file: UploadFile,
  { dirId, model, versionId, reviewerId, demand, chooseParty }: FieldsValueType,
) {
  const formData = new FormData();
  if (file && file.originFileObj) {
    formData.append('docxFile', file.originFileObj);
    formData.append('dir', `${dirId}`);
    versionId && formData.append('version', `${versionId}`);
    model && formData.append('model', `${model}`);
    reviewerId && formData.append('reviewerId', `${reviewerId}`);
    demand !== void 0 && formData.append('demand', `${demand}`);
    chooseParty && formData.append('chooseParty', `${chooseParty}`);
  }
  return request('/api/llm-service/upload/file', {
    method: 'POST',
    data: formData,
    requestType: 'form',
  });
}

// 删除目录

export async function deleteContractDir(id: string) {
  return request<Record<string, any>>(`/api/llm-service/dir/${id}`, {
    method: 'DELETE',
  });
}

// 获取版本数量
export async function getDirCount(dirId: number) {
  return request('/api/llm-service/dir/cnt', {
    method: 'GET',
    params: {
      dir: dirId,
    },
  });
}

// 解析合同
export async function parseContract(dirId: number, contractId: number) {
  return request('/api/llm-service/upload/change', {
    method: 'GET',
    params: {
      dir: dirId,
      file: contractId,
    },
  });
}

// 获取目录下的所有合同
export function getContractVersionList(dirId: number) {
  return request('/api/llm-service/dir/one/list', {
    method: 'GET',
    params: {
      dir: dirId,
      current: 1,
      size: 999,
    },
  });
}

export function getAssignedVersionList(dirId: number) {
  return request('/api/llm-service/dir/one/lawyer/list', {
    method: 'GET',
    params: {
      dir: dirId,
      current: 1,
      size: 999,
    },
  });
}

// 获取模型列表
export function getSupportModels() {
  return request('/api/llm-service/support/model', {
    method: 'GET',
  });
}

// 获取律师列表
export function getLawyerList() {
  return request('/api/user-service/lawyers', {
    method: 'GET',
  });
}

export function getInvationCode() {
  return request('/api/user-service/invitation', {
    method: 'GET',
  });
}

// 设置审查完成
export function setReviewDown(fileId: number) {
  return request('/api/llm-service/update/file/stage', {
    method: 'POST',
    params: {
      fileId,
    },
  });
}

// 用户下载源文件
export function downloadClientFile(fileId: number) {
  return request('/api/llm-service/file/path', {
    method: 'GET',
    responseType: 'blob',
    params: {
      fileId,
    },
  });
}

export function getFileBlob(url: string) {
  return request(url, {
    method: 'GET',
    responseType: 'blob',
  });
}

export function getFileInfo(fileId: number) {
  return request('/api/llm-service/file/info', {
    method: 'GET',
    params: {
      fileId,
    },
  });
}

// 充值接口
export function recharge({ amount, paymentMethod }: { amount: number; paymentMethod: string }) {
  return request('/api/llm-service/payment/wallet/recharge/order', {
    method: 'POST',
    data: {
      amount,
      paymentMethod,
      clientType: 'WEB',
      subject: '钱包充值',
    },
  });
}

// 支付回调， 获取支付状态
export function getPayStatus(orderNo: string) {
  return request(`/api/llm-service/payment/query/${orderNo}`, {
    method: 'GET',
  });
}

export function queryBalance() {
  return request('/api/llm-service/payment/wallet/balance', {
    method: 'GET',
  });
}

export function parseFileOrder(file: UploadFile) {
  const formData = new FormData();
  if (file && file.originFileObj) {
    formData.append('docxFile', file.originFileObj);
  }
  return request('/api/llm-service/upload/preview', {
    method: 'POST',
    data: formData,
    requestType: 'form',
  });
}

export function getOrderList({ current, size }: { current: number; size: number }) {
  return request('/api/llm-service/payment/wallet/transactions', {
    method: 'GET',
    params: {
      current,
      size,
    },
  });
}

export function getProcessingCount() {
  return request('/api/llm-service/assigned/file/cnt', {
    method: 'GET',
  });
}

export function downReviewReport(reviewId: number) {
  return request(`/api/llm-service/reviewBook/download/${reviewId}`, {
    method: 'GET',
    responseType: 'blob',
  });
}

// 获取审查状态
export function queryReviewStatus(reviewId: number) {
  return request(`/api/llm-service/isDone/${reviewId}`, {
    method: 'GET',
  });
}

export function queryFileId(reviewId: number) {
  return request(`/api/llm-service/get/fileId/${reviewId}`, {
    method: 'GET',
  });
}

export function contractReview(reviewId: number, params: Record<string, any>) {
  return request(`/api/llm-service/review-contract/${reviewId}`, {
    method: 'POST',
    data: params,
  });
}

export function downloadFixedContract(reviewId: number) {
  return request<BlobPart>(`/api/llm-service/download/auto-fixed/${reviewId}`, {
    method: 'GET',
    responseType: 'blob',
  });
}

export function sendSmsCodeForReset(phoneNumber: number) {
  return request('/api/user-service/password/forgot', {
    method: 'POST',
    data: {
      phoneNumber: phoneNumber,
    },
  });
}

export function verifySmsCode({ phoneNumber, code }: { phoneNumber: number; code: string }) {
  return request('/api/user-service/password/verify', {
    method: 'POST',
    data: {
      phoneNumber: phoneNumber,
      code: code,
    },
  });
}

export function resetPassword({
  phoneNumber,
  password,
  resetToken,
}: {
  phoneNumber: number;
  password: string;
  resetToken: string;
}) {
  return request('/api/user-service/password/reset', {
    method: 'POST',
    data: {
      phoneNumber: phoneNumber,
      newPassword: password,
      resetToken: resetToken,
    },
  });
}

export function sendSmsCode(phoneNumber: number) {
  return request('/api/user-service/register/send-code', {
    method: 'POST',
    data: {
      phoneNumber: phoneNumber,
    },
  });
}

export function sendLoginSmsCode(phoneNumber: number) {
  return request('/api/user-service/login/send-code', {
    method: 'POST',
    data: {
      phoneNumber: phoneNumber,
    },
  });
}
