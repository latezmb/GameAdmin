// game.json 中的配置：
// "subpackages": [
//     {
//         "name": "Zip1",
//         "root": "/zip1/"
//     }, {
//         "name": "Zip2",
//         "root": "/zip2/"
//     }, {
//         "name": "Zip3",
//         "root": "/zip3/"
//     }

import { FrameConfig } from "../FrameConfig";
import Log from "../log/Log";

// ]
export const AMConfig = {
    /**是否每次都强制清理 */
    forceClearCaChe: false,
    UseMainZip: false, //是否使用主包的压缩包
    UseSubPackge: false,  //是否使用分包
    CacheVersion: "1.0.1",
    UnZipInfo: {
        ZipName: "Zip.zip",
        Version: "1.0",
        subPackgeRoot: "/zip/",
    },
    SubPackages: [
        {
            isZip: true,
            ZipName: "Zip1.zip",
            Version: "1.0",
            subPackgeRoot: "/zip1/",
            InitLoad: true,
            LoadingFinish: false
        },
        // 不压缩的资源的分包，一些不能放在缓存的资源就放这里
        // {
        //     isZip: false,
        //     ZipName: "sub1",
        //     Version: "1.0",
        //     subPackgeRoot: "/subPack1/",
        //     InitLoad: true,
        //     LoadingFinish: false
        // }
        // , {
        //     ZipName: "Zip2.zip",
        //     Version: "1.1",
        //     subPackgeRoot: "/zip2/",
        //     InitLoad: true,
        //     LoadingFinish: false
        // }
        // ,{
        //     ZipName: "Zip3.zip",
        //     Version: "1.0",
        //     subPackgeRoot: "/zip3/",
        //     InitLoad: true,
        //     LoadingFinish: false
        // }
    ]
}

export default class AssetsMgr {

    private static inst: AssetsMgr = null;
    public static get Inst(): AssetsMgr {
        if (AssetsMgr.inst == null) {
            AssetsMgr.inst = new AssetsMgr();
        }
        return AssetsMgr.inst;
    }

    private mFileMgr: any = null;
    private mLoadFinish: number = 0;
    private AssetsMap: any;
    private mLoadAssetsIndex: number = -1;
    public mCacheBase: string = "";
    private mIsClearCaChe: boolean = true;
    private mPlatform: any;

    //回调
    private caller: any = null;
    private mBackFun: Function = null;


    public AssetsPath: any = {
    }

    //需要检查的资源目录，防止缓存被清理
    public ExaminePath: any = {
    }

    constructor() {
        this.mPlatform = FrameConfig.platform;
        if (!this.mPlatform) return;
        this.mFileMgr = this.mPlatform.getFileSystemManager();
        this.mCacheBase = FrameConfig.basePath;
        this.InitCaChe(this.mCacheBase);
    }

    private InitCaChe(path: string) {
        if (!this.mIsClearCaChe) return;
        try {
            this.mFileMgr.accessSync(path);
            console.log("存在缓存目录:", path);
            this.mIsClearCaChe = true;
        }
        catch (e) {
            console.log("不存在缓存目录：", path);
            this.mIsClearCaChe = false;
        }
        if(AMConfig.forceClearCaChe) {
            console.debug("强制清理文件缓存");
            this.mIsClearCaChe = false;
        }
        else if (Laya.LocalStorage.getItem("CaCheVersion") == AMConfig.CacheVersion && this.mIsClearCaChe) {
            console.log("缓存版本一致且缓存目录存在，不做缓存清理");
            return;
        }
        else {
            console.log("缓存版本不一致或缓存目录不存在，清理缓存");
        }
        Laya.LocalStorage.setItem("CaCheVersion", AMConfig.CacheVersion);
        if (AMConfig.UseMainZip) {
            Laya.LocalStorage.setItem(AMConfig.UnZipInfo.subPackgeRoot + AMConfig.UnZipInfo.ZipName, "");
        }
        if (AMConfig.UseSubPackge) {
            for (var info of AMConfig.SubPackages) {
                Laya.LocalStorage.setItem(info.subPackgeRoot + info.ZipName, "");
            }
        }
    }

    /**
     * 资源管理初始化
     * @param ExaminePath 检测资源路径
     * @param param 其他参数
     * @returns 
     */
    public Init(ExaminePath?: any, ...param: any) {
        if (!this.mPlatform) {
            console.log("获取平台失败！使用默认路劲。");
            return;
        }
        // this.AssetsMap = AssetePath;
        this.ExaminePath = ExaminePath;
        for (var key in this.AssetsPath) {
            this.AssetsPath[key] = this.mCacheBase + this.AssetsPath[key];
        }

        for (var item of param) {
            for (var key in item) {
                item[key] = this.mCacheBase + item[key];
            }
        }

        for (var key in this.ExaminePath) {
            this.ExaminePath[key] = this.mCacheBase + this.ExaminePath[key];
            this.InitCaChe(this.ExaminePath[key]);
        }
    }

    public CreateAssets(path: string, backfun?: Function, caller?: any) {
        if (this.AssetsMap[path]) {
            if (backfun) caller ? backfun.apply(caller, [this.AssetsMap[path]]) : backfun(this.AssetsMap[path]);
            return;
        }
        Laya.loader.load(path, Laya.Handler.create(this, () => {
            this.AssetsMap[path] = Laya.loader.getRes(path);
            if (backfun) caller ? backfun.apply(caller, [this.AssetsMap[path]]) : backfun(this.AssetsMap[path]);
        }));
    }

    public LoadAseets(backFun?: Function, caller?: any) {
        if (!this.mPlatform) {
            if (backFun) caller ? backFun.apply(caller) : backFun();
            return;
        }
        if (FrameConfig.cdn) {
            console.log("走cdn");
            if (backFun) caller ? backFun.apply(caller) : backFun();
            return;
        }
        this.caller = caller;
        this.mBackFun = backFun;
        console.log("分包状态：", AMConfig.UseSubPackge);
        console.log("主包压缩：", AMConfig.UseMainZip);
        AMConfig.UseMainZip ? this.LocalUnZip() : this.LoadingFnish(false);
    }

    private LocalUnZip() {
        if (Laya.LocalStorage.getItem(AMConfig.UnZipInfo.subPackgeRoot + AMConfig.UnZipInfo.ZipName) == AMConfig.UnZipInfo.Version) {
            console.log("版本号相同，不做解压");
            this.LoadingFnish(false);
            return;
        }
        else {
            console.log("版本号不同，重解压");
        }
        this.unZip(AMConfig.UnZipInfo, false);
    }

    public LoadSubpackage(info: any, callBack: Function = this.unZip, caller = this) {
        if (info.LoadingFinish) {
            callBack.call(caller, info);
            return;
        }
        if (Laya.LocalStorage.getItem(info.subPackgeRoot + info.ZipName) == info.Version) {
            console.log("分包：", info.ZipName, "版本号相同，不拉取解压资源");
            this.LoadingFnish(true);
            return;
        }
        else {
            console.log("版本号不同，重拉取分包：", info.ZipName);
        }

        // Laya.loader.loadPackage(info.subPackgeRoot)
        // .then((res) => {
        //     console.log("分包：", info.ZipName, "拉取成功");
        //     this.recordSubLoadFinish(info);
        //     callBack.call(caller, info);
        // })
        // .catch((err) => {
        //     console.error("分包：", info.ZipName, "分包拉取失败：" + err);
        //     this.LoadSubpackage(info);
        // })

        var s = this;
        this.mPlatform.loadSubpackage({
            name: info.subPackgeRoot,
            success: function (res: any) {
                console.log("分包：", info.ZipName, "拉取成功");
                s.recordSubLoadFinish(info);
                if (info.isZip) {
                    s.unZip(info)
                }
                else {
                    Laya.LocalStorage.setItem(info.subPackgeRoot + info.ZipName, info.Version);
                    AssetsMgr.Inst.LoadingFnish(true);
                }
            },
            fail: function (res: any) {
                console.error("分包：", info.ZipName, "分包拉取失败：" + res);
                s.LoadSubpackage(info);
            }
        })
    }

    private recordSubLoadFinish(info) {
        for (let item of AMConfig.SubPackages) {
            if (item.ZipName != info.ZipName) continue;
            item.LoadingFinish = true;
            break;
        }
    }

    private unZip(info: any, IsSub: boolean = true) {
        var needCreate;
        try {
            this.mFileMgr.accessSync(this.mCacheBase);
            console.log("解压缓存目录存在");
            needCreate = false;
        } catch (e) {
            needCreate = true;
            console.log("解压缓存目录不存在，先创建");
        }
        if (needCreate) {
            try {
                this.mFileMgr.mkdirSync(this.mCacheBase, true)
                console.log("解压缓存目录创建成功");
            } catch (e) {
                console.error("压缓存目录创建失败：", e);
                return;
            }
        }
        var zipPath = info.subPackgeRoot + info.ZipName;
        try {
            this.mFileMgr.accessSync(zipPath);
            console.log("读取压缩包", info.ZipName, "成功");
        } catch (e) {
            console.error("压缩包:", info.ZipName, "不存在，请检查压缩包路劲");
            return;
        }
        this.mFileMgr.unzip({
            zipFilePath: zipPath,
            targetPath: this.mCacheBase,
            success(res: any) {
                console.log("压缩包：", info.ZipName, "解压成功");
                Laya.LocalStorage.setItem(info.subPackgeRoot + info.ZipName, info.Version);
                AssetsMgr.Inst.LoadingFnish(IsSub);
            },
            fail(res: any) {
                console.error("压缩包：", info.ZipName, "解压失败");
                AssetsMgr.Inst.unZip(info);
            }
        })
    }

    private LoadingFnish(IsSub: boolean = true) {
        if (!AMConfig.UseSubPackge) {
            // 没有开启分包完成回调
            if (this.mBackFun) this.caller != null ? this.mBackFun.apply(this.caller) : this.mBackFun();
            return;
        }
        // this.LoadManager();
        if (IsSub) this.mLoadFinish++;
        if (this.mLoadFinish < AMConfig.SubPackages.length) {
            let info = AMConfig.SubPackages[this.mLoadFinish];
            // 判断是否在初始化的时候拉取分包
            info.InitLoad ? this.LoadSubpackage(info) : this.LoadingFnish(true);
        }
        else {
            // 开启分包完成回调
            if (this.mBackFun) this.caller != null ? this.mBackFun.apply(this.caller) : this.mBackFun();
        }
    }

    /**传入路径，根据平台会的真实路径 */
    public getPath(path: string) {
        return this.mCacheBase + path;
    }

}