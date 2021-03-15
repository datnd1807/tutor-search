<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="
        min-height: 600px;
        background-image: url(img/theme/profile-cover.jpg);
        background-size: cover;
        background-position: center top;
      "
    >
      <span class="mask bg-gradient-info opacity-8"></span>

      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Hello {{ modelData.fullname }}</h1>
            <p class="text-white mt-0 mb-5">
              This is your profile page. You can see the progress you've made
              with your work and manage your projects or assigned tasks
            </p>
            >
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--9">
      <div class="row">
        <div class="col-xl-12 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img
                      v-if="(modelData.avatarImageLink != '')"
                      :src="modelData.avatarImageLink"
                      class="rounded-circle"
                    />
                    <img
                      v-else
                      src="./Tables/anh-dai-dien-FB-200.jpg"
                      class="rounded-circle"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div
              class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
            ></div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div
                    class="card-profile-stats d-flex justify-content-center mt-md-5"
                  >
                  </div>
                </div>
              </div>
              <div class="col-xl-12 order-xl-1">
                <card shadow type="secondary">
                  <div slot="header" class="bg-white border-0">
                    <div class="row align-items-center">
                      <div class="col-8">
                        <h3 class="mb-0">My account</h3>
                      </div>
                      <div class="col-4 text-right">
                        <el-button
                          type="primary"
                          size="small"
                          @click="openSave()"
                          >Save</el-button
                        >
                        <el-button
                          type="primary"
                          size="small"
                          v-on:click="editProfile = false"
                          >Edit</el-button
                        >
                      </div>
                    </div>
                  </div>
                  <template>
                    <el-form
                      ref="form"
                      v-model="modelData"
                      label-width="120px"
                      :inline="true"
                    >
                      <h6 class="heading-small text-muted mb-4">
                        User information
                      </h6>
                      <div class="pl-lg-5">
                        <div class="row">
                          <div class="col-lg-4">
                            <label class="text-search mr-2" for="select-role"
                              >Fullname</label
                            >
                            <div
                              v-if="editProfile == false"
                              class="Light_Shadow"
                            >
                              <el-input
                                v-model="modelData.fullname"
                                :readonly="editProfile"
                                v-on:input="checkFullname()"
                              ></el-input>
                            </div>
                            <div v-else>
                              <el-input
                                v-model="modelData.fullname"
                                :readonly="editProfile"
                                v-on:input="checkFullname()"
                              ></el-input>
                            </div>
                            <el-alert
                              title="The fullname value must be letters and have a value between 1 ~ 50"
                              type="error"
                              show-icon
                              :hidden="enableAlertFullname"
                              :closable="false"
                            >
                            </el-alert>
                          </div>
                          <div class="col-lg-2">
                            <label class="text-search mr-2" for="select-role"
                              >Gender</label
                            ><br />
                            <div
                              v-if="editProfile == false"
                              class="Light_Shadow"
                            >
                              <el-select
                                v-model="modelData.gender"
                                placeholder="Select"
                              >
                                <el-option
                                  v-for="data in genderList"
                                  :key="data.gender"
                                  :label="data.gender"
                                  :value="data.gender"
                                  :disabled="editProfile"
                                ></el-option>
                              </el-select>
                            </div>
                            <div v-else>
                              <el-select
                                v-model="modelData.gender"
                                placeholder="Select"
                              >
                                <el-option
                                  v-for="data in genderList"
                                  :key="data.gender"
                                  :label="data.gender"
                                  :value="data.gender"
                                  :disabled="editProfile"
                                ></el-option>
                              </el-select>
                            </div>
                          </div>
                          <div class="col-lg-2.5">
                            <label class="text-search mr-2" for="select-role"
                              >Birthday</label
                            ><br />
                            <div
                              v-if="editProfile == false"
                              class="Light_Shadow"
                            >
                              <el-date-picker
                                v-model="modelData.birthday"
                                type="date"
                                placeholder="Pick a day"
                                :picker-options="pickerOption"
                                :readonly="editProfile"
                                :clearable="false"
                                @change="formatDate(modelData.birthday)"
                              >
                              </el-date-picker>
                            </div>
                            <div v-else>
                              <el-date-picker
                                v-model="modelData.birthday"
                                type="date"
                                placeholder="Pick a day"
                                :picker-options="pickerOption"
                                :readonly="editProfile"
                                :clearable="false"
                                @change="formatDate(modelData.birthday)"
                              >
                              </el-date-picker>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-lg-6">
                            <label class="text-search mr-2" for="select-role"
                              >Address</label
                            >
                            <div
                              v-if="editProfile == false"
                              class="Light_Shadow"
                            >
                              <el-input
                                v-model="modelData.address"
                                :readonly="editProfile"
                                v-on:input="checkAddress()"
                              ></el-input>
                            </div>
                            <div v-else>
                              <el-input
                                v-model="modelData.address"
                                :readonly="editProfile"
                                v-on:input="checkAddress()"
                              ></el-input>
                            </div>
                            <el-alert
                              title="Address can not be blank"
                              type="error"
                              show-icon
                              :hidden="enableAlertAddress"
                              :closable="false"
                            >
                            </el-alert>
                          </div>
                        </div>
                      </div>
                      <hr class="my-4" />
                      <!-- Address -->
                      <h6 class="heading-small text-muted mb-4">
                        Contact information
                      </h6>
                      <div class="pl-lg-5">
                        <div class="row">
                          <div class="col-lg-4">
                            <label class="text-search mr-2" for="select-role"
                              >Email</label
                            >
                            <div
                              v-if="editProfile == false"
                              class="Light_Shadow"
                            >
                              <el-input
                                v-model="modelData.email"
                                :readonly="editProfile"
                                v-on:input="checkEmail"
                              ></el-input>
                            </div>
                            <div v-else>
                              <el-input
                                v-model="modelData.email"
                                :readonly="editProfile"
                                v-on:input="checkEmail"
                              ></el-input>
                            </div>
                            <el-alert
                              title="Email wrong format"
                              type="error"
                              show-icon
                              :hidden="enableAlertEmail"
                              :closable="false"
                            >
                            </el-alert>
                          </div>
                          <div class="col-lg-3">
                            <label class="text-search mr-2" for="select-role"
                              >Phone</label
                            >
                            <div
                              v-if="editProfile == false"
                              class="Light_Shadow"
                            >
                              <el-input
                                v-model="modelData.phone"
                                :readonly="editProfile"
                                v-on:input="checkPhone"
                              ></el-input>
                            </div>
                            <div v-else>
                              <el-input
                                v-model="modelData.phone"
                                :readonly="editProfile"
                                v-on:input="checkPhone"
                              ></el-input>
                            </div>
                            <el-alert
                              title="Phone must be a number"
                              type="error"
                              show-icon
                              :hidden="enableAlertPhone"
                              :closable="false"
                            >
                            </el-alert>
                          </div>
                        </div>
                      </div>
                      <hr class="my-4" />
                      <!-- Description -->
                      <h6 class="heading-small text-muted mb-4">About me</h6>
                      <div class="pl-lg-5">
                        <div class="form-group">
                          <label class="text-search mr-2" for="select-role"
                            >Description</label
                          >
                          <div v-if="editProfile == false" class="Light_Shadow">
                            <el-input
                              type="textarea"
                              maxlength="150"
                              v-model="modelData.description"
                              :readonly="editProfile"
                            ></el-input>
                          </div>
                          <div v-else>
                            <el-input
                              type="textarea"
                              v-model="modelData.description"
                              :readonly="editProfile"
                            ></el-input>
                          </div>
                        </div>
                      </div>
                    </el-form>
                  </template>
                </card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "user-profile",
  data() {
    return {
      editProfile: true,
      enableAlertFullname: true,
      enableAlertAddress: true,
      enableAlertEmail: true,
      enableAlertPhone: true,
      genderList: [{ gender: "Male" }, { gender: "Female" }],
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  computed: {
    ...mapState(["account"]),
    ...mapGetters(["getAccountManager"]),
    modelData() {
      return this.getAccountManager;
    },
  },
  methods: {
    ...mapActions(["getAccountManagerById", "updateAccount"]),
    async init() {
      const data1 = await this.getAccountManagerById();
    },
    formatDate(value) {
      var date = moment(new Date(value)).format("YYYY-MM-DD");
      this.modelData.birthday = date;
    },
    checkFullname() {
      if (
        this.modelData.fullname == "" ||
        !this.modelData.fullname.match(/^[a-zA-Z\s]+$/) ||
        this.modelData.fullname.length > 50
      ) {
        this.enableAlertFullname = false;
      } else {
        this.enableAlertFullname = true;
      }
    },
    checkAddress() {
      if (this.modelData.address == "" || this.modelData.address.length > 100) {
        this.enableAlertAddress = false;
      } else {
        this.enableAlertAddress = true;
      }
    },
    checkEmail() {
      if (
        this.modelData.email == "" ||
        this.modelData.email.length > 100 ||
        !this.modelData.email.match(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
        )
      ) {
        this.enableAlertEmail = false;
      } else {
        this.enableAlertEmail = true;
      }
    },
    checkPhone() {
      if (
        this.modelData.phone == "" ||
        this.modelData.phone.length > 20 ||
        !this.modelData.phone.match(/^[0-9]*$/)
      ) {
        this.enableAlertPhone = false;
      } else {
        this.enableAlertPhone = true;
      }
    },
    openSave() {
      if (
        this.enableAlertFullname &&
        this.enableAlertAddress &&
        this.enableAlertEmail &&
        this.enableAlertPhone &&
        !this.editProfile
      ) {
        this.$confirm("Do you want to save?", "Warning", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        })
          .then(() => {
            this.updateAccount(this.modelData);
            this.editProfile = true;
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
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped lang=scss >
.text-search {
  margin-top: 8px;
  font-weight: bold;
  font-size: 14px;
  color: #606266;
}
.Light_Shadow {
  box-shadow: 0 3px 15px 0 rgba(252, 15, 15, 0.267);
}
</style>
