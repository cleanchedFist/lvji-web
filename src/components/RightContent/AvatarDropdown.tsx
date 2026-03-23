import { useModel } from '@umijs/max';
import { Spin } from 'antd';
import { createStyles } from 'antd-style';
import React from 'react';
import HeaderDropdown from '../HeaderDropdown';
import InvitationModal from './InvitationCode';
import OrderRecordsModal from './OrderRecordsModal';
import useUserMenu from './useUserMenu';

export type GlobalHeaderRightProps = {
  menu?: boolean;
  children?: React.ReactNode;
};

export const AvatarName = () => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  console.log('xxxx', currentUser);
  return <span className="anticon">{currentUser?.name}</span>;
};

const useStyles = createStyles(({ token }) => {
  return {
    action: {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    },
  };
});

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ children }) => {
  const { styles } = useStyles();
  const { initialState } = useModel('@@initialState');
  const { menuItems, menuHandler, invitationModal, orderRecordsModal } = useUserMenu();
  const { currentUser } = initialState || {};

  const loading = (
    <span className={styles.action}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState || !currentUser || !currentUser.name) {
    return loading;
  }

  return (
    <>
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: menuHandler,
          items: menuItems,
        }}
      >
        <div>{children}</div>
      </HeaderDropdown>
      {currentUser.type === 2 && (
        <InvitationModal
          visible={invitationModal.invitationVisible}
          onCancel={() => invitationModal.setInvitationVisible(false)}
        ></InvitationModal>
      )}
      {initialState.isUserRole && (
        <OrderRecordsModal
          visible={orderRecordsModal.orderRecordsVisible}
          onCancel={() => orderRecordsModal.setOrderRecordsVisible(false)}
        />
      )}
    </>
  );
};
