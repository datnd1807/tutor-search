<template>
  <div>
    <base-header type="gradient-success" class="pb-5 pb-7 pt-4 pt-md-7"/>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <el-tabs type="border-card">
            <el-tab-pane label="Classes">
              <classes-table/>
            </el-tab-pane>
            <el-tab-pane label="Subjects">
              
            </el-tab-pane>
          </el-tabs>
          
          
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ClassesTable from "./ClassesTable";
export default {
  name: "tables",
  components: {
    ClassesTable,
  },
};
</script>
<style></style>