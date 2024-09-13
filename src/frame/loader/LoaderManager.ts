import { Tables } from "../../game/table/Types";
import Log from "../log/Log";

export class LoaderManager {

    static ConfigTable: Tables;

    static async init(configList: Array<string>) {
        let url;
        for(let fileName of configList) {
            url = this.getConfigPath(fileName);
            await this.load(url);
        }
        LoaderManager.ConfigTable = new Tables(LoaderManager.getConfigJson);
        Log.info("========config loading finish========");
        for(let fileName of configList) {
            url = this.getConfigPath(fileName);
            this.release(url);
        }
    }

    /**
     * 加载资源
     * @param url 资源路径
     * @param isCache 是否压缩包的缓存资源
     * @returns 
     */
    static async load(url: string): Promise<any> {
        let res: Laya.Resource = await Laya.loader.load(url);
        res._addReference();
        return res;
    }

    /**
     * 释放资源
     * @param url 
     * @returns 
     */
    static release(url: string) {
        if (!url) return;
        let res: Laya.Resource = Laya.loader.getRes(url);
        if (!res) {
            if (Laya.loader.loading) {
                Log.debug("清理未加载资源:" + url);
                Laya.loader.cancelLoadByUrl(url);
            }
            Log.error("资源不存在:" + url);
            return;
        }
        this.removeReference(res);
    }

    /**
     * 释放图片资源(释放资源一般使用这个)
     * @param url 资源路径
     */
    static clearTextureRes(url: string) {
        if (!url) return;
        // let res: Laya.Resource = Laya.loader.getRes(url);
        // if (!res) {
        //     if (Laya.loader.loading) {
        //         Log.debug("清理未加载资源:" + url);
        //         Laya.loader.cancelLoadByUrl(url);
        //     }
        //     Log.error("资源不存在:" + url);
        //     return;
        // }
        Laya.loader.clearTextureRes(url);
    }

    static removeReference(res: Laya.Resource) {
        res._removeReference();
        if (res.referenceCount <= 0) {
            if (res.url.indexOf("atlas") == -1) {
                res.destroy();
            }
            Log.debug("释放资源" + res.url);
        }
    }

    static gc() {
        Laya.Resource.destroyUnusedResources();
    }

    static configBasePath = "resources/config/";
    static getConfigPath(name: string, suffix: ConfigFileSuffix = ConfigFileSuffix.json) {
        return this.configBasePath + name + suffix;
    }

    static getConfigJson(name: string) {
        name = LoaderManager.getConfigPath(name);
        return Laya.loader.getRes(name).data;
    }

}

export enum ConfigFileSuffix {
    bytes = ".bytes",
    json = ".json"
}