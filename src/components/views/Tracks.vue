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
      <v-list-tile avatar v-for='item in tracks' :key="item.key">
        <v-list-tile-content>
          <v-list-tile-title>{{item.title}}</v-list-tile-title>
          <v-list-tile-sub-title>{{item.subTitle}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
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
      this.tracks = listTracks(this.map, this.map, [])
      this.tracksDialog = true
    }
  }
}
</script>

<style>

</style>
