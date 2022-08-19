<template>
  <div>
    <div class="count">
      <div class="con-l">
        <el-menu
          :class="!flag ? 'active' : ''"
          background-color="#2C405A"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="flag"
          :router="true"
        >
          <el-menu-item index="1">
            <i class="el-icon-menu"></i>
            <span slot="title">导航一</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-s-open"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="con-r">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Count",
  data() {
    return {
      value: false,
    };
  },
  computed: {
    ...mapState(["flag"]),
  },
};
</script>
<style lang="less" scoped>
.count {
  height: calc(100vh - 60px);
  display: flex;
  .el-menu {
    height: 100%;
  }
  .con-r {
    flex: 1;
    height: calc(100vh - 60px);
    padding: 15px;
    box-sizing: border-box;
    overflow: scroll;
  }
  .con-r::-webkit-scrollbar {
    display: none;
  }
}
.active {
  width: 180px;
}
</style>