import { FrameConfig } from "../FrameConfig";
import { Banner, BannerStyle } from "./Banner";
import Custom from "./Custom";
import Grid from "./Grid";
import { InterstitialAd } from "./InterstitialAd";
import { SDKConfig } from "./SDKConfig";
import SDKUtils from "./SDKUtils";
import Video from "./Video";

// const SDKConfig = {
//     BannerId: ["adunit-9f09d8fd67981813", "adunit-3d89908ae5fbc5a3", "adunit-9f09d8fd67981813"], //banner广告
//     VideoId: ["adunit-529e22049b8deb69"],
//     GridId: [],
//     CustomId: ["adunit-25264c6e04817416", "adunit-a0445ae6e3f1772b"], // 原生
//     BannerNum: 5,
//     VideoNum: 1,
//     CustomInfo: {},
//     IsPortrait: true, //true 为竖屏
// }
export default class SDK {

    public static mVideo: Array<Video> = [];
    public static mBanner: Array<Banner> = [];
    public static mInterstitial: Array<Banner> = [];
    public static mCustom: Map<string, Custom> = new Map();
    public static platform: any = null;
    private static BannerUseIndex: number = 0;
    private static VideoUseIndex: number = 0;
    private static GridUseIndex: number = 0;
    private static CustomUseIndex: number = 0;
    private static InterstitialUseIndex: number = 0;
    private static onShowObjList: Array<onShowObj> = [];
    public static ExposureBannerTimer: number = 10000;
    public static PhoneInfo;
    public static StartInfo: any;

    private static timerList = {
        timer: 0
    }
    private static TimerEvent() {
        for (var item in this.timerList) {
            this.timerList[item] += 1;
        }
    }

    public static Init() {
        if (!Laya.Browser._isMiniGame) return;
        SDKUtils.SDK = this;
        this.platform = FrameConfig.platform;
        this.PhoneInfo = this.platform.getSystemInfoSync();
        this.StartInfo = this.platform.getLaunchOptionsSync();
        this.onShowInit();
        // Laya.timer.once(1000, this, this.TimerEvent);
    }

    /**安全高度 */
    public static get safeArea() {
        return SDK.platform.getWindowInfo().safeArea.top;
    }

    /**刘海屏下移的高度 */
    public static isFringeScreenTopDownNum: number = 60;

    public static InitAllAd() {
        if (!Laya.Browser._isMiniGame) return;

        for (var i = 0; i < SDKConfig.BannerNum; i++) {
            this.CreateBannerAd();
        }
        for (var i = 0; i < SDKConfig.InterstitialNum; i++) {
            this.CreateInterstitialAd();
        }
        for (var i = 0; i < SDKConfig.VideoNum; i++) {
            this.CreateRewardedVideoAd();
        }
    }

    private static expBanner: Banner = null;
    private static expIndex: number = -1;
    private static exposureBanner() {
        if (this.expBanner != null) {
            this.expBanner.destroy();
            this.expBanner = null;
        }
        if (SDKConfig.BannerId.length < 1) return;
        this.expBanner = new Banner(SDKConfig.BannerId[++this.expIndex % SDKConfig.BannerId.length]);
        this.expBanner.OnLoad = () => {
            console.log("曝光banner加载完成！");
            this.expBanner.show();
            Laya.timer.once(this.ExposureBannerTimer, this, this.exposureBanner);
        }
        this.expBanner.OnError = () => {
            console.log("曝光banner创建失败！");
            Laya.timer.once(3000, this, this.exposureBanner);
        }
        this.expBanner.OnResize = (res) => {
            this.expBanner.AdObj.style.top = -(res.height - 1);
        }
    }

    private static onShowInit() {
        if (!this.platform) return;
        this.platform.onShow(res => {
            console.log("onShow回调", res);
            if (res && res.scene) {
                FrameConfig.setSceneId(res.scene);
            }
            for (var obj of this.onShowObjList) {
                obj.caller ? obj.backFun.apply(obj.caller) : obj.backFun();
            }
            if ((this.mBanner.length - 1) >= this.BannerShowIndex) {
                this.mBanner[this.BannerShowIndex].destroy();
                this.mBanner.splice(this.BannerShowIndex, 1);
                this.CreateBannerAd();
            }
            if (this._shareType != null) {
                sendEvent("SHARE_ON_SHOW", [this._shareType]);
                this._shareType = null;
            }
            for (let item of this.mCustom.values()) {
                item.destroy();
            }
            this.mCustom.clear();
        })
    }


    public static AddOnShowEvent(backFun: Function, caller?: any) {
        var obj: onShowObj = {
            caller: caller,
            backFun: backFun
        }
        this.onShowObjList.push(obj);
    }

    public static CreateRewardedVideoAd(id?: string) {
        if (!id && SDKConfig.VideoId.length < 1) return;
        id = id ? id : SDKConfig.VideoId[this.VideoUseIndex];
        if (++this.VideoUseIndex >= SDKConfig.VideoId.length) this.VideoUseIndex = 0;
        new Video(id);
    }

    private static CreateBannerAd(id?: string) {
        if (!id && SDKConfig.BannerId.length < 1) return;
        id = id ? id : SDKConfig.BannerId[this.BannerUseIndex];
        if (++this.BannerUseIndex >= SDKConfig.BannerId.length) this.BannerUseIndex = 0;
        new Banner(id);
    }

    private static CreateGridAd(id?: string) {
        if (!id && SDKConfig.GridId.length < 1) return;
        id = id ? id : SDKConfig.GridId[this.GridUseIndex];
        if (++this.GridUseIndex >= SDKConfig.GridId.length) this.GridUseIndex = 0;
        new Grid(id);
    }

    private static CreateCustomAd(key: string, id?: string) {
        if (!id && SDKConfig.CustomId.length < 1) return;
        id = id ? id : SDKConfig.CustomId[this.CustomUseIndex];
        if (++this.CustomUseIndex >= SDKConfig.CustomId.length) this.CustomUseIndex = 0;
        this.mCustom.set(key, new Custom(id, SDKConfig.CustomInfo[key]));
    }

    private static CreateInterstitialAd(id?: string) {
        if (!id && SDKConfig.InterstitialId.length < 1) return;
        id = id ? id : SDKConfig.InterstitialId[this.InterstitialUseIndex];
        if (++this.InterstitialUseIndex >= SDKConfig.InterstitialId.length) this.InterstitialUseIndex = 0;
        new InterstitialAd(id);
    }

    private static InterstitialShowIndex: number = 0;
    public static ShowInterstitialAd() {
        if (this.mInterstitial.length < 1) return;
        this.mInterstitial[this.InterstitialShowIndex >= this.mInterstitial.length ? 0 : this.BannerShowIndex].show();
        if (++this.InterstitialShowIndex >= this.mInterstitial.length) this.InterstitialShowIndex = 0;
    }

    private static videoIndex: number = -1;
    public static ShowVideo(finish?: Function, close?: Function, no?: Function, caller?: any) {
        if (!this.platform && !Laya.Browser._isMiniGame) {
            if (finish) caller ? finish.call(caller) : finish();
            return;
        }
        if (this.mVideo.length < 1) {
            caller ? no && no.apply(caller) : no && no();
            this.ShowToast("视频拉取中。。。");
            return;
        }
        (this.mVideo[++this.videoIndex % this.mVideo.length] as Video).show(caller, finish, close);
    }

    private static BannerShowIndex: number = 0;
    public static ShowBanner(style?: BannerStyle) {
        if (this.mBanner.length < 1) return;
        this.mBanner[this.BannerShowIndex >= this.mBanner.length ? 0 : this.BannerShowIndex].show(style);
        if (++this.BannerShowIndex >= this.mBanner.length) this.BannerShowIndex = 0;
    }

    public static HideBanner() {
        for (var item of this.mBanner) {
            item.hide();
        }
    }

    public static ShowCustomAd(type: string, id?: string) {
        if (SDKConfig.CustomId.length < 1) return;
        if (!this.platform) return;
        if (!this.mCustom.has(type)) {
            this.CreateCustomAd(type, id);
        }
        this.mCustom.get(type).show();
    }

    private static hideCustomAdNum: number = 0;
    public static HideCustomAd() {
        this.hideCustomAdNum++;
        for (var item of this.mCustom) {
            item[1].hide();
            if (this.hideCustomAdNum >= 5) item[1].destroy();
        }
        if (this.hideCustomAdNum >= 5) this.mCustom.clear();
    }

    public static ShowToast(str: string) {
        if (!Laya.Browser.onMiniGame) {
            console.log(str);
            return;
        }
        this.platform.showToast({
            title: str,
            icon: 'none',
            duration: 2000
        })
    }

    private static _shareType: number;
    // 分享
    public static shareAppMessage(type?: number, title?: string, imageUrl?: string) {
        this._shareType = type;
        if (!Laya.Browser.onMiniGame) {
            return;
        }
        this.platform.shareAppMessage({
            title: title || "只有0.01%的人能过第二关",
            imageUrl: imageUrl || "loading/loading_img/loading_icon.png"
        })
    }

    /**
     * 震动
     * @param type 震动类型
     * @returns 
     */
    public static canVibrate: boolean = true;
    public static vibrateShort(type: VibrateShortType) {
        if (!this.canVibrate) return;
        if (this.platform == null) return;
        this.platform.vibrateShort({ type: type });
    }

    /**
     * 微信上报事件
     * @param eventId 
     * @param data 
     * @returns 
     */
    public static reportEvent(eventId: string, ...args: Array<WXReportEventKeyValue>) {
        if (this.platform == null) {
            console.log("微信上报事件", eventId, args);
            return;
        }
        let data = {};
        for (let item of args) {
            data[item.key] = item.value;
        }
        this.platform.reportEvent(eventId, data);
    }

    /**订阅信息 */
    public static requestSubscribeMessage(...tmplIds: string[]) {
        if (this.platform == null) {
            return;
        }
        this.platform.requestSubscribeMessage({
            tmplIds: tmplIds,
            success(res) {
                console.log("订阅成功", res)
            },
            fail(err) {
                console.log("订阅失败", err);
            }
        })
    }

}
export interface WXReportEventKeyValue {
    key: string,
    value: any
}
export enum VibrateShortType {
    /**重 */
    heavy = "heavy",
    /**中 */
    medium = "medium",
    /**轻 */
    light = "light",
}
export interface onShowObj {
    caller: any, //执行域
    backFun: Function //回调方法
}

