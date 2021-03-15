<template>
  <div>
    <base-header type="gradient-info" class="pb-5 pb-7 pt-4 pt-md-8" />
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <feedback-confirmation title="Feedback"></feedback-confirmation>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import FeedbackConfirmation from "./FeedbackConfirmation.vue";
export default {
  name: "tables",
  components: {
    FeedbackConfirmation,
  },
};
</script>
<style></style>
