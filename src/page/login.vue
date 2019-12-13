<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer" v-show="showLogin">
        <div class="manage_tip">
          <p>后台管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名">
              <span>dsfsf</span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item prop="remember">
            <el-checkbox v-model="loginForm.remember" label="记住密码"></el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
            <el-button @click="resetForm('loginForm')" class="submit_btn">重置</el-button>
          </el-form-item>
        </el-form>
        <p class="tip">温馨提示：</p>
        <p class="tip">未登录过的新用户，自动注册</p>
        <p class="tip">注册过的用户可凭账号密码登录</p>
      </section>
    </transition>
  </div>
</template>

<script>
import { login, getAdminInfo } from "@/api/getData";

import { aes } from "../common/secret";
import { setCookie, delCookie, getCookie } from "../common/cookie";
import { createNamespacedHelpers } from "vuex";
const {
  mapState,
  mapActions,
  mapMutations,
  mapGetters
} = createNamespacedHelpers("login");

export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        remember: true
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      showLogin: false
    };
  },
  mounted() {
    this.showLogin = true;
    // 自动获取用户信息
    // if (!this.adminInfo.id) {
    //   this.getAdminData();
    // }
    this.loginForm.username=getCookie("username");
    this.loginForm.password=getCookie("password");
  },
  computed: {
    ...mapState(["adminInfo", "userInfo"])
  },

  methods: {
    ...mapActions(["getAdminData", "set_user_info"]),
    async submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const loginData = {
            username: this.loginForm.username,
            password: aes.en(this.loginForm.password)
          };

          if (this.loginForm.remember == true) {
            setCookie("username", loginData.username);
            setCookie("password", loginData.password);
          } else {
            delCookie("username");
            delCookie("password");
          }

          this.set_user_info(loginData)
            .then(() => {
              if (this.userInfo.status == 1) {
                this.$message({
                  type: "success",
                  message: "登录成功"
                });
                this.$router.push("manage");
              } else {
                this.$message({
                  type: "error",
                  message: this.userInfo
                });
              }
            })
            .catch(e => {
              console.log("catch");
              this.$notify.error({
                title: "错误",
                message: "请输入正确的用户名密码",
                offset: 100
              });
            });
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  watch: {
    adminInfo: function(newValue) {
      if (newValue.id) {
        this.$message({
          type: "success",
          message: "检测到您之前登录过，将自动登录"
        });
        this.$router.push("manage");
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../style/mixin";
.login_page {
  background-color: #324057;
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p {
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer {
  .wh(320px, 260px);
  .ctp(320px, 260px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    width: 30%;
    font-size: 16px;
  }
}
.tip {
  font-size: 12px;
  color: red;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
