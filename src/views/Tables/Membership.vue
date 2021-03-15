<template>
  <div>
    <base-header type="gradient-info" class="pb-5 pb-7 pt-4 pt-md-7" />
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <membership-detail></membership-detail>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MembershipDetail from "./MembershipDetail";
export default {
  name: "tables",
  components: {
    MembershipDetail,
  },
};
</script>
<style></style>
