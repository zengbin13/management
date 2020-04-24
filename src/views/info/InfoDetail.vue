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
        <el-upload
          class="avatar-uploader"
          :action="uploadImgConfig.action"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :data="uploadKey"
        >
          <img
            v-if="detailForm.imgUrl"
            :src="detailForm.imgUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      // 图片上传配置
      uploadImgConfig: {
        action: "http://up-z2.qiniup.com",
        accesskey: "Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTRKJj",
        secretkey: "l9AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw",
        buckety: "webjshtml",
      },
      uploadKey: {
        token: "",
        key: "",
      },
    };
  },
  components: {
    quillEditor,
  },
  computed: {
    categoryData() {
      return this.$store.state.info.categoryData;
    },
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //将保存图片的地址
      //http://www-web-jshtml-cn-idva7mx.web-jshtml.cn/
      this.detailForm.imgUrl = `http://www-web-jshtml-cn-idva7mx.web-jshtml.cn/${res.key}`;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      //文件名转码
      let key = encodeURI(`${file.name}`);
      this.uploadKey.key = key;
      return isJPG && isLt2M;
    },
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
    //获取七牛云token
    uploadImgToken() {
      // 图片上传配置
      UploadImgToken(this.uploadImgConfig).then((response) => {
        this.uploadKey.token = response.data.data.token;
      });
    },
  },
  mounted() {
    this.getRouteData();
    this.getCategoryData();
    this.getInfoList();
    this.uploadImgToken();
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
