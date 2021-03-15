<template>
  <div>
    <base-header type="gradient-success" class="pb-5 pb-7 pt-4 pt-md-7"/>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <accounts-table title="Account Table"></accounts-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AccountsTable from "@/views/Tables/AccountsTable";
export default {
  name: "tables",
  components: {
    AccountsTable,
  },
};
</script>
<style></style>
