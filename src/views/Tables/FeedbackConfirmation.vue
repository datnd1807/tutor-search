<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div class="table-responsive">
      <el-tabs type="border-card">
        <el-tab-pane label="Pending" v-loading="loading">
          <el-scrollbar wrap-style="max-height: 700px;">
            <span
              class="height-form"
              v-for="(feedback, index) in listFeedbacks"
              :key="index"
            >
              <el-form
                v-if="feedback.status == 'Pending'"
                ref="form"
                :model="feedback"
                label-width="130px"
              >
                <div class="col-lg-4 boldText">
                  <el-form-item label="Tutee feedback">
                    <div class="Light_Shadow">
                      <el-input
                        v-model="feedback.tuteeId"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="col-lg-4 boldText">
                  <el-form-item label="To tutor">
                    <div class="Light_Shadow">
                      <el-input
                        v-model="feedback.tutorId"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="col-lg-7 boldText">
                  <el-form-item label="Comment">
                    <div class="Light_Shadow">
                      <el-input
                        type="textarea"
                        v-model="feedback.comment"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="col-lg-3 boldText pt-2">
                  <el-form-item label="Date created">
                    <div class="Light_Shadow">
                      <el-input
                        :value="feedback.createdDate | formatDateTime"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                </div>
                <el-form-item label="Rate" class="position-rate boldText">
                  <el-rate v-model="feedback.rate" disabled></el-rate>
                </el-form-item>
                <div class="col-12 text-right">
                  <el-button type="primary" @click="acceptFeedback(index)"
                    >Accept</el-button
                  >
                  <el-button type="danger" @click="deniesFeedback(index)"
                    >Denied</el-button
                  >
                </div>
                <hr class="my-4" />
              </el-form>
            </span>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="Accepted">
          <el-scrollbar wrap-style="max-height: 700px;">
            <span
              class="height-form"
              v-for="feedback in feedbackAfterConfirm"
              :key="feedback.id"
            >
              <el-form
                v-if="feedback.status == 'Accepted'"
                ref="form"
                :model="feedback"
                label-width="130px"
              >
                <div class="col-lg-4 boldText">
                  <el-form-item label="Tutee feedback">
                    <div class="Light_Shadow">
                      <el-input
                        v-model="feedback.tuteeId"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="col-lg-4 boldText">
                  <el-form-item label="To tutor">
                    <div class="Light_Shadow">
                      <el-input
                        v-model="feedback.tutorId"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="col-lg-7 boldText">
                  <el-form-item label="Comment">
                    <div class="Light_Shadow">
                      <el-input
                        type="textarea"
                        v-model="feedback.comment"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="col-lg-3 boldText pt-2">
                  <el-form-item label="Date created">
                    <div class="Light_Shadow">
                      <el-input
                        :value="feedback.createdDate | formatDateTime"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="Date confirmed">
                    <div class="Light_Shadow">
                      <el-input
                        :value="feedback.confirmedDate | formatDateTime"
                        :readonly="true"
                      ></el-input></div
                  ></el-form-item>
                </div>
                <el-form-item label="Rate" class="position-rate boldText">
                  <el-rate v-model="feedback.rate" disabled></el-rate>
                </el-form-item>
                <hr class="my-4" />
              </el-form>
            </span>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="Denied">
          <el-scrollbar wrap-style="max-height: 700px;">
            <span
              class="height-form"
              v-for="feedback in feedbackAfterConfirm"
              :key="feedback.id"
            >
              <el-form
                v-if="feedback.status == 'Denied'"
                ref="form"
                :model="feedback"
                label-width="130px"
              >
                <div class="col-lg-4 boldText">
                  <el-form-item label="Tutee feedback">
                    <div class="Light_Shadow">
                      <el-input
                        v-model="feedback.tuteeId"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="col-lg-4 boldText">
                  <el-form-item label="To tutor">
                    <div class="Light_Shadow">
                      <el-input
                        v-model="feedback.tutorId"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="col-lg-7 boldText">
                  <el-form-item label="Comment">
                    <div class="Light_Shadow">
                      <el-input
                        type="textarea"
                        v-model="feedback.comment"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                </div>
                <div class="col-lg-3 boldText pt-2">
                  <el-form-item label="Date created">
                    <div class="Light_Shadow">
                      <el-input
                        :value="feedback.createdDate | formatDateTime"
                        :readonly="true"
                      ></el-input>
                    </div>
                  </el-form-item>
                  <el-form-item label="Date confirmed">
                    <div class="Light_Shadow">
                      <el-input
                        :value="feedback.confirmedDate | formatDateTime"
                        :readonly="true"
                      ></el-input></div
                  ></el-form-item>
                </div>
                <el-form-item label="Rate" class="position-rate boldText">
                  <el-rate v-model="feedback.rate" disabled></el-rate>
                </el-form-item>
                <hr class="my-4" />
              </el-form>
            </span>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "feedback-comfirmation",
  data() {
    return {
      loading: true,
    };
  },
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  computed: {
    ...mapState(["feedbacks"]),
    ...mapGetters(["getFeedback", "getFeedbackAfterConfirm"]),
    listFeedbacks() {
      this.getFeedbacksAfterConfirm()
      var sortedList = this.getFeedback;
      return sortedList.sort((a, b) => {
        if (new Date(a.createdDate).getTime() > new Date(b.createdDate).getTime()) return -1;
        else if (new Date(a.createdDate).getTime() < new Date(b.createdDate).getTime())
          return 1;
        else return 0;
      });
    },
    feedbackAfterConfirm() {
      var sortedList = this.getFeedbackAfterConfirm;
      return sortedList.sort((a, b) => {
        if (new Date(a.confirmedDate).getTime() > new Date(b.confirmedDate).getTime()) return -1;
        else if (new Date(a.confirmedDate).getTime() < new Date(b.confirmedDate).getTime())
          return 1;
        else return 0;
      });
    },
  },
  watch: {
    listFeedbacks() {
      this.loading = false;
    },
  },
  filters: {
    formatDateTime(value) {
      if (value != null) {
        var formatter = moment(new Date(value)).format("YYYY/MM/DD [at] HH:mm:ss");
        return formatter;
      } else {
        return null;
      }
    },
  },
  methods: {
    ...mapActions([
      "getFeedbacks",
      "acceptFeedbackTutee",
      "deniesFeedbackTutee",
      "getFeedbacksAfterConfirm",
    ]),
    async init() {
      const data1 = await this.getFeedbacks();
    },
    acceptFeedback(index) {
      this.$confirm("Do you want to accept this feedback?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.listFeedbacks[index].confirmedDate = moment(new Date()).format(
            "YYYY-MM-DDTHH:mm:ss"
          );
          this.acceptFeedbackTutee(this.listFeedbacks[index]);
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
    deniesFeedback(index) {
      this.$confirm("Do you want to delete this feedback?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      })
        .then(() => {
          this.listFeedbacks[index].confirmedDate = moment(new Date()).format(
            "YYYY-MM-DDTHH:mm:ss"
          );
          this.deniesFeedbackTutee(this.listFeedbacks[index]);
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
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped lang=scss>
.position-rate {
  .el-rate {
    margin: 11px 10px;
  }
}
.boldText {
  font-weight: bold;
  .el-form-item {
    margin-bottom: 5px;
    margin-left: 1px;
  }
}
.height-form {
  .el-form {
    margin-top: 20px;
  }
}
.Light_Shadow {
  box-shadow: 0 0.5px 3px 0 rgba(26, 24, 24, 0.267);
}
</style>