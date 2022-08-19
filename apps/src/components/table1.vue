<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="设备编号" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.number }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="设备名称" width="80">
      </el-table-column>
      <el-table-column label="设备状态" width="100">
        <template slot-scope="scope">
          <div class="flags">
            <div v-if="scope.row.flag == 1">
              <span>使用中</span>
              <div class="color1"></div>
            </div>
            <div v-else-if="scope.row.flag == 2">
              <span>123</span>
              <div class="color2"></div>
            </div>
            <div v-else-if="scope.row.flag == 3">
              <span>闲置中</span>
              <div class="color3"></div>
            </div>
            <div v-else>
              <span>报废中<br />1433223</span>
              <div class="color4"></div>
            </div>
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
              v-if="scope.row.flag !== 4"
              class="btnColor"
              @click="toggleFn(scope.row.number)"
            >
              更改状态
            </button>
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
import request from "@/api";
export default {
  name: "Table1",
  props: ["arr"],
  data() {
    return {
      tableData: [],
      num: 10,
      page: 1,
      lengths: 1,
      number: "",
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
    async ff() {
      let { data } = await request.get("/manage");
      this.tableData = data.slice(
        (this.page - 1) * this.num,
        this.page * this.num
      );
      this.lengths = data.length;
    },
    //选择每页显示多少条数据
    handleSizeChange(val) {
      this.num = val;
      this.ff();
    },
    //当前的页码数
    handleCurrentChange(val) {
      this.ff();
      this.page = val;
    },
    //详情
    countFn(val) {
      const obj = this.tableData.find((el) => el.number == val);
      this.$router.push({ path: "/pageCount", query: { s: obj } });
    },
    //更改状态
    toggleFn(val) {
      this.dialogVisible = true;
      this.number = val;
    },
    subFn() {
      request.post("/putflag", { number: this.number, value: this.value });
      this.dialogVisible = false;
      this.ff();
    },
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
  created() {
    this.ff();
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
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 10px;
      height: 10px;
      margin-left: 5px;
    }
  }
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
.btnColor {
  background: #409eff;
  color: #fff;
}
</style>