<template>
<b-container fluid>
  <b-row class="mt-3">
    <b-col>
      <b-button title="Save this game" v-b-tooltip.hover v-if="name || description" @click="saveGame" variant="success">
        <b-icon-hdd-fill />
      </b-button>
    </b-col>

    <b-col class="col-auto">
      <NuxtLink to="/">Back to Games Index</NuxtLink>
    </b-col>
  </b-row>

  <b-row class="justify-content-between mt-4">
    <b-col>
      <b-form-input id="nameInput" v-model="name" placeholder="Enter a name for this game" />
      <b-form-textarea id="descInput" v-model="description" placeholder="Enter a description for this game" rows="3" max-rows="6" class="mt-2" />
      <b-form-input id="boxArtInput" v-model="artUrl" placeholder="Enter a URL for this game's box art" class="mt-2 " />
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  data: () => ({
    name: null,
    description: null,
    artUrl: null
  }),
  methods: {
    async saveGame() {
      let url = 'http://161.35.15.14/api/games';

      await this.$axios.$post(url, {
          name: this.name,
          description: this.description,
          box_art_url: this.artUrl
        })
        .then((res) => {
          this.routeToGame(res.id);
        });
    },
    routeToGame(id) {
      this.$router.push('/games/' + id);
    }
  },
  created() {
    this.$store.commit('pages/setPageTitle', 'New Game');
  },
  filters: {
    thumbImage: function(url, size) {
      return url.replace('{width}', size).replace('{height}', size);
    }
  }
}
</script>
