const reviewStageText = (stage: number) => {
  switch (stage) {
    case 0:
      return '已上传';
    case 1:
      return '审查中';
    case 2:
      return '审查完成';
  }
};

export default reviewStageText;
