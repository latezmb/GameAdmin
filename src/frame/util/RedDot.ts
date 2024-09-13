export class RedDot {

    public static REFRESH_REDDOT = "REFRESH_REDDOT";

    private static inst: RedDot;
    static get Inst() {
        if (RedDot.inst == null) {
            RedDot.inst = new RedDot();
        }
        return RedDot.inst;
    }

    private redList: Map<number, RedObj>;

    constructor() {
        this.redList = new Map();
    }

    register(id: number, condition?: Function, caller?: any, parentId?: number) {
        if (this.redList.has(id)) {
            console.log(`redDot id:${id}，已存在`);
            return;
        }
        var redObj: RedObj = {
            caller: caller,
            condition: condition,
            subId: []
        }
        this.redList.set(id, redObj);
        if (parentId && this.redList.has(parentId)) this.redList.get(parentId).subId.push(id);
    }

    getRedById(id: number): boolean {
        if (!this.redList.has(id)) {
            console.error(`redDot id:${id}，未注册`);
            return;
        }
        var red = false;
        var item = this.redList.get(id);
        if(item.condition != null) red = item.condition.call(item.caller);
        if (red != true) {
            for (var i = 0; i < item.subId.length; i++)  {
                if (!this.getRedById(item.subId[i])) continue;
                red = true;
                break;
            }
        }
        return red;
    }

}

export interface RedObj{
    caller: Function;
    condition: Function;
    subId: Array<number>;
}