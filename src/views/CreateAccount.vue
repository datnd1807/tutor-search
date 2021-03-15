<template>
  <div>
    <el-dialog
      title="Create New Account"
      :visible="dialogVisible"
      v-on:update:visible="visibleSync = $event"
      width="75%"
      top="5vh"
      :close-on-click-modal="false"
      @close="handleClose"
    >
      <form @submit.prevent>
        <h6 class="heading text-muted mb-2">User information</h6>
        <div class="row">
          <div class="col-lg-2">
            <div class="text-center">
              <img
                :src="form.avatar"
                class="avatar img-circle img-thumbnail ava-img"
                alt="avatar"
              />
              <h6>Upload a different photo...</h6>
              <input
                type="file"
                class="text-center center-block file-upload"
                :v-model="form.avatar"
              />
            </div>
          </div>
          <div class="col-lg-10">
            <div class="pl-lg-4">
              <div class="row">
                <div class="col-lg-6">
                  <base-input
                    alternative=""
                    label="Email address"
                    placeholder="jesse@example.com"
                    input-classes="form-control-alternative"
                    v-model="form.email"
                    type="email"
                    required
                  />
                </div>
                <div class="col-lg-6">
                  <base-select
                    label="Role"
                    input-classes="form-control-alternative"
                    v-model="form.roleId"
                    :dataValue="roles"
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
                    v-model="form.firstname"
                    required
                  />
                </div>
                <div class="col-lg-6">
                  <base-input
                    alternative=""
                    label="Last name"
                    placeholder="Last name"
                    input-classes="form-control-alternative"
                    v-model="form.lastname"
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
                      v-for="item in gender"
                      :key="item.id"
                      :label="item.id"
                      v-model="form.gender"
                    >
                      {{ item.name }}
                    </el-radio>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="form-control-label">
                    <label for="rbGender">Birthday</label>
                  </div>
                  <el-date-picker
                    v-model="form.birthday"
                    type="date"
                    size="normal"
                    placeholder="Pick a day"
                    class="form-control-alternative"
                    value-format="yyyy-MM-dd"
                    required
                  >
                  </el-date-picker>
                </div>
              </div>
            </div>

            <div class="pl-lg-4">
              <div class="row">
                <div class="col-lg-6">
                  <base-input
                    alternative=""
                    label="Address"
                    placeholder="Address"
                    input-classes="form-control-alternative"
                    v-model="form.address"
                    required
                  />
                </div>
                <div class="col-lg-6">
                  <base-input
                    alternative=""
                    label="Phone number"
                    placeholder="Phone number"
                    input-classes="form-control-alternative"
                    v-model="form.phone"
                    type="number"
                    required
                  />
                </div>
              </div>
            </div>

            <div class="pl-lg-4">
              <div class="form-group">
                <base-input alternative="" label="About Me">
                  <textarea
                    rows="4"
                    class="form-control form-control-alternative"
                    placeholder="A few words about you ..."
                    v-model="form.description"
                  ></textarea
                  >
                </base-input>
              </div>
            </div>
          </div>
        </div>
      </form>

      <span slot="footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addAccountBtn">Submit</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "create-account",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {},

  data() {
    return {
      isValidate: false,
      visbleSync: this.dialogVisible,
      form: {
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        gender: "male",
        roleId: "2",
        birthday: "",
        status:"Active",
        avatar: "http://ssl.gstatic.com/accounts/ui/avatar_2x.png",
        description:""
      },
      gender: [
        { id: "male", name: "Male" },
        { id: "female", name: "Female" },
      ],
      roles: [{ id: "2", name: "Manager" }],
    };
  },
  methods: {
    ...mapActions(["insertAccount", "insertManager"]),
    ...mapMutations(["setAccount"]),
    handleClose() {
      this.$emit("close");
    },
    addAccountBtn() {
      let account={
        email: this.form.email,
        roleId: this.form.roleId,
        status: "Active"
      }
      let manager = {
        fullname : this.form.firstname +" "+ this.form.lastname,
        roleId: this.form.roleId,
        gender: this.form.gender,
        birthday: this.form.birthday,
        status: "Active",
        description: this.form.description,
        phone:this.form.phone,
        avatarImageLink: this.form.avatar,
        address: this.form.address,
      }
      this.insertAccount(account)
      this.insertManager(manager)
    
    },
    checForm(){
      if(!this.form.firstname){
        this.$message({
          message: "this is error"
        })
      }
    }
  },
  watch: {
    visbleSync(val) {
      this.$emit("update:dialogVisible", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.ava-img {
  height: 20vh;
  width: 10vw;
}
</style>