import { ViewPort, TileMap, Camera } from 'game-dong';
import RuledCell from './model/RuledCell.model';

class Game {
    constructor() {
        this.createViewport();
        this.createMap();
        this.createCamera();
        this.createCells();

        this.populate();
        this.render();
    }

    createViewport() {
        this.viewport = new ViewPort({
            container: 'gd-main-viewport',
            size: {
                width: 500,
                height: 500
            }
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
            radius: 30,
            position: {
                x: 0.5,
                y: 0.5
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