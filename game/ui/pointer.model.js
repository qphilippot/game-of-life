import { GameElement } from 'game-dong';

class Pointer extends GameElement {
    constructor(settings) {
        super(settings);
    }

    render(ctx) {
        const d = this.data;
        const p = d.position;
        const s = d.size;

        ctx.fillStyle = 'green';
        ctx.fillRect(p.x, p.y, s.width, s.height);
    }
}

export default Pointer;