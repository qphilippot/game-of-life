import { GameElement } from 'game-dong';

class RuledCell extends GameDong.GameElement {
    constructor(settings = {}) {
        super(settings);
        this.alive = Math.random() > 0.6;
        this.evolve = function() {}
    }
    render(context = null, x, y, w, h) {
        const d = this.data;
        const p = d.position;
        const s = d.size;
        
        if (this.alive !== true) {
            return;
        }
        if (typeof x !== 'number') {
            x = p.x;
        }
        if (typeof y !== 'number') {
            y = p.y;
        }
        context.fillStyle = 'blue';
        context.fillRect(x, y, w || s.width, h || s.height);
        // context.drawImage(d.texture, x, y, w, h);
    }
    idle() {}
    tick(environement) {
        const neighborhood = this.getNeighborhood(environement);
    
        if (
            this.isAlive() === false &&
            neighborhood.length === 3
        ) {
            this.mutation = this.born;
        }
        else if (
            this.isAlive() && 
            neighborhood.length !== 3 &&
            neighborhood.length !== 2
        ) {
            this.mutation = this.die;
        }
        else {
            this.mutation = this.idle
        }
    }
    isAlive() {
        return this.alive === true;
    }
    die() {
        this.alive = false;
    }
    born() {
        this.alive = true;
    }
    getNeighborhood(environement) {
        const x = this.getX();
        const y = this.getY();
        const neighborhood = [];
        for(let i = 0; i < 3; ++i) {
            for(let j = 0; j < 3; ++j) {
                const cell = environement.getTile(x - i + 1, y - j + 1);
                if (
                    typeof cell !== 'undefined' &&
                    i !== 1 && j !== 1 &&
                    cell.isAlive()
                ) {
                    neighborhood.push(cell);
                } 
            }
        }
        return neighborhood;
    }
}

export default RuledCell;