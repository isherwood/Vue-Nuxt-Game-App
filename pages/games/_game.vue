<template>
<b-container fluid>
  <b-row class="mt-3">
    <b-col>
      <b-button title="Edit this game" v-b-tooltip.hover v-if="!editMode" @click="toggleEditMode">
        <b-icon-pencil-fill />
      </b-button>
      <b-button title="Save this game" v-b-tooltip.hover v-if="editMode" @click="saveGame" variant="success">
        <b-icon-hdd-fill />
      </b-button>
    </b-col>

    <b-col class="col-auto">
      <NuxtLink to="/">Back to Games Index</NuxtLink>
    </b-col>
  </b-row>

  <b-row class="justify-content-between mt-4">
    <b-col>
      <div v-if="game">
        <h2 v-text="game.name" />

        <div class="border-top border-bottom mb-3">
          <small>
            Created {{$moment(game.created_at).format('MMMM Do YYYY, h:mm a')}}<br />
            Last updated {{$moment(game.updated_at).format('MMMM Do YYYY, h:mm a')}}
          </small>
        </div>

        <p v-text="game.description" v-if="!editMode" />

        <b-form-textarea id="descInput" v-model="game.description" placeholder="Enter a new description for this game" rows="3" max-rows="6" v-if="editMode" />
      </div>
    </b-col>

    <b-col class="col-auto">
      <img :src="game.box_art_url | thumbImage(300)" :alt="game.name + ' box art'" v-if="game" />
    </b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  data: () => ({
    game: null,
    editMode: false
  }),
  methods: {
    async getGame() {
      let url = 'http://161.35.15.14/api' + this.$route.path;

      await this.$axios.$get(url)
        .then((res) => {
          this.game = res;
        });
    },
    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    async saveGame() {
      let url = 'http://161.35.15.14/api' + this.$route.path;

      await this.$axios.$put(url, {
          description: this.game.description
        })
        .then((res) => {
          this.toggleEditMode();
          this.makeSaveToast(true, 'Game saved!');
          this.getGame();
        });
    },
    makeSaveToast(variant, message) {
      this.$bvToast.toast(message, {
        variant: variant ? 'success' : 'danger',
        autoHideDelay: 3000,
        appendToast: false
      })
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
