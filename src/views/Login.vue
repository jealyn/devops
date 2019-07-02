<template>
<div class="container">
    <div class="login-container">
      <el-form :model="formData" :rules="formRules" ref="formData">
        <span class="title">自动化运维平台</span>
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model.trim="formData.username"
            auto-complete="off"
            prefix-icon="el-icon-user"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model.trim="formData.password"
            show-password
            auto-complete="off"
            prefix-icon="el-icon-key"
            placeholder="请输入密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="validCode">
          <el-input
            style="width: 234px; float: left;"
            v-model.trim="formData.validCode"
            prefix-icon="el-icon-edit"
            placeholder="请输入验证码"
          >
          </el-input>
          <valid-code style="height: 36px; float: left; background: #eee; margin-left: 6px;" :value.sync="validCode"></valid-code>
        </el-form-item>
        <el-form-item style="padding-top:20px">
          <el-button class="login-button" @click.native.prevent="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  //登录  校验
  name: "Login",
  data() {
    const checkCode = (rule, value, callback) => {
      if (value.toLowerCase() !== this.validCode.toLowerCase()) {
        callback(new Error('验证码输入错误'));
      } else {
        callback();
      }
    };
    return {
      logining: false,
      formData: {
        username: "",
        password: "",
      },
      validCode: '',
      formRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        validCode: [{ required: true, message: "请输入验证码", trigger: "blur" }, { validator: checkCode, trigger: 'blur' }]
      }
    };
  },
  methods: {
    handleLogin() {
      this.$refs.formData.validate(valid => {
        if (valid) {
          let { username, password } = this.formData;
          axios
            .post(
              " https://www.easy-mock.com/mock/5d11ea22e518e1085a79a5e2/devops/login", {
                username,
                password
              }
            )
            .then(res => {
              if (!res.data.data.ret) {
                this.$message({
                  message: res.data.data.message,
                  type: "error"
                });
              } else {
                sessionStorage.setItem("username", res.data.data.username);
                this.$router.push({ path: "/home" });
              }
            })
            .catch(error => {
              this.$message({
                message: "网络错误,请稍后再试",
                type: "error"
              });
            });
        }
      });
    }
  }
};
</script>
<style scoped>
.container {
    background: url("../assets/images/bg_login.jpg") center center;
    background-size: 100%;
    width: 100%;
    height: 100%;
    padding: 13vh 0;
}
.login-container {
  border-radius: 5px;
  background-clip: padding-box;
  margin: 20vh auto;
  width: 340px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.title {
  display: block;
  text-align: center;
  margin: 0px auto 40px auto;
  color: #505458;
  font-size: 32px;
}
.el-form-item {
  margin-bottom: 22px;
}
.login-button {
  width: 100%;
  background-color: #f6db63;
  border-color: #f6db63;
  color: #505458;
  font-size: 16px;
}
button:hover {
  background-color: #ffec8b;
  border-color: #ffec8b;
}
button:active{
  background-color: #f6db63;
  border-color: #f6db63;
}
</style>
