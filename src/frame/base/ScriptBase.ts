export class ScriptBase extends Laya.Script {

    private childDic: { [key: string]: { x: number, y: number } } = {};

    onDestroy(): void {
        Laya.timer.clearAll(this);
        this.owner.offAllCaller(this);
        offAllEvent(this);
        super.onDestroy();
    }


    // 使用例子
    // public updateItemLayer(parentC: Laya.Box, parenX: number, parenY: number) {
    //     //背景层
    //     let layer_1 = [this.bgImg, this.icon.ui_imgQuality];
    //     //icon
    //     let layer_2 = [this.icon.ui_imgIcon];
    //     //文本
    //     let layer_3 = [this.danTxt];
    //     // 顶层img
    //     let layer_4 = [this.upImg];
    //     this.updateLayer(parentC, [layer_1, layer_2, layer_3, layer_4], parenX, parenY, this.scaleX, this.scaleY);
    // }
    /**减少list的dc */
    public updateLayer(parentC: Laya.Box, args: any[], parenX: number, parenY: number, pScaleX: number = 1, pScaleY: number = 1): void {
        let content: Laya.Box;
        for (let i: number = 0; i < args.length; i++) {
            const name = `content${i}`
            content = parentC.getChildByName(name) as Laya.Box;
            if (!content) {
                content = new Laya.Box;
                content.name = name;
                parentC.addChildAt(content, i);
            }
            let boxArr = args[i];
            let item;
            for (let j: number = 0; j < boxArr.length; j++) {
                item = boxArr[j];
                let key = name + j;
                // item.name = `child${j}`;
                if (!this.childDic[key]) {
                    item.scale(item.scaleX * pScaleX, item.scaleY * pScaleY);
                    this.childDic[key] = <{ x: number, y: number }>{};
                    this.childDic[key].x = item.x;
                    this.childDic[key].y = item.y;
                }
                item.x = this.childDic[key].x * pScaleX + parenX;
                item.y = this.childDic[key].y * pScaleY + parenY;
                content.addChildAt(item, j);
            }
        }
    }

}