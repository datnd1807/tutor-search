<template>
  <div>
    <base-header type="gradient-info" class="pb-5 pb-7 pt-4 pt-md-8" />
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <manager-table></manager-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ManagerTable from "./ManagerTable.vue";
export default {
  name: "tables",
  components: {
    ManagerTable,
  },
};
</script>
<style></style>
