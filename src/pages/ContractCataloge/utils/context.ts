import React from 'react';
export const ContractVersionsContext = React.createContext({
  isUser: false,
  onUploadDirBtnClick() {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onUploadDVersionBtnClick(id: number) {},
  reloadList() {},
});

export const ActionContext = React.createContext({
  isUser: false,
  viewHandler: () => {},
  downloadHandler: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  versionHandler: (...props: any[]) => {},
  reviewHandler: () => {},
  uploadVersionHandler: () => {},
});
