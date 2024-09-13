import { ShapeBase } from "./ShapeBase";

/**矩形 */
export class Rectangle extends ShapeBase {

    width: number;
    height: number;
    angle: number;

    constructor(owner: Laya.Sprite, centerX: number, centerY: number, width: number, height: number, angle: number = 0) {
        super(owner, centerX, centerY);
        this.width = width;
        this.height = height;
        this.angle = angle;
    }

    setSize(width: number, height?: number) {
        this.width = width;
        this.height = height;
    }

    get minX() {
        return this.centerX - this.width / 2
    }

    get maxX() {
        return this.centerX + this.width / 2
    }

    get minY() {
        return this.centerY - this.height / 2;
    }

    get maxY() {
        return this.centerY + this.height / 2;
    }
    
}