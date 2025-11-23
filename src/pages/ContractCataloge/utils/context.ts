import React from 'react';
export const ContractVersionsContext = React.createContext({
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
