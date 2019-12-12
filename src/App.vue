<template>
  <div>
    <app-header></app-header>
    <left-menu></left-menu>
    <game></game>
    <bottom-bar></bottom-bar>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import LeftMenu from "./components/LeftMenu/index.vue";
import Game from "./components/Game/index.vue";
import BottomBar from './components/BottomBar.vue';
export default {
  name: "game-of-life",
  components: {
    AppHeader,
    LeftMenu,
    Game,
    BottomBar
  },

  props: {
  
  },
  
  data() {
    return {
    };
  },
  
  methods: {
  
  },
  
  mounted() {
    
  }
};
</script>