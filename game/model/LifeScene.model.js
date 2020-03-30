import { Scene, Camera, TileMap } from 'game-dong';
import RuledCell from './RuledCell.model';

class LifeScene extends Scene {
    constructor(settings = {}) {
        super({
            environment: new TileMap({
                name: 'lifegame',
                nbRows: 100,
                nbColumns: 100
            }),

            camera: new Camera({
                radius: 50,
                position: {
                    x: 0.5,
                    y: 0.5
                }
            })
        });

        
        this.bindTo(settings.viewport);

        this.setup();
    } 

    getZoomLevel() {
        return this.environment.getNbColumns() / (2 * this.camera.radius);
    }

    setup() {
        const x_max = this.environment.getNbColumns();           
        const y_max = this.environment.getNbRows();  

        this.increaseCapacity(x_max * y_max);
        
        let index = 0;
        for (let x = 0; x < x_max; x++) {
            for (let y = 0; y < y_max; y++) {
                const elt = new RuledCell();
                this.add(elt, x, y, 0);
                index++;
            }  
        }

        this.populate();

        this.setupListeners();
    
        this.setupCamera();
    }   
    
    spawn(what, x, y, isAlive = true) {
        const cell = what;

        if (isAlive) {
            cell.born();
        }

        this.map.add(cell, x, y);
        this.entities.push(cell);
    }

    setupListeners() {
        this.listen('viewport-pointer-move', event => {
            const mapCoords = this.convertCoordsViewPortToScene(
                event.detail.position
            );

            this.emit('map-pointer-move', {
                detail: {
                    position: mapCoords
                }
            });
        });

        this.listen('viewport-click', event => {
            const mapCoords = this.convertCoordsViewPortToScene(
                event.detail.position
            );

            const map = this.environment;
            // +0.5 cause we use the middle of pointer as real point, not the origin
            mapCoords.x = Math.floor(mapCoords.x * map.getNbColumns() + 0.5);
            mapCoords.y = Math.floor(mapCoords.y * map.getNbRows() + 0.5);

            const cell = map.getTile(mapCoords.x, mapCoords.y);
            if (typeof cell === 'undefined') {
                this.spawn(
                    new RuledCell(),
                    mapCoords.x, 
                    mapCoords.y
                );
            }

            else {
                if (cell.isAlive()) {
                    cell.die();
                }

                else {
                    cell.born();
                }
            }

           
            this.render();
        });
    }

    setupCamera() {
        const { width, height } = this.viewport.getResolution();

        const zoom = this.getZoomLevel();
        const scale = this.environment.getNbColumns() / zoom;
        const pointer = this.viewport.get('pointer');

        pointer.setSize({
            width: width / scale ,
            height: height / scale
        });
    }

    populate() {
        // put one RuledCell on each tile    
       this.entities.forEach(cell => {
           Math.random() > 0.5 ? cell.born() : cell.die();
       });
   }

   tick() {
        this.entities.forEach(elt => elt.tick(this.environment));
        this.entities.forEach(elt => elt.mutation());
   }

    //  convert normalized position into cell-map position
    convertCoordsViewPortToScene(position) {
        const n_positionInViewport = position;
        const n_cameraPos = this.camera.getPosition();

        const zoom = this.getZoomLevel();

        // camera position is normalized in map coordinates [0..1]
        // pointer is normalized in viewport coordinates [0..1]
        // -0.5 cause camera is always in center of canvas
        const x = ((n_positionInViewport.x - 0.5) / zoom) + n_cameraPos.x;
        const y = ((n_positionInViewport.y - 0.5) / zoom) + n_cameraPos.y;
        return { x, y };
    }
}

export default LifeScene;