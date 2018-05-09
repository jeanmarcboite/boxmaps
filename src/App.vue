<template>
<v-app>
  <v-content>
    <router-view/>
  </v-content>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      title: 'Vuetify.js',
    }
  },
  name: 'App'
}
</script>

<style>
@import "font-awesome/css/font-awesome.css";
</style>
