<template>
<b-container fluid>
  <b-row>
    <b-col class="pt-5">
      <NuxtLink to="/">Home</NuxtLink>
    </b-col>
  </b-row>

  <b-row class="justify-content-between mt-3">
    <b-col cols="12" md="6">
      <b-form @submit="searchGames">
        <b-input-group>
          <b-form-input id="gameSearch" type="text" placeholder="Search keyword" v-model="searchTerm" />
          <label class="sr-only" for="gameSearch">Search keyword</label>

          <b-input-group-append>
            <b-button variant="secondary" type="button">Go</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form>
    </b-col>

    <b-col class="text-right">
      <button class="btn btn-dark">Add a Game</button>
    </b-col>
  </b-row>

  <b-row>
    <b-col>
      <table class="table table-striped mt-3">
        <thead>
          <th>Game</th>
          <th>Description</th>
        </thead>

        <tbody>
          <tr v-for="game in games" :key="game.id">
            <td class="text-nowrap">{{game.name}}</td>
            <td>{{game.description}}</td>
          </tr>
        </tbody>
      </table>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  data: () => ({
    games: [],
    searchTerm: null
  }),
  methods: {
    searchGames(e) {
      e.preventDefault();
      this.getGames(this.searchTerm);
    },
    async getGames(str) {
      let url = 'http://161.35.15.14/api/games';
      if (str) url += '?filter[search]=' + str;

      await this.$axios.$get(url)
        .then((res) => {
          this.games = res.data;
          console.log(this.games);
        });
    }
  },
  created() {
    this.$store.commit('pages/setPageTitle', 'Games');
    this.getGames();
  }
}
</script>
