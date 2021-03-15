<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard',
          }"
        />

        <sidebar-item
          :link="{
            name: 'Accounts Management',
            icon: 'el-icon-user-solid text-blue',
            path: '/accounts',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Managers Management',
            icon: 'el-icon-user-solid text-blue',
            path: '/managers',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Courses',
            icon: 'ni ni-single-copy-04 text-blue',
            path: '/courses',
          }"
        />
         <sidebar-item
          :link="{
            name: 'Classes Management',
            icon: 'ni ni-single-copy-04 text-blue',
            path: '/classes',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Tutors',
            icon: 'el-icon-user-solid text-blue',
            path: '/tutors',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Feedback Confirmation',
            icon: 'el-icon-s-claim text-blue',
            path: '/feedbacks',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Membership and Fees',
            icon: 'el-icon-s-finance text-blue',
            path: '/membership',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Manager',
            icon: 'el-icon-s-finance text-blue',
            path: '/manager',
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    FadeTransition,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
      links: [
        {
          name: "Accounts Management",
          icon: "ni ni-single-02 text-blue",
          path: "/accounts",
        },
        {
          name: "Managers Management",
          icon: "ni ni-single-02 text-blue",
          path: "/managers",
        },
      ],
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style lang="scss">
</style>
