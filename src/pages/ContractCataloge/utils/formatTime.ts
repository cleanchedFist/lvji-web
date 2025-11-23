import dayjs from 'dayjs';
export default function (time: number) {
  return time ? dayjs(time).format('YYYY-MM-DD HH:mm:ss') : '';
}
