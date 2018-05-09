<template>
<div>
  <v-list>
    <v-list-tile v-for='item in tracks' :key=" item.key " @click="itemClick(item) ">
      <v-list-tile-content>
        <v-list-tile-title v-text="item.get( 'title') "></v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</div>
</template>
<script>
export default {
  name: 'TrackList',
  props: ['map', 'tracks'],
  data() {
    return {}
  },
  methods: {
    itemClick: function (layer) {
      if (this.map) {
        this.map.getView().fit(layer.extent)
      }
    }
  }
}
</script>
