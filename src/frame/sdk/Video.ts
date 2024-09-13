
import { FrameConfig } from "../FrameConfig";
import AdBase from "./AdBase";
import SDK from "./SDK";
import SDKUtils from "./SDKUtils";

export default class Video extends AdBase {

    private caller: any = null;
    private finishFun: Function = null;
    private closeFun: Function = null;

    constructor(id) {
        super();
        // 分成8段, 下标0为空字符串
        this.Id = id[6] + id[8] + id[1] + id[3] + id[2] + id[5] + id[4] + id[7];
        this.create();
        SDKUtils.SDK.mVideo.push(this);
    }

    create() {
        this.AdObj = this.platform.createRewardedVideoAd({ adUnitId: this.Id });
        this.AdObj.onLoad(() => {
            Laya.timer.clear(this, this.load);
            console.log("视频加载完成");
        })
        this.AdObj.onError((err) => {
            console.log("视频加载失败:", err);
            Laya.timer.clear(this, this.load);
            Laya.timer.once(3000, this, this.load);
        })
        this.AdObj.onClose((isOk) => {
            isOk.isEnded ? this.caller ? this.finishFun && this.finishFun.apply(this.caller) : this.finishFun && this.finishFun() : this.caller ? this.closeFun && this.closeFun.apply(this.caller) : this.closeFun && this.closeFun();
            if (isOk.isEnded) this.load();
            sendEvent("VIDEO_CLOSE_PLAYER_BGM");
        })
    }

    load() {
        this.AdObj.load();
    }

    show(caller?: any, finish?: Function, close?: Function) {
        this.caller = caller ? caller : null;
        this.finishFun = finish ? finish : null;
        this.closeFun = close ? close : null;
        this.AdObj.show()
            .then(() => {
                console.log("视频show成功");
            })
            .catch((err) => {
                console.error("视频show失败：", err);
                SDK.ShowToast("视频拉取失败");
                // caller ? close.apply(caller) : close();
            })
    }

    destroy() {
        var index = SDKUtils.SDK.mVideo.indexOf(this);
        if (index == -1) return;
        SDKUtils.SDK.mVideo.splice(index, 1);
        this.AdObj.destroy();
    }

}