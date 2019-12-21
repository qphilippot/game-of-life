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

    updatePointerPosition(event) {
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


        pointer.store('viewport-normalized-position', position);
    }

    onMouseDown(event) {
        this.updatePointerPosition(event);
        const pointer = this.viewport.get('pointer');
        const position = pointer.getPosition();

        this.emit('viewport-click', {
            detail: {
                position: pointer.get('viewport-normalized-position')
            }
        })

    }

    onMouseOut(event) {
        event.target.style.cursor = 'inherit';

        this.viewport.layers.ui.clear();
    }


    onMouseEnter(event) {
        event.target.style.cursor = 'none';
    }

    onMouseMove(event) {
        this.updatePointerPosition(event);
        this.viewport.layers.ui.clear();

      
        const pointer = this.viewport.get('pointer');
        pointer.render(this.viewport.getContext('ui'));

        this.viewport.emit('viewport-pointer-move', {
            detail: {
                position: pointer.get('viewport-normalized-position')
            }
        });
    }
}

export default ViewPortMouseController;