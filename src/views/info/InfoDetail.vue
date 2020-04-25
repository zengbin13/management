<template>
  <div>
    <el-form :model="detailForm" ref="detailForm" label-width="120px">
      <el-form-item label="信息分类 :">
        <el-select v-model="detailForm.categoryId" placeholder="请选择">
          <el-option
            v-for="item in categoryData"
            :key="item.id"
            :label="item.category_name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="信息标题 :">
        <el-input
          v-model="detailForm.title"
          placeholder="请填写标题"
          style="width: 40%"
        ></el-input>
      </el-form-item>
      <el-form-item label="缩略图 :">
        <upload-img :imgUrl.sync="detailForm.imgUrl"></upload-img>
      </el-form-item>
      <el-form-item label="发布日期 :">
        <el-date-picker
          v-model="detailForm.createDate"
          disabled
          type="date"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="详细内容 :">
        <quill-editor v-model="detailForm.content" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="editInfo" :loading="submitLoading"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { GetCategoryAll, GetInfoList, EditInfo } from "../../api/info";
import { UploadImgToken } from "../../api/common.js";
import { timeFormat } from "../../utils/timeFormat.js";
import UploadImg from '../../components/uploadImg/UploadImg'
//富文本编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

export default {
  name: "InfoDetail",
  data() {
    return {
      detailForm: {
        categoryId: "",
        title: "",
        content: "",
        imgUrl: "",
        createDate: "",
      },
      routeData: {},
      detailInfo: {},
      submitLoading: false,
    };
  },
  components: {
    quillEditor,
    UploadImg
  },
  computed: {
    categoryData() {
      return this.$store.state.info.categoryData;
    },
  },
  methods: {
    //api
    editInfo() {
      const data = this.detailForm;
      data.id = this.routeData.id;
      this.submitLoading = true;
      EditInfo(data).then((response) => {
        // this.getInfoList();
        this.submitLoading = false;
        this.$message.success({
          message: response.data.message,
        });
      });
    },
    getRouteData() {
      this.routeData = this.$route.query;
    },
    getCategoryData() {
      this.$store.dispatch("info/getCategoryAll");
    },
    getInfoList() {
      const data = {
        id: this.routeData.id,
        pageNumber: 1,
        pageSize: 1,
      };
      GetInfoList(data).then((response) => {
        this.detailInfo = response.data.data.data[0];
        for (const key in this.detailForm) {
          this.detailForm[key] = this.detailInfo[key];
        }
        this.detailForm.createDate = timeFormat(this.detailInfo.createDate);
      });
    },
  },
  mounted() {
    this.getRouteData();
    this.getCategoryData();
    this.getInfoList();
  },
};
</script>

<style lang="scss" scoped>
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
