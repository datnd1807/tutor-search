<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">Create</el-button>
    <el-dialog :visible.sync="dialogVisible" width="18%" top="30px">
      <span slot="title" class="fontSize"
        ><i class="el-icon-money"></i>Create fee</span
      >
      <el-form
        label-width="120px"
        :inline="true"
        class="demo-form-inline"
        label-position="left"
        :model="dataFee"
        ref="dataFee"
      >
        <el-form-item
          label="Name"
          prop="name"
          class="col-lg-10"
        >
          <el-input v-model="dataFee.name" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="Price" prop="price" class="col-lg-5">
          <el-input type="number" v-model="dataFee.price"></el-input>
        </el-form-item>
        <el-form-item label="Description" prop="description" class="col-lg-10">
          <el-input
            type="textarea"
            v-model="dataFee.description"
            maxlength="150"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="createFees(dataFee)"
          >Create</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import { mapActions } from "vuex";
export default {
  name: "dialog-fee",
  data() {
    return {
      dialogVisible: false,
      flagName: true,
      flagPointRate: true,
      flagPointAmount: true,
      dataFee: {
        description: "",
        name: "",
        price: "",
        updatedDate: "",
        updateBy: "",
        status: "",
      },
    };
  },
  methods: {
    ...mapActions(["createFee"]),
    createFees() {
      if (this.dataFee.name.trim().length != 0 && this.dataFee.price.trim().length != 0) {
        this.$confirm("Do you want to create ?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            // this.dialogVisible = false;
            this.dataFee.updatedDate = moment(new Date()).format(
              "YYYY-MM-DDTHH:mm:ss"
            );
            this.dataFee.updateBy = 6;
            this.dataFee.status = "Active";
            this.dataFee.price = parseFloat(this.dataFee.price);
            this.createFee(this.dataFee);
            this.$message({
              type: "success",
              message: "Create completed",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "Create canceled",
            });
          });
      }
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       alert("submit!");
      //     } else {
      //       console.log("error submit!!");
      //       return false;
      //     }
      //   });
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