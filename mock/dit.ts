import { Request, Response } from 'express';
function generateNumericCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

const list = [11, 12, 13, 14, 15].map((i, k) => {
  return {
    id: i,
    title: '系统维护通知',
    content: `系统将于今晚 02:00-04:00 ${i} 升级维护，届时无法使用。`,
    isRead: 0,
    readTime: null,
    displayMode: 0,
    createTime: '2026-06-15 16:06:41',
  };
});

export default {
  'GET /api/notification-service/notification/list': (req: Request, res: Response) => {
    console.log(list);
    res.status(200).json({
      code: '0',
      message: null,
      requestId: null,
      success: true,
      data: {
        current: 1,
        size: 10,
        total: 3,
        records: list,
      },
    });
  },
  'PUT /api/notification-service/notification/read/:id': (req: Request, res: Response) => {
    const { id } = req.params;
    const a = list.find((i) => i.id === +id) || ({} as API.NoticeItem);
    a.isRead = 1;
    console.log('更新');
    res.status(200).json({
      code: '0',
      message: null,
      requestId: null,
      success: true,
    });
  },
};
