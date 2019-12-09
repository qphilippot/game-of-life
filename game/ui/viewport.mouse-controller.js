import { MouseController } from 'game-dong';
import Pointer from './pointer.model';

class ViewPortMouseController extends MouseController {
    constructor(settings = {}) {
        super(settings)
        this.viewport = settings.component;

        const pointer = new Pointer();
        pointer.setSize({
            width: 15,
            height: 15
        });

        this.viewport.store('pointer', pointer);
    }

    onMouseMove(event) {

        const position = this.viewport.getNormalizedPosition({
            x: event.offsetX,
            y: event.offsetY
        });

        const size = this.viewport.getSize();

        const pointer = this.viewport.get('pointer');
        pointer.setPosition({
            x: position.x * size.width,
            y: position.y * size.height,
        });

        this.viewport.layers.ui.clear();
        pointer.render(this.viewport.getContext('ui'));

        this.viewport.emit('pointer-move', {
            detail: {
                position: position
            }
        });
    }
}

export default ViewPortMouseController;