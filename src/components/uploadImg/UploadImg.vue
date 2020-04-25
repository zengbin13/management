<template>
  <el-upload class="avatar-uploader" :action="uploadImgConfig.action" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :data="uploadKey">
    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
//组件最终实现的功能——上传图片模块的封装
//组件完成过程需要的数据——七牛云token, 上传图片的地址
//组件完成过程保存的数据——修改该条数据的imgUrl
import { UploadImgToken } from "@/api/common.js";
export default {
  name: "UploadImg",
  props: {
    imgUrl: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      uploadImgConfig: {
        action: "http://up-z2.qiniup.com",
        accesskey: "Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTRKJj",
        secretkey: "l9AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw",
        buckety: "webjshtml"
      },
      uploadKey: {
        token: "",
        key: ""
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      //将保存图片的地址 http://www-web-jshtml-cn-idva7mx.web-jshtml.cn/
      // this.imgUrl = `http://www-web-jshtml-cn-idva7mx.web-jshtml.cn/${res.key}`;
      this.$emit("update:imgUrl", `http://www-web-jshtml-cn-idva7mx.web-jshtml.cn/${res.key}`);
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
    //获取七牛云token
    uploadImgToken() {
      UploadImgToken(this.uploadImgConfig).then(response => {
        this.uploadKey.token = response.data.data.token;
      });
    }
  },
  mounted() {
    this.uploadImgToken();
  }
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