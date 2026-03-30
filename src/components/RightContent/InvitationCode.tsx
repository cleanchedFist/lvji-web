import { getInvationCode } from '@/services/ant-design-pro/api';
import { CopyOutlined, UserAddOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Button, message, Modal, Typography } from 'antd';
import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

const { Text, Title, Paragraph } = Typography;

type InvitationModalProps = {
  visible: boolean;
  onCancel: () => void;
};
const InvitationModal = ({ visible, onCancel }: InvitationModalProps) => {
  const {
    data: inviteCode,
    loading,
    run: fetchInvatationCode,
  } = useRequest(getInvationCode, { manual: true });

  // 复制功能
  const handleCopy = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      message.success(`邀请码已复制到剪贴板`);
    } catch (err) {
      message.error('复制失败，请手动复制');
    }
    document.body.removeChild(textArea);
  };

  useEffect(() => {
    if (visible) {
      fetchInvatationCode();
    }
  }, [visible]);

  return (
    <Modal title={null} open={visible} onCancel={onCancel} footer={null} centered width={380}>
      <div className="p-8 text-center">
        {/* 图标展示 */}
        <div className="flex justify-center mb-6">
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#F5F5FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <UserAddOutlined style={{ fontSize: '28px', color: '#5C5CFF' }} />
          </div>
        </div>

        <Title level={4} style={{ marginBottom: '8px' }}>
          邀请好友加入
        </Title>
        <Paragraph type="secondary" style={{ fontSize: '14px' }}>
          让好友在注册时输入您的专属邀请码，
          <br />
          与您共同协作。
        </Paragraph>

        {/* 核心邀请码展示区 */}
        <div
          className="mt-8 mb-4 p-6"
          style={{
            backgroundColor: '#F9FAFF',
            border: '1.5px dashed #D6D6FF',
            borderRadius: '12px',
          }}
        >
          {!loading && (
            <div>
              <Text
                type="secondary"
                style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}
              >
                专属邀请码
              </Text>
              <div className="mt-2 mb-4">
                <Text strong style={{ fontSize: '30px', color: '#5C5CFF', letterSpacing: '3px' }}>
                  {inviteCode}
                </Text>
              </div>

              <Button
                type="primary"
                icon={<CopyOutlined />}
                size="large"
                block
                style={{ backgroundColor: '#5C5CFF', borderRadius: '8px', height: '45px' }}
                onClick={() => handleCopy(inviteCode)}
              >
                复制邀请码
              </Button>
            </div>
          )}
          {loading && (
            <div className="bg-white/60 backdrop-blur-[2px] rounded-2xl flex flex-col items-center justify-center transition-all duration-500">
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-3" />
              <p className="text-indigo-600 font-medium text-sm animate-pulse">正在生成专属码...</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default InvitationModal;
