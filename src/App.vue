<template>
  <div id="app">
    <NotificationBox/>
    <notifications></notifications>
    <router-view />
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/messaging";
import NotificationBox from "./components/NotificationPlugin/NotificationBox"
export default {
  components:{
    NotificationBox
  },
  created() {
    try {
      firebase
        .messaging()
        .getToken()
        .then(() => {
          console.log("Notification permission granted.");
          return firebase
            .messaging()
            .getToken()
            .then((token) => {
              window.console.log(token);
            })
            .catch((err) => {
              console.log("Unable to get token.", err);
            });
        });
    } catch (e) {
      console.log(e);
    }
  },
};
</script>
