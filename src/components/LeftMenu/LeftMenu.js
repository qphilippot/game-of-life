export default {
  name: 'left-menu',
  components: {},

  props: [],
  data () {
    return {
      buttons: [
        {
          name: "populate",
          action: 'game/populate'
        },

        {
          name: "tick",
          action: 'game/tick'
        },
        
        {
          name: "clear",
          action: 'game/clear'
        }
      ]
    }
  },

  computed: {

  },
  
  mounted () {

  },
  methods: {
    perform(action) {
      this.$store.commit(action);
    }
  }
}
