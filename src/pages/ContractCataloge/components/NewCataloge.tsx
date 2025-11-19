
import React, { useContext } from 'react';
import { Button } from 'antd';
import { ContractVersionsContext } from '../utils/context';

const NewCataloge: React.FC = () => {
  const contractVersionsContext = useContext(ContractVersionsContext)
    return <>
        <div className="rounded-xl border bg-card text-card-foreground shadow sm:col-span-2">
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <h3 className="font-semibold leading-none tracking-tight">合同管理</h3>
                <p className="text-sm text-balance max-w-lg leading-relaxed">
                    上传您的合同,在这里完善合同的基本信息.合同文件有更新可以替换合同附件.
                </p>
            </div>
            <div className="flex items-center p-6 pt-0">
                <Button
                    type="primary"
                    onClick={() => contractVersionsContext.onUploadDirBtnClick()}
                >
                    上传合同
                </Button>
            </div>
        </div>
    </>
}

export default NewCataloge