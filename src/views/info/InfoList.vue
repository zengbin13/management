<template>
  <div>
    <!-- 表单 筛选信息 -->
    <el-form :model="formInline" :inline="true">
      <el-row :gutter="14">
        <el-col :span="4" class="label-wrap selecte-type">
          <label for="">类型:</label>
          <div class="wrap-content">
            <el-select v-model="formInline.selectedType" placeholder="请选择" style="width:100%">
              <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.category_name" :value="item.id"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="7" class="label-wrap selecte-date">
          <label for="">日期:</label>
          <div class="wrap-content">
            <el-date-picker v-model="formInline.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" style="width:100%">
            </el-date-picker>
          </div>
        </el-col>
        <el-col :span="4" class="label-wrap selecte-keyword">
          <label for="">关键字:</label>
          <div class="wrap-content">
            <el-select v-model="formInline.selectedKeyword" placeholder="请选择" style="width:100%">
              <el-option v-for="(item, index) in keywordOptions" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4" class="label-wrap input">
          <div class="wrap-content">
            <el-input v-model="formInline.input" placeholder="请输入内容" style="width:100%"></el-input>
          </div>
        </el-col>
        <el-col :span="2" class="label-wrap">
          <div class="label-wrap button">
            <div class="wrap-content">
              <el-button type="danger" style="width:70px">搜索</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="2" class="label-wrap pull-right">
          <div class="label-wrap button">
            <div class="wrap-content">
              <el-button type="danger" style="width:70px" @click="handleAddInfo()">新增</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格 内容 -->
    <el-table :data="tableData" border style="width: 100%" class="table">
      <el-table-column type="selection" width="45">
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="category" label="类别" width="180">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="220">
      </el-table-column>
      <el-table-column prop="user" label="管理人" width="120">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="">
          <el-button size="mini" type="danger" @click="deleteItem()">删除</el-button>
          <el-button size="mini" type="success">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部分页 -->
    <el-row class="pagination">
      <el-col :span="12">
        <el-button size="mini" @click="deleteItems()">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination background layout="prev, pager, next, jumper" :total="100" class="pull-right">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- dialog -->
    <add-dialog :addDialog.sync="addDialog" :type-options="typeOptions"></add-dialog>
  </div>
</template>

<script>
import { GetInfoList, AddInfo, EditInfo, DeleteInfo, GetCategoryAll } from "../../api/info.js";
import AddDialog from "./component/dialog/AddDialog";
export default {
  name: "Info",
  components: {
    AddDialog
  },
  data() {
    return {
      formInline: {
        selectedType: "",
        selectedKeyword: "",
        date: [],
        input: ""
      },
      typeOptions: [],
      keywordOptions: [
        { label: "ID", value: "选项一" },
        { label: "标题", value: "选项二" }
      ],
      tableData: [
        {
          id: "7338",
          title: "xxx",
          categoryId: "3993",
          createDate: "1587507833",
          content: "xxxxxxxx",
          imgUrl: null
        },
        {
          title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
          category: "国际信息",
          date: "2019-09-10 19:31:31",
          user: "管理员"
        },
        {
          title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
          category: "国际信息",
          date: "2019-09-10 19:31:31",
          user: "管理员"
        }
      ],
      total: 0,
      addDialog: false
    };
  },
  methods: {
    handleAddInfo() {
      this.addDialog = !this.addDialog;
    },
    deleteItem() {
      this.confirm({
        desc: "删除该条信息, 是否继续?"
      });
    },
    deleteItems() {
      this.confirm({
        desc: "此操作将永久删除选中信息, 是否继续?",
        tip: "警告",
        success: this.confirmDelete
      });
    },
    confirmDelete() {
      console.log("确定删除");
    },
    // api 请求
    getCategoryAll() {
      GetCategoryAll().then(response => {
        this.typeOptions = response.data.data;
      });
    },
    getInfoList() {
      const data = {
        pageNumber: 1,
        pageSize: 10
      };
      GetInfoList(data)
        .then(response => {
          console.log(response.data.data);
          this.tableData = response.data.data.data;
          this.total = response.data.data.total;
        })
        .catch(error => {
          console.log(error);
        });
    }
    //
  },
  mounted() {
    this.getInfoList();
    this.getCategoryAll();
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
  &.selecte-type {
    @include label(left, 55);
  }
  &.selecte-date {
    margin-left: 20px;
    @include label(left, 55);
  }
  &.selecte-keyword {
    margin-left: 15px;
    @include label(left, 70);
  }
  &.button {
    @include label(right, 0);
    button {
      height: 40px;
      padding: 0;
    }
  }
}
.table {
  margin-top: 35px;
}
.pagination {
  margin-top: 35px;
}
</style>
