<template>
  <div>
    <el-dialog
      title="Class Detail"
      :visible="dialogVisible"
      v-on:update:visible="visibleSync = $event"
      width="50%"
      top="5vh"
      @close="handleClose"
    >
      <el-form
        :model="classData"
        ref="classData"
        label-width="120px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="Class Name" prop="name">
          <el-input type="text" v-model="classData.name" readonly></el-input>
        </el-form-item>
        <el-form-item label="Create By" prop="updatedBy">
          <el-input
            type="text"
            v-model="classData.updatedBy"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item label="Create Date" prop="updatedDate">
          <el-input
            type="text"
            v-model="classData.updatedDate"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="classData.updateBy !== null"
          label="Update By"
          prop="updatedBy"
        >
          <el-input
            type="text"
            v-model="classData.updatedBy"
            readonly
          ></el-input>
        </el-form-item>
        <el-form-item
          v-if="classData.updateBy !== null"
          label="Update Date"
          prop="updatedDate"
        >
          <el-input
            type="text"
            v-model="classData.updatedDate"
            readonly
          ></el-input>
        </el-form-item>

        <el-form-item :label="classData.status" prop="status">
          <el-switch
            v-model="status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            disabled
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input
            type="textarea"
            v-model="classData.description"
            :autosize="{ minRows: 3, maxRows: 5 }"
            readonly
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "class-detail",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
    },
  },
  computed: {
    ...mapGetters(["getClass"]),
    classData: {
      get() {
        return this.getClass;
      },
    },
    status: {
      get() {
        return this.classData.status === "Active" ? true : false;
      },
    },
  },

  data() {
    return {
      isValidate: false,
    };
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
  },
  watch: {
    visbleSync(val) {
      this.$emit("update:dialogVisible", val);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>