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
    <el-dialog :visible.sync="dialogVisible" width="40%" top="30px">
      <span slot="title" class="fontSize"
        ><i class="el-icon-notebook-2"></i>Course detail</span
      >
      <el-form
        ref="form"
        :model="data"
        label-width="120px"
        :inline="true"
        class="demo-form-inline"
      >
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-lg-6">
              <base-input
                label="Course name"
                v-model="data.name"
                input-classes="form-control-alternative"
                readonly
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Weekdays"
                input-classes="form-control-alternative"
                v-model="data.daysInWeek"
                :readonly="true"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Form study"
                input-classes="form-control-alternative"
                v-model="data.studyForm"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Fee"
                input-classes="form-control-alternative"
                v-model="data.studyFee"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Begin Time"
                input-classes="form-control-alternative"
                :value="data.beginTime | formatDateTime"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="End Time"
                input-classes="form-control-alternative"
                :value="data.endTime | formatDateTime"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Begin day"
                input-classes="form-control-alternative"
                :value="data.beginDate | formatDate"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="End day"
                input-classes="form-control-alternative"
                :value="data.endDate | formatDate"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Tutor created"
                input-classes="form-control-alternative"
                v-model="data.createdBy"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Date created"
                input-classes="form-control-alternative"
                :value="data.createdDate | formatDate"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Confirm date"
                input-classes="form-control-alternative"
                :value="data.confirmedDate | formatDateTime"
                :readonly="true"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Number of tutee"
                input-classes="form-control-alternative"
                :value="data.maxTutee"
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
  name: "dialog-data",
  props: {
    data: Object,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapActions(["disableCourseStatus", "enableCourseStatus"]),
    handleButtonAccept(check) {
      if (check == "Active") {
        return true;
      } else if (check == "Denied") {
        return false;
      }
    },
    handleButtonDenine(check) {
      if (check == "Active") {
        return false;
      } else if (check == "Denied") {
        return true;
      }
    },
    openDelete() {
      this.$confirm("Do you want to delete this course?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.data.confirmedDate = moment(new Date()).format("YYYY-MM-DDTHH:mm");
          this.disableCourseStatus(this.data);
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
      this.$confirm("Do you want to active this course?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.data.confirmedDate = moment(new Date()).format("YYYY-MM-DDTHH:mm");
          this.enableCourseStatus(this.data);
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
    formatDateTime(value) {
      var formatter = moment(new Date(value)).format("YYYY/MM/DD [at] HH:mm");
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
</style>