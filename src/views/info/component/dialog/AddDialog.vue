<template>
  <el-dialog title="新增" :visible.sync="add_flag" class="add-dialog" @close="closeDialog()" width="580px">
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
        <el-input type="textarea" :rows="4" placeholder="请至少输入两个字符" v-model="dialogForm.content" maxlength="200" minlength="2" show-word-limit>
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
import { AddInfo } from "@/api/info.js";
export default {
  name: "AddDialog",
  props: {
    addDialog: {
      type: Boolean,
      defalut: false
    },
    typeOptions: {
      type: Array,
      defalut: () => {
        return [];
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
      const data = {
        category: this.dialogForm.type,
        title: this.dialogForm.title,
        content: this.dialogForm.content
      };
      this.addInfo(data);
    },
    //api
    addInfo(data) {
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
