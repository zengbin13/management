<template>
  <div>
    <el-dialog title="新增" :visible.sync="flag" width="40%" @close="cancel()">
      <el-form :model="addForm" ref="addForm" label-width="80px">
        <el-form-item label="用户名 :">
          <el-input v-model="addForm.userName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="姓名 :">
          <el-input v-model="addForm.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="手机号 :">
          <el-input v-model="addForm.phone" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="地区 :">
          <city-picker></city-picker>
        </el-form-item>
        <el-form-item label="是否启用 :">
          <el-radio v-model="addForm.enable" label="0">禁用</el-radio>
          <el-radio v-model="addForm.enable" label="1">启用</el-radio>
        </el-form-item>
        <el-form-item label="角色 :">
          <el-checkbox-group v-model="addForm.roles">
            <el-checkbox v-for="item in roles" :key="item.key" :label="item.label"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>

      <span slot="footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="danger" @click="submit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CityPicker from "@/components/cityPicker/CityPicker";
export default {
  name: "AddUser",
  components: {
    CityPicker
  },
  props: {
    addUserDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      flag: false,
      addForm: {
        userName: "",
        name: "",
        phone: "",
        area: "",
        enable: 0,
        roles: []
      },
      options: [{ label: "地方", value: "1" }],
      roles: [{ label: "系统管理员" }, { label: "信息管理员" }, { label: "用户管理员" }]
    };
  },
  watch: {
    addUserDialog(value) {
      this.flag = value;
    }
  },
  methods: {
    cancel() {
      this.$emit("update:addUserDialog", false);
    },
    submit() {
      this.$emit("update:addUserDialog", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-form {
  margin: 0 30px;
}
.el-col {
  margin-right: 15px;
}
/deep/.el-dialog__footer {
  padding: 0 0 50px;
  text-align: center !important;
  .el-button {
    display: inline-block;
    width: 120px;
    margin: 0 10px;
    box-sizing: border-box;
  }
}
</style>
