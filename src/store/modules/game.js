import Game from '../../game/app';

export default {
    namespaced: true,

    state: {
        game: null
    },

    getters: {
        game(state) {
            return state.game;
        },
    },
    

    actions: {
        play() {
            if (state.game !== null) {
                state.game.start();
            }
        }
    },
    
    mutations: {
        create(state) {
            state.game = new Game();
        },

        lastRefreshIsNow(state) {
            state.lastLoaded = Date.now();
        }
    }
}

