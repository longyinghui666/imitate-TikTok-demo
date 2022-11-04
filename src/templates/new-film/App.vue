<script setup>
import MusicButton from '@/components/MusicButton.vue';
import FooterBox from '@/components/FooterBox.vue';
import HomePage from './view/PageMain-.vue';
import { useAppStore } from '@/sotre/models/app';
import { nextTick } from 'vue';
const appStore = useAppStore();
// 名为 hideLoding 的 action 可以直接提取
const { hideLoding, getAppInfo } = appStore;
getAppInfo();
setTimeout(() => {
  nextTick(() => {
    hideLoding(); //页面加载完成后关闭loading
  });
}, 2000);
</script>

<template>
  <HomePage />
  <div class="menu">
    <MusicButton />
  </div>
  <div class="footer">
    <FooterBox />
  </div>
</template>

<style lang="scss" scoped>
.menu {
  position: fixed;
  right: 20px;
  top: 20px;
  width: 50px;
  height: auto;
}
.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: auto;
}
</style>
