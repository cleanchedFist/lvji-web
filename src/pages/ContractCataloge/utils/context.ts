import React from 'react';
export const ContractVersionsContext = React.createContext({
    onUploadDirBtnClick() {},
    onUploadDVersionBtnClick(id: number) {},
    reloadList() { },
});

export const ActionContext = React.createContext({
    viewHandler: () => { },
    downloadHandler: () => { },
    versionHandler: (...props:any[]) => { },
    reviewHandler: () => { },
    uploadVersionHandler: () => { },
})
