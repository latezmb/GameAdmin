export enum ScreenType {
    Vertical,
    Horizontal
}

export class FrameConfig {

    /**版本号，跟随提交版本变化 */
    public static version = "1.0.0";

    /**使用cdn */
    public static cdn: boolean = false;

    /**根节点，可添加2d、3d场景 */
    public static rootNode: Laya.Node;

    /**
     * 默认宽度
     */
    public static defaultWidth: number = 750;
    /**
     * 默认高度
     */
    public static defaultHeight: number = 1334;

    private static _realWidth: number;
    private static _realHeight: number;

    /**
     * 屏幕方向
     */
    public static screenType: ScreenType = ScreenType.Vertical;

    /**
     * 真实宽度
     */
    public static get realWidth() {
        if (!this._realWidth) {
            this._realWidth = Laya.stage.width;
        }
        return this._realWidth;
    }

    /**
     * 真实高度
     */
    public static get realHeight() {
        if (!this._realHeight) {
            this._realHeight = Laya.stage.height;
        }
        return this._realHeight;
    }

    /**
     * 适配高度差
     */
    public static get fitHeight() {
        return FrameConfig.realHeight - FrameConfig.defaultHeight;
    }

    /**
     * 适配宽度差
     */
    public static get fitWidth() {
        return FrameConfig.realWidth - FrameConfig.defaultWidth;
    }

    /**
     * 是否为测试环境，不在小游戏平台下
     */
    public static get Debug() {
        return !Laya.Browser._isMiniGame;
    }

    private static _platform: any;
    /**平台对象 */
    public static get platform() {
        if (!this._platform) {
            if (Laya.Browser.onMiniGame) {
                this._platform = Laya.Browser.window.wx;
            }
            else if (Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame) {
                this._platform = Laya.Browser.window.qg;
            }
            else if (Laya.Browser.onQQMiniGame) {
                this._platform = Laya.Browser.window.qq;
            }
            else if (Laya.Browser.onTTMiniGame) {
                this._platform = Laya.Browser.window.tt;
            }
            else if (window['my']) {
                this._platform = window['my'];
                this._platform.onError((e) => {
                    console.debug("err", e);
                })
            }
        }
        return this._platform;
    }

    private static _basePath: string;
    /**资源根目录 */
    public static get basePath() {
        if (this.platform && !this.cdn) {
            this._basePath = this.platform.env.USER_DATA_PATH + "/myCache/";
        }
        else {
            this._basePath = "";
        }
        return this._basePath;
    }

    /**
     * 初始化进度，初始完成为100
     */
    public static LoadingInitPro: number = 50;


    private static _isFringeScreen = null;
    /**是否为刘海屏 */
    public static get isFringeScreen() {
        if (!Laya.Browser._isMiniGame) return;
        if (this._isFringeScreen == null) {
            let info = this.platform.getWindowInfo();
            this._isFringeScreen = info && info.safeArea && info.safeArea.top > 40;
        }
        return this._isFringeScreen;
    }


    // ===========微信相关参数===========

    private static _wxId: string;
    /**
     * 微信appId
     */
    public static get wxId(): string {
        return this._wxId;
    }
    /**
     * 1-3-8-6
     * @param value 
     */
    public static setWxId(value: Array<string>) {
        this._wxId = value[1] + value[3] + value[8] + value[6];
    }

    private static _sceneid: number = null;
    /**进入场景id */
    public static get sceneId(): number {
        if (!Laya.Browser._isMiniGame) return;
        if (this._sceneid == null) {
            this._sceneid = Number(this.platform.getLaunchOptionsSync().scene);
        }
        return this._sceneid;
    }

    public static setSceneId(sceneId) {
        this._sceneid = Number(sceneId);
    }

    /**是否为指定目标场景进入 */
    public static isTargerSceneId(sceneId: InGameSceneId) {
        return this.sceneId == Number(sceneId);
    }


    // 
    public static debugSceneIdList: Array<string> = [
        // 远程调试热更新（开发者工具中，预览 -> 自动预览 -> 编译并预览）
        "1106",
        // 开发者工具、发现页小程序「最近使用」列表（基础库2.2.4-2.29.0版本包含「我的小程序」列表，2.29.1版本起仅为「最近使用」列表）
        "1001",
    ];
    /**需要检测场景值 */
    public static securitySceneIdList: Array<string> = ["1037", "1045", "1046", "1067", "1091", "1095", "1239", "1238", "1232", "1230", "1228", "1206", "1205", "1201", "1200", "1199", "1154", "1152", "1150", "1145", "1144"];

    // ===========微信相关参数===========end

}

/**进入场景值 */
export enum InGameSceneId {
    /**微信聊天主界面下拉，「我的小程序」栏（基础库2.2.4-2.29.0版本废弃，2.29.1版本起生效） */
    ID1104 = 1104,
    /**安卓系统桌面图标 */
    ID1023 = 1023,
}