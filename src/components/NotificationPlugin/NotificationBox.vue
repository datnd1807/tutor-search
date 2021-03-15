
<template>
  <div></div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/messaging";
const sound = require("./zapsplat_multimedia_notification_pop_message_tooltip_small_click_009_63079.mp3");
export default {
  name: "NotificationBox",
  components: {},

  data() {
    return {
      from: "",
      subject: "",
      userimg: "",
      messaging: firebase.messaging(),
      currentMessage: "",
      soundNoti: sound 
    };
  },

  methods: {
    receiveMessage() {
      try {
        firebase.messaging().onMessage((payload) => {
          // debugger
          this.currentMessage = payload;
          this.showNotification(
            payload.data.username,
            payload.data.message
          );
        });
      } catch (e) {
        console.log(e);
      }
    },
    showNotification(username, message) {
      var sound = new Audio(this.soundNoti);
      sound.play();
      this.$notify({
        title: username,
        message: message,
        type: 'warning'
      });
    },
  },

  created() {
    this.receiveMessage();
  },

  validations: function () {
    return {};
  },

  computed: {},
};
</script>

<style scoped>
.notification-box {
  display: flex;
  position: absolute;
  right: 5px;
  bottom: 10px;
  width: 30%;
  height: 100px;
  background-color: #fff;
  z-index: 999;
}
#notification-close {
  position: absolute;
  color: #777;
  font: 14px;
  right: 5px;
  text-decoration: none;
  text-shadow: 0 1px 0 #fff;
  top: 2px;
  z-index: 10;
  cursor: pointer;
}

.notification-data {
  margin: 0 20px;
}
.notification-data p {
  margin: 10px 0;
}
.notification-notice p {
  font-size: 14px;
  font-weight: 400;
}
.notification-title p {
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
}
.notification-time small {
  font-size: 12px;
}

.notification-wall-number small {
  font-size: 8px;
}
img {
  width: 30px;
}
</style>
view rawNotification box.txt hosted with ❤ by GitHub