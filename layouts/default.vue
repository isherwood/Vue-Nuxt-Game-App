<template>
<div class="d-flex flex-column vh-100">
  <b-navbar type="dark" variant="dark">
    <NuxtLink to="/" class="position-absolute"><b-icon-controller class="text-secondary display-4" /></NuxtLink>
    <b-navbar-brand class="ml-5 pl-4">
      <NuxtLink to="/" class="text-white text-decoration-none">{{siteTitle}}</NuxtLink> : <span class="text-danger">{{pageTitle}}</span></b-navbar-brand>

    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown :text="userEmail" right>
        <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>

  <b-alert variant="danger" :show="error != null" class="my-2">{{error}}</b-alert>

  <div class="flex-fill">
    <Nuxt />
  </div>

  <footer>
    <b-container fluid>
      <b-row>
        <b-col class="py-2 border-top text-center">
          <small>Site created by Clint Buhs with support from <a href="https://www.thinkuptech.com/">ThinkUp Technologies</a></small>
        </b-col>
      </b-row>
    </b-container>
  </footer>
</div>
</template>

<script>
export default {
  data: () => ({
    siteTitle: 'NuxtVue Gaming Center',
    error: null
  }),
  methods: {
    logout: async function() {
      this.error = null;

      try {
        await this.$auth.logout();
        this.$store.commit('user/setEmail', null);
        this.$router.push('/login');
      } catch (e) {
        this.error = e.response.data.message
      }
    },
    headHome() {
      this.$router.push('/login');
    }
  },
  computed: {
    pageTitle() {
      return this.$store.getters['pages/getPageTitle']
    },
    userEmail() {
      return this.$store.getters['user/getEmail'];
    }
  }
}
</script>
