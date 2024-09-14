const { regClass } = Laya;
import { TipsItemBase } from "./TipsItem.generated";

@regClass()
export class TipsItem extends TipsItemBase {

    tween: Laya.Tween;

    setData(str: string) {
        this.content.text = str;
        Laya.timer.once(1000, this, this.reset);
    }

    reset() {
        sendEvent("TIPS_RESET_ITEM", [this]);
    }

    setLayoutY(y: number) {
        this.layoutAniCallBack();
        this.tween = Laya.Tween.to(this, {y: y}, 100, null, Laya.Handler.create(this, this.layoutAniCallBack));
    }

    layoutAniCallBack() {
        if (!this.tween) return;
        this.tween.clear();
        this.tween = null;
    }

    clearTime() {
        Laya.timer.clearAll(this);
    }

    onDestroy(): void {
        this.layoutAniCallBack();
        Laya.timer.clearAll(this);
        this.offAllCaller(this);
        offAllEvent(this);
    }

}