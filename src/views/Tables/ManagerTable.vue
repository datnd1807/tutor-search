<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row">
        <div class="col align-items-center">
          <div class="row">
            <div class="col"></div>
          </div>
        </div>
      </div>
      <div class="row align-items-right"></div>
      <el-form :inline="true" class="demo-form-inline">
        <el-row type="flex" justify="start">
          <label class="text-search mr-2" for="select-role">Search manager</label>
          <el-input
            class="select-role"
            v-model="search"
            placeholder="Type manager name"
            prefix-icon="el-icon-search"
            v-on:input="setDefaultPage()"
          />
        </el-row>
      </el-form>
    </div>
    <div class="table-responsive">
      <el-table :data="pagedTableData" border stripe v-loading="loading">
        <el-table-column label="No." width="50">
          <template slot-scope="scope">
            <p class="numbered">{{ indexData(scope.row) + 1 }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="fullname" label="Manager"> </el-table-column>
        <el-table-column prop="gender" label="Gender"> </el-table-column>
        <el-table-column
          prop="birthday"
          label="Birthday"
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column label="Status">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 'Active'" class="active">
              <el-tag type="success">{{ scope.row.status }}</el-tag>
            </div>
            <div v-else-if="scope.row.status == 'Pending'" class="pending">
              <el-tag type="warning">{{ scope.row.status }}</el-tag>
            </div>
            <div v-else class="inactive">
              <el-tag type="danger">{{ scope.row.status }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Option">
          <template slot-scope="scope">
            <dialog-manager
              :data="filterData[indexData(scope.row)]"
            ></dialog-manager>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="this.pageSize"
          :total="filterData.length"
          @current-change="setPage"
          :current-page="currentPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import _ from "lodash";
import { mapState, mapActions, mapGetters } from "vuex";
import DialogManager from "./DialogManager";

export default {
  components: { DialogManager},
  name: "manager-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  computed: {
    ...mapState(["managers"]),
    ...mapGetters(["getManagers"]),
    pagedTableData() {
      return this.filterData.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
    filterData() {
      var firstData = this.tableData;
      var value = this.search;
      var searchCourse = "";
      return _.filter(this.getManagers, function (data) {
        searchCourse = data.fullname
          .toLowerCase()
          .includes(value.toLowerCase());
        if (value == "") {
          return firstData;
        } else {
          return searchCourse;
        }
      });
    },
  },
  watch:{
    pagedTableData(){
      this.loading = false;
    }
  },
  data() {
    return {
      currentPage: 1,
      tableData: [],
      error: [],
      search: "",
      page: 1,
      pageSize: 8,
      total: 0,
      dialogVisible: false,
      loading: true
    };
  },
  methods: {
    ...mapActions(["getAllManagers"]),
    async init() {
      const data1 = await this.getAllManagers();
    },
    setPage(val) {
      this.currentPage = val;
      this.page = val;
    },
    dateFormat(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },
    indexData(conditionFn) {
      return this.filterData.indexOf(conditionFn);
    },

    setDefaultPage() {
      this.currentPage = 1;
      this.page = 1;
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style scoped lang=scss>
.active p {
  font-size: 15px;
  color: green;
}
.inactive p {
  font-size: 15px;
  color: red;
}
.pending p {
  font-size: 15px;
  color: #dba901;
}
.boldText {
  font-weight: bold;
  .el-form-item {
    margin-bottom: 5px;
    margin-left: 1px;
  }
}
.buttonDesign {
  margin: 5px 5px;
}
.text-search {
  margin-top: 8px;
  font-weight: bold;
  font-size: 14px;
  color: #606266;
}
.select-role {
  width: 250px;
  font-weight: bold;
}
.numbered {
  margin: 5px 5px;
  font-size: 15px;
}
</style>
