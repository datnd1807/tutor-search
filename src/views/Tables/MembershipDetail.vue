<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div class="pt-2 pl-3 mb-5">
      <label class="pl-3 pt-3 sizeLabel">Membership</label>
      <el-form
        v-model="dataMembership"
        ref="form"
        label-width="150px"
        class="boldText"
      >
        <div class="row pl-3 pt-3">
          <el-form-item label="Membership" class="pl-1 pt-2">
            <div class="pl-2">
            <el-select
              v-model="valueDropDownMembership"
              placeholder="Membership"
              v-on:change="getValueMembership(valueDropDownMembership)"
            >
              <el-option
                v-for="data in modelDataMembership"
                :key="data.id"
                :label="data.name"
                :value="data.name"
              ></el-option>
            </el-select>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :disabled="disableButton"
              v-on:click="editMethod()"
              >Edit</el-button
            >
            <el-button
              type="primary"
              v-on:click="saveMemberships()"
              :disabled="disableButton"
              >Save</el-button
            >
            <el-button
              type="danger"
              v-on:click="disableMemberships()"
              :disabled="disableButtonInactive"
              >Deactivate</el-button
            >
          </el-form-item>
          <div class="pl-2">
            <dialog-membership></dialog-membership>
          </div>
        </div>
        <div class="row pl-3">
          <el-form-item label="Point rate">
            <div class="col-lg-6">
              <div v-if="disableEditMembership == false" class="Light_Shadow">
                <el-input
                  :readonly="disableEditMembership"
                  v-model="dataMembership.pointRate"
                  v-on:input="checkPointRate()"
                ></el-input>
              </div>
              <div v-else>
                <el-input
                  :readonly="disableEditMembership"
                  v-model="dataMembership.pointRate"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="Point Amount">
            <div class="col-lg-6">
              <div v-if="disableEditMembership == false" class="Light_Shadow">
                <el-input
                  :readonly="disableEditMembership"
                  v-model="dataMembership.pointAmount"
                  v-on:input="checkPointAmount()"
                ></el-input>
              </div>
              <div v-else>
                <el-input
                  :readonly="disableEditMembership"
                  v-model="dataMembership.pointAmount"
                ></el-input>
              </div>
            </div>
          </el-form-item>
        </div>
        <el-form-item label="Updated Date">
          <div class="col-lg-2">
            <el-input
              :readonly="disableEditMembership"
              v-model="dataMembership.updatedDate"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="Update by">
          <div class="col-lg-3">
            <el-input
              :readonly="disableEditMembership"
              v-model="dataMembership.updatedBy"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="Description">
          <div class="col-lg-4">
            <div v-if="disableEditMembership == false" class="Light_Shadow">
              <el-input
                type="textarea"
                resize="none"
                v-model="dataMembership.description"
                :readonly="disableEditMembership"
                maxlength="150"
              ></el-input>
            </div>
            <div v-else>
              <el-input
                type="textarea"
                resize="none"
                v-model="dataMembership.description"
                :readonly="disableEditMembership"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <div class="col-lg-4">
          <el-alert
            title="Point rate wrong format!!!"
            type="error"
            show-icon
            :hidden="disableAlertPointRate"
            :closable="false"
          >
          </el-alert>
          <el-alert
            title="Point amount wrong format!!!"
            type="error"
            show-icon
            :hidden="disableAlertPointAmount"
            :closable="false"
          >
          </el-alert>
        </div>
      </el-form>
      <hr class="my-4" />
      <fee-detail></fee-detail>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapState, mapActions, mapGetters } from "vuex";
import DialogMembership from "./DialogMembership";
import FeeDetail from './FeeDetail';
export default {
  name: "membership-detail",
  components: {
    DialogMembership,
    FeeDetail
  },
  data() {
    return {
      statusList: [{ status: "Active" }, { status: "Disable" }],
      valueDropDownMembership: null,
      disableEditMembership: true,
      dataMembership: [],
      disableAlertPointRate: true,
      disableAlertPointAmount: true,
      disableButton: true,
      disableButtonInactive: true,
    };
  },
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  computed: {
    ...mapState(["membership"]),
    ...mapGetters(["getMembership"]),
    modelDataMembership() {
      return this.getMembership;
    },
  },

  filters: {},
  methods: {
    ...mapActions(["getAllMembership", "saveMembership"]),
    async init() {
      const data1 = await this.getAllMembership();
    },
    getValueMembership(membershipName) {
      this.disableButton = false;
      this.disableEditMembership = true;
      this.disableButtonInactive = false;
      var data = this.modelDataMembership.filter((obj) => {
        return obj.name === membershipName;
      });
      this.dataMembership = data[0];
      this.dataMembership.updatedDate = moment(
        new Date(data[0].updatedDate)
      ).format("YYYY-MM-DDThh:mm");
    },

    disableMemberships() {
      this.$confirm("Do you want to inactive ?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.disableButton = true;
          this.dataMembership.updatedDate = moment(new Date()).format(
            "YYYY-MM-DDTHH:mm:ss"
          );
          this.dataMembership.pointRate = parseFloat(
            this.dataMembership.pointRate
          );
          this.dataMembership.pointAmount = parseFloat(
            this.dataMembership.pointAmount
          );
          this.dataMembership.status = "Inactive";
          this.saveMembership(this.dataMembership);
          this.disableEditMembership = true;
          this.disableButtonInactive = true;
          this.dataMembership = [];
          this.$message({
            type: "success",
            message: "Inactive completed",
          });
        })
        .catch((e) => {
          console.log(e);
          this.$message({
            type: "info",
            message: "Inactive canceled",
          });
        });
    },
    saveMemberships() {
      if (this.disableAlertPointRate && this.disableAlertPointAmount) {
        this.$confirm("Do you want to save?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            this.dataMembership.updatedDate = moment(new Date()).format(
              "YYYY-MM-DDTHH:mm:ss"
            );
            this.dataMembership.pointRate = parseFloat(
              this.dataMembership.pointRate
            );
            this.dataMembership.pointAmount = parseFloat(
              this.dataMembership.pointAmount
            );
            this.dataMembership.status = "Active";
            this.saveMembership(this.dataMembership);
            this.disableEditMembership = true;
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
    checkPointRate() {
      if (
        this.dataMembership.pointRate == "" ||
        !this.dataMembership.pointRate.match(/^\d*\.?\d*$/)
      ) {
        this.disableAlertPointRate = false;
      } else {
        this.disableAlertPointRate = true;
      }
    },
    checkPointAmount() {
      if (
        this.dataMembership.pointAmount == "" ||
        !this.dataMembership.pointAmount.match(/^\d*\.?\d*$/)
      ) {
        this.disableAlertPointAmount = false;
      } else {
        this.disableAlertPointAmount = true;
      }
    },
    editMethod() {
      this.disableEditMembership = false;
      this.disableButtonInactive = true;
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