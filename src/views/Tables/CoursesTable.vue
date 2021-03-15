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
        <div class="boldText">
          <el-form-item label="Filter subject">
            <drop-down></drop-down>
          </el-form-item>
          <el-form-item label="Filter date">
            <date-time-picker v-on:activeDatePicker="format_date">
            </date-time-picker>
          </el-form-item>
        </div>
        <el-row type="flex" justify="start">
          <label class="text-search mr-2" for="select-role"
            >Search course</label
          >
          <el-input
            class="select-role"
            v-model="search"
            placeholder="Type course name"
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
        <el-table-column prop="createdBy" label="Tutor"> </el-table-column>
        <el-table-column prop="name" label="Course Name"> </el-table-column>
        <el-table-column
          prop="createdDate"
          label="Create Date"
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column label="Status">
          <template slot-scope="scope">
            <div v-if="scope.row.status == 'Active'">
              <el-tag type="success">{{ scope.row.status }}</el-tag>
            </div>
            <div v-else-if="scope.row.status == 'Pending'">
              <el-tag type="warning">{{ scope.row.status }}</el-tag>
            </div>
            <div v-else>
              <el-tag type="danger">{{ scope.row.status }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Option">
          <template slot-scope="scope">
            <dialog-data :data="filterData[indexData(scope.row)]"></dialog-data>
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
import axios from "axios";
import DropDown from "./DropDown.vue";
import DialogData from "./DialogData.vue";
import DateTimePicker from "./DateTimePicker.vue";
import moment from "moment";
import _ from "lodash";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: { DropDown, DialogData, DateTimePicker },
  name: "courses-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  computed: {
    ...mapState(["courses"]),
    ...mapGetters(["getCourses"]),
    pagedTableData() {
      return this.filterData.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
    filterData() {
      var startDate = this.firstDate;
      var endDate = this.secondDate;
      var firstData = this.tableData;
      var value = this.search;
      var searchDate = "";
      var searchCourse = "";
      return _.filter(this.getCourses, function (data) {
        searchCourse = data.name.toLowerCase().includes(value.toLowerCase());
        searchDate = moment(new Date(data.createdDate)).format("YYYY-MM-DD");
        if (startDate == "" && startDate == "" && value == "") {
          return firstData;
        } else if (value != "" && startDate == "" && startDate == "") {
          return searchCourse;
        } else if (value == "" && startDate != "" && startDate != "") {
          return searchDate >= startDate && searchDate <= endDate;
        } else {
          if (searchCourse) {
            if (searchDate >= startDate && searchDate <= endDate) {
              return true;
            } else {
              return false;
            }
          }
          return false;
        }
      });
    },
  },
  watch: {
    pagedTableData() {
      this.loading = false;
    },
  },
  data() {
    return {
      currentPage: 1,
      tableData: [],
      error: [],
      search: "",
      page: 1,
      pageSize: 10,
      total: 0,
      firstDate: "",
      secondDate: "",
      dialogVisible: false,
      loading: true,
    };
  },
  methods: {
    ...mapActions(["getAllCourses"]),
    async init() {
      const data1 = await this.getAllCourses();
    },
    setPage(val) {
      this.currentPage = val;
      this.page = val;
    },
    format_date(value) {
      this.currentPage = 1;
      this.page = 1;
      if (value != null && value.length != 0) {
        this.firstDate = moment(new Date(value[0])).format("YYYY-MM-DD");
        this.secondDate = moment(new Date(value[1])).format("YYYY-MM-DD");
      } else {
        this.firstDate = "";
        this.secondDate = "";
      }
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
