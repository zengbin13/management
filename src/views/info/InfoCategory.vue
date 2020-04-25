<template>
  <div class="info-category">
    <el-button type="danger" @click="addFirstItem()">添加一级分类</el-button>
    <div class="hr"></div>
    <el-row :gutter="30">
      <el-col :span="12">
        <div class="category-wrap">
          <!-- 一级分类 -->
          <div class="category-item" v-for="(firstItem, index) in categoryData" :key="index">
            <div class="first-item" @click="toggleScecondItem(index)">
              <svg-icon :icon-class="firstItem.iconName" class="icon"></svg-icon>
              <h4>{{firstItem.category_name}}</h4>
              <div class="button-group">
                <el-button size="mini" type="danger" round @click.stop="firstItemEdit(index)">编辑</el-button>
                <el-button size="mini" type="success" round @click.stop="firstItemAddChildren(index)">添加子级</el-button>
                <el-button size="mini" round @click.stop="deleteCategory(firstItem.id)">删除</el-button>
              </div>
            </div>
            <ul class="second-item" v-show="firstItem.secondFlag">
              <li v-for="(secondItem, indey) in firstItem.children" :key="indey">
                {{secondItem.category_name}}
                <div class="button-group">
                  <el-button size="mini" type="danger" round @click.stop="secondItemEdit(index, indey)">编辑</el-button>
                  <el-button size="mini" round @click.stop="deleteCategory(secondItem.id)">删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="12" class="category-edit">
        <h4 class="title">分类编辑</h4>
        <el-form label-position="left" label-width="120px" class="edit-form" :model="editForm" ref="editForm">
          <el-form-item label="一级分类名称 :">
            <el-input v-model="editForm.firstItem" :disabled="editForm.disabled1"></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称 :" v-show="isShowSecCategory">
            <el-input v-model="editForm.secondItem" :disabled="editForm.disabled2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size="mini" @click="editFormInfo()">确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SvgIcon from "../../components/svgIcon/SvgIcon";
import {
  GetCategoryAll,
  AddFirstCategory,
  EditCategory,
  DeleteCategory,
  AddChildrenCategory
} from "../../api/info.js";
export default {
  name: "InfoCategory",
  component: {
    SvgIcon
  },
  data() {
    return {
      categoryData: [],
      isShowSecCategory: true,
      editForm: {
        disabled1: true,
        disabled2: true,
        firstItem: "",
        secondItem: ""
      },
      currentIndex: 0,
      currentId: 0,
      // buttonType: ["addFirstItem", editFirstItem,addChildren]
      buttonType: ""
    };
  },
  methods: {
    //是否隐藏二级分类
    toggleScecondItem(index) {
      this.categoryData[index].secondFlag = !this.categoryData[index].secondFlag;
      this.categoryData[index].iconName =
        this.categoryData[index].iconName === "subtract" ? "plus" : "subtract";
    },
    //是否显示二级分类编辑区
    showSeccategory(params) {
      this.isShowSecCategory = Boolean(params);
    },
    //表单输入框不可编辑
    disabledAll(params) {
      this.editForm.disabled1 = Boolean(params);
      this.editForm.disabled2 = Boolean(params);
    },
    disabled1(params) {
      this.editForm.disabled1 = Boolean(params);
      this.editForm.disabled2 = false;
    },
    //点击添加一级分类
    addFirstItem() {
      this.disabledAll(false);
      this.showSeccategory(false);
      this.editForm.firstItem = "";
      this.buttonType = "addFirstItem";
    },
    //添加子级
    firstItemAddChildren(index) {
      // 按钮类型 editFirstItem
      this.buttonType = "addChildren";
      // 一级分类索引值 和 ID
      this.currentIndex = index;
      this.currentId = this.categoryData[index].id;
      //表单可编辑
      this.disabled1(true);
      //获取一级表单内容
      this.editForm.firstItem = this.categoryData[index].category_name;
      this.editForm.secondItem = "";
      //显示二级分类表单
      this.showSeccategory(true);
    },
    //点击一级分类编辑按钮
    firstItemEdit(index) {
      // 按钮类型 editFirstItem
      this.buttonType = "editFirstItem";
      // 一级分类索引值 和 ID
      this.currentIndex = index;
      this.currentId = this.categoryData[index].id;
      //表单可编辑
      this.disabledAll(false);
      //获取一级表单内容
      this.editForm.firstItem = this.categoryData[index].category_name;
      //隐藏二级分类表单
      this.showSeccategory(false);
    },
    //点击二级分类编辑
    secondItemEdit(index, indey) {
      // 按钮类型 editFirstItem
      this.buttonType = "editSecondItem";
      // 一级分类索引值 和 ID
      this.currentIndex = index;
      this.currentId = this.categoryData[index].children[indey].id;
      //表单可编辑
      this.disabled1(true);
      //获取二级表单内容
      this.editForm.firstItem = this.categoryData[index].category_name;
      this.editForm.secondItem = this.categoryData[index].children[indey].category_name;
      //显示二级分类表单
      this.showSeccategory(true);
    },
    //点击删除按钮
    deleteCategory(id) {
      const data = { categoryId: id };
      this.$confirm("确定删除此消息", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          DeleteCategory(data).then(response => {
            this.$message.success({
              message: response.data.message,
              showClose: true
            });
            this.getCategoryAll();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //重置表单信息
    resetForm() {
      this.editForm.firstItem = "";
      this.editForm.secondItem = "";
    },
    editFormInfo() {
      //新增一级分类
      if (this.buttonType === "addFirstItem") {
        const data = {
          categoryName: this.editForm.firstItem
        };
        this.addFirstCategory(data);
      }
      //编辑一级分类
      if (this.buttonType === "editFirstItem") {
        const data = {
          id: this.currentId,
          categoryName: this.editForm.firstItem
        };
        this.editCategory(data, 1);
      }
      //添加二级分类
      if (this.buttonType === "addChildren") {
        const data = {
          parentId: this.currentId,
          categoryName: this.editForm.secondItem
        };
        this.addChildrenCategory(data);
      }
      //编辑二级分类
      if (this.buttonType === "editSecondItem") {
        const data = {
          id: this.currentId,
          categoryName: this.editForm.secondItem
        };
        this.editCategory(data, 2);
      }
    },
    // api 请求
    getCategoryAll() {
      this.$store
        .dispatch("info/getCategoryAll")
        .then(response => {
          this.categoryData = response;
        })
        .catch(error => {
          console.log(error);
        });
    },
    addFirstCategory(data) {
      if (this.editForm.firstItem === "") {
        this.$message.error({
          message: "分类名称不能为空",
          showClose: true
        });
        return;
      }
      AddFirstCategory(data).then(response => {
        this.$message.success({
          message: response.data.message,
          showClose: true
        });
        this.getCategoryAll();
        this.resetForm();
      });
    },
    editCategory(data, item) {
      if (this.editForm.firstItem === "") {
        this.$message.error({
          message: "分类名称不能为空",
          showClose: true
        });
        return;
      }
      EditCategory(data).then(response => {
        this.$message.success({
          message: response.data.message,
          showClose: true
        });
        this.getCategoryAll();
        if (item === 1) {
          this.resetForm();
        }
        if (item === 2) {
          this.editForm.secondItem = "";
        }
      });
    },
    addChildrenCategory(data) {
      if (this.editForm.secondItem === "") {
        this.$message.error({
          message: "分类名称不能为空",
          showClose: true
        });
        return;
      }
      AddChildrenCategory(data).then(response => {
        this.$message.success({
          message: response.data.message,
          showClose: true
        });
        //可编辑一级表单
        this.getCategoryAll();
        this.editForm.secondItem = "";
      });
    }
  },
  mounted() {
    this.getCategoryAll();
  }
};
</script>

<style lang="scss" scoped>
.info-category {
  line-height: 44px;
}
.hr {
  margin: 30px 0;
  height: 1px;
  background-color: rgb(180, 180, 180);
}
.category-item:last-child .second-item::before {
  bottom: 20px;
}
.first-item {
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: #f3f3f3;
    .button-group {
      display: block;
    }
  }
  .icon {
    position: relative;
    margin: 0 14px;
    background-color: #fff;
    z-index: 100;
  }
  h4 {
    display: inline-block;
    margin: 0;
    transition: all 0.3s ease 0s;
  }
  .button-group {
    position: absolute;
    bottom: 0;
    right: 20px;
    display: none;
    button {
      font-size: 12px;
    }
  }
}
.second-item {
  list-style-type: none;
  margin: 0 0 0 22px;
  padding: 0;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    left: -1px;
    top: -20px;
    bottom: -20px;
    width: 2px;
    border-left: 1px dashed #000;
  }
  li {
    position: relative;
    transition: all 0.3s ease 0s;
    cursor: pointer;
    .button-group {
      position: absolute;
      bottom: 0;
      right: 20px;
      display: none;
      button {
        font-size: 12px;
      }
    }
    &:hover {
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
    &::before {
      content: "";
      display: inline-block;
      position: relative;
      top: -5px;
      width: 32px;
      height: 6px;
      margin-right: 10px;
      border-bottom: 1px dashed #000;
    }
  }
}
.category-edit {
  h4 {
    margin: 0;
    padding: 0 20px;
    background-color: #f3f3f3;
  }
  .edit-form {
    margin-top: 30px;
    width: 400px;
  }
}
</style>
