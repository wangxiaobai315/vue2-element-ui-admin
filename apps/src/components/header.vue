<template>
  <div>
    <div class="header">
      <div class="head-l">
        <img src="../../public/logo.png" @click="toggle" />
        <h2>设备管理系统</h2>
      </div>
      <div class="head-r">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ user }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <div @click="showFn">
              <el-dropdown-item>修改密码</el-dropdown-item>
            </div>
            <div @click="closeFn">
              <el-dropdown-item>退出登录</el-dropdown-item>
            </div>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 修改密码的弹框 -->
    <el-dialog title="修改密码" :visible.sync="show">
      <el-form :model="form">
        <el-form-item label="旧密码" :label-width="formLabelWidth">
          <el-input v-model="form.psd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="form.newPsd" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="form.okPsd" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="putFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import request from "../api/index";
import { mapMutations } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      user: "",
      show: false,
      form: {
        psd: "",
        newPsd: "",
        okPsd: "",
      },
      formLabelWidth: "120px",
    };
  },
  created() {
    this.user = localStorage.getItem("token");
  },
  methods: {
    ...mapMutations(["toggle"]),
    showFn() {
      this.show = true;
    },
    //退出登录
    closeFn() {
      console.log(0);
      this.$router.replace("/");
      localStorage.removeItem("token");
    },
    async putFn() {
      if (this.form.newPsd === this.form.okPsd) {
        let { data } = await request.post("/putPsd", {
          old: this.form.psd,
          new: this.form.newPsd,
        });
        console.log(data.status);
        if (data.status == 200) {
          this.$message({
            message: "修改成功",
            type: "success",
            duration: 1500,
            onClose: () => {
              this.form.psd = "";
              this.form.newPsd = "";
              this.form.okPsd = "";
            },
          });
        }
        if (data.status == 100) {
          this.$message.error("修改失败");
        }
        this.show = false;
      } else {
        this.form.newPsd = "";
        this.form.okPsd = "";
        alert("两次输入的新密码不同，请重新输入");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  padding: 0 15px;
  box-sizing: border-box;
  background: #0079c4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .head-l {
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #fff;
    img {
      width: 22px;
      height: 22px;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>