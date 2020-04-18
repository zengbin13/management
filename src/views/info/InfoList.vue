<template>
  <div>
    <!-- 表单 筛选信息 -->
    <el-form :model="formInline" :inline="true">
      <el-row :gutter="14">
        <el-col :span="4" class="label-wrap selecte-type">
          <label for="">类型:</label>
          <div class="wrap-content">
            <el-select v-model="formInline.selectedType" placeholder="请选择" style="width:100%">
              <el-option v-for="(item, index) in typeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
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
        <el-col :span="3" class="label-wrap input">
          <div class="wrap-content">
            <el-input v-model="formInline.input" placeholder="请输入内容" style="width:100%"></el-input>
          </div>
        </el-col>
        <el-col :span="2" class="label-wrap search">
          <el-button type="danger">搜索</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- 表格 内容 -->
    <el-table :data="tableData">
      <el-table-column type="selection" width="55">></el-table-column>
      <el-table-column prop="title" label="标题" width="120">
      </el-table-column>
      <el-table-column prop="type" label="类别" width="120">
      </el-table-column>
      <el-table-column prop="date" label="日期">
      </el-table-column>
      <el-table-column prop="manage" label="管理人">
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Info",
  data() {
    return {
      formInline: {
        selectedType: "",
        selectedKeyword: "",
        date: [],
        input: ""
      },
      typeOptions: [
        { label: "国际信息", value: "选项一" },
        { label: "国内信息", value: "选项二" },
        { label: "行业信息", value: "选项三" }
      ],
      keywordOptions: [
        { label: "ID", value: "选项一" },
        { label: "标题", value: "选项二" }
      ],
      tableData: []
    };
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
  &.search {
    height: 40px;
  }
}
</style>
