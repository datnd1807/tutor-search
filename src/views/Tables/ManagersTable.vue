<template>
  <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
    <div
      class="card-header border-0"
      :class="type === 'dark' ? 'bg-transparent' : ''"
    >
      <div class="row">
        <div class="col align-items-center">
          <h3 class="mb-2" :class="type === 'dark' ? 'text-white' : ''">
            {{ title }}
          </h3>
          <div class="row">
            <div class="col">
              <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline"
              >
                
                <el-form-item label="Subject">
                  <el-select
                    v-model="subject.name"
                    placeholder="Subject"
                  >
                    <el-option label="Math" value="math"></el-option>
                    <el-option label="C#" value="c#"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">Query</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="col">
              <button class="btn btn-primary">Create New Manager</button>
            </div>
          </div>
        </div>
      </div>
      <div class="row align-items-right"></div>
    </div>

    <div class="table-responsive">
      <el-table
        :data="
          pagedTableData.filter(
            (data) =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        border
        stripe
      >
        <el-table-column type="index" label="No."></el-table-column>
        <el-table-column prop="email" label="Email"> </el-table-column>
        <el-table-column prop="roleId" label="Role"> </el-table-column>
        <el-table-column prop="description" label="Description">
        </el-table-column>
        <el-table-column prop="status" label="Status"> </el-table-column>
        <el-table-column align="right" label="Action">
          <template slot="header" slot-scope="{}">
            <el-input
              v-model="search"
              size="mini"
              placeholder="Type to search"
            />
          </template>
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: right">
        <el-pagination
          layout="prev, pager, next"
          :page-size="this.pageSize"
          :total="this.tableData.length"
          @current-change="setPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "projects-table",
  props: {
    type: {
      type: String,
    },
    title: String,
  },
  computed: {
    pagedTableData() {
      return this.tableData.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
  },

  data() {
    return {
      tableData: [],
      error: [],
      no: 0,
      search: "",
      page: 1,
      pageSize: 8,
      total: 0,
      formInline: {
          user: '',
          region: ''
        },
        subject:{
          name:'math'
        }
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    setPage(val) {
      this.page = val;
    },
    onSubmit() {
        console.log('submit!');
      }
  },
  created() {
    axios
      .get(`http://localhost:8080//api//managers//all`)
      .then((response) => {
        this.tableData = response.data;
      })
      .catch((e) => {
        this.error.push(e);
      });
  },
};
</script>
<style>
</style>
