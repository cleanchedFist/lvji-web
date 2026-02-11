// 定义 reviewStance 只有甲方、乙方
export enum allowedStances {
  PartyA = '甲方',
  PartyB = '乙方',
}

export enum allowedScale {
  Strong = '强势',
  Neutral = '中立',
  Weak = '弱',
}

export const initialForm = {
  reviewStance: allowedStances.PartyA,
  scale: allowedScale.Strong,
};
