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
      <TrackList :tracks="tracks" />
    </v-card>
  </v-dialog>
</div>
</template>

<script>
import {
  sync
} from 'vuex-pathify'

import listTracks from '@/ol/utils/listTracks'
import TrackList from './BTrack.vue'
import ColorPicker from './ColorPicker.vue'
export default {
  name: 'Tracks',
  components: {
    TrackList,
  },
  computed: {
    ...sync('ui/', ['tracksDialog'])
  },
  data() {
    return {
      tracks: [],
      item: {
        color: {
          hex: '#194d33',
          hsl: {
            h: 150,
            s: 0.5,
            l: 0.2,
            a: 1
          },
          hsv: {
            h: 150,
            s: 0.66,
            v: 0.30,
            a: 1
          },
          rgba: {
            r: 25,
            g: 77,
            b: 51,
            a: 1
          },
          a: 1
        }
      }
    }
  },
  methods: {
    openDialog: function () {
      this.tracks = listTracks(this.$map)
      this.tracksDialog = true
    },
    logClick: function () {
      console.log('click')
    },
    chooseColor: function (layer) {
      console.log('choose track color ' + layer)
    },
    itemClick: function (layer) {
      this.$map.getView().fit(layer.extent)
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
