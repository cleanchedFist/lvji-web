import { getInvationCode } from '@/services/ant-design-pro/api';
import { CheckCircleFilled, CopyOutlined, UserAddOutlined } from '@ant-design/icons';
import { useRequest } from '@umijs/max';
import { Button, message, Modal, Typography } from 'antd';

const { Text, Title, Paragraph } = Typography;

type InvitationModalProps = {
  visible: boolean;
  onCancel: () => void;
};
const InvitationModal = ({ visible, onCancel }: InvitationModalProps) => {
  const { data: inviteCode } = useRequest(getInvationCode);

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

  return (
    <Modal title={null} open={visible} onCancel={onCancel} footer={null} centered width={380}>
      {/* 顶部装饰条 */}
      <div
        style={{
          height: '6px',
          borderRadius: '12px',
          marginTop: '20px',
          background: 'linear-gradient(90deg, #5C5CFF 0%, #8E8EFA 100%)',
        }}
      />

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
          <Text
            type="secondary"
            style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}
          >
            专属邀请码
          </Text>
          <div className="mt-2 mb-4">
            <Text strong style={{ fontSize: '32px', color: '#5C5CFF', letterSpacing: '3px' }}>
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

        {/* 底部提示 */}
        <div className="mt-6 flex justify-center items-center">
          <CheckCircleFilled style={{ color: '#52c41a', marginRight: '6px', fontSize: '14px' }} />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            邀请码长期有效
          </Text>
        </div>
      </div>
    </Modal>
  );
};

export default InvitationModal;
