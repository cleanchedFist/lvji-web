export const reviewStageText = (stage?: number) => {
  switch (stage) {
    case 0:
      return '已上传';
    case 1:
      return '大模型审查中';
    case 2:
      return '大模型审查完成';
    case 3:
      return '律师审查完成';
    case 4:
      return '大模型审查失败';
    default:
      return '';
  }
};

export const reviewStageTheme = (stage?: number) => {
  switch (stage) {
    case 0:
      return 'bg-orange-50 text-orange-600';
    case 1:
      return 'bg-indigo-50 text-indigo-600';
    case 2:
      return 'bg-sky-50 text-sky-600';
    case 3:
      return 'bg-emerald-50 text-emerald-600';
    case 4:
      return 'bg-rose-50 text-rose-600';
    default:
      return '';
  }
};
