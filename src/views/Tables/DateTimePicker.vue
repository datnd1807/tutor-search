<template>
  <div>
    <el-date-picker
      v-model="valueDateTime"
      type="daterange"
      range-separator="/"
      start-placeholder="Start date"
      end-placeholder="End date"
      :picker-options="pickerOption"
      @change="activeEventDate(valueDateTime)"
    >
    </el-date-picker>
  </div>
</template>
<script>
export default {
  name: "date-time-picker",
  data() {
    return {
      valueDateTime: [],
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  methods:{
    activeEventDate(value){
      this.$emit('activeDatePicker', value);
    }
  }
};
</script>