import { MessageBox } from "element-ui";
export default {
  install(Vue, options) {
    Vue.prototype.confirm = function(params) {
      const desc = params.desc || "确定完成该操作?";
      const tip = params.tip || "提示";
      this.$confirm(desc, tip, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: params.type || "warning",
        center: true,
      })
        .then(() => {
          params.success && params.success(params.successData);
          this.$message.success({
            type: "success",
            message: "删除成功",
            showClose: true,
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            showClose: true,
          });
        });
    };
  },
};
