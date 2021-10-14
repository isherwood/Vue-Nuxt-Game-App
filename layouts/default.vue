<template>
<div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-brand>{{siteTitle}} : <span class="text-danger">{{pageTitle}}</span></b-navbar-brand>

    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown :text="username" right>
        <b-dropdown-item href="/logout">Log Out</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>

  <Nuxt />
</div>
</template>

<script>
export default {
  data: () => ({
    siteTitle: 'NuxtVue Gaming Center',
    pageTitle: 'Home',
    username: 'Clint'
  })
}
</script>
