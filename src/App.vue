<template>
  <div>
    <app-header></app-header>
    <left-menu></left-menu>
    <game></game>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import LeftMenu from "./components/LeftMenu/index.vue";
import Game from "./components/Game/index.vue";
export default {
  name: "game-of-life",
  components: {
    AppHeader,
    LeftMenu,
    Game
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