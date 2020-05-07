<template>
  <div>
    <el-table :data="tableData" border stripe @selection-change="handleChange">
      <!-- 多选 -->
      <el-table-column v-if="tableConfig.selection" type="selection" width="55"></el-table-column>
      <template v-for="item in tableConfig.theadData">
        <!--v-slot-->
        <el-table-column :key="item.field" :prop="item.field" :label="item.label" :width="item.width" v-if="item.columnType === 'slot'">
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!--文本数据渲染-->
        <el-table-column :prop="item.field " :key="item.label" :label="item.label" :width="item.width" v-else>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer clearfix">
      <slot name="delete"></slot>
      <el-pagination background layout="prev, pager, next" :total="tableConfig.total" class="pull-right">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { LoadTableData } from "../../api/common.js";
export default {
  name: "base-table",
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    tableConfig: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {};
  },
  methods: {
    loadTableData() {
      let requestData = {
        url: this.tableConfig.requestConfig.url,
        data: this.config.requestConfig.requestData
      };
      LoadTableData(requestData).then(response => {
        console.log(response);
      });
    },
    handleChange(data) {
      this.$emit("selection-change", data);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-table {
  margin-top: 30px;
}
.footer {
  margin-top: 30px;
}
</style>
