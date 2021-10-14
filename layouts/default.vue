<template>
<div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-brand>{{siteTitle}} : <span class="text-danger">{{pageTitle}}</span></b-navbar-brand>

    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown :text="username" right>
        <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>

  <b-alert variant="danger" :show="error != null" class="my-2">{{error}}</b-alert>

  <Nuxt />
</div>
</template>

<script>
export default {
  data: () => ({
    siteTitle: 'NuxtVue Gaming Center',
    pageTitle: 'Home',
    username: 'Clint',
    error: null
  }),
  methods: {
    logout: async function() {
      this.error = null;

      try {
        await this.$auth.logout();
        this.$router.push('/login');
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>
