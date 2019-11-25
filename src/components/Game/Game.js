export default {
  name: 'game',
  components: {},
  props: [
    
  ],
  data () {
    return {

    }
  },
  computed: {

  },
  mounted () {
    this.$store.commit('game/create');
  },

  methods: {

  }
}
