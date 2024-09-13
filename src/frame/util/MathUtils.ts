export class MathUtils {

    /**
     * 二阶贝塞尔曲线
     * @param P0 起点
     * @param P1 高点
     * @param P2 终点
     * @param timer 时间 0到1
     * @param result 实时位置
     * @param XAngle X轴的角度
     */
    public static twoBezierCurve(P0: Laya.Vector3, P1: Laya.Vector3, P2: Laya.Vector3, timer: number, result: Laya.Vector3, XAngle: boolean = false) {
        result.x = Math.pow((1 - timer), 2) * P0.x + 2 * timer * (1 - timer) * P1.x + Math.pow(timer, 2) * P2.x;
        result.y = Math.pow((1 - timer), 2) * P0.y + 2 * timer * (1 - timer) * P1.y + Math.pow(timer, 2) * P2.y;
        result.z = Math.pow((1 - timer), 2) * P0.z + 2 * timer * (1 - timer) * P1.z + Math.pow(timer, 2) * P2.z;
        if (XAngle) {
            var P01 = new Laya.Vector3((1 - timer) * P0.x + timer * P1.x, (1 - timer) * P0.y + timer * P1.y, (1 - timer) * P0.z + timer * P1.z);
            var P11 = new Laya.Vector3((1 - timer) * P1.x + timer * P2.x, (1 - timer) * P1.y + timer * P2.y, (1 - timer) * P1.z + timer * P2.z);
            Laya.Vector3.subtract(P11, P01, P01);
            return Math.atan2(P01.y, P01.z) * (180 / Math.PI);
        }
    }

    /**计算二维向量的角度 */
    static getAngleByVec2(v2: Laya.Vector2 | Laya.Point) {
        return Math.atan2(v2.x, v2.y) * (180 / Math.PI);
    }

    /**
     * 求两v2向量的距离 vc2_1 - vc2_2   返回距离（Number）
     * @param vc2_1 
     * @param vc2_2 
     */
    static Vc2Distance(vc2_1: Laya.Vector2 | Laya.Point, vc2_2: Laya.Vector2 | Laya.Point): number {
        let _diff = new Laya.Vector2(vc2_1.x - vc2_2.x, vc2_1.y - vc2_2.y);
        let _distance = Math.sqrt(Math.pow(_diff.x, 2) + Math.pow(_diff.y, 2));
        return _distance;
    }

    /**
     * 求两v2向量的距离 vc2_1 - vc2_2   返回距离（Number）不开方
     * @param vc2_1 
     * @param vc2_2 
     */
    static Vc2Distance2(vc2_1: Laya.Vector2 | Laya.Point, vc2_2: Laya.Vector2 | Laya.Point): number {
        let _diff = new Laya.Vector2(vc2_1.x - vc2_2.x, vc2_1.y - vc2_2.y);
        return Math.pow(_diff.x, 2) + Math.pow(_diff.y, 2);
    }

    /**
     * 向量的点积
     * @param vectorA 
     * @param vectorB 
     * @returns 
     */
    static dotProduct(vectorA: Laya.Vector2 | Laya.Point, vectorB: Laya.Vector2 | Laya.Point): number {
        return vectorA.x * vectorB.x + vectorA.y * vectorB.y;
    }

    /**
     * 向量的模长
     * @param vector 
     * @returns 
     */
    static magnitude(vector: Laya.Vector2 | Laya.Point): number {
        return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    }

    /**求两个向量的夹角 */
    static angleBetween(vectorA: Laya.Vector2 | Laya.Point, vectorB: Laya.Vector2 | Laya.Point): number {
        let dotProductValue = this.dotProduct(vectorA, vectorB);
        let magnitudeA = this.magnitude(vectorA);
        let magnitudeB = this.magnitude(vectorB);
        let cosTheta = dotProductValue / (magnitudeA * magnitudeB);
        return Math.acos(cosTheta) * (180 / Math.PI); // 将弧度转换为角度
    }

    /**
     * 根据向量获得法线
     * @param vector 向量
     * @returns 返回一个顺时针旋转的法向量
     */
    static calculateNormalVector(vector: Laya.Point, createNew: boolean = false): Laya.Point {
        if (createNew) {
            return new Laya.Point(vector.y, -vector.x);
        }
        let temp = vector.y;
        vector.y = -vector.x;
        vector.x = temp;
        return vector;
    }

    /**
     * 获得反向的向量
     * @param vector 需要反向的向量
     * @returns 
     */
    static getReverseVector(vector: Laya.Point) {
        vector.x = -vector.x;
        vector.y = -vector.y;
        return vector;
    }

}