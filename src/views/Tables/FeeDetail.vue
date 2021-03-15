<template>
  <div>
    <label class="pl-3 pt-3 sizeLabel">Fees</label>
    <el-form v-model="dataFee" ref="form" label-width="150px" class="boldText">
      <div class="row pl-3 pt-3">
        <el-form-item label="Fee" class="pl-1 pt-2">
          <div class="pl-2">
          <el-select
            v-model="valueDropDownFee"
            placeholder="Fees name"
            v-on:change="getValueFee(valueDropDownFee)"
          >
            <el-option
              v-for="data in modelDataFee"
              :key="data.id"
              :label="data.name"
              :value="data.name"
            ></el-option>
          </el-select>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="disableButton" @click="editFee()"
            >Edit</el-button
          >
          <el-button
            type="primary"
            :disabled="disableButton"
            @click="saveFees()"
            >Save</el-button
          >
          <el-button
            type="danger"
            :disabled="disableButtonInactive"
            @click="disableFee()"
            >Deactivate</el-button
          >
        </el-form-item>
        <div class="pl-2">
          <dialog-fee></dialog-fee>
        </div>
      </div>
      <el-form-item label="Price">
        <div class="col-lg-2">
          <div v-if="disableEditFee == false" class="Light_Shadow">
            <el-input
              :readonly="disableEditFee"
              v-model="dataFee.price"
              v-on:input="checkPrice()"
            ></el-input>
          </div>
          <div v-else>
            <el-input
              :readonly="disableEditFee"
              v-model="dataFee.price"
            ></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="Update By">
        <div class="col-lg-3">
          <el-input
            :readonly="disableEditFee"
            v-model="dataFee.updateBy"
          ></el-input>
        </div>
      </el-form-item>
      <!-- </div> -->
      <el-form-item label="Updated Date">
        <div class="col-lg-2">
          <el-input
            :readonly="disableEditFee"
            v-model="dataFee.updatedDate"
          ></el-input>
        </div>
      </el-form-item>
      <el-form-item label="Description">
        <div class="col-lg-4">
          <div v-if="disableEditFee == false" class="Light_Shadow">
            <el-input
              type="textarea"
              resize="none"
              v-model="dataFee.description"
              :readonly="disableEditFee"
              maxlength="150"
            ></el-input>
          </div>
          <div v-else>
            <el-input
              type="textarea"
              resize="none"
              v-model="dataFee.description"
              :readonly="disableEditFee"
            ></el-input>
          </div>
        </div>
      </el-form-item>
      <div class="col-lg-4">
        <el-alert
          title="Price must be number"
          type="error"
          show-icon
          :hidden="disableAlertPrice"
          :closable="false"
        >
        </el-alert>
      </div>
    </el-form>
  </div>
</template>
<script>
import moment from "moment";
import { mapState, mapActions, mapGetters } from "vuex";
import DialogFee from "./DialogFee";
export default {
  name: "fee-detail",
  components: {
    DialogFee,
  },
  computed: {
    ...mapState(["fee"]),
    ...mapGetters(["getFee"]),
    modelDataFee() {
      return this.getFee;
    },
  },
  data() {
    return {
      dataFee: [],
      valueDropDownFee: null,
      disableButton: true,
      disableButtonInactive: true,
      disableAlertPrice: true,
      disableEditFee: true,
    };
  },
  methods: {
    ...mapActions(["getAllFee", "saveFee"]),
    async init() {
      const data1 = await this.getAllFee();
    },
    checkPrice() {
      if (
        this.dataFee.price == "" ||
        !this.dataFee.price.match(/^\d*\.?\d*$/)
      ) {
        this.disableAlertPrice = false;
      } else {
        this.disableAlertPrice = true;
      }
    },
    getValueFee(fee) {
      this.disableButton = false;
      this.disableEditFee = true;
      this.disableButtonInactive = false;
      var data = this.modelDataFee.filter((obj) => {
        return obj.name === fee;
      });
      this.dataFee = data[0];
      this.dataFee.updatedDate = moment(new Date(data[0].updatedDate)).format(
        "YYYY-MM-DDThh:mm"
      );
    },
    editFee() {
      this.disableEditFee = false;
      this.disableButtonInactive = true;
    },
    saveFees() {
      if (this.disableAlertPrice) {
        this.$confirm("Do you want to save?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            this.dataFee.updatedDate = moment(new Date()).format(
              "YYYY-MM-DDTHH:mm:ss"
            );
            this.dataFee.price = parseFloat(this.dataFee.price);
            this.dataFee.status = "Active";
            this.saveFee(this.dataFee);
            this.disableEditFee = true;
            this.disableButtonInactive = false;
            this.$message({
              type: "success",
              message: "Save completed",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "Save canceled",
            });
          });
      }
    },
    disableFee() {
      this.$confirm("Do you want to disable?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.dataFee.updatedDate = moment(new Date()).format(
            "YYYY-MM-DDTHH:mm:ss"
          );
          this.dataFee.price = parseFloat(this.dataFee.price);
          this.dataFee.status = "Inactive";
          this.saveFee(this.dataFee);
          this.disableEditFee = true;
          this.disableButtonInactive = true;
          this.$message({
            type: "success",
            message: "Disable completed",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Disable canceled",
          });
        });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped lang=scss>
.boldText {
  font-weight: bold;
  .el-form-item {
    margin-bottom: 5px;
    margin-left: 1px;
  }
}
.sizeLabel {
  font-weight: bold;
  font-size: 18px;
}
.Light_Shadow {
  box-shadow: 0 3px 15px 0 rgba(252, 15, 15, 0.267);
}
</style>