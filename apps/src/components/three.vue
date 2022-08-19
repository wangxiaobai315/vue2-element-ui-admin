<template>
  <div class="box">
    <div class="fl">
      <p>设备管理</p>
      <Search @putData="getSearch"></Search>
    </div>
    <div class="rt">
      <div class="top">
        <div><span>使用中</span><span class="color1 color"></span></div>
        <div><span>123</span><span class="color2 color"></span></div>
        <div><span>闲置中</span><span class="color3 color"></span></div>
        <div><span>报废中1433223</span><span class="color4 color"></span></div>
      </div>
      <Table :arr="arr"></Table>
    </div>
  </div>
</template>
<script>
import Search from "../components/search.vue";
import Table from "../components/table1.vue";
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
      padding-right: 15px;
      display: flex;
      justify-content: flex-end;
      div {
        display: flex;
        align-items: center;
        margin-left: 10px;
        font-size: 16px;
        .color {
          width: 10px;
          height: 10px;
          margin-left: 5px;
        }
        .color1 {
          background: #198900;
        }
        .color2 {
          background: #ccc;
        }
        .color3 {
          background: #67c23b;
        }
        .color4 {
          background: #ff0000;
        }
      }
    }
  }
}
</style>