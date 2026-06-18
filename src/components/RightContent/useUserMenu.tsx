import { history, useModel } from '@umijs/max';
import { Bell, List, LogOut, Share2 } from 'lucide-react';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import { useCallback, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';

const useUserMenu = () => {
  const { initialState = {}, setInitialState } = useModel('@@initialState');
  const [invitationVisible, setInvitationVisible] = useState(false);
  const [orderRecordsVisible, setOrderRecordsVisible] = useState(false);
  const [noticesVisible, setNoticesVisible] = useState(false);

  /**
   * 退出登录，并且将当前的 url 保存
   */
  const handleLogout = () => {
    window.localStorage.setItem('token', '');
    const { search, pathname } = window.location;
    const urlParams = new URL(window.location.href).searchParams;
    /** 此方法会跳转到 redirect 参数所在的位置 */
    const redirect = urlParams.get('redirect');
    // Note: There may be security issues, please note
    if (window.location.pathname !== '/user/login' && !redirect) {
      history.replace({
        pathname: '/user/login',
        search: stringify({
          redirect: pathname + search,
        }),
      });
    }
  };

  const menuItems = useMemo(() => {
    const { currentUser, isUserRole } = initialState || {};
    if (!currentUser) return [];

    const items = [
      {
        key: 'notices',
        icon: <Bell size={16} />,
        label: '通知中心',
      },
    ];

    // 特定权限菜单
    if (currentUser.type === 2) {
      items.push({
        key: 'invite',
        icon: <Share2 size={16} />,
        label: '获取邀请码',
      });
    }

    // 角色相关业务菜单
    if (isUserRole) {
      items.push({
        key: 'orderRecords',
        icon: <List size={16} />,
        label: '消费记录',
      });
    }

    items.push({
      key: 'logout',
      icon: <LogOut size={16} />,
      label: '退出登录',
    });
    return items;
  }, [initialState]);

  const menuHandler = useCallback(
    (event: MenuInfo) => {
      const { key } = event;

      if (key === 'logout') {
        flushSync(() => {
          setInitialState((s) => ({ ...s, currentUser: undefined }));
        });
        handleLogout();
        return;
      }

      if (key === 'invite') {
        setInvitationVisible(true);
        return;
      }

      if (key === 'orderRecords') {
        setOrderRecordsVisible(true);
        return;
      }

      if (key === 'notices') {
        // 展示弹窗
        setNoticesVisible(true);
        return;
      }

      // 处理普通跳转
      history.push(`/account/${key}`);
    },
    [setInitialState, handleLogout, history],
  );

  return {
    menuItems,
    menuHandler,
    invitationModal: {
      invitationVisible,
      setInvitationVisible,
    },
    orderRecordsModal: {
      orderRecordsVisible,
      setOrderRecordsVisible,
    },
    noticesModal: {
      noticesVisible,
      setNoticesVisible,
    },
  };
};

export default useUserMenu;
