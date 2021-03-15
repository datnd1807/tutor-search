<template>
  <el-select
    v-model="valueDropDown"
    placeholder="Select subject"
    v-on:change="getValue(valueDropDown)"
  >
    <el-option
      v-for="data in dataDropDown"
      :key="data.id"
      :label="data.name"
      :value="data.name"
    ></el-option>
  </el-select>
</template>
<script>
import axios from "axios";
export default {
  name: "drop-down",
  data() {
    return {
      dataDropDown: [],
      valueDropDown: null,
    };
  },
  methods: {
    getValue(subject) {
      console.log(subject);
    },
  },
  created() {
    this.valueDropDown = this.dataDropDown;
    axios
      .get(`http://localhost:8080///api/subjects/all`)
      .then((response) => {
        this.dataDropDown = response.data;
      })
      .catch((e) => {
        this.error.push(e);
      });
  },
};
</script>