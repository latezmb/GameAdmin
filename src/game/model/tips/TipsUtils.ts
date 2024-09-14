import { TipsWindow } from "./TipsWindow";

export class TipsUtils {

    static tipsWinName: string = "TipsWindow";

    static tipsItemPrefabPath: string = "resources/view/tips/item/TipsItem.lh";

    static fractionItemPrefabPath: string = "resources/view/tips/item/FractionItem.lh";

    /**提示 */
    static async showTips(str: string) {
        let ctr: TipsWindow;
        if (!isShowWin(this.tipsWinName)) {
            ctr = await openWindow(this.tipsWinName);
        }
        else {
            ctr = getWinScript(this.tipsWinName)
        }
        ctr.showTips(str);
    }

    static async showFraction(num: number, worldPos: Laya.Point) {
        let ctr: TipsWindow;
        if (!isShowWin(this.tipsWinName)) {
            ctr = await openWindow(this.tipsWinName);
        }
        else {
            ctr = getWinScript(this.tipsWinName)
        }
        ctr.showFraction(num, worldPos);
    }

}