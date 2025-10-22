import { AvatarDropdown, AvatarName, Footer, Question } from '@/components';
import useLocalStorage from '@/hooks/useLocalStorage';
import usePageHistory from '@/hooks/usePageHistory';
import { currentUser as queryCurrentUser } from '@/services/ant-design-pro/api';
import { LeftOutlined, LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link, matchPath, matchRoutes } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import './git-markdown.less';
import './markdown.css';
import { errorConfig } from './requestErrorConfig';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
const registPath = '/user/regist';
const contractViewPath = { path: '/clm/contract/view/:id' };
const contractDetailPath = { path: '/clm/contract/detail/:id' };
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return {
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
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  // eslint-disable-next-line
  const trackPageChange = usePageHistory();
  const editBtnStorageKey = 'editingDocId';
  // eslint-disable-next-line
  const editBtnStorage = useLocalStorage(editBtnStorageKey);
  const setSiderCollapsed = (collapsed?: boolean) => {
    let collapsedSetting = { collapsed };
    if (collapsed !== void 0) {
      collapsedSetting.collapsed = collapsed;
    } else {
      const hideSidebarPaths = [contractViewPath, contractDetailPath];
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
    defaultCollapsed: setSiderCollapsed,
    onCollapse: (collapsed) => {
      setSiderCollapsed(collapsed);
    },
    actionsRender: () => [<Question key="doc" />],
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
      const matchDetailPath = matchPath(contractDetailPath, previousPath);
      if (matchPath(contractViewPath, currentPath)) {
        editBtnStorage.removeValue();
      } else if (matchDetailPath && currentPath !== previousPath) {
        const { params } = matchDetailPath;
        if (params.id) {
          editBtnStorage.setValue(params.id);
        }
      }
    },
    bgLayoutImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {isDev && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    menuExtraRender: (menuProps) => {
      const styleObj = {
        color: '#1890ff',
        cursor: 'pointer',
        lineHeight: '40px',
      };

      const handleClick = () => {
        // 获取 合同 id，跳转到合同
        history.push(`/clm/contract/view/${editBtnStorage.value}`);
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
