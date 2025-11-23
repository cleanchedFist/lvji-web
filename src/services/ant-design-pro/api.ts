// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

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

export async function regist(body: API.LoginParams) {
  return request<API.LoginResult>('/api/user-service/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
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

export async function contractView(id: string) {
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

/** 获取审查结果列表 GET /api/analysis */
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

/**
 * 上传文件
 */
export async function uploadContract(file: File, versionId?: string) {
  const formData = new FormData();
  if (file) {
    formData.append('docxFile', file.originFileObj);
    formData.append('version', `${versionId}`);
  }
  return request('/api/llm-service/upload/dir', {
    method: 'POST',
    data: formData,
    requestType: 'form',
  });
}

export async function getResultList(params: any) {
  return request<API.RuleList>('/api/llm-service/resultList', {
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

/**
 * 上传目录下的单独版本
 */
export async function uploadVersion(file: File, dirId: string, versionId) {
  const formData = new FormData();
  if (file) {
    formData.append('docxFile', file.originFileObj);
    formData.append('dir', dirId);
    formData.append('version', versionId);
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
