<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="item in columns"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :formatter="item.formatter"
      >
      </el-table-column>
      <el-table-column label="操作" width="260">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-button @click="handleDel(scope.row._id)" type="danger" disabled
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="标题" v-model="showModal">
      <el-form
        ref="dialogForm"
        :model="tableForm"
        label-width="100px"
        :rules="rules"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="tableForm.content" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import utils from "utils/utils";
export default {
  name: "Logo",
  data() {
    return {
      tableData: [""],
      columns: [
        {
          label: "内容",
          prop: "content",
        },
        {
          label: "更新时间",
          prop: "uploadTime",
          formatter(row, column, value) {
            return utils.formateDate(new Date(value));
          },
        },
      ],
      showModal: false,
      tableForm: [],
      rules: [],
      action: "edit",
    };
  },
  mounted() {
    this.getLogo();
  },
  methods: {
    getLogo() {
      this.$api.logo().then((res) => {
        this.tableData = res;
      });
    },
    handleEdit(row) {
      console.log(row);
      this.action = "edit";
      this.showModal = true;
      this.$nextTick(() => {
        this.tableForm = {
          _id: row._id,
          content: row.content,
        };
      });
    },
    handleDel() {
      this.showModal = true;
    },
    handleClose() {
      this.showModal = false;
    },
    handleSubmit() {
      let { tableForm, action } = this;
      let params = { ...tableForm, action };
      console.log(params);
      this.$api.logoOperate(params).then((res) => {
        console.log(res);
      });
      this.showModal = false;
      this.getLogo();
    },
  },
};
</script>

<style>
</style>