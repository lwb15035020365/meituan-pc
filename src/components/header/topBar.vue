<template>
  <el-row class="m-header-topbar m-header">
      <el-col :span='10'>
          <geo />
      </el-col>
      <el-col :span='14'>
          <m-nav />
      </el-col>
  </el-row>
</template>

<script>
import geo from './geo'
import mNav from './nav'
export default {
    components: {
        geo,
        mNav
    }
}
</script>

<style>

</style>