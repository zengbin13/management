<template>
  <div>
    <el-dialog title="新增" :visible.sync="flag" width="40%" @close="cancel()">
      <el-form :model="addForm" ref="addForm" label-width="80px" :rules="rules" status-icon>
        <el-form-item label="用户名 :" prop="username">
          <el-input v-model="addForm.username" placeholder="请输入邮箱地址"></el-input>
        </el-form-item>
        <el-form-item label="密码 :" prop="password">
          <el-input v-model="addForm.password" placeholder="请输入6-20位数字＋字母的组合密码" type="password" minlength=6 maxlength=20></el-input>
        </el-form-item>
        <el-form-item label="姓名 :">
          <el-input v-model="addForm.truename" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="手机号 :">
          <el-input v-model="addForm.phone" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="地区 :">
          <city-picker @region-data="getRegion" :region="addForm.region"></city-picker>
        </el-form-item>
        <el-form-item label="是否启用 :">
          <el-radio v-model="addForm.status" label="1">禁用</el-radio>
          <el-radio v-model="addForm.status" label="2">启用</el-radio>
        </el-form-item>
        <el-form-item label="角色 :">
          <el-checkbox-group v-model="addForm.role">
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
import { UserAdd, UserEdit } from "@/api/user";
import { validateMailFormat, validatePassFormat } from "@/utils/validate.js";
export default {
  name: "AddUser",
  components: {
    CityPicker
  },
  props: {
    addUserDialog: {
      type: Boolean,
      default: false
    },
    editData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!validateMailFormat(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!validatePassFormat(value)) {
        callback(new Error("密码格式有误"));
      } else {
        callback();
      }
    };
    return {
      flag: false,
      addForm: {
        btnPerm: "",
        id: "",
        username: "",
        password: "",
        truename: "",
        phone: "",
        region: "",
        status: "",
        role: []
      },
      options: [{ label: "地方", value: "1" }],
      roles: [{ label: "系统管理员" }, { label: "信息管理员" }, { label: "用户管理员" }],
      rules: {
        username: { validator: validateUsername, trigger: "blur" },
        password: { validator: validatePass, trigger: "blur" }
      }
    };
  },
  watch: {
    addUserDialog(value) {
      this.flag = value;
    },
    editData(value) {
      Object.assign(this.addForm, value);
      if (typeof this.addForm.region === "string") {
        this.addForm.region = JSON.parse(this.addForm.region);
      }
    }
  },
  methods: {
    cancel() {
      this.$emit("update:addUserDialog", false);
    },
    submit() {
      // this.$emit("update:addUserDialog", false);
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 数据处理
          let requestData = Object.assign({}, this.addForm);
          if (typeof requestData.region !== "string") {
            requestData.region = JSON.stringify(requestData.region);
          }
          requestData.role = requestData.role.join();
          if (this.editData.id === "") {
            //add
            this.userAdd(requestData);
          } else {
            //edit
            this.userEdit(requestData);
          }
        } else {
          this.$message.error({
            message: "表单数据有误"
          });
          return false;
        }
      });
    },

    getRegion(data) {
      this.addForm.region = data;
    },
    //api
    userAdd(data) {
      UserAdd(data).then(response => {
        this.$emit("add-edit");
        this.$message.success({
          message: response.data.message,
          showClose: true
        });
      });
    },
    userEdit(data) {
      UserEdit(data).then(response => {
        this.$emit("add-edit");
        this.$message.success({
          message: response.data.message,
          showClose: true
        });
      });
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
