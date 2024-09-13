import { ShapeBase } from "./ShapeBase";

export class Circle extends ShapeBase {


    /**圆的半径 */
    radius: number;

    constructor(owner: Laya.Sprite, centerX: number, centerY: number, radius: number) {
        super(owner, centerX, centerY);
        this.radius = radius;
    }


}