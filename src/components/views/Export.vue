<template>
<div>
  <v-btn id="exportButton" color="primary" dark @click.native.stop="exportDialog = true" style="display: none;">export</v-btn>
  <v-dialog v-model="exportDialog">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click.native="exportDialog = false">
          <i class="fa fa-chevron-left"></i>'
        </v-btn>
        <v-toolbar-title>Select what to export:</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark flat @click.native="exportDialog = false">Export</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-list-tile avatar v-for='item in exports' :key="item.key">
        <v-list-tile-action>
          <v-checkbox v-model="item.checked" />
        </v-list-tile-action>
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
  sync
} from 'vuex-pathify'

export default {
  name: 'Export',
  computed: {
    ...sync('ui/', ['exportDialog'])
  },
  data() {
    return {
      exports: [{
        key: 'tracks',
        checked: true,
        title: 'Tracks',
        subTitle: 'traces',
      }, {
        key: 'bookmarks',
        checked: false,
        title: 'Bookmarks',
        subTitle: 'bookmarks',
      }, {
        key: 'layers',
        checked: false,
        title: 'Layers',
        subTitle: 'map providers',
      }, {
        key: 'settings',
        checked: false,
        title: 'Settings',
        subTitle: 'application settings',
      }],
      tracks: true,
      bookmarks: false
    }
  }
}
</script>

<style>

</style>
