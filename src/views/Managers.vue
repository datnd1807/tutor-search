<template>
  <div>
    <base-header type="gradient-success" class="pb-5 pb-6 pt-4 pt-md-7"/>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <managers-table title="Managers Management"></managers-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ManagersTable from "@/views/Tables/ManagersTable";
export default {
  name: "tables",
  components: {
    ManagersTable,
  },
};
</script>
<style></style>
