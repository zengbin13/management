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
            <el-date-picker v-model="formInline.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" style="width:100%">
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
              <el-button type="danger" style="width:70px" @click="search()">搜索</el-button>
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
    <el-table :data="tableData" border style="width: 100%" class="table" v-loading="tableLoading" height="450" @selection-change="handleSelection">
      <el-table-column type="selection" width="45">
      </el-table-column>
      <el-table-column prop="title" label="标题">
      </el-table-column>
      <el-table-column prop="categoryId" label="类别" width="180" :formatter="toCategoryId">
      </el-table-column>
      <el-table-column prop="createDate" label="日期" width="220" :formatter="toDate">
      </el-table-column>
      <el-table-column prop="user" label="管理人" width="120">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部分页 -->
    <el-row class="pagination">
      <el-col :span="12">
        <el-button size="mini" @click="deleteItems()">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination background layout="total,prev, pager, next, jumper" :total="total" class="pull-right" @prev-click="handlePrev()" @current-change="handleCurrentChange" @next-click="handleNext()">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- dialog -->
    <info-dialog :addDialog.sync="addDialog" :type-options="typeOptions" @get-info-list="getInfoList()" :title="'新增'">
    </info-dialog>
    <info-dialog :addDialog.sync="editDailog" :type-options="typeOptions" :edit-dailog-data="editDailogData" @get-info-list="getInfoList()">
    </info-dialog>
  </div>
</template>

<script>
import { GetInfoList, AddInfo, EditInfo, DeleteInfo, GetCategoryAll } from "../../api/info.js";
import InfoDialog from "./component/dialog/InfoDialog";
import { timeFormat } from "../../utils/timeFormat.js";
export default {
  name: "Info",
  components: {
    InfoDialog
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
        { label: "ID", value: "ID" },
        { label: "标题", value: "标题" }
      ],
      addDialog: false,
      tableData: [],
      total: 0,
      requestInfoList: {
        categoryId: "",
        startTiem: "",
        endTime: "",
        title: "",
        id: "",
        pageNumber: 1,
        pageSize: 10
      },
      tableLoading: false,
      editDailog: false,
      editDailogData: {
        type: "",
        title: "",
        content: ""
      },
      selectedInfo: []
    };
  },
  methods: {
    // 点击新增数据
    handleAddInfo() {
      this.addDialog = !this.addDialog;
    },
    // 点击编辑数据
    handleEdit(row) {
      this.editDailogData = {
        id: row.id,
        type: this.toCategoryId(row),
        typeId: row.categoryId,
        title: row.title,
        content: row.content
      };
      this.editDailog = !this.editDailog;
    },
    // 点击删除数据
    deleteItem(row) {
      this.confirm({
        desc: "删除该条信息, 是否继续?",
        success: this.deleteInfo,
        successData: { id: [row.id] }
      });
    },
    // 点击批量删除
    deleteItems() {
      if (this.selectedInfo.length === 0) {
        this.$message.warning({
          message: "请选择需要删除的数据",
          showClose: true
        });
        return;
      }
      this.confirm({
        desc: "此操作将永久删除选中信息, 是否继续?",
        tip: "警告",
        success: this.deleteInfo,
        successData: { id: this.selectedInfo }
      });
    },
    // 点击前一页
    handlePrev() {
      this.requestInfoList.pageNumber--;
      this.getInfoList();
    },
    // 点击后一页
    handleNext() {
      this.requestInfoList.pageNumber++;
      this.getInfoList();
    },
    // 选择数据
    handleCurrentChange(value) {
      this.requestInfoList.pageNumber = value;
      this.getInfoList();
    },
    // 格式化类别
    toCategoryId(cellValue) {
      const type = this.typeOptions.find(item => {
        return cellValue.categoryId == item.id;
      });
      return type === undefined ? "未分类" : type.category_name;
    },
    // 格式化日期
    toDate(cellValue) {
      return timeFormat(cellValue.createDate);
    },
    handleSelection(value) {
      this.selectedInfo = value.map(item => {
        return item.id;
      });
    },
    // 点击搜索
    search() {
      //根据ID检索
      if (this.formInline.selectedKeyword === "ID") {
        this.requestInfoList.title = "";
        this.requestInfoList.id = this.formInline.input;
      }
      //根据标题检索
      if (this.formInline.selectedKeyword === "标题") {
        this.requestInfoList.title = this.formInline.input;
        this.requestInfoList.id = "";
      }
      //类别
      this.requestInfoList.categoryId = this.formInline.selectedType;
      //日期
      this.requestInfoList.startTiem = this.formInline.date[0];
      this.requestInfoList.endTime = this.formInline.date[1];
      //发送请求
      this.getInfoList();
    },
    // api 请求
    getCategoryAll() {
      GetCategoryAll().then(response => {
        this.typeOptions = response.data.data;
      });
    },
    getInfoList() {
      this.tableLoading = true;
      GetInfoList(this.requestInfoList)
        .then(response => {
          this.total = response.data.data.total;
          this.tableData = response.data.data.data;
          this.tableLoading = false;
        })
        .catch(error => {
          this.tableLoading = false;
          console.log(error);
        });
    },
    deleteInfo(data) {
      this.tableLoading = true;
      DeleteInfo(data).then(response => {
        this.getInfoList();
        this.tableLoading = false;
      });
    }
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
  // height: 450px;
  margin-top: 35px;
}

.pagination {
  margin-top: 35px;
}
</style>
