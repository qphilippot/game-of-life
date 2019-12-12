<template>
    <div class="app-bottom-bar">
        <p>( {{ Number(cellFocused.x).toFixed(2) }} , 
            {{ Number(cellFocused.y).toFixed(2) }} )</p>
    </div>
</template>

<style lang="scss">
.app-bottom-bar {
    z-index: 1;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: right;
}
</style>

<script>
import { mapState } from 'vuex';

export default {
  name: 'bottom-bar',
  components: {},
  props: [],
  data () {
    return {

    }
  },

  mounted () {

  },

  computed: {
   ...mapState({
     cellFocused: state => state.game.cellFocused
   })
  },

  methods: {

  }
}

</script>