<template>
  <el-menu
    class="el-menu-vertical-demo"
    font-size="24px"
    text-color="#333"
    :uniqueOpened="true"
    :router="true"
  >
    <el-submenu
      v-for="item in menuList"
      :key="item._id"
      :index="item._id"
      class="subMenu"
    >
      <template #title>
        <i class="el-icon-menu"></i>
        <span>{{ item.menuName }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          v-for="children in item.children"
          :key="children.name"
          :index="children.router"
          class="menuItem"
          ><span>{{ children.name }}</span></el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  data() {
    return {
      menuList: [],
      count: 0,
    };
  },
  mounted() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      this.$api.getmenuList().then((res) => {
        this.menuList = res;
      });
    },
  },
};
</script>

<style lang='less'>
.el-menu-vertical-demo {
  border-right: none;
}
.el-submenu__title span {
  font-size: 16px;
}
.subMenu {
  background-color: #fff;
  text-align: left;
}
.menuItem span {
  font-size: 14px;
  color: rgb(134, 125, 125);
}
</style>