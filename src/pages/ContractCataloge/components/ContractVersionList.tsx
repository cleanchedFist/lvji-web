import { Modal, Card, Descriptions, Steps, Tabs, Button, List, Row, Col, message } from 'antd';
import React, { useState, useMemo, forwardRef, useImperativeHandle } from 'react';
import { history } from '@umijs/max';
import formatTime from '../utils/formatTime';
import { getContractVersionList, contractDetail, deleteContractDir } from '@/services/ant-design-pro/api';
import { contractDownload } from '@/utils/contractHandle';

export interface ContractVersionListRef {
    openModal: (ut: number, dirId?: number) => void;
}

const ContractVersionList = forwardRef<ContractVersionListRef>((props: any, ref) => {
    const [focusVersionParseData, setFocusVersionParseData] = useState<API.ContractListItem>({} as API.ContractListItem)
    const [versionList, setVersionList] = useState([])
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [dirInfo, setDirInfo] = useState<number>()

   
    function updateList(id?: number) {
        if (id || dirInfo.id) {
            getContractVersionList(id || dirInfo.id)
                .then(res => {
                    setVersionList(res.data.records)
                    setFocusVersionParseData(res.data.records[0])
                })
        }

    }
     useImperativeHandle(ref, () => ({
        openModal(data: any) {
            setModalVisible(true)
            updateList(data.id)
            setDirInfo(data)
        }
    }))


    const step = useMemo(() => {
        return ['起草中', '审核中', '签订中', '履约中', '已完成'].indexOf(focusVersionParseData?.stage || '');
    }, [focusVersionParseData]);


    const handleItemClick = (id: number) => {
        contractDetail(`${id}`)
            .then(res => {
                setFocusVersionParseData(res.data)
            })
    }

    const handleViewContract = (id: number) => {
        history.push(`/clm/contract/view/${id}`);
    }

    const handleDownloadContract = (data:any) => {
        const contractName = data.name;
        contractDownload({ contractName, reviewId: data.latestFileId });
    }

    const handleDeleteContract = (id: number) => {
        deleteContractDir(`${id}`)
            .then(() => {
                updateList();
            })
            .catch(() => {
                message.error('删除失败，请重试');
            })
    }

    const handleReviewContract = (id: number) => {
        history.push(`/clm/contract/step/${id}`)
    }

    return [
        <Modal title={dirInfo?.title}
            centered
            open={modalVisible}
            width={1200}
            onCancel={() => setModalVisible(false)}
            footer={null}
            destroyOnHidden={true}
        >
            <Card title={null}>
                <Descriptions title="合同概括" column={4}>
                    <Descriptions.Item label="合同类型">{focusVersionParseData.type}</Descriptions.Item>
                    <Descriptions.Item label="创建日期">{formatTime(focusVersionParseData.createTimeStamp)}</Descriptions.Item>
                    <Descriptions.Item label="合同附件">{focusVersionParseData.name}</Descriptions.Item>
                    <Descriptions.Item label="对价">{focusVersionParseData.price}</Descriptions.Item>
                    <Descriptions.Item label="生效日期">{formatTime(focusVersionParseData.startTime)}</Descriptions.Item>
                    <Descriptions.Item label="终止日期">{formatTime(focusVersionParseData.endTime)}</Descriptions.Item>
                </Descriptions>
                <Descriptions style={{ margin: '10px 0 0 0' }} title="合同主体" column={4}>
                    <Descriptions.Item label="甲方">{focusVersionParseData.parta}</Descriptions.Item>
                    <Descriptions.Item label="乙方">{focusVersionParseData.partb}</Descriptions.Item>
                </Descriptions>
                <Descriptions style={{ margin: '10px 0 0 0' }} title="合同阶段" column={4}>
                    <Descriptions.Item>
                        <Steps
                            direction="horizontal"
                            current={step}
                            items={[
                                {
                                    title: '起草',
                                },
                                {
                                    title: '审核',
                                },
                                {
                                    title: '签订',
                                },
                                {
                                    title: '履约中',
                                },
                                {
                                    title: '已完成',
                                },
                            ]}

                        />
                    </Descriptions.Item>

                </Descriptions>
            </Card>
            <Card style={{ margin: '10px 0 0 0' }} title={null}>
                <Tabs>
                    <Tabs.TabPane tab="版本历史" key="item-1">
                        <List style={{ height: '400px', overflow: 'scroll' }}>
                            {versionList?.map(i => <Card key={i.id} className={`hover:bg-gray-100 cursor-pointer ${focusVersionParseData.id ===i.id ? 'border-blue-500' : ''}`} style={{ margin: '0 0 10px 0' }} onClick={() => handleItemClick(i.id)}>
                                <Row>
                                    <Col span="16">
                                        <div>v{i.version}</div>
                                        <div style={{ color: 'gray' }}>{formatTime(i.createTimeStamp)}</div>
                                    </Col>
                                    <Col span="8">
                                        <Button style={{ margin: '0 14px 0 0' }} onClick={() => handleViewContract(i.id)}>查看</Button>
                                        <Button style={{ margin: '0 14px 0 0' }} onClick={() => handleDownloadContract(i)}>下载</Button>
                                        <Button style={{ margin: '0 14px 0 0' }} onClick={() => { handleReviewContract(i.id) }}>智能审查</Button>
                                        <Button onClick={() => { handleDeleteContract(i.id) }}>删除</Button>
                                    </Col>
                                </Row>
                            </Card>)}
                        </List>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="版本对比" key="item-2">
                        内容 2
                    </Tabs.TabPane>
                </Tabs>
            </Card>

        </Modal>,

    ]
})
export default ContractVersionList
