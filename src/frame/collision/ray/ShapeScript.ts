import { Circle } from "../../base/Circle";
import { Rectangle } from "../../base/Rectangle";
import { ShapeBase } from "../../base/ShapeBase";
import Log from "../../log/Log";
import { MathUtils } from "../../util/MathUtils";
import { Ray } from "./Ray";
import { RayManager } from "./RayManager";

let { regClass, property } = Laya;


/**
 * 射线与矩形相交检测结果接口
 */
export interface Intersection {
    /**是否相交的布尔值 */
    result: boolean;
    /**相交点的全局坐标（如果相交） */
    intersectionPoint?: Laya.Point;
    /**相交点所属的矩形对象（如果相交） */
    owner?: Laya.Sprite;
    /**交点距离 */
    distance?: number;
    /**法线 */
    normal?: Laya.Point;
    /**反射向量 */
    reflexVector?: Laya.Point;
}

enum ShapeType {
    /**矩形 */
    Rectangle = 0,
    /**圆形 */
    Circle = 1
}

@regClass()
export class ShapeScipt extends Laya.Script {

    owner: Laya.Sprite;

    @property({ tips: "是否在onAwake初始化Shape", type: Boolean })
    public onAwakeInit: boolean = true;
    @property({ tips: "分组，默认是1", type: Number })
    public group: number = 1;
    @property({ tips: "碰撞形状", type: ShapeType, catalog: "shapeInfo", catalogCaption: "类型" })
    public shapeType: ShapeType = ShapeType.Rectangle;
    @property({ tips: "矩形宽", type: Number, caption: "width", hidden: "data.shapeType != 0", catalog: "shapeInfo" })
    public rectangleWidth: number = 0;
    @property({ tips: "矩形高", type: Number, caption: "height", hidden: "data.shapeType != 0", catalog: "shapeInfo" })
    public rectangleHeight: number = 0;
    @property({ tips: "圆半径", type: Number, caption: "radius", hidden: "data.shapeType != 1", catalog: "shapeInfo" })
    public circleRadius: number = 0;

    public shape: any;

    /**是否已经注册 */
    private isRegister: boolean = false;

    onAwake(): void {
        this.register();
        if (this.onAwakeInit) this.refreshShapeInfo();
    }

    register() {
        if (this.isRegister) return;
        this.isRegister = true;
        RayManager.Inst<RayManager>().register(this);
    }

    refreshShapeInfo() {
        let pos = new Laya.Point(this.owner.x, this.owner.y);
        pos = (this.owner.parent as any).localToGlobal(pos);
        let anchorXfactor = this.owner.anchorX <= 0.5 ? Math.abs(this.owner.anchorX - 0.5) : -(this.owner.anchorX - 0.5);
        let anchorYfactor = this.owner.anchorY <= 0.5 ? Math.abs(this.owner.anchorY - 0.5) : -(this.owner.anchorY - 0.5);
        let cX = pos.x + anchorXfactor * this.owner.width;
        let cY = pos.y + anchorYfactor * this.owner.height;
        switch (this.shapeType) {
            case ShapeType.Rectangle:
                let cW = this.rectangleWidth || this.owner.width;
                let cH = this.rectangleWidth || this.owner.height;
                if (this.shape) {
                    (this.shape as Rectangle).setPos(cX, cY);
                    (this.shape as Rectangle).setSize(cW, cH);
                }
                else {
                    this.shape = new Rectangle(this.owner, cX, cY, cW, cH);
                }
                break;
            case ShapeType.Circle:
                let cR = this.circleRadius || this.owner.width / 2;
                if (this.shape) {
                    (this.shape as Circle).setPos(cX, cY);
                    (this.shape as Circle).radius = cR;
                }
                else {
                    this.shape = new Circle(this.owner, cX, cY, cR);
                }
                break;
        }
        this.register();
    }

    onDestroy(): void {
        this.deleteEvent();
    }

    deleteEvent() {
        this.isRegister = false;
        RayManager.Inst<RayManager>().delete(this);
    }

    checkIntersection(ray: Ray) {
        if (this.shape == null) {
            Log.error("未初始化refreshShapeInfo:" + this.owner.name);
            return { result: false };
        }
        switch (this.shapeType) {
            case ShapeType.Rectangle:
                return this.isLineIntersectRectangle(ray, this.shape);
            case ShapeType.Circle:
                return this.isRayIntersectCircle(ray, this.shape);
        }
    }



    /**
     * 射线与矩形相交检测函数
     * @param ray 射线对象
     * @param rec 矩形对象
     * @returns 相交检测结果，包含是否相交的布尔值、相交点坐标（如果相交）以及相交点所属的矩形对象（如果相交）
     */
    isLineIntersectRectangle(ray: Ray, rec: Rectangle): Intersection {
        let linePoint1 = ray.start;
        let linePoint2 = ray.direction;

        let intersectionPoint: Laya.Point;
        let tempPoint: Laya.Point;

        let recPointList = [
            new Laya.Point(rec.minX, rec.minY),
            new Laya.Point(rec.maxX, rec.minY),
            new Laya.Point(rec.maxX, rec.maxY),
            new Laya.Point(rec.minX, rec.maxY)
        ]

        let intersectionPointLineStart: Laya.Point;
        let intersectionPointLineEnd: Laya.Point;
        // 判断线段是否与矩形的四条边相交，如果相交则计算交点
        for (let i = 0; i < recPointList.length; i++) {
            let p1 = recPointList[i];
            let p2 = recPointList[(i + 1) >= recPointList.length ? 0 : i + 1];
            if (this.isLineIntersect(linePoint1, linePoint2, p1, p2)) {
                tempPoint = this.calculateIntersectionPoint(linePoint1, linePoint2, p1, p2);
                if (!intersectionPoint){
                    intersectionPoint = tempPoint;
                    intersectionPointLineStart = p1;
                    intersectionPointLineEnd = p2;
                }
                else if (MathUtils.Vc2Distance2(linePoint1, tempPoint) < MathUtils.Vc2Distance2(linePoint1, intersectionPoint)){
                    intersectionPointLineStart = p1;
                    intersectionPointLineEnd = p2;
                    intersectionPoint = tempPoint;
                }
            }
        }

        if (intersectionPoint) {

            // 判断交点是否在射线方向上
            let dx = linePoint2.x - linePoint1.x;
            let dy = linePoint2.y - linePoint1.y;
            let dotProduct = dx * (intersectionPoint.x - linePoint1.x) + dy * (intersectionPoint.y - linePoint1.y);

            // 计算法线
            let rayDis = new Laya.Point(dx, dy);
            let normal = MathUtils.calculateNormalVector(new Laya.Point(intersectionPointLineEnd.x - intersectionPointLineStart.x, intersectionPointLineEnd.y - intersectionPointLineStart.y));
            let angle = MathUtils.angleBetween(rayDis, normal);
            if (angle < 90) {
                normal = MathUtils.getReverseVector(normal);
                angle = MathUtils.angleBetween(rayDis, normal);
            }
            let v2 = new Laya.Vector2(normal.x, normal.y);
            Laya.Vector2.normalize(v2, v2)
            normal.x = v2.x;
            normal.y = v2.y;

            // 计算反射向量 R = I - 2(I点积N)N ，I入射向量、N法向量
            let reflexVector: Laya.Point;
            if (ray.needReflexVector) {
                let temp = MathUtils.dotProduct(rayDis, normal) * 2;
                let p = new Laya.Point(normal.x, normal.y);
                p.x *= temp;
                p.y *= temp;
                reflexVector = new Laya.Point(rayDis.x - p.x, rayDis.y - p.y);
            }

            if (dotProduct >= 0) {
                // 交点在射线方向上，且在矩形内部
                return { result: true, intersectionPoint: intersectionPoint, owner: rec.owner, normal: normal, reflexVector: reflexVector};
            }
        }

        // 没有交点或交点不在射线方向上
        return { result: false };
    }

    /**
     * 判断两条线段是否相交
     * @param p1 线段1的起点
     * @param p2 线段1的终点
     * @param p3 线段2的起点
     * @param p4 线段2的终点
     * @returns 是否相交的布尔值
     */
    isLineIntersect(p1: Laya.Point, p2: Laya.Point, p3: Laya.Point, p4: Laya.Point): boolean {
        let v1 = this.crossProduct(new Laya.Point(p4.x - p3.x, p4.y - p3.y), new Laya.Point(p1.x - p3.x, p1.y - p3.y));
        let v2 = this.crossProduct(new Laya.Point(p4.x - p3.x, p4.y - p3.y), new Laya.Point(p2.x - p3.x, p2.y - p3.y));
        let v3 = this.crossProduct(new Laya.Point(p2.x - p1.x, p2.y - p1.y), new Laya.Point(p3.x - p1.x, p3.y - p1.y));
        let v4 = this.crossProduct(new Laya.Point(p2.x - p1.x, p2.y - p1.y), new Laya.Point(p4.x - p1.x, p4.y - p1.y));

        return (v1 * v2 < 0 && v3 * v4 < 0);
    }

    /**
     * 计算两个向量的叉乘
     * @param point1 向量1
     * @param point2 向量2
     * @returns 叉乘结果
     */
    crossProduct(point1: Laya.Point, point2: Laya.Point): number {
        return point1.x * point2.y - point1.y * point2.x;
    }

    /**
     * 计算两条线段的交点坐标
     * @param p1 线段1的起点
     * @param p2 线段1的终点
     * @param p3 线段2的起点
     * @param p4 线段2的终点
     * @returns 交点坐标
     */
    calculateIntersectionPoint(p1: Laya.Point, p2: Laya.Point, p3: Laya.Point, p4: Laya.Point): Laya.Point {
        let numeratorX = (p1.x * p2.y - p1.y * p2.x) * (p3.x - p4.x) - (p1.x - p2.x) * (p3.x * p4.y - p3.y * p4.x);
        let numeratorY = (p1.x * p2.y - p1.y * p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x * p4.y - p3.y * p4.x);
        let denominator = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x);

        let intersectionPoint = new Laya.Point(numeratorX / denominator, numeratorY / denominator);
        return intersectionPoint;
    }

    /**
     * 射线与圆相交检测函数
     * @param ray 射线对象
     * @param circle 圆对象
     * @returns 相交检测结果，包含是否相交的布尔值和相交点坐标（如果相交）
     */
    isRayIntersectCircle(ray: Ray, circle: Circle): Intersection {
        let linePoint1 = ray.start;
        let linePoint2 = ray.direction;

        // 计算射线的方向向量
        let direction = new Laya.Point(linePoint2.x - linePoint1.x, linePoint2.y - linePoint1.y);

        // 计算射线起点到圆心的向量
        let fromStartToCenter = new Laya.Point(circle.centerX - linePoint1.x, circle.centerY - linePoint1.y);

        // 计算射线方向向量的长度
        let length = Math.sqrt(direction.x * direction.x + direction.y * direction.y);

        // 将射线方向向量单位化
        let normalizedDirection = new Laya.Point(direction.x / length, direction.y / length);

        // 计算射线方向向量的点积
        let dotProduct = normalizedDirection.x * fromStartToCenter.x + normalizedDirection.y * fromStartToCenter.y;

        // 计算射线起点到圆心的距离的平方
        let distanceSquared = fromStartToCenter.x * fromStartToCenter.x + fromStartToCenter.y * fromStartToCenter.y;

        // 计算射线与圆的交点的距离的平方
        let intersectionDistanceSquared = distanceSquared - dotProduct * dotProduct;

        // 判断射线是否与圆相交
        if (intersectionDistanceSquared < circle.radius * circle.radius) {
            // 计算射线与圆的交点坐标
            let t = Math.sqrt(circle.radius * circle.radius - intersectionDistanceSquared);
            let intersectionPoint = new Laya.Point(linePoint1.x + (dotProduct - t) * normalizedDirection.x, linePoint1.y + (dotProduct - t) * normalizedDirection.y);

            // 返回相交检测结果
            return { result: true, intersectionPoint: intersectionPoint, owner: circle.owner };
        }

        // 射线与圆不相交
        return { result: false };
    }


}