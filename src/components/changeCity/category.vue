<template>
  <div class="category">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="(item, index) in list" :key="index">
        <a :href="'#city-' + item">{{item}}</a>
      </dd>
    </dl>
    <dl
      class="m-category-section"
      v-for="(item, index) in cityGroup"
      :key="index"
      :id="'city-' + index"
    >
      <dt>{{index}}</dt>
      <dd v-for="city in item" :key="city.id" @click="changeCity(city)">{{city.name}}</dd>
    </dl>
  </div>
</template>

<script>
import api from "@/api/index.js";
export default {
  data() {
    return {
      list: "ABCDEFGHIGKLMNOPQRSTUVWXYZ",
      cityList: [],
      cityGroup: {}
    };
  },
  created() {
      api.getCityList().then(res => {
          console.log(res.data.data);
          var obj = {};
          res.data.data.forEach((item, index) => {
              if(!obj[item.firstChar.toUpperCase()]) {
                  obj[item.firstChar.toUpperCase()] = [];
              }
              obj[item.firstChar.toUpperCase()].push(item);
          })
          this.cityGroup = obj;
          console.log(obj);
      })
  },
  method: {
      changeCity(item) {

      }
  }
};
</script>

<style lang='less'>
@import "~@/assets/css/changeCity/category.less";
</style>