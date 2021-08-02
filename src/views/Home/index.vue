<template>
  <el-container>
    <el-header>
      <Header> </Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <Aside> </Aside>
      </el-aside>
      <el-main>
        <div class="box">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "./Header";
import Aside from "./Aside";
export default {
  name: "Home",
  components: {
    Header,
    Aside,
  },
};
</script>

<style lang="less">
.el-container {
  min-width: 1200px;
  .el-header {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    height: calc(100vh - 60px);
    overflow-x: hidden;
  }

  .el-main {
    color: #333;
    text-align: center;
    width: calc(100vw - 250px);
    min-width: 1000px;
    padding: 20px;
    background-color: #ccc;
    .box {
      border: 2px solid rgb(114, 114, 114);
      background-color: #fff;
      height: calc(100% - 4px);
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
    }
  }
}
</style>
