<template>
<b-container fluid>
  <b-row>
    <b-col>
      <NuxtLink to="/games/ghosthunter">Ghost Hunter</NuxtLink>
      <NuxtLink to="/">Back</NuxtLink>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  data: () => ({}),
  async fetch() {
    this.posts = await this.$http.$get('http://161.35.15.14/api/')
  }
}
</script>
