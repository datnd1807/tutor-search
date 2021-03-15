<template>
  <div>
    <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
      <div
        class="card-header border-0"
        :class="type === 'dark' ? 'bg-transparent' : ''"
      >
        <div class="row">
          <div class="col align-items-center">
            <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
              {{ title }}
            </h3>
          </div>
        </div>
        <div class="row mt-3 mb-3">
          <div class="col">
            <label class="mr-2" for="select-role">Role</label>
            <el-select id="select-role" v-model="role">
              <el-option
                v-for="item in roles"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="col d-flex justify-content-end">
            <el-button type="primary" size="default" @click="handleCreateBtn"
              >Create Account</el-button
            >
            <create-account
              :dialogVisible="dialogVisible"
              @close="handleClose"
            ></create-account>
          </div>
        </div>
        <el-row type="flex" justify="space-between" :gutter="20">
          <el-col :span="6" :offset="0" class="pageSize">
            <label for="pageSize" class="mr-1">Show </label>
            <el-select id="pageSize" placeholder="5" v-model="pageSize">
              <el-option
                v-for="size in pageSizes"
                :key="size.value"
                :label="size.value"
                :value="size.value"
              ></el-option>
            </el-select>
          </el-col>
          <el-col :span="8" :offset="0">
            <el-input
              id="searchInput"
              label="Search"
              v-model="search"
              placeholder="Type to search"
            />
          </el-col>
        </el-row>
      </div>

      <div class="table-responsive">
        <el-table :data="pagedTableData" border stripe height="580px">
          <el-table-column
            type="index"
            :index="indexMethod"
            label="No."
            align="center"
          ></el-table-column>
          <el-table-column prop="email" label="Email"> </el-table-column>
          <el-table-column prop="roleId" label="Role" align="center">
          </el-table-column>
          <el-table-column prop="description" label="Description">
          </el-table-column>
          <el-table-column prop="status" label="Status" align="center">
          </el-table-column>
          <el-table-column align="center" label="Action">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleDetail(scope.$index, scope.row)"
                icon="el-icon-view"
                circle
                type="info"
              ></el-button>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="handleEdit(scope.$index, scope.row)"
              ></el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                icon="el-icon-delete"
                circle
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="space-between" class="mt-2">
          <el-col :span="8" :offset="1"
            >Showing {{ (this.page - 1) * this.pageSize + 1 }} To
            {{ this.page * this.pageSize }} Of
            {{ this.searchTable.length }} Entries</el-col
          >
          <el-col :span="8" class="create-account-paging">
            <el-pagination
              background
              :page-sizes="this.pageSizes"
              :page-size="this.pageSize"
              :total="this.searchTable.length"
              @current-change="currentChange"
              @size-change="sizeChange"
              @next-click="nextClick"
              @pre-click="preClick"
              layout="prev, pager, next"
              :current-page="this.page"
            >
            </el-pagination>
          </el-col>
        </el-row>
      </div>
    </div>
    <account-detail
      :dialogVisible="accountDetailDialogVisible"
      @close="handleCloseDetail"
    />
  </div>
</template>
<script>
import CreateAccount from "../CreateAccount.vue";
import AccountDetail from "../AccountDetail.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "accounts-table",
  components: {
    CreateAccount,
    AccountDetail,
  },
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapState(["accounts"]),
    ...mapGetters(["getAllAccounts"]),
    searchTable() {
      return this.getAllAccounts.filter(
        (data) =>
          this.search.trim() == "" ||
          data.email.toLowerCase().includes(this.search.toLowerCase())
      );
    },
    pagedTableData() {
      return this.searchTable.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
  },

  data() {
    return {
      dialogVisible: false,
      tableData: [],
      search: "",
      page: 1,
      pageSizes: [
        { value: 5 },
        { value: 10 },
        { value: 20 },
        { value: 30 },
        { value: 40 },
      ],
      pageSize: 3,

      roles: [
        { name: "Admin", value: "admin" },
        { name: "Manager", value: "manager" },
        { name: "Tutor", value: "tutor" },
        { name: "Tutee", value: "tutee" },
      ],
      role: "Admin",
      accountDetailDialogVisible: false,
    };
  },
  methods: {
    ...mapActions(["getAllAccountsAction"]),

    async init() {
      const data1 = await this.getAllAccountsAction();
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    setPage(val) {
      this.page = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleDetail(index, row) {
      this.accountDetailDialogVisible = true;
    },
    handleCreateBtn() {
      this.dialogVisible = true;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    handleCloseDetail() {
      this.accountDetailDialogVisible = false;
    },
    indexMethod(index) {

    },
    sizeChange(val){
      console.log('Size Change '+val)
    },
    currentChange(val){
      console.log('Current ' + val)
    },
    preClick(val){
      console.log('Pre '+ val)
    },
    nextClick(val){
      console.log('Next: ' +val)
    }

  },
};
</script>
<style lang='scss' scoped>
.pageSize {
  .el-select {
    width: 70px;
  }
}
.create-account-paging {
  text-align: right;
}
</style>
