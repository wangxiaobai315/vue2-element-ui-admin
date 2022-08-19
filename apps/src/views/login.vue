<template>
  <div class="login">
    <img src="	http://jxsjs.com/static/img/login-bg.bf43260.png" class="bac" />
    <div class="box">
      <div class="lf">
        <img
          src="http://jxsjs.com/static/img/login-left.55f9dec.png"
          class="logo"
        />
        <p>欢迎使用<br />北工商设备管理系统</p>
      </div>
      <div class="rt">
        <el-tabs v-model="activeName">
          <el-tab-pane label="短信登陆" name="first">
            <el-input v-model="tel" placeholder="手机号"></el-input>
            <div class="btns">
              <el-input v-model="input" placeholder="验证码"></el-input>
              <el-button
                type="primary"
                :disabled="tel ? isDisabled : !isDisabled"
                @click="getFn"
                >发送验证码</el-button
              >
            </div>
            <div class="sub">
              <el-button type="primary" @click="subFn">登录</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="密码登录" name="second">
            <div><el-input v-model="user" placeholder="用户名"></el-input></div>
            <div class="psd">
              <el-input
                placeholder="密码"
                v-model="psd"
                show-password
              ></el-input>
            </div>
            <div class="sub">
              <el-button type="primary" @click="submitFn">登录</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../api/index";
export default {
  name: "",
  data() {
    return {
      activeName: "first",
      tel: "",
      input: "",
      isDisabled: false,
      user: "",
      psd: "",
      fdSub: null,
    };
  },
  created() {
    this.fdSub = this.fdoufn(this.submit, 1000);
  },
  methods: {
    getFn() {
      const arr = [
        1,
        2,
        3,
        4,
        5,
        6,
        6,
        7,
        8,
        9,
        "a",
        "f",
        "g",
        "u",
        "W",
        "Q",
        "J",
        "X",
        "Y",
      ];
      let str = "";
      for (let i = 0; i < 6; i++) {
        const x = Math.round(Math.random() * arr.length);
        if (str.indexOf(arr[x]) != -1) {
          i--;
        } else {
          str += arr[x];
        }
      }
      console.log(str);
      setTimeout(() => {
        this.input = str;
      }, 1500);
    },
    subFn() {
      if (this.input) {
        this.$message({
          message: "登陆成功",
          type: "success",
          duration: 1500,
          onClose: () => {
            this.$router.replace("/home");
            this.input = "";
          },
        });
      }
    },
    submitFn() {
      this.fdSub();
    },
    //密码登录
    async submit() {
      let { data } = await request.post("/psd", {
        user: this.user,
        psd: this.psd,
      });
      console.log(data);
      if (data.status == 200) {
        localStorage.setItem("token", this.user);
        this.$message({
          message: "登陆成功",
          type: "success",
          duration: 1500,
          onClose: () => {
            this.$router.replace("/home");
            this.user = "";  
            this.psd = "";
          },
        });
      } else {
        this.$message.error("登陆失败");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  position: relative;
  .bac {
    width: 100%;
    height: 100%;
  }
  .box {
    width: 800px;
    height: 400px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background: #fff;
    display: flex;
    align-items: center;
    border-radius: 10px;
    overflow: hidden;
    .lf {
      width: 480px;
      height: 100%;
      position: relatve;
      img {
        width: 100%;
        height: 100%;
      }
      p {
        font-size: 30px;
        color: #fff;
        position: absolute;
        left: 30px;
        bottom: 30px;
      }
    }
    .rt {
      flex: 1;
      padding: 50px;
      box-sizing: border-box;
      .btns {
        display: flex;
        margin: 15px 0;
      }
      .sub {
        .el-button {
          width: 100%;
        }
      }
      .psd {
        margin: 15px 0;
      }
    }
  }
}
</style>