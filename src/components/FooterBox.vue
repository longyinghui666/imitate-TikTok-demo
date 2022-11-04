<script setup>
import { ref, reactive, onMounted } from 'vue';
import wx from 'weixin-js-sdk';
import '../assets/icon/iconfont.css';
import bus from '@/bus';

// 接收PageMain组件传参
bus.$on('closeShow2', val => {
  isShow2.value = val;
});

let iii = ref(1);
let o = ref(1);
let p = ref(0);
let clicktime = ref(0);
let isShow2 = ref();
let likenum = ref(0);
let sureinputblessing = ref(false);
let sureinputname = ref(false);
let surepresenter = ref(false);
let suregift = ref(false);
let lesseight = ref(false);
let isgift = ref(false);
let thelike = ref(false);
let thegift = ref(false);
let input = ref(false);
let buysure = ref(false);
let closebarrage = ref(false);
let barragelistDom = ref(null);
let giftDom = ref(null);
let thechoosegift = ref('火箭');
let presenter = ref();
let yourname = ref();
let yourblessing = ref();
let giftlist = reactive({
  data: [
    { gift: '1跑车', id: '1' },
    { gift: '2跑车', id: '2' },
    { gift: '3跑车', id: '3' },
    { gift: '4跑车', id: '4' },
    { gift: '5跑车', id: '5' },
    { gift: '6跑车', id: '6' },
    { gift: '7跑车', id: '7' },
    { gift: '8跑车', id: '8' }
  ]
});
// 赠送礼物数组
let gifts = reactive({
  data: [
    // { presenter: '老六', gift: '跑车' }
  ]
});
// 用于展示礼物的数组,因为每次只展示一条礼物，数组里保存一个对象
let showgifts = reactive({ data: [] });

onMounted(() => {
  console.log(reversebarrage.value);
});
// 点赞功能
function like() {
  thelike.value = true;
  if (thelike.value == true && clicktime.value == 0) {
    likenum.value++;
    clicktime.value++;
  }
}

// -----------弹幕-----------------------------------------------------------------------------------------------
// 原弹幕数组
let updatebarrage = reactive({
  data: [
    { name: '老王', wish: '发来贺电' },
    { name: '老六', wish: '666我的宝贝' },
    { name: '司马大', wish: '芜湖起飞' }
  ]
});
// 用于反转的弹幕数组
let reversebarrage = ref();
// 因为滚动弹幕用了flex的column-reverse反向布局，所以要把原弹幕数组反转
reversebarrage.value = updatebarrage.data.reverse();

// 弹幕滚动原理：两个定时器控制（弹幕上移+弹幕替换）

// 弹幕上移:降低第一条透明度，最后一条弹幕高度从0开始增加并把第一条顶上去
setInterval(function () {
  if (p.value == 22) {
    p.value = 22;
  } else {
    p.value++;
  }
  if (o.value < 0.5) {
    o.value = 0.5;
  } else {
    o.value = o.value - 0.006;
  }
  if (reversebarrage.value.length === 1) {
    o.value = 0.7;
  }
  if (reversebarrage.value.length <= 4) {
    barragelistDom.value.children[reversebarrage.value.length - 1].style.opacity = o.value;
    barragelistDom.value.children[0].style.height = 0 + 'px';
    barragelistDom.value.children[0].style.height = p.value + 'px';
  }
  if (reversebarrage.value.length > 4) {
    barragelistDom.value.children[3].style.opacity = o.value;
    barragelistDom.value.children[4].style.opacity = 0.2;
    barragelistDom.value.children[0].style.height = 0 + 'px';
    barragelistDom.value.children[0].style.height = p.value + 'px';
  }
}, 10);
// 弹幕替换：操纵反转后倒序的弹幕数组
setInterval(function () {
  if (reversebarrage.value.length !== 1) {
    p.value = 0;
    let num = reversebarrage.value[reversebarrage.value.length - 1];
    reversebarrage.value.pop();
    reversebarrage.value.unshift(num);
    o.value = 1;
  }
}, 4000);
// -------------------------------------------------------------------------------------------------------
// 弹幕编辑确认按钮
function blessing() {
  if (yourname.value.value.length == 0) {
    sureinputname.value = !sureinputname.value;
  } else {
    if (yourblessing.value.value.length == 0) {
      sureinputblessing.value = !sureinputblessing.value;
    }
  }
  if (yourname.value.value.length > 0 && yourblessing.value.value.length > 0) {
    input.value = !input.value;
    iii.value = 0;
    if (iii.value === 0) {
      barragelistDom.value.children[reversebarrage.value.length - 1].style.opacity = 1;
    } else {
      iii.value = 1;
    }
    reversebarrage.value.unshift({ name: yourname.value.value, wish: yourblessing.value.value });
  }
}
// 确认赠送礼物按钮
function sendbutton() {
  if (presenter.value.value.length == 0) {
    surepresenter.value = !surepresenter.value;
  } else if (presenter.value.value.length > 8) {
    lesseight.value = !lesseight.value;
  } else if (giftDom.value.choose.value === '') {
    suregift.value = !suregift.value;
  }

  if (presenter.value.value.length > 0 && presenter.value.value.length <= 8 && giftDom.value.choose.value != '') buysure.value = !buysure.value;
  thechoosegift.value = giftDom.value.choose.value;
}
// 购买确认
function surebuyit() {
  buysure.value = !buysure.value;
  gifts.data.push({ presenter: presenter.value.value, gift: giftDom.value.choose.value });
  isgift.value = true;
  thegift.value = !thegift.value;
}
// 礼物展示循环
setInterval(function () {
  if (isgift.value === true) {
    gifts.data.push(gifts.data[0]);
    gifts.data.shift(0);
    showgifts.data.shift(0);
    showgifts.data.push(gifts.data[0]);
  }
}, 4000);
// 分享
function shareTo() {
  wx.miniProgram.getEnv(res => {
    console.log(res);
  });
  console.log(wx.miniProgram);
  wx.miniProgram.navigateTo({
    url: '/packageB/share_timeline/share_timeline?xitieid=1002 &idcode=hjhgjhhjg &imgO=555 &guestname=0'
  });
}
// 弹幕编辑开关
function inputbarrage() {
  input.value = !input.value;
}
// 礼物赠送开关
function gift() {
  thegift.value = !thegift.value;
}
function closesurepresenter() {
  surepresenter.value = !surepresenter.value;
}
function closesuregift() {
  suregift.value = !suregift.value;
}
function closesureinputname() {
  sureinputname.value = !sureinputname.value;
}
function closesureinputblessing() {
  sureinputblessing.value = !sureinputblessing.value;
}
function closebuysure() {
  buysure.value = !buysure.value;
}
function closeslesseight() {
  lesseight.value = !lesseight.value;
}
// 弹幕列表开关
function barragehide(e) {
  closebarrage.value = !closebarrage.value;
  e.stopPropagation();
}

// 阻止冒泡
function thesendbox(e) {
  e.stopPropagation();
}
function inputbox(e) {
  e.stopPropagation();
}
function thebuysurebox(e) {
  e.stopPropagation();
}
const stopP = event => {
  console.log(2222);
  event.stopPropagation();
};
</script>

<template>
  <!-- 编辑弹幕 -->
  <div v-if="input" class="topinput" @click="inputbarrage">
    <div class="inputbox" @click="inputbox">
      <text>请写下你的祝福</text>
      <span class="iconfont" @click="inputbarrage">&#xe725;</span>
      <input ref="yourname" type="text" placeholder="输入你的名字" maxlength="8" />
      <input ref="yourblessing" type="text" placeholder="写下你的祝福" maxlength="30" />
      <button @click="blessing">确认</button>
    </div>
  </div>
  <!-- 输入不为空提示框 -->
  <div v-if="sureinputname" class="sureinput" @click="closesureinputname">
    <div class="sureinputbox">
      <text>请输入你的名字</text>
      <button>确认</button>
    </div>
  </div>
  <div v-if="sureinputblessing" class="sureinput" @click="closesureinputblessing">
    <div class="sureinputbox">
      <text>请写下你的祝福</text>
      <button>确认</button>
    </div>
  </div>
  <!-- 赠送礼物列表 -->
  <div v-if="thegift" class="sendgiftbox" @click="gift">
    <div class="sendbox" @click="thesendbox">
      <div class="giftinput">
        <input ref="presenter" type="text" placeholder="赠送人" maxlength="8" />
      </div>
      <form ref="giftDom" class="thegiftbox">
        <div v-for="item in giftlist.data" :key="item.index" class="giftin" @click="choosegift">
          <label>
            <div></div>
            <p>{{ item.gift }}</p>
            <!-- input用作礼物选择 -->
            <input type="radio" :value="item.gift" name="choose" />
          </label>
        </div>
      </form>
      <button @click="sendbutton">赠送礼物</button>
    </div>
  </div>
  <!-- 确认输入赠送人不为空 -->
  <div v-if="surepresenter" class="sureinput" @click="closesurepresenter">
    <div class="sureinputbox">
      <text>请输入赠送人名字</text>
      <button>确认</button>
    </div>
  </div>
  <div v-if="lesseight" class="sureinput" @click="closeslesseight">
    <div class="sureinputbox">
      <text>名字在8个字以内哦~</text>
      <button>确认</button>
    </div>
  </div>
  <!-- 确认选择礼物 -->
  <div v-if="suregift" class="sureinput" @click="closesuregift">
    <div class="sureinputbox">
      <text>请选择礼物</text>
      <button>确认</button>
    </div>
  </div>
  <!-- 礼物购买确认 -->
  <div v-show="buysure" class="buysure" @click="closebuysure">
    <div class="buysurebox" @click="thebuysurebox">
      <div class="thechoose">
        <div></div>
        <p>{{ thechoosegift }}</p>
      </div>
      <button @click="surebuyit">确认购买</button>
    </div>
  </div>
  <div v-show="isShow2" class="all" @click="stopP">
    <!-- flex倒序排列 -->
    <div class="sharebox">
      <button class="sharebutton" @click="shareTo">分享我的作品</button>
    </div>
    <div class="bottomDiv">
      <div class="bottominput" @click="inputbarrage">
        <text>写下你的祝福...</text>
        <span class="iconfont">&#xe624;</span>
        <span v-if="!closebarrage" id="close" class="iconfont" @click="barragehide">&#xe615;</span>
        <span v-if="closebarrage" id="open" class="iconfont" @click="barragehide">&#xe614;</span>
      </div>
      <div class="bottomgift" @click="gift"><span class="iconfont">&#xe63c;</span></div>
      <!-- 点赞 -->
      <div class="bottomlike" @click="like">
        <span class="iconfont">&#xe619;</span>
        <div v-show="thelike" class="likenum">{{ likenum }}</div>
      </div>
    </div>
    <!-- 礼物展示 -->
    <div v-for="item in showgifts.data" :key="item.index" class="giftbox">
      <div>{{ item.presenter }}</div>
      <text>送出 {{ item.gift }}</text>
      <div class="gifticon"></div>
    </div>
  </div>

  <!-- 弹幕滚动 -->
  <div v-show="isShow2" class="barragebox">
    <div v-show="!closebarrage" ref="barragelistDom" class="barragelist">
      <div v-for="item in reversebarrage" :key="item.index" class="barrageone">
        <text>{{ item.name }}:{{ item.wish }}</text>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.all {
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  height: auto;
  width: 100%;
  bottom: 0%;
}
.topinput {
  height: 100%;
  width: 100%;
  background-color: rgba(128, 128, 128, 50%);
  position: fixed;
  top: 0%;
  z-index: 5000;
  .inputbox {
    height: 38%;
    width: 100%;
    background-color: azure;
    display: flex;
    align-items: center;
    flex-direction: column;
    animation: be 0.5s;
    @keyframes be {
      from {
        opacity: 0;
        transform: translateY(-200px);
      }
    }
    span {
      position: absolute;
      top: 25px;
      right: 25px;
      font-size: 26px;
    }
    text {
      font-size: large;
      margin-top: 50px;
    }
    input {
      margin-top: 20px;
      box-sizing: border-box;
      font-size: 10px;
      height: 30px;
      border-radius: 4px;
      border: 1px solid #c8cccf;
      color: #6a6f77;
      display: block;
      outline: 0;
      text-decoration: none;
      width: 70%;
    }
    button {
      margin-top: 20px;
      width: 70%;
      border: none;
      height: 30px;
      text-align: center;
    }
  }
}
.bottomDiv {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: auto;
  margin: 5px 0;
}
.bottominput {
  margin: 0 5px;
  position: relative;
  height: 30px;
  width: 70%;
  background-color: rgba(0, 0, 0, 50%);
  border-radius: 7px;
  line-height: 30px;
  text {
    margin-left: 10px;
    color: white;
    font-size: small;
  }
  #close {
    position: absolute;
    right: 15%;
    color: white;
    font-size: 27px;
    line-height: 30px;
    z-index: 6000;
    // display: none;
  }
  #open {
    position: absolute;
    right: 15%;
    color: white;
    font-size: 27px;
    line-height: 30px;
    z-index: 6000;
  }
  span {
    position: absolute;
    right: 4%;
    color: white;
  }
}
.bottomgift {
  height: 33px;
  width: 33px;
  background-color: palevioletred;
  animation: tiao 2s linear infinite;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  .iconfont {
    color: azure;
    font-size: 20px;
  }
}
@keyframes tiao {
  0% {
    transform: translateY(0px);
  }
  10% {
    transform: translateY(-10px);
  }
  20% {
    transform: translateY(0px);
  }
  30% {
    transform: translateY(-10px);
  }
  40% {
    transform: translateY(0px);
  }
}
.bottomlike {
  height: 33px;
  width: 33px;
  background-color: palevioletred;
  margin-right: 20px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  display: flex;
  position: relative;
  .iconfont {
    font-size: 23px;
    color: white;
  }
  .likenum {
    height: 17px;
    width: 17px;
    border-radius: 20px;
    background-color: orange;
    position: absolute;
    top: -11%;
    right: -23%;
    font-size: xx-small;
    line-height: 17px;
    text-align: center;
    color: beige;
  }
}
.bottomlike:active {
  animation: change 1s ease-in;
}
@keyframes change {
  from {
    scale: 0.9;
    opacity: 0.9;
  }
}
// 分享
.sharebox {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 15px;
}
.sharebutton {
  width: 50%;
  height: 30px;
  background-color: palevioletred;
  border-radius: 20px;
  color: azure;
  border: none;
}
// 弹幕
.barragebox {
  width: auto;
  height: 125px;
  overflow: hidden;
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  pointer-events: none;
  position: relative;
  bottom: 85px;
}
.barragelist {
  display: flex;
  flex-direction: column-reverse;
  position: absolute;
  height: auto;
  width: auto;
  overflow: hidden;
}
.barrageone {
  height: 22px;
  width: fit-content;
  background-color: rgba(128, 128, 128, 25%);
  padding: 0 7px;
  line-height: 22px;
  margin: 5px 5px;
  border-radius: 7px;
  font-size: small;
  overflow: hidden;
}
.barrageone :first-child {
  opacity: 0.9;
  margin-bottom: 0;
}

// 礼物
.giftbox {
  position: absolute;
  width: 180px;
  height: 50px;
  right: 2%;
  bottom: 160px;
  background: linear-gradient(to right, rgba(231, 101, 26, 30%) 3%, rgba(231, 101, 26, 80%) 100%);
  border-radius: 7px;
  color: whitesmoke;
  animation: tanchu 4s linear infinite;
  animation-delay: 0;
  z-index: 9999;
  @keyframes tanchu {
    from {
      transform: translateX(200px);
      opacity: 0;
    }
    10% {
      transform: translateX(0);
      opacity: 1;
    }
    70% {
      transform: translateX(0);
      opacity: 1;
    }
    90% {
      transform: translateX(200px);
      opacity: 0;
    }
    to {
      transform: translateX(-200px);
      opacity: 0;
    }
  }
  div {
    margin: 2px 6px;
  }
  text {
    margin: 1px 6px;
    font-size: xx-small;
    color: beige;
  }
  .gifticon {
    position: absolute;
    height: 80px;
    width: 40px;
    right: -5%;
    top: -32%;
  }
}
// 礼物赠送
.sendgiftbox {
  height: 100%;
  width: 100%;
  background-color: rgba(128, 128, 128, 60%);
  position: fixed;
  top: 0;
  z-index: 5000;
  .sendbox {
    height: 50%;
    width: 100%;
    background-color: white;
    top: 0;
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    animation: be 0.5s;
    .giftinput {
      width: 100%;
      height: 16%;
      background-color: palevioletred;
      input {
        margin: 12px auto;
        box-sizing: border-box;
        font-size: 10px;
        height: 50%;
        border-radius: 4px;
        border: 1px solid #c8cccf;
        color: #6a6f77;
        display: block;
        outline: 0;
        text-decoration: none;
        width: 70%;
      }
    }

    .thegiftbox {
      height: 70%;
      width: 100%;
      background-color: white;
      display: grid;
      grid-template-rows: 45% 45%;
      grid-template-columns: 23% 23% 23% 23%;
      grid-row-gap: 5px;
      grid-column-gap: 5px;
      justify-content: center;
      align-content: center;
      justify-items: center;
      .giftin:hover {
        width: 100%;
        height: 100%;
        border: red 2px solid;
        border-radius: 8px;
      }
      .giftin {
        height: 100%;
        width: 100%;
        div {
          height: 50%;
          width: 80%;
          background-color: blue;
          margin: 10px auto;
        }
        // 隐藏radio
        input {
          display: none;
        }
        p {
          height: auto;
          width: 100%;
          margin: 0 auto;
          text-align: center;
        }
      }
    }
    button {
      margin-top: 10px;
      width: 70%;
      border: none;
      height: 30px;
      text-align: center;
      background-color: palevioletred;
      color: #c8cccf;
    }
  }
}
.buysure {
  height: 100%;
  width: 100%;
  background-color: rgba(128, 128, 128, 60%);
  z-index: 9999;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buysurebox {
  height: 300px;
  width: 300px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: z 0.1s linear;
  @keyframes z {
    from {
      transform: scale(0.8);
      opacity: 0.1;
    }
  }
  .thechoose {
    height: 60%;
    width: 50%;
    background-color: aqua;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div {
      height: 50%;
      width: 80%;
      background-color: blue;
      margin: 10px auto;
    }
    p {
      height: auto;
      width: 100%;
      margin: 0 auto;
      text-align: center;
    }
  }
  button {
    margin-top: 10px;
    width: 70%;
    border: none;
    height: 30px;
    text-align: center;
    background-color: palevioletred;
    color: #c8cccf;
  }
}
.sureinput {
  height: 100%;
  width: 100%;
  background-color: rgba(128, 128, 128, 60%);
  text-align: center;
  line-height: 200px;
  z-index: 9999;
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .sureinputbox {
    height: 200px;
    width: 300px;
    background-color: azure;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    animation: z 0.1s linear;
    text {
      line-height: 100px;
    }
    button {
      width: 50%;
      border: none;
      height: 30px;
      text-align: center;
      background-color: palevioletred;
      color: #c8cccf;
    }
  }
}
</style>
