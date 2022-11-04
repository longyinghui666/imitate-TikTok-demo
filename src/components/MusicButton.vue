<script setup>
import { ref } from 'vue';
let bbb = ref(true);
let aaa = ref(false);
function change() {
  bbb.value = !bbb.value;
  aaa.value = !aaa.value;
  console.log('b:' + bbb.value);
  console.log('a:' + aaa.value);
}
</script>

<template>
  <div :class="{ themusic: bbb, themusicoff: aaa }" @click="change"><span class="iconfont">&#xe600;</span></div>
</template>

<style scoped lang="scss">
.themusic {
  height: 40px;
  width: 40px;
  background-color: rgba(128, 128, 128, 45%);
  top: 3%;
  right: 6%;
  animation: rotate 2s linear infinite;
  animation-play-state: play;
  position: fixed;
  z-index: 500;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  .iconfont {
    color: white;
    font-size: 30px;
  }
}
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
.themusicoff {
  height: 40px;
  width: 40px;
  background-color: rgba(128, 128, 128, 40%);
  top: 3%;
  right: 6%;
  animation: rotate 3s linear infinite;
  animation-play-state: paused;
  position: fixed;
  z-index: 500;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  .iconfont {
    color: white;
    font-size: 30px;
  }
}
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
</style>
