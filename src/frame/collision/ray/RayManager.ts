import { Rectangle } from "../../base/Rectangle";
import { Singleton } from "../../base/Singleton";
import { MathUtils } from "../../util/MathUtils";
import { Ray } from "./Ray";
import { Intersection, ShapeScipt } from "./ShapeScript";

export class RayManager extends Singleton {

    private shapeBaseList: Map<number, Array<ShapeScipt>>

    constructor() {
        super();
        this.shapeBaseList = new Map();
    }

    /**注册 */
    register(script: ShapeScipt) {
        let list = this.shapeBaseList.get(script.group);
        if (!list) list = [];
        if (list.indexOf(script) != -1) return;
        list.push(script);
        this.shapeBaseList.set(script.group, list);
    }

    /**删除注册形状 */;
    delete(script: ShapeScipt) {
        let list = this.shapeBaseList.get(script.group);
        if (!list) return;
        let index = list.indexOf(script);
        if (index == -1) return;
        list.splice(index, 1);
        this.shapeBaseList.set(script.group, list);
    }

    /**检测并返回所有检测到的对象 */
    checkCollisionAll(ray: Ray){
        let list = this.shapeBaseList.get(ray.group);
        if (!list) return;
        let result: Array<Intersection> = [];
        let temp;
        for (let item of list) {
            temp = item.checkIntersection(ray);
            if (temp.result) result.push(temp);
        }
        return result;
    }

    /**检测返回第一个检测到的对象 */
    checkCollisionFirst(ray: Ray, list?: Array<Intersection>) {
        list = list || this.checkCollisionAll(ray);
        if (!list || list.length == 0) return;
        let dis = Number.MAX_VALUE;
        let result: Intersection;
        let tempDis: number;
        for(let item of list) {
            tempDis = MathUtils.Vc2Distance2(item.intersectionPoint, ray.start);
            if (tempDis > dis) continue;
            dis = tempDis;
            result = item;
        }
        result.distance = Math.sqrt(dis);
        return result;
    }

}