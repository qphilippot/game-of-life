import { ViewPort, TileMap, Camera, GameElement } from 'game-dong';
import RuledCell from './model/RuledCell.model';
import ViewPortMouseController from './ui/viewport.mouse-controller';

class Game extends GameElement {
    constructor() {
        super();
        
        this.createViewport();
        this.createMap();
        this.createCamera();
        this.createCells();

        this.populate();
        this.render();

        this.setupListener();
    }

    getZoomLevel() {
        return this.map.getNbColumns() / (2 * this.camera.radius);
    }
  
    setupListener() {
        this.listen('pointer-move', event => {
            const n_positionInViewport = event.detail.position;
            const n_cameraPos = this.camera.getPosition();

            const zoom = this.getZoomLevel();

            // camera position is normalized in map coordinates [0..1]
            // pointer is normalized in viewport coordinates [0..1]
            // -0.5 cause camera is always in center of canvas
            const x = ((n_positionInViewport.x - 0.5) / zoom) + n_cameraPos.x;
            const y = ((n_positionInViewport.y - 0.5) / zoom) + n_cameraPos.y;
            // convert normalized position into cell-map position
        });
    }

    createViewport() {
        this.viewport = new ViewPort({
            container: 'gd-main-viewport',
            size: {
                width: 500,
                height: 500
            },

            MouseController: ViewPortMouseController
        });
    }

    createMap() {
        this.map = new TileMap({
            name: 'lifegame',
            nbRows: 20,
            nbColumns: 20
        });
    }

    createCamera() {
        this.camera = new Camera({
            radius: 40,
            position: {
                x: 1,
                y: 1
            }
        });
                
        this.camera.setScene(this.map);
    }

    createCells() {
        const x_max = this.map.getNbColumns();           
        const y_max = this.map.getNbRows();  
        this.entities = new Array(x_max * y_max);
        let index = 0;
        for (let x = 0; x < x_max; x++) {
            for (let y = 0; y < y_max; y++) {
                const elt = new RuledCell();
                this.entities[index] = elt;
                this.map.add(elt, x, y, 0);
                index++;
            }  
        }

        this.populate();
    }

    start() {

    }

    render() {
        this.viewport.clear();
        this.camera.snapshot(this.viewport);
    }

    populate() {
         // put one RuledCell on each tile    
        this.entities.forEach(cell => {
            Math.random() > 0.5 ? cell.born() : cell.die();
        });
    }

    tick() {
        this.entities.forEach(elt => elt.tick(this.map));
        this.entities.forEach(elt => elt.mutation());
    }
}


export default Game;