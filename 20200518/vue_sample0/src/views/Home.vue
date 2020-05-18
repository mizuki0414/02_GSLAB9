<template>
  <div class="home">
    <v-row align="center" justify="center">
      <v-col class="text-center" cols="12">
        <h1>Vuetify.js</h1>
        <h4>Build your application today!</h4>
      </v-col>
      <v-btn outlined color="primary" router-link to="/signin">Signin</v-btn>
      <v-btn outlined color="warning" router-link to="/signup">Signup</v-btn>
    </v-row>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.text-center {
  margin-top: 60px;
}

h1 {
  color: white;
  font-weight: bold;
  font-size: 250px;
  margin-block-start: 0.1em;
  margin-block-end: 0.1em;
}

h4 {
  color: white;
  margin-top: 130px;
}

.home {
  height: 100%;
  width: 100%;
  background-image: url("../assets/mr-tt-xb0wLfZH9Zo-unsplash.jpg");
  background-size: cover;
}

.v-btn:not(.v-btn--round).v-size--default {
  margin-right: 8px;
}
</style>