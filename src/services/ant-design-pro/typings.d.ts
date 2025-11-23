// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    username?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    id: string;
    name?: string;
    description?: string;
    created_by?: string;
    riskLevel?: string;
  };

  type RuleList = {
    data?: {
      rulesDetailRecords: RuleListItem[];
    };
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type RuleTypeItem = {
    id: string;
    rule_type?: string;
  };
  type RuleTypeList = {
    data?: RuleTypeItem[];
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };

  type File = {
    id: string;
    name: string;
  };

  type ContractListItem = {
    id: string;
    price: string;
    name: string;
    title: string;
    stage: string;
    parse_status: string;
    createTimeStamp: number;
    type: string;
    startTime: number;
    reviewExpireTime: number;
    endTime: number;
    file_list: File[];
    parta: string;
    partb: string;
    reviewer: string;
    status?: number;
  };
  type ContractList = {
    data?: {
      records: CatalogeCardProps[];
      total?: number;
    };
    success?: boolean;
  };

  type ContractType = {
    id: string;
    contract_type: string;
  };

  type ContractTypeList = {
    data?: string[];
  };

  type AnalysisListItem = {
    id: string;
    reviewId: string;
    contract_name: string;
    file_name: string;
    contract_party: string;
    status: string;
    created_at: string;
    review_conclusion: string;
    finish_time: string;
    review_score: Array<{
      score: number;
      type: string;
    }>;
  };

  type AnalysisList = {
    data?: AnalysisListItem[];
    total?: number;
    success?: boolean;
  };

  type StrategyItem = {
    id: string;
    name: string;
    description: string;
  };

  type StrategyList = {
    data?: {
      records: StrategyItem[];
      size: number;
      total: number;
    };
  };

  type ScenarioItem = {
    id: string;
    name: string;
    createdSource: 0 | 1;
  };

  type ScenarioList = {
    data?: {
      records: ScenarioItem[];
      size: number;
      total: number;
    };
  };

  type ContractCataloge = {
    id: string;
    name: string;
  };

  type CatalogeCardProps = {
    id: number;
    name: string;
    userId: number;
    parta: string;
    partb: string;
    latestFileId: number;
    version: string;
    checked: boolean;
    createTimeStamp: number;
    reviewId: number;
  };

  type ContractDownloadProps = {
    contractName: string;
    reviewId: number | string;
  };

  type ContractVersionItem = {
    id: number;
    version: string;
    name: string;
    title: string;
    parta: string;
    partb: string;
    status: number;
    stage: string;
    checked: boolean;
    createTimeStamp: number;
    reviewId: number;
  };
}
