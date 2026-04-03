import { LoadingTask } from '../components/ReviewLoading';

export const DEFAULT_TASK_QUEUE: LoadingTask[] = [
  {
    name: '合同结构分析',
    taskList: [
      { status: 'waiting', message: '识别合同中的所有条款' },
      { status: 'waiting', message: '分析条款性质' },
      { status: 'waiting', message: '查找数据库中的合同分类特征' },
      { status: 'waiting', message: '判断最终所属分类' },
    ],
  },
  {
    name: '审查重点',
    taskList: [
      { status: 'waiting', message: '确认合同审查重点' },
      { status: 'waiting', message: '分析合同审查重点是否存在风险' },
      { status: 'waiting', message: '生成风险相应的修改建议' },
    ],
  },
  {
    name: '合同标的审查',
    taskList: [
      { status: 'waiting', message: '识别合同标的内容' },
      { status: 'waiting', message: '定位标的内容关联的条款' },
      { status: 'waiting', message: '分析同类型合同的标的条款安排' },
      { status: 'waiting', message: '分析标的条款风险' },
      { status: 'waiting', message: '生成标的条款修改建议' },
    ],
  },
  {
    name: '权利义务条款审查',
    taskList: [
      { status: 'waiting', message: '分析代表阵营的目的及条件' },
      { status: 'waiting', message: '分析代表阵营目的及实现条件所关联的权利义务' },
      { status: 'waiting', message: '定位权利义务条款' },
      { status: 'waiting', message: '分析权利义务条款风险' },
      { status: 'waiting', message: '生成权利义务条款修改建议' },
    ],
  },
  {
    name: '违约责任审查',
    taskList: [
      { status: 'waiting', message: '识别违约责任内容' },
      { status: 'waiting', message: '定位违约责任关联的条款' },
      { status: 'waiting', message: '分析同类型合同违约责任安排' },
      { status: 'waiting', message: '分析违约责任条款风险' },
      { status: 'waiting', message: '生成违约责任条款的修改建议' },
    ],
  },
  {
    name: '程序性条款审查',
    taskList: [
      { status: 'waiting', message: '识别合同中的所有程序性条款' },
      { status: 'waiting', message: '分析程序性条款风险' },
      { status: 'waiting', message: '生成程序性条款的修改建议' },
    ],
  },
  {
    name: '文字符号审查',
    taskList: [
      { status: 'waiting', message: '分析文字内容是否存在风险' },
      { status: 'waiting', message: '分析符号内容是否存在风险' },
      { status: 'waiting', message: '根据文字符号风险完成条款内容修改' },
    ],
  },
  {
    name: '整体优化修改建议',
    taskList: [
      { status: 'waiting', message: '找到所有存在冲突的条款' },
      { status: 'waiting', message: '优化条款修改内容' },
    ],
  },
];

export const taskStep: Record<number, number>[] = [
  { 0: 0, 1: 0, 2: 1, 3: 0, 4: 1, 5: 0, 6: 0, 7: 1 },
  { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 1 },
  { 0: 2, 1: 1, 2: 1, 3: 2, 4: 2, 5: 2, 6: 1, 7: 1 },
  { 0: 2, 1: 1, 2: 2, 3: 2, 4: 3, 5: 3, 6: 2, 7: 1 },
  { 0: 3, 1: 2, 2: 3, 3: 3, 4: 3, 5: 3, 6: 2, 7: 1 },
  { 0: 4, 1: 3, 2: 5, 3: 5, 4: 5, 5: 3, 6: 3, 7: 1 },
];
