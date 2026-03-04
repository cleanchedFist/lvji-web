import dayjs from 'dayjs';
export function formatTime(time: number) {
  return time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : '';
}

export const formatDuration = (seconds: number, Chinese = true) => {
  if (!seconds || seconds < 0) return Chinese ? '0秒' : '0s';

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  if (Chinese) {
    const hDisplay = h > 0 ? `${h}小时` : '';
    const mDisplay = m > 0 ? `${m}分` : '';
    const sDisplay = s > 0 || (h === 0 && m === 0) ? `${s}秒` : '';
    return hDisplay + mDisplay + sDisplay;
  } else {
    // 补零格式化 00:00:00
    const parts = [
      h > 0 ? h.toString().padStart(2, '0') : null,
      m.toString().padStart(2, '0'),
      s.toString().padStart(2, '0'),
    ].filter(Boolean); // 如果没有小时，则显示 mm:ss
    return parts.join(':');
  }
};
