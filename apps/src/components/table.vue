<template>
  <div>
    <el-table :data="tableData" style="width: 100%" ref="tables">
      <el-table-column label="设备编号" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="设备名称" width="80">
      </el-table-column>
      <el-table-column label="设备状态" width="90">
        <template slot-scope="scope">
          <div class="flags">
            <span>{{ scope.row.flag ? "已审核" : "未审核" }}</span>
            <div :class="scope.row.flag ? 'color2' : 'color1'"></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="设备分类" width="100">
      </el-table-column>
      <el-table-column prop="nums" label="设备数量" width="80">
      </el-table-column>
      <el-table-column prop="price" label="设备单价" width="80">
      </el-table-column>
      <el-table-column prop="date" label="购置时间" width="100">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="btns">
            <button @click="countFn(scope.row.number)">详情</button>
            <button
              v-if="scope.row.flag"
              class="btnColor"
              @click="StorageFn(scope.row.number)"
            >
              入库
            </button>
            <div v-else>
              <button class="btnColor" @click="editFn(scope.row.number)">
                编辑
              </button>
              <button class="btnColor" @click="auditFn(scope.row.number)">
                审核
              </button>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="num"
        layout="total, sizes, prev, pager, next, jumper"
        :total="lengths"
      >
      </el-pagination>
    </div>
    <!-- 入库确认弹框 -->
    <el-dialog :visible.sync="dialogVisible" width="30%">
      <span>您确定进行入库操作吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">暂不操作</el-button>
        <el-button type="primary" @click="addStorage">确定入库</el-button>
      </span>
    </el-dialog>
    <!-- 审核弹框 -->
    <el-dialog :visible.sync="show" width="30%">
      <span>您确定要将这条信息审核通过吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="show = false">暂不操作</el-button>
        <el-button type="primary" @click="auditOk">确定审核</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import request from "../api/index";
export default {
  name: "Table",
  props: ["arr"],
  data() {
    return {
      tableData: this.arr || [],
      num: 10,
      page: 1,
      lengths: 1,
      dialogVisible: false,
      obj: {},
      show: false,
      obj1: {},
    };
  },
  methods: {
    async fn() {
      let { data } = await request.get("/register");
      this.tableData = data.slice(
        (this.page - 1) * this.num,
        this.page * this.num
      );
      this.lengths = data.length;
    },
    //选择每页显示多少条数据
    handleSizeChange(val) {
      this.num = val;
      this.fn();
    },
    //当前的页码数
    handleCurrentChange(val) {
      this.fn();
      this.page = val;
    },
    //展示详情
    countFn(x) {
      const obg = this.tableData.find((el) => el.number == x);
      this.$router.push({ path: "/pageCon", query: { s: obg } });
    },
    //入库
    StorageFn(n) {
      this.dialogVisible = true;
      const obg = this.tableData.find((el) => el.number == n);
      this.obj = obg;
    },
    async addStorage() {
      let { data } = await request.post("/addManage", this.obj);
      this.dialogVisible = false;
      this.obj = "";
      this.fn();
      if (data.status == 200) {
        this.$message({
          message: "入库成功",
          type: "success",
        });
      }
    },
    //审核
    auditFn(val) {
      this.show = true;
      this.obj1 = val;
    },
    async auditOk() {
      let { data } = await request.post("/audit", this.obj1);
      this.show = false;
      this.obj1 = "";
      this.fn();
      if (data.status == 200) {
        this.$message({
          message: "审核通过",
          type: "success",
        });
      }
    },
    //编辑
    editFn(val) {
      const obj = this.tableData.find((el) => el.number == val);
      this.$router.push({ path: "/editPage", query: { con: obj } });
    },
  },
  created() {
    this.fn();
  },
  watch: {
    arr(newValue) {
      this.tableData = newValue.slice(
        (this.page - 1) * this.num,
        this.page * this.num
      );
      this.lengths = newValue.length;
    },
    num(newValue) {
      this.num = newValue;
      this.arr();
    },
    page(newValue) {
      this.page = newValue;
      this.arr();
    },
  },
};
</script>
<style lang="less" scoped>
.btns {
  display: flex;
  div {
    display: flex;
  }
  button {
    height: 25px;
    padding: 0 10px;
    border: none;
    margin-left: 5px;
    border-radius: 3px;
  }
}
.flags {
  display: flex;
  align-items: center;
  div {
    width: 10px;
    height: 10px;
    margin-left: 5px;
  }
}
.color1 {
  background: red;
}
.color2 {
  background: #000;
}
.btnColor {
  background: #409eff;
  color: #fff;
}
</style>