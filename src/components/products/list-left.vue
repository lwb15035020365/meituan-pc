<template>
  <div class="list-left">
      <h4>猜你喜欢</h4>
      <ul class="list">
          <li v-for="(item, index) in list" :key="index">
              <!-- <img :src="item.imgUrl" alt=""> -->
              <img src="https://p0.meituan.net//bbia/3e36af692ce40ea56575b7c19dc3581c464792.png@188w_106h_1e_1c" alt="">
              <p class="pro">{{item.title}}</p>
              <span class="pos">{{item.areaName}}</span>
              <span class="price_ico">￥</span><span class="price_num">{{item.lowPrice}}</span>
          </li>
         
      </ul>
  </div>
</template>

<script>
import api from '@/api/index.js'
export default {
    data() {
        return {
            list:[],
        }
    },
    created() {
        api.recommend().then(res => {
            console.log(res.data.data);
            this.list = res.data.data;
        })
    }
}
</script>

<style>

</style>