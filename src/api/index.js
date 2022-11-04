import FetchRequest from '@/lib/FetchRequest';

/**
 * 获取邀请函信息
 * @returns
 */
export const getYqhInfo = async data => {
  return FetchRequest({ url: '/api/getFillinfo', method: 'GET', data });
};
