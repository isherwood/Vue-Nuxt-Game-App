<template>
<b-container fluid class="mt-5">
  <b-row class="justify-content-center">
    <b-col></b-col>
    <b-col>
      <b-form class="flex-nowrap" @submit="onSubmit" ref="loginForm">
        <label class="sr-only" for="emailInput">Email Address</label>
        <b-form-input id="emailInput" v-model="loginForm.email" type="email" placeholder="Email Address" required></b-form-input>

        <label class="sr-only" for="passwordInput">Password</label>
        <b-form-input id="passwordInput" v-model="loginForm.password" type="password" placeholder="Password" required class="mt-2"></b-form-input>

        <b-button type="submit" variant="secondary" class="btn-block mt-2">Get Me In There!</b-button>
      </b-form>
    </b-col>
    <b-col></b-col>
  </b-row>
</b-container>
</template>

<script>
export default {
  data: () => ({
    loginForm: {
      email: 'sally@example.test',
      password: 'secret-games'
    },
    token: ''
  }),
  methods: {
    onSubmit: function(e) {
      e.preventDefault();

      this.$axios.$post('http://161.35.15.14/api/tokens', {
          email: this.loginForm.email,
          password: this.loginForm.password
        })
        .then(data => {
          this.token = data.token;
        })
        .catch(err => console.error(err));
    },
    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    }
  }
}
</script>
