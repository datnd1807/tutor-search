<template>
  <div>
    <el-dialog
      title="Update Class"
      :visible="dialogVisible"
      v-on:update:visible="visibleSync = $event"
      width="50%"
      top="5vh"
      :close-on-click-modal="false"
      @close="handleClose"
    >
      <el-form
        :model="classData"
        ref="classData"
        :rules="rules"
        label-width="120px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="Class Name" prop="name">
          <el-input type="text" v-model="classData.name"></el-input>
        </el-form-item>

        <el-form-item :label="classData.status" prop="status">
          <el-switch
            v-model="classData.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="Active"
    inactive-value="Inactive"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input
            type="textarea"
            v-model="classData.description"
            :autosize="{ minRows: 3, maxRows: 5 }"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" @click="handleSubmit('classData')"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "update-class",
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
      set(value) {
        this.setClass(value);
      },
    },
    status:{
      get(){
        return (this.classData.status === "Active") ? true : false
      }
    }
  },

  data() {
    return {
      isValidate: false,
      rules: {
        name: [
          {
            required: true,
            message: "Please input class name",
            trigger: "blur",
          },
          {
            min: 1,
            max: 50,
            message: "Length should be 1 to 50",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "Please input class description",
            trigger: "blur",
          },
        ],
      },
    };
  },

  methods: {
    ...mapActions(["updateClass", "getAllClassesAction"]),
    ...mapMutations(["setClass","setClassStatus"]),

    handleClose() {
      this.$emit("close");
    },
    statusChange(){
      let statusName = (this.status) ? "Active" : "Inactive"
      this.classData.status = statusName
    },

    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateClass().then((response) => {
            if (response === 204) {
              this.$message({
                message: "Update successfully!!",
                type: "success",
              });
              this.handleClose();
              this.getAllClassesAction()
            } else {
              this.$message({
                message: "Update fail!!",
                type: "error",
              });
              return false;
            }
          });
        } else {
          return false;
        }
      });
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