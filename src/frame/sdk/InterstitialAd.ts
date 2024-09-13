import AdBase from "./AdBase";
import SDKUtils from "./SDKUtils";

export class InterstitialAd extends AdBase {

    constructor(id) {
        super();
        this.Id = id;
        this.create();
    }

    create() {
        this.AdObj = this.platform.createInterstitialAd({
            adUnitId: this.Id
        })
        this.AdObj.onLoad(() => {
            this.onLoad();
        })
        this.AdObj.onError((err) => {
            this.onError(err);
        })
        this.AdObj.onClose(() => {
            this.onClose();
        })
        SDKUtils.SDK.mInterstitial.push(this);
    }

    onClose() {

    }

    show() {
        // this.AdObj.load();
        this.AdObj.show();
    }

    onLoad() {
        Laya.timer.clear(this, this.show);
        console.log("插屏加载成功！");
        this.IsCreate = false;
    }

    onError(err) {
        console.error("插屏加载失败！", err);
        Laya.timer.clear(this, this.show);
        Laya.timer.once(3000, this, this.show);
    }

}