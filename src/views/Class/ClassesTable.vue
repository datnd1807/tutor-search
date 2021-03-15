<template>
  <div>
    <div class="card shadow">
      <div class="card-header border-0">
        <div class="row">
          <div class="col align-items-center">
            <h3 class="mb-0">
              {{ title }}
            </h3>
          </div>
        </div>
        <div class="row mt-3 mb-3">
          <div class="col d-flex justify-content-end">
            <el-button type="primary" size="default" @click="handleCreateBtn"
              >Create Class</el-button
            >
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
        <el-table :data="pagedTableData" border stripe height="580px" v-loading="loading">
          <el-table-column
            type="index"
            label="No."
            align="center"
          ></el-table-column>
          <el-table-column prop="name" label="Name"> </el-table-column>
          <el-table-column
            prop="updatedDate"
            label="Create Date"
            align="center"
            :formatter="dateFormat"
          >
          </el-table-column>

          <el-table-column prop="status" label="Status" align="center">
          </el-table-column>
          <el-table-column align="center" label="Action">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleDetailDlOpen(scope.$index, scope.row)"
                icon="el-icon-view"
                circle
                type="info"
              ></el-button>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                circle
                @click="handleUpdateDlOpen(scope.$index, scope.row)"
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

    <update-class
      :dialogVisible="updateDialogVisible"
      @close="handleUpdateDlClose"
    />
    <class-detail
      :dialogVisible="detailDialogVisible"
      @close="handleDetailDlClose"
    />
    <create-class :dialogVisible="dialogVisible" @close="handleClose" />
  </div>
</template>
<script>
import CreateClass from "./CreateClass.vue";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import moment from "moment";
import UpdateClass from "./UpdateClass.vue";
import ClassDetail from "./ClassDetail.vue";
export default {
  name: "classes-table",
  components: {
    CreateClass,
    UpdateClass,
    ClassDetail,
  },

  mounted() {
    this.getAllClassesAction().then(respose =>{
      this.loading = false
    });
  },
  computed: {
    ...mapState(["classes"]),
    ...mapGetters(["getAllClasses"]),
    searchTable() {
      return this.getAllClasses.filter(
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
      loading:true,
      title: "Classes Table",
      dialogVisible: false,
      updateDialogVisible: false,
      detailDialogVisible: false,
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
      pageSize: 5,
      accountDetailDialogVisible: false,
    };
  },
  methods: {
    ...mapActions(["getAllClassesAction", "getClassById", "inactiveClass"]),
    ...mapMutations(["setClassId"]),

   

    handleDelete(index, row) {
      this.$confirm(
        "This will permanently delete the class. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.setClassId(row.id);
          this.inactiveClass().then((response) => {
            if (response.status === 204) {
              this.$message({
                type: "success",
                message: "Delete completed",
              });
              this.getAllClassesAction()
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    setPage(val) {
      this.page = val;
    },
    handleSizeChange(val) {
      this.pageSize = val;
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
    handleUpdateDlOpen(index, row) {
      this.setClassId(row.id);
      this.getClassById();
      this.updateDialogVisible = true;
    },
    handleUpdateDlClose() {
      this.updateDialogVisible = false;
    },
    /**
     * handle when click show detail button
     */
    handleDetailDlOpen(index, row) {
      this.setClassId(row.id);
      this.getClassById();
      this.detailDialogVisible = true;
    },
    handleDetailDlClose() {
      this.detailDialogVisible = false;
    },
    sizeChange(val) {
      console.log("Size Change " + val);
    },
    currentChange(val) {
      console.log("Current " + val);
    },
    preClick(val) {
      console.log("Pre " + val);
    },
    nextClick(val) {
      console.log("Next: " + val);
    },
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },
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
