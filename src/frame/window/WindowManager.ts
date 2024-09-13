import { LoaderManager } from "../loader/LoaderManager";
import Log from "../log/Log";
import { ModuleConfig } from "../module/ModuleConfig";
import { WINDOW_LAYER } from "../util/FrameEnum";
import { WindowBase } from "./WindowBase";

export enum LayerType {
    default = "default",
    top = "top",
    banner = "banner",
    debug = "debug",
    tips = "tips",
}

export enum CloseType {
    destroy,
    hide
}

export class WindowManager {

    private static inst: WindowManager;
    public static get Inst(): WindowManager {
        if (!WindowManager.inst) {
            WindowManager.inst = new WindowManager();
        }
        return WindowManager.inst;
    }

    private showMap: Map<string, WindowBase<Laya.Box>>;
    private hideMap: Map<string, WindowBase<Laya.Box>>;
    private inLoad: Array<string>;
    private closeWinCallBack: Map<string, any>;

    private showLayer: any;
    private root: Laya.Box;

    init(scene: Laya.Node) {
        (scene as Laya.Scene).zOrder = WINDOW_LAYER.UI;
        this.inLoad = [];
        this.showLayer = {};
        this.showMap = new Map();
        this.hideMap = new Map();
        this.closeWinCallBack = new Map();
        this.root = new Laya.Box();
        this.root.name = "WindowManager";
        scene.addChild(this.root);
        for (let key in LayerType) {
            let node = new Laya.Box();
            node.name = key;
            node.mouseThrough = true;
            this.root.addChild(node);
            node.pos(0, 0);
            node.size(Laya.stage.width, Laya.stage.height);
        }
        this.root.pos(0, 0);
        this.root.size(Laya.stage.width, Laya.stage.height);
        Log.debug("=== WindowManager init finish ===");
    }

    /**
     * 窗口是否开启
     * @param winName 窗口名
     * @returns 
     */
    isShowWin(winName: string) {
        return this.showMap.has(winName);
    }

    /**
     * 获取的指定窗口的控制器
     * @param winName 窗口名
     */
    getWinScript<T>(winName: string) {
        if (!this.isShowWin(winName)) {
            Log.debug(`窗口：${winName}未注册！`);
            return;
        }
        return this.showMap.get(winName) as T;
    }

    /**
     * 注册窗口关闭回调，只作用一次。下一次打开关闭无效
     * @param winName 窗口名
     * @param callBack 回调方法
     * @param caller 执行域
     */
    private registerWinCloseCallBack(winName: string, callBack: Function, caller?: any) {
        this.closeWinCallBack.set(winName, {fun: callBack, caller: caller});
    }

    /**
     * 打开窗口
     * @param winName 窗口名
     * @param args 参数
     */
    async openWindow(winName: string, args?: any[], closeCallBack?: Function, caller?: any, openCallBack?: Function): Promise<any> {
        Log.debug("打开窗口" + winName);
        if (this.inLoad.indexOf(winName) != -1) {
            Log.debug(`窗口：${winName}正在加载！`);
            return;
        }
        if (this.isShowWin(winName)) {
            Log.debug(`窗口：${winName}已经打开！`);
            return;
        }
        let prefabPath = ModuleConfig.getModulePrefabPath(winName);
        if (!prefabPath) return;
        let ctr: WindowBase<Laya.Box>;
        let layer = ModuleConfig.getModuleLayerType(winName);
        if (this.hideMap.has(winName)) {
            ctr = this.hideMap.get(winName);
            this.hideMap.delete(winName);
        }
        else {
            this.inLoad.push(winName);
            let res: Laya.Prefab = await LoaderManager.load(prefabPath);
            let win = res.create();
            this.root.getChildByName(layer).addChild(win);
            ctr = win.getComponent(WindowBase);
            if (!ctr.winName) ctr.winName = winName;
            let index = this.inLoad.indexOf(winName);
            this.inLoad.splice(index, 1);
        }
        let layerNode = this.root.getChildByName(layer);
        layerNode.setChildIndex(ctr.owner, layerNode.numChildren - 1);
        let layerList: WindowBase<Laya.Box>[] = this.showLayer[layer];
        if (!layerList) {
            layerList = [];
        }
        layerList.push(ctr);
        this.showLayer[layer] = layerList;
        this.showMap.set(winName, ctr);
        let onHideCtr: WindowBase<Laya.Box>;
        if (layerList.length >= 2) {
            onHideCtr = layerList[layerList.length - 2];
        }
        else {
            let typeList = [];
            for (let item in LayerType) {
                typeList.push(item);
            }
            typeList.reverse();
            let index = typeList.indexOf(layer);
            if (index != -1) typeList.splice(0, index + 1);
            for (let key of typeList) {
                layerList = this.showLayer[key] || [];
                if (layerList.length >= 1) {
                    onHideCtr = layerList[layerList.length - 1];
                    break;
                }
            }
        }

        // onHide调用
        onHideCtr && onHideCtr.onHide();

        // 注册关闭窗口回调 
        if (closeCallBack) {
            this.registerWinCloseCallBack(winName, closeCallBack, caller);
        }
        
        // 打开窗口
        ctr.open.apply(ctr, args);

        // 执行打开回调
        if (openCallBack) caller ? openCallBack.call(caller) : openCallBack();

        // 隐藏调用
        ctr.selfOpenNeedCheckOtherHide && onHideCtr && onHideCtr.checkOnHide && onHideCtr.hide();

        return ctr;
    }

    /**
     * 关闭窗口
     * @param winName 窗口名
     * @param args 参数
     */
    closeWindow(winName: string, args?: any[]) {
        Log.debug("关闭窗口" + winName);
        if (!this.showMap.has(winName)) {
            Log.warn("窗口未打开:" + winName);
            return;
        }
        let ctr = this.showMap.get(winName);
        this.showMap.delete(winName);
        let layer = ModuleConfig.getModuleLayerType(winName);
        let layerList: WindowBase<Laya.Box>[] = this.showLayer[layer];
        let index = layerList.indexOf(ctr);
        if (index != -1) layerList.splice(index, 1);
        switch (ModuleConfig.getModuleCloseType(winName)) {
            case CloseType.destroy:
                ctr.close.apply(ctr, args);
                break;
            case CloseType.hide:
                ctr.hide();
                this.hideMap.set(winName, ctr);
                break;
        }

        let onShowCtr: WindowBase<Laya.Box>;
        let typeList = [];
        for (let item in LayerType) {
            if (item == LayerType.debug || item == LayerType.tips) continue;
            typeList.push(item);
        }
        typeList.reverse();
        for (let key of typeList) {
            layerList = this.showLayer[key] || [];
            if (layerList.length >= 1) {
                onShowCtr = layerList[layerList.length - 1];
                break;
            }
        }
        onShowCtr && onShowCtr.onShow();
        ctr.selfCloseNeedCheckOtherShow && onShowCtr && onShowCtr.checkOnShow && onShowCtr.show();

        // 取消窗口关闭回调
        if (this.closeWinCallBack.has(winName)) {
            let obj = this.closeWinCallBack.get(winName);
            obj.caller ? obj.fun.call(obj.caller) : obj.fun();
            this.closeWinCallBack.delete(winName);
            obj = null;
        }
    }

}