
import React, { useState, useImperativeHandle, forwardRef, useContext } from 'react';
import { Modal, Upload, UploadFile, UploadProps, message, Checkbox, CheckboxChangeEvent, Descriptions } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { uploadContract, uploadVersion, getDirCount, parseContract } from '@/services/ant-design-pro/api';
import { ContractVersionsContext } from '../utils/context';
export interface UploadContractModalRef {
    openModal: (ut: number, dirId?: number) => void;
}

export enum UploadType {
    dir = 1,
    version = 2
}



const UploadContractModal = forwardRef<UploadContractModalRef>((props:any, ref) => {
    const contractVersionsContext = useContext(ContractVersionsContext)
    const [uploadModalVisible, setUploadModalVisible] = useState<boolean>(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [nextVersionName, setNextVersionName] = useState('1.0.0')
    // const { uploadType, dirId } = props
    const [uploadType, setUploadType] = useState<number>()
    const [dirId, setDirId] = useState<number>()
    let ifParse = false




    function onChange(e: CheckboxChangeEvent) {
        ifParse = e.target.checked
    }

    function handleShowModal(ut: number, _dirId?: number) {
        setUploadType(ut)
        if (ut === UploadType.dir) {
            setUploadModalVisible(true)
        } else if (_dirId) {
            setDirId(_dirId)
            getDirCount(_dirId)
                .then(res => {
                    const { success, data } = res
                    if (success) {
                        setNextVersionName(`${data + 1}.0.0`)
                        setUploadModalVisible(true)
                    }
                })
        }
    }

    useImperativeHandle(ref, () => ({
        openModal(ut: number, dirId?: number) {
            handleShowModal(ut, dirId)
        }
    }))
    const uploadProps: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        onChange(files) {
            setFileList([...files.fileList]);
        },
        fileList,
    };

    function handleUploadDir() {
        setUploading(true);
        const fileRequest = fileList.map((item) => uploadContract(item as unknown as File, '1.0.0'));
        Promise.all(fileRequest)
            .then(() => {
                setFileList([]);
                message.success('上传成功');
                setUploadModalVisible(false);
            })
            .catch(() => {
                message.error('上传失败，请重试');
            })
            .finally(() => {
                contractVersionsContext.reloadList()
                setUploading(false);
            });
    }

     function handleParseVersion(fileId: number) {
        const fileRequest = parseContract(dirId, fileId)
        fileRequest
            .then(() => {
                setFileList([]);
                message.success('上传成功');
                setUploadModalVisible(false);
                contractVersionsContext.reloadList()
            })
            .catch(() => {
                message.error('上传失败，请重试');
            })
            .finally(() => {
                setUploading(false);
            });
    }


    function handleUploadVersion() {
        setUploading(true);

        const file = fileList[0]
        const fileRequest = uploadVersion(file as unknown as File, `${dirId}`, nextVersionName)
        fileRequest
            .then((res) => {
                if (ifParse) {
                    handleParseVersion(res.data)
                } else {
                    setFileList([]);
                    message.success('上传成功');
                    setUploadModalVisible(false);
                    contractVersionsContext.reloadList()
                    setUploading(false);
                }
            })
            .catch(() => {
                message.error('上传失败，请重试');
            })
            .finally(() => {
                // UploadFinally.handler()
                // todo 更新数据 onUploadEnd()
                
            });

    }
   
    const handleUpload = () => {
        if (uploadType === UploadType.dir) {
            handleUploadDir()
        } else if (uploadType === UploadType.version) {
            handleUploadVersion()
        }

    };

    return <>
        <Modal
            title="上传合同"
            destroyOnHidden={true}
            width={600}
            open={uploadModalVisible}
            onOk={handleUpload}
            okButtonProps={{ loading: uploading }}
            onCancel={() => setUploadModalVisible(false)}
        >
            <div className="py-4">
                <Descriptions style={{ display: uploadType === UploadType.dir ? 'none' : 'block' }}>
                    <Descriptions.Item label="版本号">{nextVersionName}</Descriptions.Item>
                </Descriptions>
                <Upload.Dragger {...uploadProps} multiple={uploadType === UploadType.dir ? true : false}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="text-base font-medium text-[#71717a]">
                        {`在这里拖拽${uploadType === UploadType.dir ? '多个' : ''}文件或者点击上传文件`}
                    </p>
                    <p className="text-[#71717a]/75 text-sm">{uploadType === UploadType.dir ? '你可以上传 10 个文件 (最大 10 MB 每个)' : '文件大小不超过 10M'}</p>
                </Upload.Dragger>
                <Checkbox style={{ margin: '10px 0 0 0', display: uploadType === UploadType.dir ? 'none' : 'flex' }} onChange={onChange}>是否解析合同</Checkbox>
            </div>
        </Modal>
    </>
})


export default UploadContractModal