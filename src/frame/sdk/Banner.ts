import AdBase from "./AdBase";
import SDKUtils from "./SDKUtils";

export class Banner extends AdBase {

    public OnLoad: Function;
    public OnError: Function;
    public OnResize: Function;
    private info: any;
    private showNum: number = 0;

    constructor(id: string) {
        super();
        this.Id = id;
        this.OnLoad = this.onLoad;
        this.OnError = this.onError;
        this.OnResize = this.onResize;
        this.create();
    }

    create() {
        this.info = this.platform.getSystemInfoSync();
        var style: BannerStyle = {
            top: 0,
            left: 0,
            width: this.info.screenWidth * 0.8,
            height: this.info.screenHeight * 0.1
        }
        style.left = (this.info.screenWidth - style.width) / 2;
        this.AdObj = this.platform.createBannerAd({
            adUnitId: this.Id,
            adIntervals: 30,
            style: style
        })
        this.AdObj.onLoad(() => {
            this.OnLoad();
        })
        this.AdObj.onError((err) => {
            this.OnError(err);
        })
        this.AdObj.onResize((res) => {
            this.OnResize(res);
        })
    }

    onLoad() {
        console.log("Banner加载成功！");
        Laya.timer.clear(this, this.create);
        if (this.IsCreate) SDKUtils.SDK.mBanner.push(this);
        this.IsCreate = false;
    }

    onError(err) {
        console.error("Banner加载失败！", err);
        Laya.timer.clear(this, this.create);
        Laya.timer.once(3000, this, this.create);
    }

    onResize(res) {
        this.AdObj.style.top = this.info.screenHeight - res.height;
        this.AdObj.offResize();
    }

    show(style?: BannerStyle) {
        if (style) this.AdObj.style = style;
        this.AdObj.show()
            .then(() => {
                console.log("Ban显示");
                this.showNum++;
            })
            .catch(() => {
                console.error("Ban显示失败");
            })
    }

    hide() {
        this.AdObj.hide();
        if (this.showNum >= SDKUtils.updateBannerNum) {
            this.destroy();
            SDKUtils.SDK.CreateBannerAd();
        }
    }

    destroy() {
        var index = SDKUtils.SDK.mBanner.indexOf(this);
        if (index == -1) return;
        SDKUtils.SDK.mBanner.splice(index, 1);
        this.AdObj.hide();
        this.AdObj.destroy();
    }

}

export interface BannerStyle {
    left: number,
    top: number,
    width: number,
    height: number
}