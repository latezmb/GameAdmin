import Log from "../log/Log";
import { CloseType, LayerType } from "../window/WindowManager";

export class ModuleConfig {

    private static module: any = {};

    /**
     * 注册窗口
     * @param name 窗口明
     * @param prefab 预制体路径
     * @param layerType 层级类型
     * @param closeType 关闭类型
     */
    static register(name: string, prefab: string, layerType?: LayerType, closeType?: CloseType) {
        layerType = layerType || LayerType.default;
        closeType = closeType || CloseType.destroy;
        this.registerModule({ name: name, prefab: prefab, layerType: layerType, closeType: closeType });
    }

    /**
     * 注册窗口
     * @param module 模块数据
     */
    static registerModule(module: ModuleWin) {
        this.module[module.name] = module;
    }

    /**
     * 获取模块预设体路劲
     * @param name 模块名
     * @returns 
     */
    static getModulePrefabPath(name: string): string {
        if (!this.hasModule(name)) return;;
        return this.module[name].prefab;
    }

    /**
     * 获取模块层级
     * @param name 模块名
     * @returns 
     */
    static getModuleLayerType(name: string): LayerType {
        if (!this.hasModule(name)) return;;
        return this.module[name].layerType;
    }

    /**
     * 获取模块关闭模式
     * @param name 模块名
     * @returns 
     */
    static getModuleCloseType(name: string): CloseType {
        if (!this.hasModule(name)) return;;
        return this.module[name].closeType;
    }

    /**
     * 判断是否已经注册
     * @param name 模块名称
     * @returns 是否有注册
     */
    static hasModule(name: string) {
        if (!this.module[name]) {
            Log.error("未注册模块:" + name);
            return false;
        }
        return true;
    }

}

export interface ModuleWin {
    name: string;
    prefab: string;
    layerType: LayerType;
    closeType: CloseType;
}