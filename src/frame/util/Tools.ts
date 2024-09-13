import { MusicManager } from "../music/MusicManager";

export class Tools {

    /**
     * 添加监听
     * @param region 执行域
     * @param btn 设置监听控件
     * @param clickFunc 监听函数
     * @param data 参数
     * @param mouseDownFunc 按下监听的
     * @param mouseUpFunc 抬起监听
     * @param mouseMoveFunc 移动监听
      * @param isScale 是否缩放
     */
    public static onClick(
        region: any,
        btn: Laya.UIComponent | any,
        clickFunc?: Function,
        data?: Array<any>,
        music: boolean = true,
        isScale: boolean = true,
        maoPao: boolean = true,
        mouseDownFunc?: Function,
        mouseUpFunc?: Function,
        mouseMoveFunc?: Function,
    ): void {

        var maoFun = (e: Laya.Event) => {
            if (maoPao && e) {
                e.stopPropagation();
            }
        }

        if (isScale) {
            btn.on(Laya.Event.MOUSE_DOWN, this, (e: Laya.Event) => {
                maoFun(e);
                if (!btn["sx"]) {
                    btn["sx"] = btn.scaleX;
                }
                btn.scale(btn["sx"] * 0.9, btn["sx"] * 0.9);
            });
            btn.on(Laya.Event.MOUSE_UP, this, (e: Laya.Event) => {
                maoFun(e);
                if (btn["sx"]) btn.scale(btn["sx"], btn["sx"]);
            });
            btn.on(Laya.Event.MOUSE_OUT, this, (e: Laya.Event) => {
                maoFun(e);
                if (btn["sx"]) btn.scale(btn["sx"], btn["sx"]);
            });
            btn.on(Laya.Event.MOUSE_MOVE, this, (e: Laya.Event) => {
                maoFun(e);
            });
        }
        if (clickFunc) {
            btn.on(Laya.Event.CLICK, this, (e: Laya.Event) => {
                maoFun(e);
                clickFunc.apply(region, data);
            })
        }
        if (mouseDownFunc) {
            btn.on(Laya.Event.MOUSE_DOWN, region, (e: Laya.Event) => {
                maoFun(e);
                mouseDownFunc.apply(region);
            })
        }
        if (music) {
            btn.on(Laya.Event.MOUSE_DOWN, region, (e: Laya.Event) => {
                maoFun(e);
                // MusicManager.onPlaySoundByNameAndBasePath("button");
            })
        }
        if (mouseUpFunc) {
            btn.on(Laya.Event.MOUSE_UP, region, (e: Laya.Event) => {
                maoFun(e);
                mouseUpFunc.apply(region);
            })
            btn.on(Laya.Event.MOUSE_OUT, region, (e: Laya.Event) => {
                maoFun(e);
                mouseUpFunc.apply(region);
            })
        }
        if (mouseMoveFunc) {
            btn.on(Laya.Event.MOUSE_MOVE, region, (e: Laya.Event) => {
                maoFun(e);
                mouseMoveFunc.apply(region);
            })
        }
    }
    
    /**
     * 根据路径字符串寻找对象节点
     * @param node 根节点
     * @param path 路劲
     * @returns 
     */
    public static findChildByPath(node: Laya.Node, path: string) {
        var arr = path.split("/");
        var fun = (node: Laya.Node, arr: Array<string>) => {
            var childName = arr.shift();
            node = node.getChildByName(childName);
            if (node == null) {
                return null;
            }
            else if (arr.length <= 0) {
                return node;
            }
            else {
                return fun(node, arr);
            }
        }
        return fun(node, arr);
    }

}