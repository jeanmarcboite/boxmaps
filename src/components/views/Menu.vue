<template>
<div id="menu">
  <v-navigation-drawer temporary :mini-variant="miniVariant" v-model="drawer" enable-resize-watcher fixed app>
    <h1><span v-html='title'/></h1>
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
import listTracks from '@/components/ol/listTracks'
export default {
  name: 'Menu',
  props: ['map'],
  computed: {
    ...mapGetters(['miniVariant']),
    drawer: {
      get: function () {
        return this.$store.state.settings.drawer
      },
      set: function (value) {
        this.$store.commit('setDrawer', value)
      }
    }
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
        }
      ]
    }
  },
  methods: {
    onInput(isOpen, item) {
      item.isOpen = isOpen
      if (item.isOpen) {
        listTracks(this.map, this.map, document.getElementById('trackList'))
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
