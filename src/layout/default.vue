<template>
  <el-container class="layout-default">
    <el-header height>
      <my-header />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer height>
      <m-footer />
    </el-footer>
  </el-container>
</template>

<script>
import myHeader from "@/components/header/index.vue";
import mFooter from "@/components/footer/index.vue";
export default {
  components: {
    myHeader,
    mFooter
  }
};
</script>

<style lang='less'>
@import "~@/assets/css/public/layout.less";
</style>