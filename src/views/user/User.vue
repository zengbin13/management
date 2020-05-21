<template>
  <div class="user">
    <!-- 表单 -->
    <el-form label-width="70px" inline :model="userForm" label-position="left">
      <el-form-item label="分类 :">
        <el-select v-model="userForm.selected" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="userForm.input" placeholder="请输入搜索内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn">搜索</el-button>
      </el-form-item>
      <el-form-item class="pull-right">
        <el-button type="danger" class="btn" @click="addUserData()">添加用户</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <base-table :tableData="tableData " :table-config="tableConfig" @selection-change="handleChange" v-loading="loading">
      <template v-slot:status="props">
        <el-switch v-model="props.data.status" active-color="#13ce66" inactive-color="#ff4949" active-value="2" inactive-value="1" @change="userActives(props.data.id, $event)">
        </el-switch>
      </template>
      <template v-slot:operation="props">
        <el-button size="mini" @click="editUserData(props.data)">编辑</el-button>
        <el-button size="mini" type="danger" @click="deleteUserData(props.data.id)">删除</el-button>
      </template>
      <template v-slot:delete>
        <el-button type="primary" @click="handleDeleteAll()" class="pull-left" size="mini">批量删除</el-button>
      </template>
    </base-table>
    <!-- 对话框 -->

    <add-user :add-user-dialog.sync="addUserDialog" :editData="editData" @add-edit="getList()">
    </add-user>

  </div>
</template>

<script>
import AddUser from "./component/AddUser";
import { GetList, UserDel, UserActives } from "../../api/user.js";
import BaseTable from "../../components/baseTable/BaseTable";
export default {
  name: "User",
  components: {
    AddUser,
    BaseTable
  },
  data() {
    return {
      loading: false,
      requestData: {
        username: "",
        truename: "",
        phone: "",
        pageNumber: 1,
        pageSize: 10
      },
      userForm: {
        selected: "",
        input: ""
      },
      options: [
        { label: "手机号码", value: "phone" },
        { label: "姓名", value: "name" },
        { label: "邮箱", value: "email" }
      ],
      addUserDialog: false,
      tableData: [],
      tableConfig: {
        total: 0,
        selection: true,
        theadData: [
          { label: "用户名", field: "username" },
          { label: "真实姓名", field: "truename", width: "120" },
          { label: "手机号", field: "phone", width: "200" },
          // { label: "地区编码", field: "region", width: "120" },
          { label: "角色", field: "role", width: "220" },
          {
            label: "禁启用状态",
            field: "status",
            width: "120",
            columnType: "slot",
            slotName: "status"
          },
          { label: "操作", field: "operation", columnType: "slot", slotName: "operation" }
        ]
      },
      selectedItem: [],
      editData: {},
      provinceList: []
    };
  },
  methods: {
    handleAddUser() {
      this.addUserDialog = !this.addUserDialog;
    },
    addUserData() {
      this.editData = {
        btnPerm: "",
        id: "",
        username: "",
        password: "",
        truename: "",
        phone: "",
        region: {},
        status: "",
        role: []
      };
      this.handleAddUser();
    },
    editUserData(data) {
      if (typeof data.role === "string") {
        data.role = data.role.split(",");
      }
      this.editData = data;
      this.handleAddUser();
    },
    deleteUserData(id) {
      this.confirm({
        desc: "删除该条信息, 是否继续?",
        success: this.userDel,
        successData: { id: [id] }
      });
    },
    handleDeleteAll() {
      if (this.selectedItem.length === 0) {
        this.$message.info({
          message: "请选择需要删除的数据",
          showClose: true
        });
        return;
      }
      this.confirm({
        desc: "此操作将永久删除选中信息, 是否继续?",
        tip: "警告",
        success: this.userDel,
        successData: { id: this.selectedItem }
      });
      this.getList();
    },
    handleChange(data) {
      this.selectedItem = [];
      data.forEach(item => {
        this.selectedItem.push(item.id);
      });
    },

    // api
    //获取用户数据列表
    getList() {
      this.loading = true;
      GetList(this.requestData).then(response => {
        this.tableData = response.data.data.data;
        this.tableConfig.total = response.data.data.total;
        this.loading = false;
      });
    },
    userDel(data) {
      UserDel(data).then(response => {
        console.log(response);
      });
      this.getList();
    },
    userActives(id, status) {
      let data = {
        id,
        status
      };
      UserActives(data).then(res => {
        this.$message.success({
          message: res.data.message,
          showClose: true,
        });
      });
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
.el-form-item {
  margin: 0;
  padding-right: 20px;
}
.el-select {
  width: 150px;
}
.btn {
  height: 40px;
  box-sizing: border-box;
}
</style>
