<template>
  <div>
    <base-header type="gradient-info" class="pb-5 pb-7 pt-4 pt-md-8" />
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <tutors-table title="Feedback"></tutors-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TutorsTable from "./TutorsTable.vue";
export default {
  name: "tables",
  components: {
    TutorsTable,
  },
};
</script>
<style></style>
