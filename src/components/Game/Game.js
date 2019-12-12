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
    this.$store.dispatch('game/create');
  },

  methods: {

  }
}
