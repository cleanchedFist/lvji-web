import { contract } from '@/services/ant-design-pro/api';
// 创建轮询对象
 export default function pollingList(actionRef: any) {
    let timer: any = null;
    async function pollingTableasync(changingIds: number[], ...args: any[]) {
      try {
        const [params, sort] = args;
        const response = await contract(params, sort);
        const newIds = response.data?.records?.filter((i) => i.status === 1).map((i) => i.id) || [];

        // 重新刷新 队尾id一致且数量减少
        // 队尾id不一致且数量不变或增加
        // 原始数组里有数组[]
        // 减少
        // 队尾id变了，就数组里的数据是不存在于新数据
        let needLoop = false;
        if (changingIds[0] === newIds[0]) {
          needLoop = !!(changingIds.length === newIds.length);
        } else {
          // 判断 旧id 不存在于 新id中
          // 有一个改变中的id不存在于新的id集合中，说明更新完成
          // 更新完成后，结束loop
          const hasDone = changingIds?.filter((i) => !newIds.includes(i));
          needLoop = !hasDone.length;
        }

        if (needLoop) {
          timer = setTimeout(() => {
            pollingTableasync(newIds, ...args);
          }, 1000);
        } else {
          // eslint-disable-next-line
          timer && clearTimeout(timer);
          actionRef.current?.reload();
        }
      } catch (error) {
        console.error('长轮询错误:', error);
        // eslint-disable-next-line
        timer && clearTimeout(timer);
      }
    }

    function stopPollingTable() {
      // eslint-disable-next-line
      timer && clearTimeout(timer);
    }
    function startPollingTable(records?: API.CatalogeCardProps[], ...args: any[]) {
      const changingIds = records?.filter((i) => i.status === 1).map((i) => i.id) || [];
      if (changingIds.length > 0) {
        pollingTableasync(changingIds, ...args);
      }
    }
    return { start: startPollingTable, end: stopPollingTable };
  }