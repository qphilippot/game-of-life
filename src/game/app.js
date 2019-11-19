import { ViewPort, TileMap, Camera } from 'game-dong';
const GameDong = window.GameDong;
import RuledCell from './model/RuledCell.model';

class Game {
    constructor() {
        console.log('Game created');
    }

    start() {
        console.log('game start ...', GameDong);

        const viewport = new GameDong.ViewPort({
            container: 'gd-main-viewport',
            size: {
                width: 500,
                height: 500
            }
        });
        
        const map = new GameDong.TileMap({
            name: 'lifegame',
            nbRows: 5,
            nbColumns: 5
        });
           
        // put one RuledCell on each tile    
        const x_max = map.getNbColumns();           
        const y_max = map.getNbRows();  
        const entities = new Array(x_max * y_max);      
        for (let x = 0; x < x_max; x++) {
            for (let y = 0; y < y_max; y++) {
                const elt = new RuledCell();
                entities[y * x_max + x] = elt;
                map.add(elt, x, y, 0);
            }  
        }
        
        window.entities = entities;
        const camera = new GameDong.Camera({
            radius: 20,
            position: {
                x: 0.5,
                y: 0.5
            }
        });
                
                
        camera.setScene(map);
        camera.snapshot(viewport);
            
        document.addEventListener('keydown', function(event) {
            switch(event.keyCode) {
                // up
            case 38:
                entities.forEach(elt => elt.tick(map));
                entities.forEach(elt => elt.mutation());
                break;
            }
            
            viewport.clear();
            camera.snapshot(viewport);    
        });
    }
}


export default Game;