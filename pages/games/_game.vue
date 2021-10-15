<template>
<b-container fluid>
  <b-row class="justify-content-between mt-5">
    <b-col>
      <h2 v-text="game.name" v-if="game" />
      <p v-text="game.description" v-if="game" />
      <p v-if="game">
        Created {{$moment(game.created_at).format('MMMM Do YYYY, h:mm a')}}<br />
        Last updated {{$moment(game.updated_at).format('MMMM Do YYYY, h:mm a')}}
      </p>
    </b-col>

    <b-col class="text-right">
      <img :src="game.box_art_url | thumbImage(300)" :alt="game.name + ' box art'" v-if="game" />
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  data: () => ({
    game: null
  }),
  methods: {
    async getGame() {
      let url = 'http://161.35.15.14/api' + this.$route.path;

      await this.$axios.$get(url)
        .then((res) => {
          this.game = res;
        });
    }
  },
  created() {
    this.$store.commit('pages/setPageTitle', 'Game Profile');
    this.getGame();
  },
  filters: {
    thumbImage: function(url, size) {
      return url.replace('{width}', size).replace('{height}', size);
    }
  }
}
</script>
