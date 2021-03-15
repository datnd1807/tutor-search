<template>
  <div>
    <el-dialog
      title="Create New Class"
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
        <el-form-item label="Description" prop="description">
          <el-input
            type="textarea"
            v-model="classData.description"
            :autosize="{ minRows: 3, maxRows: 5 }"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="handleClose">Cancel</el-button>
          <el-button type="primary" @click="insertClassBtn('classData')"
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
  name: "create-class",
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
    ...mapActions(["insertClass", "getAllClassesAction"]),
    ...mapMutations(["setClass"]),
    
    handleClose() {
      this.$emit("close");
    },
    
    insertClassBtn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.insertClass().then((response) => {
            if (response === 204) {
              this.$message({
                message: "Insert successfully!!",
                type: "success",
              });
              this.handleClose();
              this.getAllClassesAction()
            }
            else {
              this.$message({
                message: "Insert fail!!",
                type: "error",
              });
              return false
            }
          });
        } else {
          return false;
        }
      })
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