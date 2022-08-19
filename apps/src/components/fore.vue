<template>
  <div class="box">
    <h2>系统字典</h2>
    <div>
      <el-tabs type="border-card">
        <el-tab-pane label="未入库设备状态">
          <el-table :data="tableData1" style="width: 100%">
            <el-table-column prop="number" label="编号" align="center">
            </el-table-column>
            <el-table-column prop="name" label="名称" align="center">
            </el-table-column>
            <el-table-column prop="color" label="颜色" align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已入库设备状态">
          <el-table :data="tableData2" style="width: 100%">
            <el-table-column prop="number" label="编号" align="center">
            </el-table-column>
            <el-table-column prop="name" label="名称" align="center">
            </el-table-column>
            <el-table-column prop="color" label="颜色" align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="设备分类">
          <el-table :data="tableData3" style="width: 100%">
            <el-table-column prop="number" label="编号" align="center">
            </el-table-column>
            <el-table-column prop="name" label="名称" align="center">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData1: [
        {
          number: "STATUS2",
          name: "已审核",
          color: "#000",
        },
        {
          number: "STATUS1",
          name: "未审核",
          color: "red",
        },
      ],
      tableData2: [
        {
          number: "STATUS3",
          name: "使用中",
          color: "#198900",
        },
        {
          number: "STATUS4",
          name: "123",
          color: "#ccc",
        },
        {
          number: "STATUS5",
          name: "闲置中",
          color: "#67c23b",
        },
        {
          number: "STATUS6",
          name: "报废中143322",
          color: "red",
        },
      ],
      tableData3: [
        { number: "CATE1", name: "房屋及构筑物" },
        { number: "CATE2", name: "仪器仪表" },
        { number: "CATE3", name: "行政办公设备" },
        { number: "CATE4", name: "文物及陈列品" },
        { number: "CATE5", name: "卫生医疗器械" },
        { number: "CATE6", name: "工具、量具及器皿" },
        { number: "CATE7", name: "文体设备" },
        { number: "CATE8", name: "机电设备" },
        { number: "CATE9", name: "图书2" },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.box {
  height: 100%;
  overflow: scroll;
  h2 {
    font-size: 24px;
    color: #999;
    line-height: 70px;
  }
}
.box::-webkit-scrollbar {
  display: none;
}
</style>