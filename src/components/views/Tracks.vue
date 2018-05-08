<template>
<div>
  <v-btn id="tracksButton" color="primary" dark @click.native.stop="openDialog" style="display: none;">tracks</v-btn>
  <v-dialog v-model="tracksDialog">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click.native="tracksDialog = false">
          <i class="fa fa-chevron-left"></i>'
        </v-btn>
        <v-toolbar-title>Blood on the tracks:</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click.native="tracksDialog = false">Close</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list>
        <v-list-tile v-for='item in tracks' :key="item.key" @click="itemClick(item)">
          <v-list-tile-content>
            <v-list-tile-title v-text="item.get('title')"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations
} from 'vuex'
import {
  sync
} from 'vuex-pathify'

import listTracks from '@/components/ol/listTracks'

export default {
  name: 'Tracks',
  props: ['map'],
  computed: {
    ...sync('ui/', ['tracksDialog'])
  },
  data() {
    return {
      tracks: [],
    }
  },
  methods: {
    openDialog: function () {
      this.tracks = listTracks(this.map)
      this.tracksDialog = true
    },
    itemClick: function (layer) {
      this.map.getView().fit(layer.extent)
      this.tracksDialog = false
    }
  }
}
</script>

<style>
.ol-control.ol-bookmark ul {
  margin: 0;
  padding: 0;
  list-style: none;
  min-width: 10em;
}

.ol-control.ol-bookmark li {
  color: rgba(0, 60, 136, 0.8);
  font-size: 0.9em;
  padding: 0 0.2em 0 0.5em;
  cursor: default;
  clear: both;
}

.ol-control.ol-bookmark li:hover {
  background-color: rgba(0, 60, 136, .5);
  color: #fff;
}
</style>
