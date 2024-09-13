import Scene3DManager from "./3d/Scene3DManager";
import { FrameConfig } from "./FrameConfig";
import AssetsMgr, { AMConfig } from "./loader/AssetsMgr";
import { LoaderManager } from "./loader/LoaderManager";
import { ModuleConfig } from "./module/ModuleConfig";
import { ProxyManager } from "./proxy/ProxyManager";
import SDK from "./sdk/SDK";
import { TimeManger } from "./time/TimeManger";
import { TweenSystem } from "./tween/tween-system";
import { Tools } from "./util/Tools";
import { WindowManager } from "./window/WindowManager";

const { regClass, property } = Laya;

@regClass()
export abstract class FrameMain extends Laya.Script {
    
    /**加载创建名称 */
    protected LoadingWindowName: string = "LoadingWindow";
    /**开始游戏窗口名，即游戏加载初始化完成之后打开的目标窗口 */
    protected StartWindowName: string;
    /**注册配置文件*/
    protected configList: Array<string> = [];
    /**内置配置文件 */
    private defaultConfigList: Array<string> = ["game_tblocalinfo", "game_tbconstant"];
    /**图集路径映射配置文件,不打包图片不可放到atlas图集目录下*/
    protected atlasPathList: Array<string> = [];
    /**需要映射路径映射配置文件*/
    protected mappingPathList: Array<string> = [];
    /**内置映射地址 */
    private defaultBasePaths: Array<string> = ["config","resources","images", "audio"];
    /**需要检测的资源文件路径 */
    protected checkAssetsPaths: Array<string> = [];

    /**事件管理器 */
    private static eventMgr: Laya.EventDispatcher;
    
    /**
     * 初始化项目配置
     */
    protected abstract initConfig(): any;
    /**
     * 注册窗口模块
     */
    protected abstract initMudule(): any;

    /**
     * 初始化模块
     */
    protected abstract initProxy(): any;

    /**
     * 资源、配置等全部准备完成，初始化外部完成回调
     * @param callBack 初始化外部的完成后回调方法
     * @param caller 回调执行域
     */
    protected loadFinishInitOutEvent() {
        this.allInitFinish();
    }

    onAwake(): void {
        this.initConfig();
        this.initProxy();
        this.initMudule();
        if (!ModuleConfig.hasModule(this.LoadingWindowName)) {
            console.error(this.LoadingWindowName, "必须注册，不能为空");
            return;
        }
        if (!this.securityEvent()) return;
        if (!this.StartWindowName) {
            console.error("启动窗口为空！检查frame/FrameMain.ts中的StartWindowName。");
            return;
        }
        this.initBasePath();
        this.initModuleEvent();
    }

    // 设置映射地址
    private initBasePath() {
        if (FrameConfig.cdn) return;
        if (!AMConfig.UseMainZip && AMConfig.UseSubPackge) return;
        let basePaths: any = {};
        this.defaultBasePaths = this.defaultBasePaths.concat(this.mappingPathList);
        for (let item of this.defaultBasePaths) {
            basePaths[item] = FrameConfig.basePath;
        }
        for (let item of this.atlasPathList) {
            basePaths[item + "."] = FrameConfig.basePath;
            basePaths[item + "_"] = FrameConfig.basePath;
        }
        Laya.URL.basePaths = basePaths;
    }

    private initModuleEvent() {
        // 复制节点
        FrameConfig.rootNode = this.owner.parent;
        // 创建消息对象
        FrameMain.eventMgr = new Laya.EventDispatcher();
        // 初始化ui框架
        WindowManager.Inst.init(this.owner);
        // 打开加载界面
        WindowManager.Inst.openWindow(this.LoadingWindowName);
        // 初始化资源目录、版本号
        AssetsMgr.Inst.Init(this.checkAssetsPaths);
        // 拉取资源包
        AssetsMgr.Inst.LoadAseets(this.loadZipCallBack, this);
        // 初始化缓动
        TweenSystem.Init();
        // 初始化3d场景管理器
        Scene3DManager.Inst<Scene3DManager>().init();
    }

    // 拉取资源包完成回调
    private loadZipCallBack() {
        FrameConfig.LoadingInitPro = 75;
        this.configList = this.configList.concat(this.defaultConfigList);
        LoaderManager.init(this.configList).then(() => {this.initGlobalFuntion()});
    }

    // 处理常用全局方法
    private initGlobalFuntion() {
        // 注册全局方法
        (window as any)["onClick"] = Tools.onClick;
        (window as any)["openWindow"] = this.openWindow;
        (window as any)["closeWindow"] = this.closeWindow;
        (window as any)["isShowWin"] = this.isShowWin;
        (window as any)["getWinScript"] = this.getWinScript;
        (window as any)["addEvent"] = this.addEvent;
        (window as any)["offEvent"] = this.offEvent;
        (window as any)["offAllEvent"] = this.offAllEvent;
        (window as any)["sendEvent"] = this.sendEvent;
        
        // 注册内置系统模块
        // 初始化时间
        TimeManger.Inst<TimeManger>().init();
        // 初始化代理
        ProxyManager.Inst<ProxyManager>().init();
        // 初始化SDk
        SDK.Init();

        // 初始化外部
        this.loadFinishInitOutEvent();
    }

    // 完成回调
    allInitFinish() {
        this.openStartWindow();
    }

    // 初始化完成都进去指定窗口
    private openStartWindow() {
        WindowManager.Inst.openWindow(this.StartWindowName, null, null, this, () => {
            FrameConfig.LoadingInitPro = 100;
        });
    }

    isShowWin(winName: string) {
        return WindowManager.Inst.isShowWin(winName);
    }

    getWinScript(winName: string) {
        return WindowManager.Inst.getWinScript(winName);
    }

    async openWindow(winName: string, args?: any[], closeCallBack?: Function, closeCallBackCaller?: any) {
        return await WindowManager.Inst.openWindow(winName, args, closeCallBack, closeCallBackCaller);
    }

    closeWindow(winName: string, args?: any[]) {
        WindowManager.Inst.closeWindow(winName, args);
    }

    addEvent(event: string, caller: any, callFun: Function, args?: any[]){
        FrameMain.eventMgr.on(event, caller, callFun, args);
    }

    sendEvent(event: string, data?: any) {
        FrameMain.eventMgr.event(event, data);
    }

    offEvent(event: string, caller: any, callFun: Function) {
        FrameMain.eventMgr.off(event, caller, callFun);
    }

    offAllEvent(caller: any) {
        FrameMain.eventMgr.offAllCaller(caller);
    }

    securityEvent() {
        if (!Laya.Browser._isMiniGame) return true;
        if (Laya.Browser.onMiniGame) {
            let sceneId = FrameConfig.sceneId + "";
            if (FrameConfig.debugSceneIdList.indexOf(sceneId) != -1 || FrameConfig.securitySceneIdList.indexOf(sceneId) != -1) {
                let temp: string = FrameConfig.platform.getAccountInfoSync().miniProgram.appId.toString();
                return temp.slice(2) == FrameConfig.wxId;
            }
            return true;
        }
        else if (Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame) {
        }
        else if (Laya.Browser.onQQMiniGame) {
        }
        else if (Laya.Browser.onTTMiniGame) {
        }
        return false;
    }

}