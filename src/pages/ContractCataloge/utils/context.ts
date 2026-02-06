import React from 'react';
// cataloge全局的context
// CatalogePageContext
export const CatalogePageContext = React.createContext({
  listType: 1,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateListType(type: number) {},
  onUploadDirBtnClick() {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onUploadDVersionBtnClick(id: number) {},
  reloadList() {},
});

export const ActionContext = React.createContext({
  viewHandler: () => {},
  downloadHandler: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  versionHandler: (...props: any[]) => {},
  reviewHandler: () => {},
  uploadVersionHandler: () => {},
});
