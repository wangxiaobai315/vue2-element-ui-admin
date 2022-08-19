<template>
  <div class="box">
    <h2>设备登记详情</h2>
    <div>
      <div class="con">
        <div class="title">
          <span>设备编号:</span><span>{{ obj.number }}</span>
        </div>
        <div>
          <p>
            <span>设备名称:</span><span>{{ obj.name }}</span>
          </p>
          <p>
            <span>设备状态:</span
            ><span>{{ obj.flag ? "已审核" : "未审核" }}</span>
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
      <el-button @click="closeFn">返回列表</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      obj: {},
    };
  },
  methods: {
    closeFn() {
      this.$router.back();
    },
  },
  created() {
    this.obj = this.$route.query.s;
    console.log(this.obj);
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