export const reviewStageText = (stage?: number) => {
  switch (stage) {
    case 0:
      return '已上传';
    case 1:
      return '审查中';
    case 2:
      return '审查完成';
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
      return 'bg-emerald-50 text-emerald-600';
    default:
      return '';
  }
};
