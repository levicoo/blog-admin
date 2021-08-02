<template>
  <div>
    <div class="action">
      <el-button type="primary" @click="handleAdd">create</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="item in columns"
        :label="item.label"
        :prop="item.prop"
        :key="item.prop"
        :formatter="item.formatter"
      >
      </el-table-column>
      <el-table-column label="handle" width="260">
        <template #default="scope">
          <el-button @click="handleEdit(scope.row)">edit</el-button>
          <el-button @click="handleDel(scope.row._id)" type="danger"
            >delete</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="showModal" width="730px" title="banner">
      <el-form :model="tableForm" ref="dialogForm">
        <el-form-item
          label="排序"
          v-show="action == 'create' || action == 'edit'"
        >
          <el-input v-model="tableForm.sequence" />
        </el-form-item>
        <el-form-item
          label="title"
          v-show="action == 'create' || action == 'edit'"
        >
          <el-input v-model="tableForm.title" />
        </el-form-item>
        <el-form-item
          label="图片"
          v-show="action == 'create' || action == 'edit'"
        >
          <kindeditor
            id="editor_id"
            height="300px"
            width="650px"
            uploadJson="http://127.0.0.1:8088/server/api/upload/images"
            :loadStyleMode="false"
            :content="content"
            @on-content-change="onContentChange"
          ></kindeditor>
        </el-form-item>
      </el-form>

      <el-form v-show="action == 'delete'">
        <h1>你确定要删除吗</h1>
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
import { ElMessage } from "element-plus";
import kindeditor from "components/kindeditor";
export default {
  name: "Banner",
  components: {
    kindeditor,
  },
  data() {
    return {
      content: "",
      tableData: [""],
      columns: [
        {
          label: "sequence",
          prop: "sequence",
        },
        {
          label: "title",
          prop: "title",
        },
        {
          label: "url",
          prop: "imgUrl",
        },
        {
          label: "createTime",
          prop: "createTime",
          formatter(row, column, value) {
            return utils.formateDate(new Date(value));
          },
        },
        {
          label: "uploadTime",
          prop: "uploadTime",
          formatter(row, column, value) {
            return utils.formateDate(new Date(value));
          },
        },
      ],
      showModal: false,
      sequence: 0,
      tableForm: {},
      imgUrl: "",
    };
  },
  mounted() {
    this.getBanner();
  },

  methods: {
    onContentChange(val) {
      this.tableForm.imgUrl = val;
    },

    getBanner() {
      this.$api.getBanner().then((res) => {
        this.tableData = res;
        console.log(this.tableData);
      });
    },
    handleAdd() {
      this.showModal = true;
      this.action = "create";
      this.tableForm.sequence = this.tableData.length + 1;
      this.content = "";
    },
    handleEdit(row) {
      this.action = "edit";
      this.showModal = true;
      this.imgUrl = row.path;
      this.$nextTick(() => {
        this.tableForm = {
          _id: row._id,
          sequence: row.sequence,
          imgUrl: row.imgUrl,
        };
        this.content = row.imgUrl;
      });
    },
    handleDel(_id) {
      this.action = "delete";
      this.showModal = true;
      this.$nextTick(() => {
        this.tableForm = {
          _id,
        };
      });
      console.log(this.tableForm);
    },
    handleClose() {
      this.showModal = false;
    },
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          let { tableForm, action } = this;
          let params = { ...tableForm, action };
          this.$api.bannersOperate(params).then((res) => {
            if (res) {
              this.showModal = false;
              if (action == "edit") {
                ElMessage.success("edit success");
                this.getBanner();
              } else if (action == "delete") {
                ElMessage.success("delete success");
                this.getBanner();
              } else {
                ElMessage.success("create success");
                this.getBanner();
              }
            }
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
.el-dialog .el-dialog__body {
  padding-bottom: 5px;
  padding-top: 5px;
}
</style>