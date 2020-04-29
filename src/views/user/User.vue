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
        <el-button type="danger" class="btn" @click="handleAddUser()">添加用户</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <base-table :tableData="tableData" :table-config="tableConfig">
      <template v-slot:status="props">
        <el-switch v-model="props.data.status" active-color="#13ce66" inactive-color="#ff4949">
        </el-switch>
      </template>
      <template v-slot:operation>
        <el-button size="mini">编辑</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </template>
    </base-table>
    <!-- 对话框 -->
    <add-user :add-user-dialog.sync="addUserDialog">
    </add-user>
  </div>
</template>

<script>
import AddUser from "./component/AddUser";
import BaseTable from "../../components/baseTable/BaseTable";
export default {
  name: "User",
  components: {
    AddUser,
    BaseTable
  },
  data() {
    return {
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
      tableData: [
        {
          userName: "1234",
          trueName: "234",
          phone: "1234567",
          region: "重庆",
          role: "管理员",
          status: false
        },
        {
          userName: "1234",
          trueName: "234",
          phone: "1234567",
          region: "重庆",
          role: "管理员",
          status: false
        },
        {
          userName: "1234",
          trueName: "234",
          phone: "1234567",
          region: "重庆",
          role: "管理员",
          status: false
        }
      ],
      tableConfig: {
        selection: true,
        theadData: [
          { label: "用户名", field: "userName" },
          { label: "真实姓名", field: "trueName", width: "120" },
          { label: "手机号", field: "phone", width: "200" },
          { label: "地区", field: "region", width: "120" },
          { label: "角色", field: "role", width: "120" },
          {
            label: "禁启用状态",
            field: "status",
            width: "120",
            columnType: "slot",
            slotName: "status"
          },
          { label: "操作", field: "operation", columnType: "slot", slotName: "operation" }
        ]
      }
    };
  },
  methods: {
    handleAddUser() {
      this.addUserDialog = !this.addUserDialog;
    },
    // api
    //获取table的数据
    getInfoList() {
      GetInfoList(this.requestInfoList).then(response => {
        this.total = response.data.data.total;
        this.tableData = response.data.data.data;
        this.tableLoading = false;
      });
    }
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
