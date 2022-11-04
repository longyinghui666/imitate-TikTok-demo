<script setup>
import { ref, watchEffect } from 'vue';
import { useAppStore } from '@/sotre/models/app';
const appStore = useAppStore();
const ishow = ref(true);
watchEffect(async () => {
  //当getLoading值有变化时，再次执行一次
  ishow.value = appStore.getLoading;
});
</script>

<template>
  <div v-if="ishow" class="loading">
    <slot>
      <div class="loadingbing">
        <span></span>
      </div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.loading {
  width: 100vw !important;
  height: 100vh !important;
  position: absolute !important;
  left: 0;
  top: 0;
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
.loadingbing {
  width: 150px;
  height: 8px;
  border-radius: 4px;
  display: flex;

  margin: 0 auto;
  position: relative;
  background: lightblue;
  overflow: hidden;
}
.loadingbing span:first-child {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background: lightgreen;
  animation: changePosition 4s linear infinite;
  -webkit-animation: changePosition 4s linear infinite; /* Safari 和 Chrome */
}

@-webkit-keyframes changePosition {
  0% {
    -webkit-transform: translate(-150px);
  }
  50% {
    -webkit-transform: translate(0);
  }
  100% {
    -webkit-transform: translate(150px);
  }
}
</style>
