<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { nextTick } from 'vue';
import bus from '@/bus';
import LoadingView from '@/components/LoadingView.vue';

nextTick(() => {
  console.log('页面加载完啦~');
});

const automaticscroll = ref(true);

const mainbox = ref();
let main = ref();
let i = ref(0);
const scrollvalue = ref(0);
const scrollstate = ref(0);
const scrolldirection = ref(0); // 滚动方向 0下，1上
const scrollevn = ref(null);
let tuone = ref(false);
let invitationtu = ref(false);
let mantou = ref(false);
let marriedboxtu = ref(false);
let hallotext = ref('“Hello，这是一封心意满满婚礼邀请函”');
let musicname = ref('Cannot Stop Love');
let musicinformation = ref('正在播放歌曲...');
const wedint = ref('WEDDING INVITATION');
const datawed = ref('2025/5/20');
const gettext = ref('We are getting married');
const mengxiang = ref('你是我的所有渴望的梦想');
const invitationtext = ref('invitation');
const mintext = ref('"hello"');
const mintextpartone = ref('如今我们决定于\n 2025.5.20 \n开启人生的新篇章\n让爱以夫妻之名延续\n在这特殊的一天\n希望有你的见证\n期待有你的参与');
const yiqi = ref('新郎 满满♥美美 新娘');
const marriedboxwenzi = ref('Were getting married');
const chuti = ref('☞ 婚 礼 时 间 ☜');
const wenben = ref('2025年05月20日\n星期日\n11:58AM');
const chutip = ref('☞ 婚 宴 地 址 ☜');
const wenbenp = ref('青岛涵碧楼大酒店');
const chutid = ref('☞ 交通 | 导航 | 地图 ☜');
const wenbend = ref('青岛市黄岛区S399(东环岛路)');
const yitiaowenben = ref('"I love you three thousand times."');
const chutig = ref('☞ 婚 礼 流 程& ☜');
const wenbenl = ref('青岛市黄岛区S399(东环岛路)');

onMounted(() => {
  if (automaticscroll.value) {
    scrollstate.value = 1; // 开启自动滚动开关
    zbc();
    main.value.addEventListener('scroll', handleScroll);
  }
});

function handleScroll() {
  var scrollA = main.value.scrollTop;
  if (scrollevn.value != null) {
    clearTimeout(scrollevn.value);
    // console.log('正在滚动');
    i.value = scrollA;
    // console.log(scrollA < scrollvalue.value);
    if (scrollA < scrollvalue.value) {
      // console.log('下');
      scrolldirection.value = 0;
    }
    if (scrollA > scrollvalue.value) {
      // console.log('上');
      scrolldirection.value = 1;
    }
  }
  scrollevn.value = setTimeout(() => {
    if (scrolldirection.value) {
      //如果是上的话，就启动自动滚动开关
      // console.log('开启');
      if (!scrollstate.value) {
        zbc();
      }
      scrollstate.value = 1;
    }
    if (!scrolldirection.value) {
      //如果是下的话，就关闭自动滚动开关
      // console.log('关闭');
      scrollstate.value = 0;
    }
  }, 20);

  scrollvalue.value = scrollA;
  if (scrollA > 300) {
    tuone.value = true;
  }
  if (scrollA > 500) {
    invitationtu.value = true;
  }
  if (scrollA > 1300) {
    mantou.value = true;
  }
  if (scrollA > 1900) {
    marriedboxtu.value = true;
  }
  if (scrollA > 2700) {
    // 传值给FooterBox
    // clearInterval(this.timer);
    bus.$emit('closeShow2', false);
  } else {
    bus.$emit('closeShow2', true);
  }
}

function zbc() {
  let timer = setInterval(function () {
    if (!scrollstate.value) {
      // console.log('停止');
      clearInterval(timer);
    }
    main.value.scrollTo(0, i.value);
    i.value = i.value + 0.4;
    // 滚动的距离
    // console.log(i.value);
    if (i.value > 2800) {
      clearInterval(timer);
    }
  }, 10);
}
</script>
<template>
  <!-- 加载动画组件 -->
  <LoadingView></LoadingView>
  <main ref="main">
    <div ref="mainbox" class="main">
      <div class="toutu">
        <img />
      </div>
      <div class="hallotext">{{ hallotext }}</div>
      <div class="xing"></div>
      <div class="jiantou">↓</div>
      <div class="music">
        <div class="musicnamebox">
          <text class="musicname">{{ musicname }}</text>
          <text class="musicinformation">{{ musicinformation }}</text>
        </div>
        <div class="musictwo"></div>
        <div class="musicthr"><img src="./assets/QQ图片20220911225724.jpg" /></div>
      </div>

      <div class="musicnametxt">音乐已经自动播放无需点击（是装饰哦）~</div>

      <div class="xian">______________________</div>

      <div class="wedint">{{ wedint }}</div>

      <div class="xing"></div>

      <div class="datawed">{{ datawed }}</div>

      <div class="gettmarried"></div>
      <div class="gettext">{{ gettext }}</div>

      <div class="mengxiang">{{ mengxiang }}</div>

      <div class="tuonebox">
        <div v-show="tuone" class="tuone">
          <img />
        </div>
      </div>

      <div class="jiantou">↓</div>

      <div class="invitation">
        <div class="invitationtextbox">
          <div class="invitationtext">{{ invitationtext }}</div>
          <div class="invitationtextxiao"></div>
        </div>
        <div class="invitationtubox">
          <div v-show="invitationtu" class="invitationtu"></div>
        </div>
      </div>

      <div class="mintext">{{ mintext }}</div>

      <div class="mintextpart">
        {{ mintextpartone }}
      </div>

      <div class="invitationtwo">
        <div class="zuoshang"></div>
        <div class="jiantouboxone"><div class="jiantou">↓</div></div>

        <div class="invitwo">
          <div class="invitationtext">invitation</div>
          <div class="invitationtextxiao"></div>
        </div>
      </div>

      <div class="mantoubox">
        <div v-show="mantou" class="mantou"></div>
      </div>

      <div class="yiqi">{{ yiqi }}</div>

      <div class="mantoubox">
        <div v-show="mantou" class="mantou"></div>
      </div>

      <div class="marriedbox">
        <div class="backgruand"></div>
        <div class="marriedboxtubox">
          <div v-show="marriedboxtu" class="marriedboxtu"></div>
        </div>
        <div class="marriedboxwenzi">{{ marriedboxwenzi }}</div>
      </div>

      <div class="chuti">{{ chuti }}</div>

      <div class="wenben">
        {{ wenben }}
      </div>

      <div class="chuti">{{ chutip }}</div>

      <div class="wenben">
        {{ wenbenp }}
        <br />
      </div>

      <div class="chuti">{{ chutid }}</div>

      <div class="wenben">{{ wenbend }}</div>

      <div class="amap"></div>

      <div class="yitiao">
        <text class="yitiaowenben">{{ yitiaowenben }}</text>
      </div>

      <div class="chuti">{{ chutig }}</div>

      <div class="wenben">{{ wenbenl }}</div>

      <div class="jiantou">↓</div>

      <div class="liuxia">(留下你的联系方式吧~)</div>

      <div class="form">
        <div class="formstlye">Name:</div>
        <input
          type="text"
          placeholder="姓名"
          maxlength="12"
          style="font-family: 微软雅黑; font-size: 14px; color: rgb(110, 110, 110); opacity: 1"
          class="forminput"
        />
        <div class="formstlye">Telephone&nbsp;number：</div>
        <input
          type="text"
          placeholder="手机"
          maxlength="12"
          style="font-family: 微软雅黑; font-size: 14px; color: rgb(110, 110, 110); opacity: 1"
          class="forminput"
        />
        <div class="formstlye">Attendance：</div>
        <input
          type="text"
          placeholder="吃席人数"
          maxlength="12"
          style="font-family: 微软雅黑; font-size: 14px; color: rgb(110, 110, 110); opacity: 1"
          class="forminput"
        />
      </div>

      <button class="tijiao">提交</button>
    </div>
  </main>
</template>
