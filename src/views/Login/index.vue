<template>
  <div class="main">
    <el-form ref="userForm" :model="user" status-icon :rules="rules">
      <div class="title">后台</div>
      <el-form-item prop="userName">
        <el-input
          type="text"
          prefix-icon="el-icon-user"
          v-model="user.userName"
        />
      </el-form-item>
      <el-form-item prop="userPwd">
        <el-input
          type="password"
          prefix-icon="el-icon-view"
          v-model="user.userPwd"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn-login" @click="login"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        userName: "",
        userPwd: "",
      },
      rules: {
        userName: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        userPwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.$api.login(this.user).then((res) => {
            this.$store.commit("saveUserInfo", res);
            this.$router.push("/");
          });
        }
      });
    },
  },
};
</script>
<style lang='less'>
.main {
  width: 400px;
  height: 300px;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 3px 20px 4px rgba(0, 0, 0, 0.2);
  .title {
    text-align: center;
    font-size: 24px;
    line-height: 1.5;
    margin-bottom: 20px;
  }
  .btn-login {
    width: 100%;
  }
}
</style>