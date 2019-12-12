import Game from '../../../game/app';

export default {
    namespaced: true,

    state: {
        game: null,
        cellFocused: {
            x: null,
            y: null
        }
    },

    getters: {
        game(state) {
            return state.game;
        },

        cellFocused(state) {
            return state.cellFocused;
        } 
    },
    

    actions: {
        create({ commit, state }) {
            commit('create');

            window.addEventListener('map-pointer-move', event => {
                commit('updateCellFocused', event.detail.position);
            });
        }
       
    },
    
    mutations: {
        updateCellFocused(state, position) {
            state.cellFocused.x = position.x;
            state.cellFocused.y = position.y;
        },

        create(state) {
            // [critical optimization] disable Vue object observation
            // https://github.com/vuejs/vue/issues/2637#issuecomment-207076744
            state.game = Object.freeze(new Game());
            window.game = state.game;
        },


        lastRefreshIsNow(state) {
            state.lastLoaded = Date.now();
        },

        play(state) {
            if (state.game !== null) {
                state.game.start();
            }
        },

        populate(state) {
            state.game.populate();
            state.game.render();
        },
        
        tick(state) {
            state.game.tick();
            state.game.render();
        }
    }
}

