export class Ray {

    private _start: Laya.Point;
    private _direction: Laya.Point;
    public group: number = 1;
    public needReflexVector: boolean = false;

    constructor(start?: Laya.Point, direction?: Laya.Point) {
        this._start = start;
        this._direction = direction;
    }

    setData(start: Laya.Point, direction: Laya.Point) {
        this._start = start;
        this._direction = direction;
    }

    get start() {
        return this._start;
    }

    get direction() {
        return this._direction;
    }

}