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
