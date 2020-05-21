<template>
  <el-row :gutter="15" style="overflow:hidden">
    <el-col :span="8">
      <el-select placeholder="请选择" v-model="province" @change="handleProvince">
        <el-option v-for="item in provinceOptions" :key="item.PROVINCE_CODE" :label="item.PROVINCE_NAME" :value="item.PROVINCE_CODE">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-select placeholder="请选择" v-model="city" @change="handleCity">
        <el-option v-for="item in cityOptions" :key="item.CITY_CODE" :label="item.CITY_NAME" :value="item.CITY_CODE">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-select placeholder="请选择" v-model="area" @change="handleArea">
        <el-option v-for="item in areaOptions" :key="item.AREA_CODE" :label="item.AREA_NAME" :value="item.AREA_CODE">
        </el-option>
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
import { GetCityNames } from "../../api/common.js";
export default {
  name: "CityPicker",
  props: {
    region: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      province: "",
      city: "",
      area: "",
      provinceOptions: [],
      cityOptions: [{ CITY_CODE: 0, CITY_NAME: "空" }],
      areaOptions: [{ AREA_CODE: 0, AREA_NAME: "空" }]
    };
  },
  watch: {
    region(value) {
      if (Object.keys(value).length !== 0) {
        console.log(value);
        this.province = value.province;
        this.city = value.city;
        this.area = value.area;
        GetCityNames({ type: "city", province_code: this.province }).then(response => {
          this.cityOptions = response.data.data.data;
        });
        GetCityNames({ type: "area", city_code: this.city }).then(response => {
          this.areaOptions = response.data.data.data;
        });
      }
    }
  },
  methods: {
    getCityNames(data) {
      GetCityNames(data).then(response => {
        this.provinceOptions = response.data.data.data;
      });
    },
    handleProvince() {
      this.city = "";
      this.cityOptions = [{ CITY_CODE: 0, CITY_NAME: "空" }];
      this.area = "";
      this.areaOptions = [{ AREA_CODE: 0, AREA_NAME: "空" }];
      GetCityNames({ type: "city", province_code: this.province }).then(response => {
        this.cityOptions = response.data.data.data;
      });
    },
    handleCity() {
      this.area = "";
      this.areaOptions = [{ AREA_CODE: 0, AREA_NAME: "空" }];
      GetCityNames({ type: "area", city_code: this.city }).then(response => {
        this.areaOptions = response.data.data.data;
      });
    },
    handleArea() {
      const region = {
        province: this.province,
        city: this.city,
        area: this.area
      };
      this.$emit("region-data", region);
    }
  },
  mounted() {
    this.getCityNames({ type: "province" });
  }
};
</script>

<style lang="scss" scoped>
</style>
