<template>
  <div>
    <base-header type="gradient-info" class="pb-5 pb-7 pt-4 pt-md-7"/>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <courses-table></courses-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CoursesTable from "@/views/Tables/CoursesTable";
export default {
  name: "tables",
  components: {
    CoursesTable,
  },
};
</script>
<style></style>
