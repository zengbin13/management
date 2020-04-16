<template>
  <div class="login">
    <div class="container">
      <!-- tab bar 部分 -->
      <div class="tabs">
        <div class="tab-item" v-for="(item, index) in tabs" :key="index" :class="{ active: currentIndex === index }" @click="toggleIndex(index)">
          {{ item }}
        </div>
      </div>
      <!-- 表单部分 -->
      <el-form :model="loginFrom" ref="loginFrom" :rules="rules" status-icon label-position="top">
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model="loginFrom.mail" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginFrom.password" :minlength="6" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" v-if="isShowPassword2" prop="password2">
          <el-input type="password" v-model="loginFrom.password2"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="checkCode">
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="loginFrom.checkCode"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="success" class="code-button" :disabled="checkCode.disabled" @click="getCheckCode()">{{ checkCode.text }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" class="login-button" @click="submitForm()">{{
            module_zh
          }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  stripscript,
  validateMailFormat,
  validatePassFormat,
  validateCodeFormat
} from "@/utils/validate";
import { GetCheckCode, Register, Login } from "@/api/login";
import sha1 from "js-sha1";
export default {
  name: "Login",
  data() {
    var validateMail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (!validateMailFormat(value)) {
        callback(new Error("请填写正确的邮箱格式"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      //过滤特殊字符
      value = stripscript(value);
      this.loginFrom.password = value;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validatePassFormat(value)) {
        callback(new Error("密码为6-20位字母+数字的组合"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.loginFrom.password) {
        callback(new Error("确认密码不一致"));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (!validateCodeFormat(value)) {
        callback(new Error("密码为6位字母+数字的组合"));
      } else {
        callback();
      }
    };
    return {
      tabs: ["登录", "注册"],
      currentIndex: 0,
      isShowPassword2: false,
      loginFrom: {
        mail: "1762030184@qq.com",
        password: "",
        password2: "",
        checkCode: ""
      },
      rules: {
        mail: { validator: validateMail, trigger: "blur" },
        password: { validator: validatePass, trigger: "blur" },
        password2: { validator: validatePass2, trigger: "blur" },
        checkCode: { validator: validateCode, trigger: "blur" }
      },
      checkCode: { disabled: false, text: "获取验证码" },
      timer: null
    };
  },
  computed: {
    module() {
      return this.currentIndex === 0 ? "login" : "register";
    },
    module_zh() {
      return this.currentIndex === 0 ? "登录" : "注册";
    }
  },
  methods: {
    //切换tab状态
    toggleIndex(index) {
      //高亮
      this.currentIndex = index;
      //显示重复密码
      this.isShowPassword2 = index === 1 ? true : false;
      // 清空表单内容
      this.$refs.loginFrom.resetFields();
      //清除倒计时
      this.clearCountdown();
      //更改获取验证码按钮状态
      this.changeCodeBtnStatus(false, "获取验证码");
    },
    //获取验证码
    getCheckCode() {
      //前端校验
      if (this.loginFrom.mail === "") {
        this.$message({
          type: "error",
          message: "校验: 邮箱地址不能为空哟",
          showClose: true
        });
        return;
      }
      if (!validateMailFormat(this.loginFrom.mail)) {
        this.$message({
          type: "error",
          message: "校验: 邮箱地址格式有误",
          showClose: true
        });
        return;
      }
      let data = {
        username: this.loginFrom.mail,
        module: this.module
      };
      //请求过程按钮禁用，显示发送中
      this.changeCodeBtnStatus(true, "发送中");
      GetCheckCode(data)
        .then(response => {
          //倒计时60秒,按钮禁用
          this.btnCountdown(15);
        })
        .catch(error => {
          this.checkCode = { disabled: false, text: "获取验证码" };
          console.log(error);
        });
    },
    //按钮倒计时
    btnCountdown(time) {
      this.timer = null;
      this.timer = setInterval(() => {
        this.changeCodeBtnStatus(true, `倒计时${time}秒`);
        if (time === 0) {
          clearInterval(this.timer);
          //倒计时结束,可点击再次发送
          this.changeCodeBtnStatus(false, "再次发送");
        }
        time--;
      }, 1000);
    },
    //清除按钮倒计时
    clearCountdown() {
      clearInterval(this.timer);
    },
    //更改验证码按钮状态
    changeCodeBtnStatus(disabled, text) {
      this.checkCode.disabled = disabled;
      this.checkCode.text = text;
    },
    //提交表单
    submitForm() {
      this.$refs.loginFrom.validate(valid => {
        let data = {
          username: this.loginFrom.mail,
          password: sha1(this.loginFrom.password),
          code: this.loginFrom.checkCode
        };
        if (valid && this.module === "login") {
          this.login(data);
        } else if (valid && this.module === "register") {
          this.register(data);
        } else {
          return false;
        }
      });
    },
    //请求login数据
    login(data) {
      Login(data)
        .then(response => {
          //路由跳转到index页面
          this.$router.push({ path: "/index" });
        })
        .catch(error => {
          console.log(error);
        });
    },
    //请求register数据
    register(data) {
      Register(data)
        .then(response => {
          this.toggleIndex(0);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.login {
  background-color: $bgColor;
  height: 100vh;
  .container {
    position: relative;
    top: 20%;
    width: 330px;
    margin: 0 auto;
  }
}
.tabs {
  text-align: center;
  margin-bottom: 40px;
  .tab-item {
    display: inline-block;
    width: 90px;
    height: 36px;
    color: #fff;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
  }
  .active {
    background-color: #2f4255;
  }
}
.login {
  .el-form-item__label {
    line-height: 1.25rem;
    color: #fff;
  }
  .code-button,
  .login-button {
    width: 100%;
  }
}
</style>
