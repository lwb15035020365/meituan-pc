<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团" />
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            placeholder="搜索商家或地点"
            v-model="searchWord"
            @focus="focusInput"
            @blur="blurInput"
            @input="input"
          ></el-input>
          <el-button type="primary" icon="el-icon-search"></el-button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, index) in hotPlaceList" :key="index">{{item}}</dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item, index) in searchList" :key="index">{{item}}</dd>
          </dl>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api/index.js'
export default {
  data() {
    return {
      searchWord: "",
      hotPlaceList: [],
      searchList: [],
      isFocus: false
    };
  },
  created() {
    api.searchHotWords().then(res => {
      // console.log(res.data.data);
      this.hotPlaceList = res.data.data;
    })
  },
  computed: {
    isHotPlace() {
      return !this.searchWord && this.isFocus;
    },
    isSearchList() {
      return this.searchWord && this.isFocus;
    }
  },
  methods: {
    focusInput() {
      this.isFocus = true;
    },
    blurInput() {
      setTimeout(() => {
        this.isFocus = false;
      }, 200);
    },
    input() {
      let val = this.searchWord;
      api.getSearchList().then(res => {
        console.log(res.data.data.list);
        this.searchList = res.data.data.list.filter((item, index) => {
          return item.indexOf(val) > -1;
        })
      })
    }
  }
};
</script>

<style>
</style>
