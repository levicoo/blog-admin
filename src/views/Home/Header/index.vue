<template>
  <div class="header">
    <div class="logo">Levicoo</div>
    <div class="right">
      <div class="goWeb"><a href="http://localhost:8081">去首页</a></div>
      <div class="info">admin</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style lang='less'>
.header {
  .logo {
    float: left;
    width: 180px;
    font-family: Fantasy;
    font-size: 34px;
    color: brown;
  }
  .right {
    float: right;
    margin-right: 30px;
    .goWeb {
      float: left;
      margin-right: 20px;
    }
    .info {
      float: left;
    }
  }
}
</style>