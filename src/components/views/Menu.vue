<template>
<div id="menu">
  <v-navigation-drawer temporary v-model="drawer" enable-resize-watcher fixed app>
    <h1>
        <v-btn icon @click.native="drawer = false">
          <i class="fa fa-chevron-left"></i>'
        </v-btn>
      <span v-html='title'/>
    </h1>
    <p style="border-bottom:1px solid #999;" v-html='subtitle' />
    <v-expansion-panel>
      <v-expansion-panel-content v-for='item in menu' :key="item.id" @input='onInput($event, item)'>
        <div slot='header' v-html='item.title' />
        <div v-html='item.content' :id='"expansionPanelContent" + item.id' />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <div class="data"></div>
  </v-navigation-drawer>
</div>
</template>

<script>
import {
  mapGetters,
  mapMutations
} from 'vuex'

import listTracks from '@/ol/listTracksInDOM'
import {
  sync
} from 'vuex-pathify'
export default {
  name: 'Menu',
  props: ['map'],
  computed: {
    ...sync('ui/', ['drawer']),
  },
  data() {
    return {
      title: 'Menu',
      subtitle: '<i>Menu</i> can be used to display a menu or information on the top of the map.',
      menu: [
        {
          id: 'lorem',
          title: 'Item 1',
          content: `
      <v-card>
        <v-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</v-card-text>
      </v-card>
          `
        },
        {
          id: 'tracks',
          title: 'Tracks',
          content: '<ul id="trackList"/>'
        },
        {
          id: 'settings',
          title: 'Settings',
          content: '<ul id="settingsList"/>'
        }
      ]
    }
  },
  methods: {
    onInput(isOpen, item) {
      item.isOpen = isOpen
      if (item.isOpen) {
        switch (item.id) {
        case 'tracks':
          listTracks(this.map, this.map, document.getElementById('trackList'))
          break
        case 'settings':
          break
        default:
        }
      }
    }
  }
}
</script>

<style>
.ol-overlay.menu {
  width: 30%;
  background: #fff;
  color: #333;
  box-shadow: 0 0 5px #000;
  padding: 0.5em;
  -webkit-transition: all 0.25s;
  transition: all 0.25s;
}

/* style the close box */

.ol-overlay.menu .ol-closebox {
  color: #369;
  left: 1em;
  top: 0.5em;
}

.ol-overlay.menu .ol-closebox:before {
  content: "\f0c9";
  font-family: FontAwesome;
}

#menu {
  padding-top: 1.5em;
  font-size: 0.9em;
}

/* menu button */

.ol-control.menu {
  top: 0.5em;
  left: 0.5em;
}

.ol-control.menu i {
  color: #fff;
}

.ol-rotate {
  right: 3em;
}

.ol-touch .ol-rotate {
  right: 3.5em;
}

/**/

.ol-overlay img {
  max-width: 90%;
}

.data,
.data p {
  margin: 0;
  text-align: center;
  font-size: 0.9em;
}
</style>
