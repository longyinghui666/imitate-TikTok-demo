import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { store } from '@/sotre';
import { urlpathToArray } from '@/utils/tools';
import { getYqhInfo } from '@/api';

export const useAppStore = defineStore('appindex', () => {
  const isLoading = ref(true);
  const urlpath = urlpathToArray();
  const temp = ref(urlpath[0]);
  const code = ref(urlpath[1]);
  const tempinfo = ref({});
  const yqhinfo = ref({});
  const getLoading = computed(() => isLoading.value);
  function hideLoding() {
    isLoading.value = false;
    return isLoading;
  }

  function setTempCode(tempt, codet) {
    temp.value = tempt;
    code.value = codet;
  }

  function getAppInfo() {
    getYqhInfo({ temp: temp.value, code: code.value }).then(res => {
      if (res.code) {
        return;
      }
      tempinfo.value = res.result.tempinfo;
      yqhinfo.value = res.result.yqhinfo;
      setTimeout(() => {
        console.log(res.result);
      }, 500);
    });
  }

  return { isLoading, temp, code, tempinfo, yqhinfo, getLoading, hideLoding, setTempCode, getAppInfo };
});
/** 在 setup 外使用 */
export function useAppStoreHook() {
  return useAppStore(store);
}
