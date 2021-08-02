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
        :width="item.width"
      >
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template #default="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="handleDel(scope.row._id)" type="danger"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="article" v-model="showModal" width="810px">
      <el-form
        ref="dialogForm"
        :model="tableForm"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item
          label="排序"
          prop="sequence"
          v-show="action == 'create' || action == 'edit'"
        >
          <el-input v-model="tableForm.sequence" placeholder="请输入排序" />
        </el-form-item>

        <el-form-item
          label="标题"
          prop="name"
          v-show="action == 'create' || action == 'edit'"
        >
          <el-input v-model="tableForm.name" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item
          label="标签"
          prop="tag"
          v-show="action == 'create' || action == 'edit'"
        >
          <el-input v-model="tableForm.tag" placeholder="请输入标签" />
        </el-form-item>

        <el-form-item
          label="副标题"
          prop="guide"
          v-show="action == 'create' || action == 'edit'"
        >
          <el-input v-model="tableForm.guide" placeholder="请输入类别" />
        </el-form-item>

        <el-form-item
          label="首页显示"
          prop="frontpage"
          v-show="action == 'create' || action == 'edit'"
        >
          <el-switch v-model="tableForm.frontpage"></el-switch>
        </el-form-item>
        <el-form-item
          label="内容"
          v-show="action == 'create' || action == 'edit'"
          prop="content"
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
        <h1 width="100%" v-show="action == 'delete'">你确定要删除吗？</h1>
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
import kindeditor from "components/kindeditor";
export default {
  name: "BlogArticles",
  components: {
    kindeditor,
  },
  data() {
    return {
      tableData: [{}],
      columns: [
        {
          label: "排序",
          prop: "sequence",
          width: "50px",
        },
        {
          label: "标题",
          prop: "name",
        },
        {
          label: "副标题",
          prop: "guide",
        },
        {
          label: "标签",
          prop: "tag",
        },
        {
          label: "创建时间",
          prop: "createTime",
          formatter(row, column, value) {
            return utils.formateDate(new Date(value));
          },
          width: "164px",
        },
        {
          label: "更新时间",
          prop: "uploadTime",
          formatter(row, column, value) {
            return utils.formateDate(new Date(value));
          },
          width: "164px",
        },
      ],
      showModal: false,
      tableForm: {
        className: "program",
      },
      action: "",
      rules: {
        title: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入标题",
            trigger: "blur",
          },
        ],
      },
      content: "",
    };
  },
  mounted() {
    this.getArticle();
  },
  methods: {
    onContentChange(val) {
      this.tableForm.content = val;
    },

    getArticle() {
      const className = { className: "program" };
      this.$api.getArticle(className).then((res) => {
        this.tableData = res;
        this.tableForm.sequence = this.tableData.length + 1;
      });
    },
    handleAdd() {
      this.action = "create";
      this.showModal = true;
      this.content = "";
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
      this.action = "delete";
      this.showModal = true;
      this.tableForm._id = _id;
    },
    handleEdit(row) {
      this.action = "edit";
      this.showModal = true;
      this.$nextTick(() => {
        this.tableForm = {
          _id: row._id,
          name: row.name,
          sequence: row.sequence,
          className: row.className,
          frontpage: row.frontpage,
          content: row.content,
          guide: row.guide,
        };
        this.tableForm.tag = row.tag.join(",");
        this.content = row.content;
      });
    },
    handleSubmit() {
      this.$refs.dialogForm.validate(async (valid) => {
        if (valid) {
          const { tableForm, action } = this;
          const params = { ...tableForm, action };

          this.$api.operateArticle(params).then((res) => {
            if (res) {
              this.showModal = false;
              if (action == "create") {
                this.$message.success("添加成功");
              } else if (action == "edit") {
                this.$message.success("编辑成功");
              } else {
                this.$message.success("删除成功");
              }
              this.handleReset("dialogForm");

              this.getArticle();
            } else {
              if (action == "create") {
                this.$message.error("添加失败");
              } else if (action == "edit") {
                this.$message.error("编辑失败");
              } else {
                this.$message.error("删除失败");
              }
              this.handleReset("dialogForm");
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
</style>