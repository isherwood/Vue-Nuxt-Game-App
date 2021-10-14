<template>
<b-container fluid class="mt-5">
  <b-row class="justify-content-center">
    <b-col></b-col>
    <b-col>
      <b-form class="flex-nowrap" method="post" @submit.prevent="login" ref="loginForm">
        <label class="sr-only" for="emailInput">Email Address</label>
        <b-form-input id="emailInput" v-model="loginForm.email" type="email" placeholder="Email Address" required></b-form-input>

        <b-input-group class="mt-2">
          <template #append>
            <b-input-group-text @click="togglePasswordVisibility">
              <b-icon-eye-fill v-if="passwordInputType === 'password'"></b-icon-eye-fill>
              <b-icon-eye-slash-fill v-if="passwordInputType === 'text'"></b-icon-eye-slash-fill>
            </b-input-group-text>
          </template>
          <b-form-input id="passwordInput" v-model="loginForm.password" :type="passwordInputType" placeholder="Password" required></b-form-input>
          <label class="sr-only" for="passwordInput">Password</label>
        </b-input-group>

        <b-alert variant="danger" :show="error != null" class="my-2">{{error}}</b-alert>

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
    pageTitle: "Log In",
    loginForm: {
      email: 'sally@example.test',
      password: 'secret-games'
    },
    passwordInputType: 'password',
    error: null,
    token: null
  }),
  methods: {
    login: async function() {
      this.error = null;

      try {
        await this.$auth.loginWith('local', {
          data: {
            email: this.loginForm.email,
            password: this.loginForm.password
          }
        });

        this.$router.push('/');
      } catch (e) {
        this.error = e.response.data.message;
      }
    },
    togglePasswordVisibility() {
      this.passwordInputType = this.passwordInputType === 'password' ? 'text' : 'password';
    }
  }
}
</script>
