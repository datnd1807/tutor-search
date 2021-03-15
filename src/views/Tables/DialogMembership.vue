<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">Create</el-button>
    <el-dialog :visible.sync="dialogVisible" width="18%" top="30px">
      <span slot="title" class="fontSize"
        ><i class="el-icon-star-on"></i>Create membership</span
      >
      <el-form
        label-width="120px"
        :inline="true"
        class="demo-form-inline"
        label-position="left"
        :model="dataMembership"
        ref="dataMembership"
      >
        <el-form-item
          label="Name"
          prop="name"
          class="col-lg-10"
        >
          <el-input v-model="dataMembership.name" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="Point Rate" prop="pointRate" class="col-lg-5">
          <el-input type="number" v-model="dataMembership.pointRate"></el-input>
        </el-form-item>
        <el-form-item label="Point Amount" prop="pointAmount" class="col-lg-5">
          <el-input
            type="number"
            v-model="dataMembership.pointAmount"
          ></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description" class="col-lg-10">
          <el-input
            type="textarea"
            v-model="dataMembership.description"
            maxlength="100"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createMemberships(dataMembership)"
          >Create</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import {mapActions } from "vuex";
export default {
  name: "dialog-membership",
  data() {
    return {
      dialogVisible: false,
      dataMembership: 
        {
          description: "",
          name: "",
          pointRate: "",
          pointAmount: "",
          updatedDate: "",
          updatedBy: "",
          status: "",
        },
    };
  },
  methods: {
    ...mapActions(["createMembership"]),
    createMemberships(formName) {
      // this.$confirm("Do you want to create ?", "Warning", {
      //   confirmButtonText: "OK",
      //   cancelButtonText: "Cancel",
      //   type: "warning",
      // })
      //   .then(() => {
      //     // this.dialogVisible = false;
      //     this.dataMembership.updatedDate = moment(new Date()).format(
      //       "YYYY-MM-DDTHH:mm:ss"
      //     );
      //     this.dataMembership.updatedBy = 3;
      //     this.dataMembership.status = "Active";
      //     this.dataMembership.pointRate = parseFloat(
      //       this.dataMembership.pointRate
      //     );
      //     this.dataMembership.pointAmount = parseFloat(
      //       this.dataMembership.pointAmount
      //     );
      //     this.createMembership(this.dataMembership);
      //     this.$message({
      //       type: "success",
      //       message: "Create completed",
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "Create canceled",
      //     });
      //   });
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped lang=scss>
.fontSize {
  font-size: 20px;
}
.labelColor {
  font-weight: bold;
  margin: 8px 8px;
}
.text-search {
  margin-top: 8px;
  font-size: 14px;
  color: #606266;
}
</style>