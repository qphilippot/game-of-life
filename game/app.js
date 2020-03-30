import { ViewPort, GameElement } from 'game-dong';
import LifeScene from './model/LifeScene.model';
import ViewPortMouseController from './ui/viewport.mouse-controller';

/**
 * Define global context and game-loop
 */
class Game extends GameElement {
    constructor() {
        super();
    
        const viewport = this.createViewport();
        
        this.scene = new LifeScene({
            viewport
        });
    
        this.render();
        //this.setupListener();

        window.game = this;
    }

   

    setupListener() {
        // this.listen('viewport-pointer-move', event => {
        //     const mapCoords = this.convertCoordsViewPortToScene(
        //         event.detail.position
        //     );

        //     this.emit('map-pointer-move', {
        //         detail: {
        //             position: mapCoords
        //         }
        //     });
        // });

        // this.listen('viewport-click', event => {
        //     const mapCoords = this.convertCoordsViewPortToScene(
        //         event.detail.position
        //     );

        //     const map = this.map;
        //     // +0.5 cause we use the middle of pointer as real point, not the origin
        //     mapCoords.x = Math.floor(mapCoords.x * map.getNbColumns() + 0.5);
        //     mapCoords.y = Math.floor(mapCoords.y * map.getNbRows() + 0.5);

        //     const cell = this.map.getTile(mapCoords.x, mapCoords.y);
        //     if (typeof cell === 'undefined') {
        //         this.addCell(mapCoords.x, mapCoords.y);
        //     }

        //     else {
        //         if (cell.isAlive()) {
        //             cell.die();
        //         }

        //         else {
        //             cell.born();
        //         }
        //     }

           
        //     this.render();
        // });
    }

    // addCell(x, y, isAlive = true) {
    //     const cell = new RuledCell();

    //     if (isAlive) {
    //         cell.born();
    //     }

    //     this.map.add(cell, x, y);
    //     this.entities.push(cell);
    // }

 

    createViewport() {
        const viewport = new ViewPort({
            container: 'gd-main-viewport',
            size: {
                width: 500,
                height: 500
            },

            MouseController: ViewPortMouseController
        });

        return viewport;
    }

    populate() {
        this.scene.populate();
    }

    start() {

    }

    render() {
        this.scene.render();
    }

    tick() {
        this.scene.tick();
    }

    clear() {
        this.scene.entities.forEach(cell => {
            cell.die();
        });
    }
}


export default Game;