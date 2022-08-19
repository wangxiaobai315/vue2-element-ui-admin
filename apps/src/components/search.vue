<template>
  <div class="searchBox" ref="search">
    <h2>设备检索</h2>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="设备编号">
        <el-input v-model="form.num"></el-input>
      </el-form-item>
      <el-form-item label="设备名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="设备状态">
        <div v-if="path == 2">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="未审核" value="未审核"></el-option>
            <el-option label="已审核" value="已审核"></el-option>
          </el-select>
        </div>
        <div v-else>
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="使用中" value="使用中"></el-option>
            <el-option label="123" value="123"></el-option>
            <el-option label="闲置中" value="闲置中"></el-option>
            <el-option label="报废中1433223" value="报废中1433223"></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="设备分类">
        <el-select v-model="form.type" placeholder="请选择">
          <el-option label="房屋及构筑物" value="房屋及构筑物"></el-option>
          <el-option label="仪器仪表" value="仪器仪表"></el-option>
          <el-option label="文体设备" value="文体设备"></el-option>
          <el-option label="文物及陈列品" value="文物及陈列品"></el-option>
          <el-option
            label="工具、量具及器皿"
            value="工具、量具及器皿"
          ></el-option>
          <el-option label="卫生医疗器械" value="卫生医疗器械"></el-option>
          <el-option label="机电设备" value="机电设备"></el-option>
          <el-option label="行政办公设备" value="行政办公设备"></el-option>
          <el-option label="图书2" value="图书2"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form>
  </div>
</template>
<script>
import request from "../api/index";
export default {
  name: "Search",
  data() {
    return {
      form: {
        num: "",
        name: "",
        region: "",
        type: "",
      },
      data: [],
      dsata1: [],
      searchCon: [],
      path: "",
    };
  },
  methods: {
    async ff() {
      let { data } = await request.get("/register");
      this.data = data;
    },
    async fs() {
      let { data } = await request.get("/manage");
      this.data1 = data;
    },
    onSubmit() {
      this.path == 2
        ? (this.searchCon = this.data)
        : (this.searchCon = this.data1);
      this.search1(
        this.form.num,
        this.form.name,
        this.form.region,
        this.form.type
      );
      this.$emit("putData", this.searchCon);
    },
    search1(nums, names, regions, types) {
      const that = this;
      nums &&
        (function () {
          const arr = that.searchCon.filter((el) => el.number == nums);
          that.searchCon = arr;
          console.log(arr);
        })();
      names &&
        (function () {
          const arr = that.searchCon.filter((el) => el.name == names);
          that.searchCon = arr;
          console.log(arr);
        })();
      if (this.path == "2") {
        regions &&
          (function () {
            const arr = that.searchCon.filter((el) => {
              el.flag = el.flag ? "已审核" : "未审核";
              return el.flag == regions;
            });
            arr.map((el) => (el.flag = el.flag == "已审核" ? true : false));
            that.searchCon = arr;
            console.log(arr);
          })();
      }
      if (this.path == "3") {
        regions &&
          (function () {
            const arr = that.searchCon.filter((el) => {
              if (regions == "使用中") {
                regions = 1;
              }
              if (regions == "123") {
                regions = 2;
              }
              if (regions == "闲置中") {
                regions = 3;
              }
              if (regions == "报废中1433223") {
                regions = 4;
              }
              return el.flag == regions;
            });
            that.searchCon = arr;
            console.log(arr);
          })();
      }
      types &&
        (function () {
          const arr = that.searchCon.filter((el) => el.type == types);
          that.searchCon = arr;
          console.log(arr);
        })();
    },
  },
  created() {
    this.ff();
    this.fs();
    this.path = location.hash.split("/")[1];
  },
};
</script>
<style lang="less" scoped>
.searchBox {
  width: 300px;
  padding: 15px 15px 30px;
  box-sizing: border-box;
  background: #f9f9f9;
  margin: 20px 0 20px 0;
  h2 {
    font-size: 18px;
    padding-left: 10px;
    border-left: 5px solid #1989fa;
    margin-bottom: 20px;
  }
  .el-button {
    width: 100%;
  }
}
</style>