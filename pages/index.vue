<template>
<b-container fluid class="mt-5">
  <b-row class="justify-content-center">
    <b-col>
      <NuxtLink to="/games"><b-button>Find Games</b-button></NuxtLink>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  created() {
    this.$store.commit('pages/setPageTitle', 'Home')
  }
}
</script>
