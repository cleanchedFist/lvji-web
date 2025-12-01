import type { Location } from 'history';
export type PageType = 0 | 1;
const getPageType = (location: Location): PageType => {
  const { pathname } = location;
  if (pathname.includes('/add')) {
    return 0;
  } else if (pathname.includes('/modify')) {
    return 1;
  }
  return 0;
};
export default getPageType;
