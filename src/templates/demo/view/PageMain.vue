<script setup>
import LoadingView from '@/components/LoadingView.vue';
// import HelloWorld from '@/components/HelloWorld.vue';
// import SelfHelloWorld from '../components/HelloWorld.vue';
// import { useAppStore } from '@/sotre/models/app';

// import { useRoute } from 'vue-router';
import { nextTick } from 'vue';

// let route = useRoute();
// console.log(unref(route.params), route, route.params.code);
nextTick(() => {
  console.log('页面加载完啦~');
});

// const props = defineProps({
//   code: {
//     type: String,
//     required: true
//   }
// });
// console.log(props.code);
</script>
<template>
  <LoadingView>
    <!-- <div>这里自定义loading内容</div> -->
  </LoadingView>
  <main>
    <div class="section">
      page1
      <a href="https://vitejs.dev" target="_blank">
        <img src="/img/logo.jpg" class="logo" alt="Vite logo" />
      </a>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </div>
      <HelloWorld msg="Vite + Vue" />
      <div>
        <h3 class="cosling">以下是模板自有组件</h3>
      </div>
      <SelfHelloWorld msg="港湾邀请函" />
    </div>
    <div class="section">page2</div>
    <div class="section">page3</div>
    <div class="section">page4</div>
    <div class="section">page5</div>
  </main>
</template>
