import Game from '../../game/app';

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
    const game = new Game();
    game.start();
  },
  methods: {

  }
}
