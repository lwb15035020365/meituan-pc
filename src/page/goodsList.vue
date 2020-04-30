<template>
  <div class="page-product">
    <el-row class="m-crumbs">
      <crumbs />
    </el-row>
    <el-row>
      <el-col :span="19">
        <el-row>
          <categroy />
        </el-row>
        <el-row>
          <list />
        </el-row>
      </el-col>
      <el-col :span='5'>
        <left-list />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import crumbs from "@/components/products/crumbs.vue";
import Categroy from "@/components/products/categroy.vue";
import List from '@/components/products/list.vue'
import leftList from '@/components/products/list-left.vue'
export default {
  components: {
    crumbs,
    Categroy,
    List,
    leftList
  }
};
</script>

<style lang="less">
@import "~@/assets/css/products/index.less";
</style>