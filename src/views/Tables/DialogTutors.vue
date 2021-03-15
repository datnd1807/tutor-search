<template>
  <div>
    <template :model="data">
      <el-button
        type="info"
        icon="el-icon-view"
        size="small"
        circle
        v-on:handleDialog="showDialog()"
        @click="dialogVisible = true"
      ></el-button>
      <el-button
        type="primary"
        icon="el-icon-check"
        size="small"
        circle
        :disabled="handleButtonAccept(data.status)"
        @click="openActive()"
      ></el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        size="small"
        circle
        :disabled="handleButtonDenine(data.status)"
        @click="openDelete()"
      ></el-button>
    </template>
    <el-dialog
      :visible.sync="dialogVisible"
      width="40%"
      top="30px"
    >
      <span slot="title" class="fontSize"
        ><i class="el-icon-user"></i>Tutor profile detail
        <div class="avatar-tutor">
          <el-image
            style="width: 180px; height: 180px"
            :src="data.avatarImageLink"
            fit="cover"
          ></el-image></div
      ></span>
      <el-form ref="form" :model="data" :inline="true">
        <hr class="my-4" />
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-lg-6">
              <base-input
                label="Fullname"
                v-model="data.fullname"
                input-classes="form-control-alternative"
                readonly
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Gender"
                input-classes="form-control-alternative"
                v-model="data.gender"
                :readonly="true"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Education Level"
                input-classes="form-control-alternative"
                v-model="data.educationLevel"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="School"
                input-classes="form-control-alternative"
                v-model="data.school"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Birthday"
                input-classes="form-control-alternative"
                :value="data.birthday | formatDate"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Email"
                input-classes="form-control-alternative"
                v-model="data.email"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Phone"
                input-classes="form-control-alternative"
                v-model="data.phone"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Addess"
                input-classes="form-control-alternative"
                v-model="data.address"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="membership"
                input-classes="form-control-alternative"
                v-model="data.membershipId"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Points"
                input-classes="form-control-alternative"
                v-model="data.points"
                :readonly="true"
              />
            </div>
          </div>
        </div>
        <!-- Description -->
        <div class="pl-lg-4">
          <div class="form-group">
            <base-input alternative="" label="Description">
              <textarea
                rows="4"
                class="form-control form-control-alternative"
                v-model="data.description"
                :readonly="true"
              ></textarea>
            </base-input>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "dialog-tutor",
  props: {
    data: Object,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapActions(["disableTutorStatus", "enableTutorStatus"]),
    handleButtonAccept(check) {
      if (check == "Active") {
        return true;
      } else if (check == "Disable") {
        return false;
      }
    },
    handleButtonDenine(check) {
      if (check == "Active") {
        return false;
      } else if (check == "Disable") {
        return true;
      }
    },
    openDelete() {
      this.$confirm("Do you want to delete this tutor account?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.disableTutorStatus(this.data),
            this.$message({
              type: "success",
              message: "Delete completed",
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    openActive() {
      this.$confirm("Do you want to active this tutor account?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.enableTutorStatus(this.data),
            this.$message({
              type: "success",
              message: "Active completed",
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Active canceled",
          });
        });
    },
  },
  filters: {
    formatDate(value) {
      var formatter = moment(new Date(value)).format("YYYY/MM/DD");
      return formatter;
    },
  },
};
</script>
<style scoped lang=scss>
.fontSize {
  font-size: 20px;
  font-weight: bold;
}
.labelColor {
  font-weight: bold;
  margin: 8px 8px;
}
.avatar-tutor {
  .el-image {
    margin: 0px 250px;
    border-radius: 50%;
    box-shadow: 3px 3px 3px gray;
  }
}

</style>