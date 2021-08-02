<template>
  <div>
    <div class="action">
      <el-button type="primary" @click="handleAdd">添加</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="item in columns"
        :key="item.label"
        :prop="item.prop"
        :label="item.label"
        :formatter="item.formatter"
      >
      </el-table-column>
      <el-table-column label="操作" width="260">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)">编辑</el-button>
          <el-button @click="handleDel(scope.row._id)">删除</el-button>
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
          <el-input v-model="tableForm.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="路径" prop="path">
          <el-input v-model="tableForm.path" placeholder="请输入路径" />
        </el-form-item>
        <el-form-item label="排序" prop="sequence">
          <el-input v-model="tableForm.sequence" placeholder="请输入排序" />
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
  name: "HeaderNav",
  data() {
    return {
      tableData: [{}],
      columns: [
        {
          label: "排序",
          prop: "sequence",
        },
        {
          label: "标题",
          prop: "title",
        },
        {
          label: "路径",
          prop: "path",
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
      tableForm: {},
      action: "",
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        path: [
          {
            required: true,
            message: "请输入路径",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    this.frontpageHeader();
  },
  methods: {
    frontpageHeader() {
      this.$api
        .frontpageHeader()
        .then((res) => {
          this.tableData = res;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleAdd() {
      this.action = "create";
      (this.tableForm.sequence = this.tableData.length + 1),
        (this.showModal = true);
    },
    handleClose() {
      this.showModal = false;
      this.handleReset("dialogForm");
    },
    // 表单重置
    handleReset(form) {
      this.$refs[form].resetFields();
    },
    async handleDel(_id) {
      this.$api.headerOperate({ _id, action: "delete" }).then((res) => {
        if (res) {
          this.$message.success("删除成功");
          this.handleReset("dialogForm");
          this.frontpageHeader();
        }
      });
    },
    handleEdit(row) {
      this.action = "edit";
      this.showModal = true;
      this.$nextTick(() => {
        this.tableForm = {
          _id: row._id,
          title: row.title,
          path: row.path,
          sequence: row.sequence,
        };
      });
    },
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let { tableForm, action } = this;
          let params = { ...tableForm, action };
          this.$api.headerOperate(params).then((res) => {
            console.log(res);
            this.frontpageHeader();
            this.handleReset("dialogForm");
            this.showModal = false;
          });
        }
      });
    },
  },
};
</script>

<style>
.action {
  float: left;
}
.el-form-item__label {
  text-align: left;
}
</style>