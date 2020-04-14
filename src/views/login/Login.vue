<template>
  <div class="login">
    <div class="container">
      <!-- tab bar 部分 -->
      <div class="tabs">
        <div
          class="tab-item"
          v-for="(item, index) in tabs"
          :key="index"
          :class="{ active: currentIndex === index }"
          @click="toggleIndex(index)"
        >
          {{ item }}
        </div>
      </div>
      <!-- 表单部分 -->
      <el-form
        :model="loginFrom"
        ref="loginFrom"
        label-width="80px"
        label-position="top"
      >
        <el-form-item label="邮箱">
          <el-input
            v-model="loginFrom.mail"
            placeholder="请输入邮箱地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model="loginFrom.password"
            placeholder="请填写密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input
                v-model="loginFrom.checkCode"
                placeholder="输入验证码"
              ></el-input>
            </el-col>
            <el-col :span="9">
              <el-button type="primary" class="code-button">获取验证码</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-button">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      tabs: ["登录", "注册"],
      currentIndex: 0,
      loginFrom: {
        mail: "",
        password: "",
        checkCode: ""
      }
    };
  },
  methods: {
    toggleIndex(index) {
      this.currentIndex = index;
    }
  }
};
</script>

<style lang="scss">
.login {
  background-color: $bgColor;
  height: 100vh;
  .container {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 330px;
    margin: 0 auto;
  }
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 40px;
  .tab-item {
    width: 90px;
    height: 36px;
    color: #fff;
    background-color: #39c7c5;
    line-height: 36px;
    text-align: center;
    cursor: pointer;
    border-radius: 4px;
  }
  .active {
    background-color: #34e7e4;
  }
}
.login {
  .el-form-item__label {
    line-height: 1.5rem;
  }
  .code-button, .login-button {
    width: 100%;
  }
}
</style>
