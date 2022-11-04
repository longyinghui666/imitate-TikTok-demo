import { objectToQuery } from '@/utils/tools';
import { hosturl } from '@/lib/config';

export default ({ url, method = 'GET', data = null, headers = {} }) => {
  // 请求配置
  let options = {
    method,
    headers: {
      'content-type': 'application/json',
      ...headers
    }
  };
  if (method === 'GET' || method === 'HEAD') {
    url += (url.indexOf('?') != -1 ? '&' : '?') + objectToQuery(data);
  } else {
    options.body = JSON.stringify(data);
  }
  return fetch(hosturl + url, options)
    .then(res => res.json())
    .then(data => data);
};
