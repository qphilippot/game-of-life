<template>
  <div>
    <left-menu></left-menu>
    <game></game>
  </div>
</template>

<script>
import LeftMenu from "./components/LeftMenu/index.vue";
import Game from "./components/Game/index.vue";
export default {
  name: "game-of-life",
  components: {
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