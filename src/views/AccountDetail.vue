<template>
  <div>
    <el-dialog
      title="Create New Manager"
      :visible="dialogVisible"
      v-on:update:visible="visibleSync = $event"
      width="75%"
      top="5vh"
      @close="handleClose"
    >
      <form @submit.prevent>
        <h6 class="heading-small text-muted mb-2">User information</h6>
        <div class="pl-lg-4">
          <div class="row">
            <div class="col">
              
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Email address"
                placeholder="jesse@example.com"
                input-classes="form-control-alternative"
                v-model="model.email"
                type="email"
                disabled
              />
            </div>
            <div class="col-lg-6">
              <base-select
                label="Role"
                input-classes="form-control-alternative"
                v-model="form.role"
                :dataValue="model.roles"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="First name"
                placeholder="First name"
                input-classes="form-control-alternative"
                v-model="model.firstName"
                required
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Last name"
                placeholder="Last name"
                input-classes="form-control-alternative"
                v-model="model.lastName"
                required
              />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="form-control-label">
                <label for="rbGender">Gender</label>
              </div>
              <div>
                <el-radio
                  class="mt-2"
                  v-for="item in model.gender"
                  :key="item.id"
                  :label="item.id"
                  v-model="form.gender"
                >
                  {{ item.name }}
                </el-radio>
              </div>
            </div>
          </div>
        </div>
        <hr class="my-1" />
        <!-- Address -->
        <h6 class="heading-small text-muted mb-2">Contact information</h6>
        <div class="pl-lg-4">
          <div class="row">
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Address"
                placeholder="Address"
                input-classes="form-control-alternative"
                v-model="model.address"
              />
            </div>
            <div class="col-lg-6">
              <base-input
                alternative=""
                label="Phone number"
                placeholder="Phone number"
                input-classes="form-control-alternative"
                v-model="model.phone"
                type="number"
                required
              />
            </div>
          </div>
        </div>
        <hr class="my-1" />
        <!-- Description -->
        <h6 class="heading-small text-muted mb-2">About me</h6>
        <div class="pl-lg-4">
          <div class="form-group">
            <base-input alternative="" label="About Me">
              <textarea
                rows="4"
                class="form-control form-control-alternative"
                placeholder="A few words about you ..."
              >
A beautiful Dashboard for Bootstrap 4. It is Free and Open Source.</textarea
              >
            </base-input>
          </div>
        </div>
      </form>

      <span slot="footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "account-detail",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visbleSync: this.dialogVisible,
      error: "",
      form: {
        firstname: "",
        middlename: "",
        lastname: "",
        phone: "",
        email: "",
        gender: "1",
        role: "1",
      },
      model: {
        email: "",
        firstname: "",
        lastname: "",
        address: "",
        phone: "",
        gender: [
          { id: "1", name: "Male" },
          { id: "2", name: "Female" },
        ],
        roles: [
          { id: "1", name: "Admin" },
          { id: "2", name: "Manager" },
          { id: "3", name: "Tutee" },
          { id: "4", name: "Tutor" },
        ],
      },
    };
  },
  methods: {
    handleClose() {
      this.$emit("close");
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