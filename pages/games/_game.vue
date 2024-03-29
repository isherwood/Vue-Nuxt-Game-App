<style>
  .art-thumb {
    width: 400px;
    max-width: 100%;
  }
  @media (min-width: 401px) and (max-width: 900px) {
    .art-thumb {
      max-width: 40vw;
    }
  }
</style>

<template>
<b-container fluid>
  <b-row class="mt-3">
    <b-col>
      <b-button title="Edit this game" v-b-tooltip.hover v-if="!editMode" @click="toggleEditMode">
        <b-icon-pencil-fill />
      </b-button>
      <b-button title="Delete this game" v-b-tooltip.hover v-if="!editMode" @click="showDeleteConfirm" variant="danger">
        <b-icon-trash-fill />
      </b-button>

      <b-button title="Save this game" v-b-tooltip.hover v-if="editMode" @click="saveGame" variant="success">
        <b-icon-hdd-fill />
      </b-button>
      <b-button title="Cancel editing" v-b-tooltip.hover v-if="editMode" @click="toggleEditMode" variant="danger">
        <b-icon-x-circle-fill />
      </b-button>
    </b-col>

    <b-col class="col-auto">
      <NuxtLink to="/">Back to Games Index</NuxtLink>
    </b-col>
  </b-row>

  <b-row class="justify-content-between mt-4">
    <b-col>
      <div v-if="game">
        <h2 v-text="game.name" v-if="!editMode" />
        <b-form-input v-model="game.name" placeholder="Enter a new title for this game" v-if="editMode" class="mb-3" />

        <div class="border-top border-bottom mb-3">
          <small>
            Created {{$moment(game.created_at).format('MMMM Do YYYY, h:mm a')}}<br />
            Last updated {{$moment(game.updated_at).format('MMMM Do YYYY, h:mm a')}}
          </small>
        </div>

        <p v-text="game.description" v-if="!editMode" />
        <b-form-textarea id="descInput" v-model="game.description" placeholder="Enter a new description for this game" rows="3" max-rows="6" v-if="editMode" />

        <!-- <b-form-input v-model="game.box_art_url" placeholder="Enter a URL for the box art image" v-if="editMode" class="mt-2" /> -->
      </div>
    </b-col>

    <b-col class="col-auto" v-if="game">
      <img :src="game.box_art_url | thumbImage(400)" :alt="game.name + ' box art'" v-if="game.box_art_url" class="art-thumb" />
    </b-col>
  </b-row>

  <div v-if="game">
    <b-modal id="deleteConfirmModal" @ok="deleteGame">
      <p class="my-4">Are you sure you want to permanently delete <strong>{{game.name}}</strong>?</p>
    </b-modal>
  </div>
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
          name: this.game.name,
          description: this.game.description,
          // box_art_url: this.game.box_art_url
        })
        .then((res) => {
          this.toggleEditMode();
          this.makeSaveToast(true, 'Game saved!');
          this.getGame();
        });
    },
    showDeleteConfirm() {
      this.$root.$emit('bv::show::modal', 'deleteConfirmModal');
    },
    async deleteGame() {
      let url = 'http://161.35.15.14/api' + this.$route.path;

      await this.$axios.$delete(url, {})
        .then((res) => {
          this.$router.push('/');
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
      if (url) {
        return url.replace('{width}', size).replace('{height}', size);
      }
    }
  }
}
</script>
