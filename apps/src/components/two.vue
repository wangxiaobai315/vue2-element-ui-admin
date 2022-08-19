<template>
  <div class="box">
    <div class="fl">
      <p>设备登记</p>
      <Search @putData="getSearch"></Search>
    </div>
    <div class="rt">
      <div class="top">
        <div class="top-l">
          <div @click="addFn">
            <i class="el-icon-circle-plus-outline"></i> 登记新设备
          </div>
        </div>
        <div class="top-r">
          <div><span>未审核</span> <span class="color1"></span></div>
          <div><span>已审核</span> <span class="color2"></span></div>
        </div>
      </div>
      <Table :arr="arr"></Table>
    </div>
  </div>
</template>
<script>
import Search from "../components/search.vue";
import Table from "../components/table.vue";
export default {
  data() {
    return {
      arr: [],
    };
  },
  components: {
    Search,
    Table,
  },
  methods: {
    getSearch(val) {
      this.arr = val;
    },
    addFn() {
      this.$router.push("/addPage");
    },
  },
};
</script>
<style lang="less" scoped>
.box {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  .fl {
    p {
      font-size: 24px;
      color: #666;
    }
  }
  .rt {
    width: 800px;
    .top {
      display: flex;
      justify-content: space-between;
      padding-right: 15px;
      .top-l {
        color: #409eff;
        font-size: 18px;
      }
      .top-r {
        display: flex;
        align-items: center;
        font-size: 16px;
        div {
          display: flex;
          align-items: center;
          margin-left: 10px;
          .color1,
          .color2 {
            width: 10px;
            height: 10px;
            margin-left: 5px;
          }
          .color1 {
            background: red;
          }
          .color2 {
            background: #000;
          }
        }
      }
    }
  }
}
</style>