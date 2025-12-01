import { strategyAdd, strategyDetail, strategyUpdate } from '@/services/ant-design-pro/api';
import { history } from '@umijs/max';
import { message } from 'antd';
import { SubmitFormData } from '../components/StrategyForm';
import { PageType } from './getPageType';

const strategyEditHandleMap: Record<PageType, any> = {
  0: {
    title: '新增审核策略',
    initFn() {
      return Promise.resolve({ data: {} });
    },
    updateStrategy(formData: SubmitFormData) {
      strategyAdd(formData)
        .then((res) => {
          if (res.success) {
            message.success('新增成功');
            history.back();
          } else {
            message.error('新增失败，请重试');
          }
        })
        .catch(() => {
          message.error('新增失败，请重试');
        });
    },
  },
  1: {
    title: '修改审核策略',
    initFn(id: string) {
      if (!id) return;
      return strategyDetail(id);
    },
    updateStrategy(formData: SubmitFormData, id?: string) {
      if (!id) {
        return;
      }
      strategyUpdate({ id, ...formData })
        .then((res) => {
          if (res.success) {
            message.success('修改成功');
            history.back();
          } else {
            message.error('修改失败，请重试');
          }
        })
        .catch(() => {
          message.error('修改失败，请重试');
        });
    },
  },
};

export default strategyEditHandleMap;
