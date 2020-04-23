<template>
  <el-dialog :visible.sync="add_flag" class="add-dialog" @close="closeDialog()" width="580px">
    <div slot="title" style="font-size:18px">{{title}}</div>
    <el-form :model="dialogForm" label-width="50px" ref="dialogForm">
      <el-form-item label="类别 :">
        <el-select v-model="dialogForm.type" placeholder="请选择">
          <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.category_name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题 :">
        <el-input v-model="dialogForm.title" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="概况 :">
        <el-input type="textarea" :rows="8" placeholder="请至少输入两个字符" v-model="dialogForm.content" maxlength="1000" minlength="2" show-word-limit>
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="add_flag = false">取 消</el-button>
      <el-button type="danger" @click="submit()" :loading="loading">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { AddInfo, EditInfo } from "@/api/info.js";
export default {
  name: "InfoDialog",
  props: {
    addDialog: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "编辑"
    },
    typeOptions: {
      type: Array,
      default: () => {
        return [];
      }
    },
    editDailogData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      dialogForm: {
        type: "",
        title: "",
        content: ""
      },
      add_flag: false,
      loading: false
    };
  },
  watch: {
    addDialog: function(value) {
      this.add_flag = value;
    },
    editDailogData: function(value) {
      this.dialogForm.type = value.type;
      this.dialogForm.title = value.title;
      this.dialogForm.content = value.content;
    }
  },
  methods: {
    closeDialog() {
      this.$emit("update:addDialog", false);
    },
    submit() {
      if (!this.dialogForm.type) {
        this.$message.error({
          message: "请选择数据类别"
        });
        return;
      }
      if (!this.dialogForm.title) {
        this.$message.error({
          message: "标题不能为空"
        });
        return;
      }
      if (this.dialogForm.content.length < 2) {
        this.$message.error({
          message: "内容长度至少为两个字符"
        });
        return;
      }

      if (this.editDailogData.id) {
        this.editInfo();
      } else {
        this.addInfo();
      }
      this.$emit("get-info-list");
    },
    //api
    addInfo() {
      const data = {
        category: this.dialogForm.type,
        title: this.dialogForm.title,
        content: this.dialogForm.content
      };
      this.loading = true;
      AddInfo(data)
        .then(response => {
          this.loading = false;
          // 重置表单
          this.dialogForm.title = "";
          this.dialogForm.content = "";
          this.$message.success({
            message: response.data.message
          });
        })
        .catch(error => {
          this.loading = false;
        });
    },
    editInfo() {
      const data = {
        id: this.editDailogData.id,
        categoryId: this.editDailogData.typeId,
        title: this.dialogForm.title,
        content: this.dialogForm.content
      };
      EditInfo(data).then(response => {
        this.add_flag = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form {
  margin: 0 30px;
}
.dialog-footer {
  padding-bottom: 20px;
  text-align: center;
  .el-button {
    margin: 0 20px;
    width: 120px;
  }
}
</style>
