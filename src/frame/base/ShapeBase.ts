import { Ray } from "../collision/ray/Ray";



export abstract class ShapeBase {

    centerX: number;
    centerY: number;

    anchorX: number = 0;
    anchorY: number = 0;

    owner: Laya.Sprite;

    constructor(owner:any, centerX: number, centerY: number) {
        this.owner = owner;
        this.centerX = centerX;
        this.centerY = centerY;
    }

    setPos(centerX: number, centerY: number) {
        this.centerX = centerX;
        this.centerY = centerY;
    }

    // abstract checkIntersection(ray: Ray): { intersect: boolean; point?: Laya.Point };

}