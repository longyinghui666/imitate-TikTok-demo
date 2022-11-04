/**
 * 动态加载css文件
 * @param {*} url
 * @param {*} isCache
 */
export function loadCSS(url, isCache = false) {
  let element = document.createElement('link');
  element.setAttribute('rel', 'stylesheet');
  element.setAttribute('type', 'text/css');
  if (isCache) {
    element.setAttribute('href', url + '?t=' + new Date().getTime());
  } else {
    element.setAttribute('href', url);
  }
  document.head.appendChild(element);
}

/**
 * 动态加载js文件
 * @param {*} src
 * @param {*} callback
 *   loadScript("",function(){
 *   console.log("加载成功")
 * })
 * var that = this; 在方法里面使用that
 */
export function loadJS(jsUrl, callback, isCache = false) {
  var script = document.createElement('script');
  var head = document.head;
  script.type = 'text/JavaScript';
  if (isCache) {
    script.src = jsUrl + '?t=' + new Date().getTime();
  } else {
    script.src = jsUrl;
  }
  if (script.addEventListener) {
    script.addEventListener('load', callback, false);
  }
  head.appendChild(script);
}

/**
 * 获取URL上的参数
 * @param {*} name
 * @returns
 */
export const getUrlQueryString = name => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  let r = window.location.search.slice(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
};

/**
 * 获取URL地址部分
 * @returns
 */
export const urlpathToArray = () => {
  return window.location.pathname.slice(1).split('/');
};

/**
 * Object转换成URL参数字符串
 * @returns
 */
export const objectToQuery = (obj, prefix = '') => {
  if (typeof obj !== 'object') return '';
  const attrs = Object.keys(obj);
  return attrs.reduce((query, attr, index) => {
    if (typeof obj[attr] === 'object') {
      const subPrefix = prefix ? `${prefix}[${attr}]` : attr;
      query += objectToQuery(obj[attr], subPrefix);
    } else {
      if (prefix) {
        query += `${prefix}[${attr}]=${obj[attr]}`;
      } else {
        query += `${attr}=${obj[attr]}`;
      }
    }
    if (index !== attrs.length - 1) query += '&';
    return query;
  }, '');
};
