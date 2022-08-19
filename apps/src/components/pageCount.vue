<template>
  <div class="box">
    <h2>设备登记详情</h2>
    <div class="count">
      <div class="con">
        <div class="title">
          <span>设备编号:</span><span>{{ obj.number }}</span>
        </div>
        <div>
          <p>
            <span>设备名称:</span><span>{{ obj.name }}</span>
          </p>
          <p>
            <span>设备状态:</span>
            <span v-if="obj.flag == 1">使用中</span>
            <span v-if="obj.flag == 2">123</span>
            <span v-if="obj.flag == 3">闲置中</span>
            <span v-if="obj.flag == 4">报废中1433223</span>
          </p>
          <p>
            <span>设备分类:</span><span>{{ obj.type }}</span>
          </p>
          <p>
            <span>数量:</span><span>{{ obj.nums }}</span>
          </p>
          <p>
            <span>单价:</span><span>{{ obj.price }}</span>
          </p>
          <p>
            <span>购置日期:</span><span>{{ obj.date }}</span>
          </p>
        </div>
      </div>
      <div>
        <el-button type="primary" @click="putFn">更改状态</el-button>
        <el-button @click="closeFn">返回列表</el-button>
      </div>
    </div>
    <el-dialog
      title="设置状态"
      :visible.sync="dialogVisible"
      width="30%"
      modal="false"
    >
      <div>
        <span>选择状态: </span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import request from "../api/index";
export default {
  data() {
    return {
      obj: {},
      dialogVisible: false,
      options: [
        {
          value: "使用中",
          label: "使用中",
        },
        {
          value: "123",
          label: "123",
        },
        {
          value: "闲置中",
          label: "闲置中",
        },
        {
          value: "报废中1433223",
          label: "报废中1433223",
        },
      ],
      value: "",
    };
  },
  methods: {
    putFn() {
      this.dialogVisible = true;
    },
    closeFn() {
      this.$router.back();
    },
    subFn() {
      request.post("/putflag", { number: this.obj.number, value: this.value });
      this.dialogVisible = false;
      this.$router.push("/3");
    },
  },
  created() {
    this.obj = this.$route.query.s;
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
  .count {
    padding: 10px 20px;
    box-sizing: border-box;
    background: #f0f0f0;
    .con {
      font-size: 16px;
      margin-bottom: 15px;
      .title {
        padding-left: 15px;
        line-height: 70px;
        border-bottom: 1px solid #ccc;
      }
      p {
        padding-left: 15px;
        line-height: 50px;
      }
      span:first-child {
        display: inline-block;
        width: 70px;
        text-align: right;
        color: #b1b1b1;
        margin-right: 50px;
      }
    }
  }
}
</style>