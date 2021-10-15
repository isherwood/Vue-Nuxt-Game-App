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
          <NuxtLink :to="{path: '/game/' + data.item.id}" class="lead">{{ data.item.name }}</NuxtLink>
          <p>
            {{data.item.description | textLimit(300)}}
          </p>
        </template>

        <template #cell(boxArt)="data">
          <div class="text-right">
            <NuxtLink :to="{path: '/game/' + data.item.id}">
              <img :src="data.item.box_art_url | thumbImage(150)" :alt="data.item.name + ' box art'" />
            </NuxtLink>
          </div>
        </template>
      </b-table>

      <b-pagination v-model="currentPage" :total-rows="games.total" :per-page="games.per_page" aria-controls="gamesTable" @input="getGames(searchTerm, currentPage)"></b-pagination>
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
    async getGames(str, page) {
      let url = 'http://161.35.15.14/api/games?fakeParam=0';
      if (str) url += '&filter[search]=' + str;
      if (page) url += '&page[number]=' + page;

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
    thumbImage: function(url, size) {
      return url.replace('{width}', size).replace('{height}', size);
    },
    textLimit: function(str, len) {
      if (str) {
        if (str.length > len) {
          str = str.substring(0, len - 4);
          str += ' ...';
        }
        return str;
      }
    }
  }
}
</script>
