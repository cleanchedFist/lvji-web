import { AvatarDropdown, AvatarName, Footer } from '@/components';
import usePageHistory from '@/hooks/usePageHistory';
import useSessionStorage from '@/hooks/useSessionStorage';
import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';
import { LeftOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, matchPath, matchRoutes } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import './git-markdown.less';
import './markdown.css';
import { errorConfig } from './requestErrorConfig';
// const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const registPath = '/user/regist';
const ReivewResultPath = { path: '/clm/reviews/result/:id' };
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  isUserRole?: boolean;
  balance?: { frozenBalance: number; availableBalance: number; totalBalance: number };
}> {
  console.log('代码更新时间：2026/05/06');
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return {
        role: msg?.data.type === 0 ? 'user' : 'lawyer',
        type: msg?.data.type,
        name: msg.data.username,
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      };
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname !== loginPath && location.pathname !== registPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
      isUserRole: currentUser?.role === 'user',
      balance: {
        frozenBalance: 0,
        availableBalance: 0,
        totalBalance: 0,
      }, // updateBalance手动更新
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  if (initialState?.isUserRole) {
    return {
      menuRender: () => <></>,
      onPageChange: () => {
        const { location } = history;
        const pathname = location.pathname;

        // 如果没有登录，重定向到 login
        if (!initialState?.currentUser && location.pathname !== loginPath) {
          history.push(loginPath);
        }

        const whiteList = [
          '/user/cataloge',
          '/user/login',
          '/user/regist',
          '/clm/reviews/file/:id',
        ];
        const rootPath = whiteList[0];
        const isAllowed = whiteList.some((p) => matchPath({ path: p }, pathname));

        // 1. 根目录 / 的动态重定向逻辑 和 路由限制逻辑
        if (pathname === '/' || !isAllowed) {
          history.replace(rootPath);
        }
      },
      footerRender: () => <Footer />,
      ...initialState?.settings,
    };
  }
  // eslint-disable-next-line
  const trackPageChange = usePageHistory();
  const editBtnStorageKey = 'editingDocId';
  // eslint-disable-next-line
  const editBtnStorage = useSessionStorage(editBtnStorageKey, '');
  const setSiderCollapsed = (collapsed?: boolean) => {
    let collapsedSetting = { collapsed };
    if (collapsed !== void 0) {
      collapsedSetting.collapsed = collapsed;
    } else {
      const hideSidebarPaths = [ReivewResultPath];
      const shouldHideSidebar = matchRoutes(hideSidebarPaths, history?.location?.pathname)?.length;
      collapsedSetting.collapsed = !!shouldHideSidebar;
    }
    setInitialState((preInitialState) => ({
      ...preInitialState,
      settings: {
        ...(preInitialState?.settings || {}),
        ...collapsedSetting,
      },
    }));
  };
  return {
    defaultCollapsed: false,
    onCollapse: (collapsed) => {
      setSiderCollapsed(collapsed);
    },
    actionsRender: () => [],
    avatarProps: {
      src: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
      title: <AvatarName />,
      render: (_, avatarChildren) => {
        return <AvatarDropdown>{avatarChildren}</AvatarDropdown>;
      },
    },
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }

      // 设置侧边栏的收起展开状态
      setSiderCollapsed();

      // 根据页面判断是否显示 返回编辑页面 按钮
      const { previousPath, currentPath } = trackPageChange(location.pathname);
      const matchReviewPath = matchPath(ReivewResultPath, previousPath);
      if (matchPath(ReivewResultPath, currentPath)) {
        editBtnStorage.removeValue();
      } else if (matchReviewPath && currentPath !== previousPath) {
        const { params } = matchReviewPath;
        if (params.id) {
          editBtnStorage.setValue(params.id);
        }
      }

      // 如果是用户页面，重定向到律师页面
      const userPath = '/user/cataloge';
      if (matchPath({ path: userPath }, location.pathname)) {
        history.push('/');
      }
    },

    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    // childrenRender: (children) => {
    //   // if (initialState?.loading) return <PageLoading />;
    //   return (
    //     <>
    //       {children}
    //       {isDev && (
    //         <SettingDrawer
    //           disableUrlParams
    //           enableDarkTheme
    //           settings={initialState?.settings}
    //           onSettingChange={(settings) => {
    //             setInitialState((preInitialState) => ({
    //               ...preInitialState,
    //               settings,
    //             }));
    //           }}
    //         />
    //       )}
    //     </>
    //   );
    // },
    menuExtraRender: (menuProps) => {
      const styleObj = {
        color: '#4f46e5',
        cursor: 'pointer',
        lineHeight: '40px',
      };

      const handleClick = () => {
        // 获取 合同 id，跳转到合同
        history.push(`/clm/reviews/result/${editBtnStorage.value}`);
      };
      return !!editBtnStorage.value ? (
        <div style={styleObj} onClick={handleClick}>
          <LeftOutlined />{' '}
          <span style={{ display: menuProps.collapsed ? 'none' : 'inline-block' }}>
            返回编辑中的合同
          </span>
        </div>
      ) : (
        <></>
      );
    },
    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
