import { defineStore } from 'pinia';
import { store } from '../index';

export const usePermissionStore = defineStore({
  id: 'yqh-info',
  state: () => ({
    temp: '',
    xtcode: '',
    xtinfo: {},
    tempinfo: {}
  }),
  actions: {}
});
/** 在 setup 外使用 */
export function usePermissionStoreHook() {
  return usePermissionStore(store);
}
