<template>
  <div class="bigBox">
    <h2>系统概览</h2>
    <div class="box">
      <div>
        <i class="el-icon-s-order"></i>
        <div>
          <p>设备总数</p>
          <h2>7128</h2>
        </div>
      </div>
      <div>
        <i class="el-icon-s-data"></i>
        <div>
          <p>设备总金额</p>
          <h2>1254800</h2>
        </div>
      </div>
    </div>
    <div class="echarts">
      <div id="circle"></div>
      <div id="pillar"></div>
    </div>
  </div>
</template>
<script>
import Circle from "../echart/circle.js";
import Pillar from "../echart/pillar.js";
export default {
  data() {
    return {};
  },
  mounted() {
    Circle();
    Pillar();
  },
};
</script>
<style lang="less" scoped>
.bigBox:-webkit-scrollbar {
  display: none;
}
.bigBox {
  width: 100%;
  height: 100%;
  h2 {
    font-size: 24px;
    color: #999;
    line-height: 70px;
  }
  .box {
    margin: 20px 0;
    display: flex;
    align-items: center;
    & > div {
      padding: 15px;
      margin-right: 20px;
      display: flex;
      align-items: center;
      font-size: 26px;
      text-align: center;
      border-radius: 5px;
      div {
        margin-left: 10px;
        p {
          font-size: 12px;
        }
      }
    }
    & > div:first-child {
      color: #ab7df6;
      background: rgba(171, 125, 246, 0.2);
    }
    & > div:last-child {
      color: #81c926;
      background: rgba(129, 201, 38, 0.2);
    }
  }
  .echarts {
    height: 420px;
    display: flex;
    align-items: center;
    margin-top: 20px;
    padding-bottom: 20px;
    & > div {
      height: 100%;
      background: #f3f3f3;
      border-radius: 5px;
    }
    & > div:first-child {
      width: 400px;
    }
    & > div:last-child {
      width: 626px;
      margin-left: 20px;
    }
  }
}
</style>