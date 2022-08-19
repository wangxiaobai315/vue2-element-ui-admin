<template>
  <div class="box">
    <h2>设备登记编辑</h2>
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="设备名称">
          <el-input v-model="form.name"></el-input>
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
        <el-form-item label="设备数量">
          <el-input v-model="form.nums"></el-input>
        </el-form-item>
        <el-form-item label="设备单价">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="购置时间">
          <el-date-picker
            type="date"
            v-model="form.date"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="closeFn">返回列表</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import request from "../api/index";
export default {
  name: "",
  data() {
    return {
      form: {},
    };
  },
  methods: {
    onSubmit() {
      request.post("/edit", this.form);
      this.$message({
        message: "编辑成功",
        type: "success",
      });
    },
    closeFn() {
      this.$router.back();
    },
  },
  created() {
    const data = this.$route.query.con;
    this.form = data;
  },
};
</script>
<style lang="less" scoped>
.box {
  h2 {
    font-size: 24px;
    color: #666;
    line-height: 70px;
  }
  & > div {
    width: 290px;
  }
}
</style>