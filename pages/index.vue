<template>
<b-container fluid>
  <b-row class="justify-content-between mt-5">
    <b-col cols="12" md="6">
      <b-input-group>
        <template #append>
          <b-input-group-text>
            <b-icon-search />
          </b-input-group-text>
        </template>

        <b-form-input id="gameSearch" type="text" placeholder="Enter keywords to search games" v-model="searchTerm" @input="searchGames" />
        <label class="sr-only" for="gameSearch">Search keywords</label>
      </b-input-group>
    </b-col>

    <b-col class="text-right">
      <button class="btn btn-dark">Add a Game</button>
    </b-col>
  </b-row>

  <b-row>
    <b-col>
      <!-- <table class="table table-striped mt-4" id="gamesTable">
        <thead>
          <th>Game</th>
          <th>Description</th>
        </thead>

        <tbody>
          <tr v-for="game in games" :key="game.id">
            <td>
              <img :src="game.box_art_url | thumb(150)" :alt="game.name + ' box art'" />
            </td>
            <td>
              <NuxtLink to="/:game.name">{{game.name}}</NuxtLink>
              <p>{{game.description}}</p>
            </td>
          </tr>
        </tbody>
      </table> -->

      <b-table striped :items="games.data" :fields="fields" class="mt-3" id="gamesTable">
        <template #cell(nameDesc)="data">
          <span class="lead">{{ data.item.name }}</span>
          <p>
            {{data.item.description}}
          </p>
        </template>

        <template #cell(boxArt)="data">
          <img :src="data.item.box_art_url | thumb(150)" :alt="data.item.name + ' box art'" />
        </template>
      </b-table>

      <b-pagination v-model="currentPage" :total-rows="games.total" :per-page="games.per_page" aria-controls="gamesTable"></b-pagination>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  data: () => ({
    games: [],
    fields: [{
        key: 'nameDesc',
        label: ""
      },
      {
        key: "boxArt",
        label: ""
      }
    ],
    searchTerm: null,
    currentPage: 1,
    perPage: 5
  }),
  methods: {
    searchGames() {
      this.getGames(this.searchTerm);
    },
    async getGames(str) {
      let url = 'http://161.35.15.14/api/games';
      if (str) url += '?filter[search]=' + str;

      await this.$axios.$get(url)
        .then((res) => {
          this.games = res;
        });
    }
  },
  created() {
    this.$store.commit('pages/setPageTitle', 'Games');
    this.getGames();
  },
  filters: {
    thumb: function(url, size) {
      return url.replace('{width}', size).replace('{height}', size);
    }
  }
}
</script>
