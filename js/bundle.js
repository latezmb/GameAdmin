(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/frame/FrameConfig.ts
  var _FrameConfig = class _FrameConfig {
    /**
     * 真实宽度
     */
    static get realWidth() {
      if (!this._realWidth) {
        this._realWidth = Laya.stage.width;
      }
      return this._realWidth;
    }
    /**
     * 真实高度
     */
    static get realHeight() {
      if (!this._realHeight) {
        this._realHeight = Laya.stage.height;
      }
      return this._realHeight;
    }
    /**
     * 适配高度差
     */
    static get fitHeight() {
      return _FrameConfig.realHeight - _FrameConfig.defaultHeight;
    }
    /**
     * 适配宽度差
     */
    static get fitWidth() {
      return _FrameConfig.realWidth - _FrameConfig.defaultWidth;
    }
    /**
     * 是否为测试环境，不在小游戏平台下
     */
    static get Debug() {
      return !Laya.Browser._isMiniGame;
    }
    /**平台对象 */
    static get platform() {
      if (!this._platform) {
        if (Laya.Browser.onMiniGame) {
          this._platform = Laya.Browser.window.wx;
        } else if (Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame) {
          this._platform = Laya.Browser.window.qg;
        } else if (Laya.Browser.onQQMiniGame) {
          this._platform = Laya.Browser.window.qq;
        } else if (Laya.Browser.onTTMiniGame) {
          this._platform = Laya.Browser.window.tt;
        } else if (window["my"]) {
          this._platform = window["my"];
          this._platform.onError((e) => {
            console.debug("err", e);
          });
        }
      }
      return this._platform;
    }
    /**资源根目录 */
    static get basePath() {
      if (this.platform && !this.cdn) {
        this._basePath = this.platform.env.USER_DATA_PATH + "/myCache/";
      } else {
        this._basePath = "";
      }
      return this._basePath;
    }
    /**是否为刘海屏 */
    static get isFringeScreen() {
      if (!Laya.Browser._isMiniGame)
        return;
      if (this._isFringeScreen == null) {
        let info = this.platform.getWindowInfo();
        this._isFringeScreen = info && info.safeArea && info.safeArea.top > 40;
      }
      return this._isFringeScreen;
    }
    /**
     * 微信appId
     */
    static get wxId() {
      return this._wxId;
    }
    /**
     * 1-3-8-6
     * @param value 
     */
    static setWxId(value) {
      this._wxId = value[1] + value[3] + value[8] + value[6];
    }
    /**进入场景id */
    static get sceneId() {
      if (!Laya.Browser._isMiniGame)
        return;
      if (this._sceneid == null) {
        this._sceneid = Number(this.platform.getLaunchOptionsSync().scene);
      }
      return this._sceneid;
    }
    static setSceneId(sceneId) {
      this._sceneid = Number(sceneId);
    }
    /**是否为指定目标场景进入 */
    static isTargerSceneId(sceneId) {
      return this.sceneId == Number(sceneId);
    }
    // ===========微信相关参数===========end
  };
  /**版本号，跟随提交版本变化 */
  _FrameConfig.version = "1.0.0";
  /**使用cdn */
  _FrameConfig.cdn = false;
  /**
   * 默认宽度
   */
  _FrameConfig.defaultWidth = 750;
  /**
   * 默认高度
   */
  _FrameConfig.defaultHeight = 1334;
  /**
   * 屏幕方向
   */
  _FrameConfig.screenType = 0 /* Vertical */;
  /**
   * 初始化进度，初始完成为100
   */
  _FrameConfig.LoadingInitPro = 50;
  _FrameConfig._isFringeScreen = null;
  _FrameConfig._sceneid = null;
  // 
  _FrameConfig.debugSceneIdList = [
    // 远程调试热更新（开发者工具中，预览 -> 自动预览 -> 编译并预览）
    "1106",
    // 开发者工具、发现页小程序「最近使用」列表（基础库2.2.4-2.29.0版本包含「我的小程序」列表，2.29.1版本起仅为「最近使用」列表）
    "1001"
  ];
  /**需要检测场景值 */
  _FrameConfig.securitySceneIdList = ["1037", "1045", "1046", "1067", "1091", "1095", "1239", "1238", "1232", "1230", "1228", "1206", "1205", "1201", "1200", "1199", "1154", "1152", "1150", "1145", "1144"];
  var FrameConfig = _FrameConfig;

  // src/frame/base/Singleton.ts
  var Singleton = class {
    // 泛型静态方法 Inst，用于获取单例实例
    // 在 this 中指定 `typeof this`，以推断实例类型
    static Inst(...param) {
      let Class = this;
      if (!Class._inst) {
        Class._inst = new Class(...param);
      }
      return Class._inst;
    }
  };

  // src/game/table/Types.ts
  var test;
  ((test2) => {
    let ETestQuality;
    ((ETestQuality2) => {
      ETestQuality2[ETestQuality2["A"] = 1] = "A";
      ETestQuality2[ETestQuality2["B"] = 2] = "B";
      ETestQuality2[ETestQuality2["C"] = 3] = "C";
      ETestQuality2[ETestQuality2["D"] = 4] = "D";
    })(ETestQuality = test2.ETestQuality || (test2.ETestQuality = {}));
  })(test || (test = {}));
  ((test2) => {
    let AccessFlag;
    ((AccessFlag2) => {
      AccessFlag2[AccessFlag2["WRITE"] = 1] = "WRITE";
      AccessFlag2[AccessFlag2["READ"] = 2] = "READ";
      AccessFlag2[AccessFlag2["TRUNCATE"] = 4] = "TRUNCATE";
      AccessFlag2[AccessFlag2["NEW"] = 8] = "NEW";
      AccessFlag2[AccessFlag2["READ_WRITE"] = 3] = "READ_WRITE";
    })(AccessFlag = test2.AccessFlag || (test2.AccessFlag = {}));
  })(test || (test = {}));
  var game;
  ((game2) => {
    class TbLocalInfo {
      constructor(_json_) {
        this._dataMap = /* @__PURE__ */ new Map();
        this._dataList = [];
        for (var _json2_ of _json_) {
          let _v;
          _v = new game2.LocalInfo(_json2_);
          this._dataList.push(_v);
          this._dataMap.set(_v.locaInfo, _v);
        }
      }
      getDataMap() {
        return this._dataMap;
      }
      getDataList() {
        return this._dataList;
      }
      get(key) {
        return this._dataMap.get(key);
      }
      resolve(_tables) {
        for (var v of this._dataList) {
          v.resolve(_tables);
        }
      }
    }
    game2.TbLocalInfo = TbLocalInfo;
  })(game || (game = {}));
  ((game2) => {
    class LocalInfo {
      constructor(_json_) {
        if (_json_.locaInfo === void 0) {
          throw new Error();
        }
        this.locaInfo = _json_.locaInfo;
        if (_json_.version === void 0) {
          throw new Error();
        }
        this.version = _json_.version;
        if (_json_.localVersion === void 0) {
          throw new Error();
        }
        this.localVersion = _json_.localVersion;
        if (_json_.userId === void 0) {
          throw new Error();
        }
        this.userId = _json_.userId;
        if (_json_.soundState === void 0) {
          throw new Error();
        }
        this.soundState = _json_.soundState;
        if (_json_.vibrateState === void 0) {
          throw new Error();
        }
        this.vibrateState = _json_.vibrateState;
        if (_json_.musicState === void 0) {
          throw new Error();
        }
        this.musicState = _json_.musicState;
        if (_json_.level === void 0) {
          throw new Error();
        }
        this.level = _json_.level;
        if (_json_.levelTubeSaveInfo === void 0) {
          throw new Error();
        }
        this.levelTubeSaveInfo = _json_.levelTubeSaveInfo;
        if (_json_.useTubeSkinId === void 0) {
          throw new Error();
        }
        this.useTubeSkinId = _json_.useTubeSkinId;
        if (_json_.useBallSkinId === void 0) {
          throw new Error();
        }
        this.useBallSkinId = _json_.useBallSkinId;
        if (_json_.useBgId === void 0) {
          throw new Error();
        }
        this.useBgId = _json_.useBgId;
        if (_json_.tempTubeHasBallNum === void 0) {
          throw new Error();
        }
        this.tempTubeHasBallNum = _json_.tempTubeHasBallNum;
        if (_json_.pauseUseNum === void 0) {
          throw new Error();
        }
        this.pauseUseNum = _json_.pauseUseNum;
        if (_json_.addTubeUseNum === void 0) {
          throw new Error();
        }
        this.addTubeUseNum = _json_.addTubeUseNum;
        if (_json_.addTime === void 0) {
          throw new Error();
        }
        this.addTime = _json_.addTime;
        if (_json_.jumpLevelNum === void 0) {
          throw new Error();
        }
        this.jumpLevelNum = _json_.jumpLevelNum;
        if (_json_.pack === void 0) {
          throw new Error();
        }
        this.pack = _json_.pack;
        if (_json_.coinNum === void 0) {
          throw new Error();
        }
        this.coinNum = _json_.coinNum;
        if (_json_.starNum === void 0) {
          throw new Error();
        }
        this.starNum = _json_.starNum;
        if (_json_.currentChallengeLevel === void 0) {
          throw new Error();
        }
        this.currentChallengeLevel = _json_.currentChallengeLevel;
        if (_json_.challengeLevelInfo === void 0) {
          throw new Error();
        }
        this.challengeLevelInfo = _json_.challengeLevelInfo;
        if (_json_.isFristGame === void 0) {
          throw new Error();
        }
        this.isFristGame = _json_.isFristGame;
        if (_json_.gameTime === void 0) {
          throw new Error();
        }
        this.gameTime = _json_.gameTime;
        if (_json_.levelTubeWenHaoSaveInfo === void 0) {
          throw new Error();
        }
        this.levelTubeWenHaoSaveInfo = _json_.levelTubeWenHaoSaveInfo;
        if (_json_.isGetCollectReward === void 0) {
          throw new Error();
        }
        this.isGetCollectReward = _json_.isGetCollectReward;
        if (_json_.isGetZhuoMianReward === void 0) {
          throw new Error();
        }
        this.isGetZhuoMianReward = _json_.isGetZhuoMianReward;
        if (_json_.resultShareTimeStamp === void 0) {
          throw new Error();
        }
        this.resultShareTimeStamp = _json_.resultShareTimeStamp;
        if (_json_.isFristSignIn === void 0) {
          throw new Error();
        }
        this.isFristSignIn = _json_.isFristSignIn;
        if (_json_.signInData === void 0) {
          throw new Error();
        }
        this.signInData = _json_.signInData;
        if (_json_.signInTime === void 0) {
          throw new Error();
        }
        this.signInTime = _json_.signInTime;
        if (_json_.topSignInDay === void 0) {
          throw new Error();
        }
        this.topSignInDay = _json_.topSignInDay;
        if (_json_.fightTipSignIn === void 0) {
          throw new Error();
        }
        this.fightTipSignIn = _json_.fightTipSignIn;
        if (_json_.mainTipSignIn === void 0) {
          throw new Error();
        }
        this.mainTipSignIn = _json_.mainTipSignIn;
        if (_json_.tipSignInTimeStamp === void 0) {
          throw new Error();
        }
        this.tipSignInTimeStamp = _json_.tipSignInTimeStamp;
        if (_json_.repairDataVersion === void 0) {
          throw new Error();
        }
        this.repairDataVersion = _json_.repairDataVersion;
        if (_json_.competitionScore === void 0) {
          throw new Error();
        }
        this.competitionScore = _json_.competitionScore;
        if (_json_.competitionDan === void 0) {
          throw new Error();
        }
        this.competitionDan = _json_.competitionDan;
        if (_json_.competitionTopDan === void 0) {
          throw new Error();
        }
        this.competitionTopDan = _json_.competitionTopDan;
        if (_json_.competitionTime === void 0) {
          throw new Error();
        }
        this.competitionTime = _json_.competitionTime;
        if (_json_.competitionNikeName === void 0) {
          throw new Error();
        }
        this.competitionNikeName = _json_.competitionNikeName;
        if (_json_.competitionReward === void 0) {
          throw new Error();
        }
        this.competitionReward = _json_.competitionReward;
      }
      resolve(_tables) {
      }
    }
    game2.LocalInfo = LocalInfo;
  })(game || (game = {}));
  ((game2) => {
    class TbConstant {
      constructor(_json_) {
        this._dataMap = /* @__PURE__ */ new Map();
        this._dataList = [];
        for (var _json2_ of _json_) {
          let _v;
          _v = new game2.Constant(_json2_);
          this._dataList.push(_v);
          this._dataMap.set(_v.constValue, _v);
        }
      }
      getDataMap() {
        return this._dataMap;
      }
      getDataList() {
        return this._dataList;
      }
      get(key) {
        return this._dataMap.get(key);
      }
      resolve(_tables) {
        for (var v of this._dataList) {
          v.resolve(_tables);
        }
      }
    }
    game2.TbConstant = TbConstant;
  })(game || (game = {}));
  ((game2) => {
    class Constant {
      constructor(_json_) {
        if (_json_.constValue === void 0) {
          throw new Error();
        }
        this.constValue = _json_.constValue;
        if (_json_.maxLevel === void 0) {
          throw new Error();
        }
        this.maxLevel = _json_.maxLevel;
      }
      resolve(_tables) {
      }
    }
    game2.Constant = Constant;
  })(game || (game = {}));
  var Tables = class {
    get TbLocalInfo() {
      return this._TbLocalInfo;
    }
    get TbConstant() {
      return this._TbConstant;
    }
    constructor(loader) {
      let tables = /* @__PURE__ */ new Map();
      this._TbLocalInfo = new game.TbLocalInfo(loader("game_tblocalinfo"));
      tables.set("game.TbLocalInfo", this._TbLocalInfo);
      this._TbConstant = new game.TbConstant(loader("game_tbconstant"));
      tables.set("game.TbConstant", this._TbConstant);
      this._TbLocalInfo.resolve(tables);
      this._TbConstant.resolve(tables);
    }
  };

  // src/frame/log/Log.ts
  var Log = class {
    static log(string) {
      if (FrameConfig.Debug)
        console.log(string);
    }
    static error(string) {
      if (FrameConfig.Debug)
        console.log("%c" + string, "color: red");
    }
    static info(string) {
      if (FrameConfig.Debug)
        console.log("%c" + string, "color: #29B6F6");
    }
    static warn(string) {
      if (FrameConfig.Debug)
        console.log("%c" + string, "color: yellow");
    }
    static debug(string) {
      if (FrameConfig.Debug)
        console.log("%c" + string, "color: #81FF00");
    }
  };

  // src/frame/loader/LoaderManager.ts
  var _LoaderManager = class _LoaderManager {
    static init(configList) {
      return __async(this, null, function* () {
        let url;
        for (let fileName of configList) {
          url = this.getConfigPath(fileName);
          yield this.load(url);
        }
        _LoaderManager.ConfigTable = new Tables(_LoaderManager.getConfigJson);
        Log.info("========config loading finish========");
        for (let fileName of configList) {
          url = this.getConfigPath(fileName);
          this.release(url);
        }
      });
    }
    /**
     * 加载资源
     * @param url 资源路径
     * @param isCache 是否压缩包的缓存资源
     * @returns 
     */
    static load(url) {
      return __async(this, null, function* () {
        let res = yield Laya.loader.load(url);
        res._addReference();
        return res;
      });
    }
    /**
     * 释放资源
     * @param url 
     * @returns 
     */
    static release(url) {
      if (!url)
        return;
      let res = Laya.loader.getRes(url);
      if (!res) {
        if (Laya.loader.loading) {
          Log.debug("\u6E05\u7406\u672A\u52A0\u8F7D\u8D44\u6E90:" + url);
          Laya.loader.cancelLoadByUrl(url);
        }
        Log.error("\u8D44\u6E90\u4E0D\u5B58\u5728:" + url);
        return;
      }
      this.removeReference(res);
    }
    /**
     * 释放图片资源(释放资源一般使用这个)
     * @param url 资源路径
     */
    static clearTextureRes(url) {
      if (!url)
        return;
      Laya.loader.clearTextureRes(url);
    }
    static removeReference(res) {
      res._removeReference();
      if (res.referenceCount <= 0) {
        if (res.url.indexOf("atlas") == -1) {
          res.destroy();
        }
        Log.debug("\u91CA\u653E\u8D44\u6E90" + res.url);
      }
    }
    static gc() {
      Laya.Resource.destroyUnusedResources();
    }
    static getConfigPath(name, suffix = ".json" /* json */) {
      return this.configBasePath + name + suffix;
    }
    static getConfigJson(name) {
      name = _LoaderManager.getConfigPath(name);
      return Laya.loader.getRes(name).data;
    }
  };
  _LoaderManager.configBasePath = "resources/config/";
  var LoaderManager = _LoaderManager;

  // src/frame/3d/Scene3DManager.ts
  var Scene3DManager = class extends Singleton {
    init() {
      this.sceneMap = /* @__PURE__ */ new Map();
      let scene = new Laya.Scene3D();
      scene.zOrder = 0 /* Scene3D */;
      scene.name = "Scene3D";
      FrameConfig.rootNode.addChild(scene);
      this.Scene3D = scene;
    }
    openScene3D(url, layer) {
      return __async(this, null, function* () {
        let prefab = yield LoaderManager.load(url);
        let sprite3D = prefab.create();
        this.sceneMap.set(url, sprite3D);
        LoaderManager.release(url);
        layer ? this.Scene3D.addChildAt(sprite3D, layer) : this.Scene3D.addChild(sprite3D);
        return sprite3D;
      });
    }
    closeScene3D(url) {
      if (!this.sceneMap.has(url)) {
        Log.debug("\u4E0D\u5B58\u57283d\u573A\u666F\uFF1A" + url);
        return;
      }
      let scene = this.sceneMap.get(url);
      scene.destroy();
      this.sceneMap.delete(url);
    }
  };

  // src/frame/loader/AssetsMgr.ts
  var AMConfig = {
    /**是否每次都强制清理 */
    forceClearCaChe: false,
    UseMainZip: false,
    //是否使用主包的压缩包
    UseSubPackge: false,
    //是否使用分包
    CacheVersion: "1.0.1",
    UnZipInfo: {
      ZipName: "Zip.zip",
      Version: "1.0",
      subPackgeRoot: "/zip/"
    },
    SubPackages: [
      {
        isZip: true,
        ZipName: "Zip1.zip",
        Version: "1.0",
        subPackgeRoot: "/zip1/",
        InitLoad: true,
        LoadingFinish: false
      }
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
  };
  var _AssetsMgr = class _AssetsMgr {
    constructor() {
      this.mFileMgr = null;
      this.mLoadFinish = 0;
      this.mLoadAssetsIndex = -1;
      this.mCacheBase = "";
      this.mIsClearCaChe = true;
      //回调
      this.caller = null;
      this.mBackFun = null;
      this.AssetsPath = {};
      //需要检查的资源目录，防止缓存被清理
      this.ExaminePath = {};
      this.mPlatform = FrameConfig.platform;
      if (!this.mPlatform)
        return;
      this.mFileMgr = this.mPlatform.getFileSystemManager();
      this.mCacheBase = FrameConfig.basePath;
      this.InitCaChe(this.mCacheBase);
    }
    static get Inst() {
      if (_AssetsMgr.inst == null) {
        _AssetsMgr.inst = new _AssetsMgr();
      }
      return _AssetsMgr.inst;
    }
    InitCaChe(path) {
      if (!this.mIsClearCaChe)
        return;
      try {
        this.mFileMgr.accessSync(path);
        console.log("\u5B58\u5728\u7F13\u5B58\u76EE\u5F55:", path);
        this.mIsClearCaChe = true;
      } catch (e) {
        console.log("\u4E0D\u5B58\u5728\u7F13\u5B58\u76EE\u5F55\uFF1A", path);
        this.mIsClearCaChe = false;
      }
      if (AMConfig.forceClearCaChe) {
        console.debug("\u5F3A\u5236\u6E05\u7406\u6587\u4EF6\u7F13\u5B58");
        this.mIsClearCaChe = false;
      } else if (Laya.LocalStorage.getItem("CaCheVersion") == AMConfig.CacheVersion && this.mIsClearCaChe) {
        console.log("\u7F13\u5B58\u7248\u672C\u4E00\u81F4\u4E14\u7F13\u5B58\u76EE\u5F55\u5B58\u5728\uFF0C\u4E0D\u505A\u7F13\u5B58\u6E05\u7406");
        return;
      } else {
        console.log("\u7F13\u5B58\u7248\u672C\u4E0D\u4E00\u81F4\u6216\u7F13\u5B58\u76EE\u5F55\u4E0D\u5B58\u5728\uFF0C\u6E05\u7406\u7F13\u5B58");
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
    Init(ExaminePath, ...param) {
      if (!this.mPlatform) {
        console.log("\u83B7\u53D6\u5E73\u53F0\u5931\u8D25\uFF01\u4F7F\u7528\u9ED8\u8BA4\u8DEF\u52B2\u3002");
        return;
      }
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
    CreateAssets(path, backfun, caller) {
      if (this.AssetsMap[path]) {
        if (backfun)
          caller ? backfun.apply(caller, [this.AssetsMap[path]]) : backfun(this.AssetsMap[path]);
        return;
      }
      Laya.loader.load(path, Laya.Handler.create(this, () => {
        this.AssetsMap[path] = Laya.loader.getRes(path);
        if (backfun)
          caller ? backfun.apply(caller, [this.AssetsMap[path]]) : backfun(this.AssetsMap[path]);
      }));
    }
    LoadAseets(backFun, caller) {
      if (!this.mPlatform) {
        if (backFun)
          caller ? backFun.apply(caller) : backFun();
        return;
      }
      if (FrameConfig.cdn) {
        console.log("\u8D70cdn");
        if (backFun)
          caller ? backFun.apply(caller) : backFun();
        return;
      }
      this.caller = caller;
      this.mBackFun = backFun;
      console.log("\u5206\u5305\u72B6\u6001\uFF1A", AMConfig.UseSubPackge);
      console.log("\u4E3B\u5305\u538B\u7F29\uFF1A", AMConfig.UseMainZip);
      AMConfig.UseMainZip ? this.LocalUnZip() : this.LoadingFnish(false);
    }
    LocalUnZip() {
      if (Laya.LocalStorage.getItem(AMConfig.UnZipInfo.subPackgeRoot + AMConfig.UnZipInfo.ZipName) == AMConfig.UnZipInfo.Version) {
        console.log("\u7248\u672C\u53F7\u76F8\u540C\uFF0C\u4E0D\u505A\u89E3\u538B");
        this.LoadingFnish(false);
        return;
      } else {
        console.log("\u7248\u672C\u53F7\u4E0D\u540C\uFF0C\u91CD\u89E3\u538B");
      }
      this.unZip(AMConfig.UnZipInfo, false);
    }
    LoadSubpackage(info, callBack = this.unZip, caller = this) {
      if (info.LoadingFinish) {
        callBack.call(caller, info);
        return;
      }
      if (Laya.LocalStorage.getItem(info.subPackgeRoot + info.ZipName) == info.Version) {
        console.log("\u5206\u5305\uFF1A", info.ZipName, "\u7248\u672C\u53F7\u76F8\u540C\uFF0C\u4E0D\u62C9\u53D6\u89E3\u538B\u8D44\u6E90");
        this.LoadingFnish(true);
        return;
      } else {
        console.log("\u7248\u672C\u53F7\u4E0D\u540C\uFF0C\u91CD\u62C9\u53D6\u5206\u5305\uFF1A", info.ZipName);
      }
      var s = this;
      this.mPlatform.loadSubpackage({
        name: info.subPackgeRoot,
        success: function(res) {
          console.log("\u5206\u5305\uFF1A", info.ZipName, "\u62C9\u53D6\u6210\u529F");
          s.recordSubLoadFinish(info);
          if (info.isZip) {
            s.unZip(info);
          } else {
            Laya.LocalStorage.setItem(info.subPackgeRoot + info.ZipName, info.Version);
            _AssetsMgr.Inst.LoadingFnish(true);
          }
        },
        fail: function(res) {
          console.error("\u5206\u5305\uFF1A", info.ZipName, "\u5206\u5305\u62C9\u53D6\u5931\u8D25\uFF1A" + res);
          s.LoadSubpackage(info);
        }
      });
    }
    recordSubLoadFinish(info) {
      for (let item of AMConfig.SubPackages) {
        if (item.ZipName != info.ZipName)
          continue;
        item.LoadingFinish = true;
        break;
      }
    }
    unZip(info, IsSub = true) {
      var needCreate;
      try {
        this.mFileMgr.accessSync(this.mCacheBase);
        console.log("\u89E3\u538B\u7F13\u5B58\u76EE\u5F55\u5B58\u5728");
        needCreate = false;
      } catch (e) {
        needCreate = true;
        console.log("\u89E3\u538B\u7F13\u5B58\u76EE\u5F55\u4E0D\u5B58\u5728\uFF0C\u5148\u521B\u5EFA");
      }
      if (needCreate) {
        try {
          this.mFileMgr.mkdirSync(this.mCacheBase, true);
          console.log("\u89E3\u538B\u7F13\u5B58\u76EE\u5F55\u521B\u5EFA\u6210\u529F");
        } catch (e) {
          console.error("\u538B\u7F13\u5B58\u76EE\u5F55\u521B\u5EFA\u5931\u8D25\uFF1A", e);
          return;
        }
      }
      var zipPath = info.subPackgeRoot + info.ZipName;
      try {
        this.mFileMgr.accessSync(zipPath);
        console.log("\u8BFB\u53D6\u538B\u7F29\u5305", info.ZipName, "\u6210\u529F");
      } catch (e) {
        console.error("\u538B\u7F29\u5305:", info.ZipName, "\u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u538B\u7F29\u5305\u8DEF\u52B2");
        return;
      }
      this.mFileMgr.unzip({
        zipFilePath: zipPath,
        targetPath: this.mCacheBase,
        success(res) {
          console.log("\u538B\u7F29\u5305\uFF1A", info.ZipName, "\u89E3\u538B\u6210\u529F");
          Laya.LocalStorage.setItem(info.subPackgeRoot + info.ZipName, info.Version);
          _AssetsMgr.Inst.LoadingFnish(IsSub);
        },
        fail(res) {
          console.error("\u538B\u7F29\u5305\uFF1A", info.ZipName, "\u89E3\u538B\u5931\u8D25");
          _AssetsMgr.Inst.unZip(info);
        }
      });
    }
    LoadingFnish(IsSub = true) {
      if (!AMConfig.UseSubPackge) {
        if (this.mBackFun)
          this.caller != null ? this.mBackFun.apply(this.caller) : this.mBackFun();
        return;
      }
      if (IsSub)
        this.mLoadFinish++;
      if (this.mLoadFinish < AMConfig.SubPackages.length) {
        let info = AMConfig.SubPackages[this.mLoadFinish];
        info.InitLoad ? this.LoadSubpackage(info) : this.LoadingFnish(true);
      } else {
        if (this.mBackFun)
          this.caller != null ? this.mBackFun.apply(this.caller) : this.mBackFun();
      }
    }
    /**传入路径，根据平台会的真实路径 */
    getPath(path) {
      return this.mCacheBase + path;
    }
  };
  _AssetsMgr.inst = null;
  var AssetsMgr = _AssetsMgr;

  // src/frame/tween/actions/action-manager.ts
  var Node = Laya.Node;
  var HashElement = class {
    constructor() {
      this.actions = [];
      this.target = null;
      // ccobject
      this.actionIndex = 0;
      this.currentAction = null;
      // CCAction
      this.paused = false;
      this.lock = false;
    }
  };
  var ActionManager = class {
    constructor() {
      this._hashTargets = /* @__PURE__ */ new Map();
      this._arrayTargets = [];
      this._elementPool = [];
    }
    _searchElementByTarget(arr, target) {
      for (let k = 0; k < arr.length; k++) {
        if (target === arr[k].target)
          return arr[k];
      }
      return null;
    }
    _getElement(target, paused) {
      let element = this._elementPool.pop();
      if (!element) {
        element = new HashElement();
      }
      element.target = target;
      element.paused = !!paused;
      return element;
    }
    _putElement(element) {
      element.actions.length = 0;
      element.actionIndex = 0;
      element.currentAction = null;
      element.paused = false;
      element.target = null;
      element.lock = false;
      this._elementPool.push(element);
    }
    /**
     * @en
     * Adds an action with a target.<br/>
     * If the target is already present, then the action will be added to the existing target.
     * If the target is not present, a new instance of this target will be created either paused or not,
     * and the action will be added to the newly created target.
     * When the target is paused, the queued actions won't be 'ticked'.
     * @zh
     * 增加一个动作，同时还需要提供动作的目标对象，目标对象是否暂停作为参数。<br/>
     * 如果目标已存在，动作将会被直接添加到现有的节点中。<br/>
     * 如果目标不存在，将为这一目标创建一个新的实例，并将动作添加进去。<br/>
     * 当目标状态的 paused 为 true，动作将不会被执行
     *
     * @method addAction
     * @param {Action} action
     * @param {object} target
     * @param {Boolean} paused
     */
    addAction(action, target, paused) {
      if (!action || !target) {
        return;
      }
      let element = this._hashTargets.get(target);
      if (!element) {
        element = this._getElement(target, paused);
        this._hashTargets.set(target, element);
        this._arrayTargets.push(element);
      } else if (!element.actions) {
        element.actions = [];
      }
      element.target = target;
      element.actions.push(action);
      action.startWithTarget(target);
    }
    /**
     * @en Removes all actions from all the targets.
     * @zh 移除所有对象的所有动作。
     * @method removeAllActions
     */
    removeAllActions() {
      const locTargets = this._arrayTargets;
      for (let i = 0; i < locTargets.length; i++) {
        const element = locTargets[i];
        if (element)
          this._putElement(element);
      }
      this._arrayTargets.length = 0;
      this._hashTargets = /* @__PURE__ */ new Map();
    }
    /**
     * @en
     * Removes all actions from a certain target. <br/>
     * All the actions that belongs to the target will be removed.
     * @zh
     * 移除指定对象上的所有动作。<br/>
     * 属于该目标的所有的动作将被删除。
     * @method removeAllActionsFromTarget
     * @param {Node} target
     */
    removeAllActionsFromTarget(target) {
      if (target == null)
        return;
      const element = this._hashTargets.get(target);
      if (element) {
        element.actions.length = 0;
        this._deleteHashElement(element);
      }
    }
    /**
     * @en Removes an action given an action reference.
     * @zh 移除指定的动作。
     * @method removeAction
     * @param {Action} action
     */
    removeAction(action) {
      if (action == null)
        return;
      const target = action.getOriginalTarget();
      const element = this._hashTargets.get(target);
      if (element) {
        for (let i = 0; i < element.actions.length; i++) {
          if (element.actions[i] === action) {
            element.actions.splice(i, 1);
            if (element.actionIndex >= i)
              element.actionIndex--;
            break;
          }
        }
      }
    }
    /**
     * @internal
     */
    _removeActionByTag(tag, element, target) {
      for (let i = 0, l = element.actions.length; i < l; ++i) {
        const action = element.actions[i];
        if (action && action.getTag() === tag) {
          if (target && action.getOriginalTarget() !== target) {
            continue;
          }
          this._removeActionAtIndex(i, element);
          break;
        }
      }
    }
    /**
     * @internal
     */
    _removeAllActionsByTag(tag, element, target) {
      for (let i = element.actions.length - 1; i >= 0; --i) {
        const action = element.actions[i];
        if (action && action.getTag() === tag) {
          if (target && action.getOriginalTarget() !== target) {
            continue;
          }
          this._removeActionAtIndex(i, element);
        }
      }
    }
    /**
     * @en Removes an action given its tag and the target.
     * @zh 删除指定对象下特定标签的一个动作，将删除首个匹配到的动作。
     * @method removeActionByTag
     * @param {Number} tag
     * @param {Node} target
     */
    removeActionByTag(tag, target) {
      const hashTargets = this._hashTargets;
      if (target) {
        const element = hashTargets.get(target);
        if (element) {
          this._removeActionByTag(tag, element, target);
        }
      } else {
        hashTargets.forEach((element) => {
          this._removeActionByTag(tag, element);
        });
      }
    }
    /**
     * @en Removes all actions given the tag and the target.
     * @zh 删除指定对象下特定标签的所有动作。
     * @method removeAllActionsByTag
     * @param {Number} tag
     * @param {Node} target
     */
    removeAllActionsByTag(tag, target) {
      const hashTargets = this._hashTargets;
      if (target) {
        const element = hashTargets.get(target);
        if (element) {
          this._removeAllActionsByTag(tag, element, target);
        }
      } else {
        hashTargets.forEach((element) => {
          this._removeAllActionsByTag(tag, element);
        });
      }
    }
    /**
     * @en Gets an action given its tag an a target.
     * @zh 通过目标对象和标签获取一个动作。
     * @method getActionByTag
     * @param {Number} tag
     * @param {Node} target
     * @return {Action|null}  return the Action with the given tag on success
     */
    getActionByTag(tag, target) {
      const element = this._hashTargets.get(target);
      if (element) {
        if (element.actions != null) {
          for (let i = 0; i < element.actions.length; ++i) {
            const action = element.actions[i];
            if (action && action.getTag() === tag) {
              return action;
            }
          }
        }
      }
      return null;
    }
    /**
     * @en
     * Returns the numbers of actions that are running in a certain target. <br/>
     * Composable actions are counted as 1 action. <br/>
     * Example: <br/>
     * - If you are running 1 Sequence of 7 actions, it will return 1. <br/>
     * - If you are running 7 Sequences of 2 actions, it will return 7.
     * @zh
     * 返回指定对象下所有正在运行的动作数量。 <br/>
     * 组合动作被算作一个动作。<br/>
     * 例如：<br/>
     *  - 如果您正在运行 7 个动作组成的序列动作（Sequence），这个函数将返回 1。<br/>
     *  - 如果你正在运行 2 个序列动作（Sequence）和 5 个普通动作，这个函数将返回 7。<br/>
     *
     * @method getNumberOfRunningActionsInTarget
     * @param {Node} target
     * @return {Number}
     */
    getNumberOfRunningActionsInTarget(target) {
      const element = this._hashTargets.get(target);
      if (element) {
        return element.actions ? element.actions.length : 0;
      }
      return 0;
    }
    /**
     * @en Pauses the target: all running actions and newly added actions will be paused.
     * @zh 暂停指定对象：所有正在运行的动作和新添加的动作都将会暂停。
     * @method pauseTarget
     * @param {Node} target
     */
    pauseTarget(target) {
      const element = this._hashTargets.get(target);
      if (element)
        element.paused = true;
    }
    /**
     * @en Resumes the target. All queued actions will be resumed.
     * @zh 让指定目标恢复运行。在执行序列中所有被暂停的动作将重新恢复运行。
     * @method resumeTarget
     * @param {Node} target
     */
    resumeTarget(target) {
      const element = this._hashTargets.get(target);
      if (element)
        element.paused = false;
    }
    /**
     * @en Pauses all running actions, returning a list of targets whose actions were paused.
     * @zh 暂停所有正在运行的动作，返回一个包含了那些动作被暂停了的目标对象的列表。
     * @method pauseAllRunningActions
     * @return {Array}  a list of targets whose actions were paused.
     */
    pauseAllRunningActions() {
      const idsWithActions = [];
      const locTargets = this._arrayTargets;
      for (let i = 0; i < locTargets.length; i++) {
        const element = locTargets[i];
        if (element && !element.paused) {
          element.paused = true;
          idsWithActions.push(element.target);
        }
      }
      return idsWithActions;
    }
    /**
     * @en Resume a set of targets (convenience function to reverse a pauseAllRunningActions or pauseTargets call).
     * @zh 让一组指定对象恢复运行（用来逆转 pauseAllRunningActions 效果的便捷函数）。
     * @method resumeTargets
     * @param {Array} targetsToResume
     */
    resumeTargets(targetsToResume) {
      if (!targetsToResume)
        return;
      for (let i = 0; i < targetsToResume.length; i++) {
        if (targetsToResume[i])
          this.resumeTarget(targetsToResume[i]);
      }
    }
    /**
     * @en Pause a set of targets.
     * @zh 暂停一组指定对象。
     * @method pauseTargets
     * @param {Array} targetsToPause
     */
    pauseTargets(targetsToPause) {
      if (!targetsToPause)
        return;
      for (let i = 0; i < targetsToPause.length; i++) {
        if (targetsToPause[i])
          this.pauseTarget(targetsToPause[i]);
      }
    }
    /**
     * @en
     * purges the shared action manager. It releases the retained instance. <br/>
     * because it uses this, so it can not be static.
     * @zh
     * 清除共用的动作管理器。它释放了持有的实例。 <br/>
     * 因为它使用 this，因此它不能是静态的。
     * @method purgeSharedManager
     */
    purgeSharedManager() {
    }
    // protected
    _removeActionAtIndex(index, element) {
      const action = element.actions[index];
      element.actions.splice(index, 1);
      if (element.actionIndex >= index)
        element.actionIndex--;
      if (element.actions.length === 0) {
        this._deleteHashElement(element);
      }
    }
    _deleteHashElement(element) {
      let ret = false;
      if (element && !element.lock) {
        if (this._hashTargets.get(element.target)) {
          this._hashTargets.delete(element.target);
          const targets = this._arrayTargets;
          for (let i = 0, l = targets.length; i < l; i++) {
            if (targets[i] === element) {
              targets.splice(i, 1);
              break;
            }
          }
          this._putElement(element);
          ret = true;
        }
      }
      return ret;
    }
    /**
     * @en The ActionManager update。
     * @zh ActionManager 主循环。
     * @method update
     * @param {Number} dt delta time in seconds
     */
    update(dt) {
      const locTargets = this._arrayTargets;
      let locCurrTarget;
      for (let elt = 0; elt < locTargets.length; elt++) {
        this._currentTarget = locTargets[elt];
        locCurrTarget = this._currentTarget;
        const target = locCurrTarget.target;
        if (target instanceof Node && target.destroyed) {
          this.removeAllActionsFromTarget(target);
          elt--;
          continue;
        }
        if (!locCurrTarget.paused && locCurrTarget.actions) {
          locCurrTarget.lock = true;
          for (locCurrTarget.actionIndex = 0; locCurrTarget.actionIndex < locCurrTarget.actions.length; locCurrTarget.actionIndex++) {
            locCurrTarget.currentAction = locCurrTarget.actions[locCurrTarget.actionIndex];
            if (!locCurrTarget.currentAction)
              continue;
            locCurrTarget.currentAction.step(dt * (locCurrTarget.currentAction._speedMethod ? locCurrTarget.currentAction._speed : 1));
            if (locCurrTarget.currentAction && locCurrTarget.currentAction.isDone()) {
              locCurrTarget.currentAction.stop();
              const action = locCurrTarget.currentAction;
              locCurrTarget.currentAction = null;
              this.removeAction(action);
            }
            locCurrTarget.currentAction = null;
          }
          locCurrTarget.lock = false;
        }
        if (locCurrTarget.actions.length === 0) {
          if (this._deleteHashElement(locCurrTarget)) {
            elt--;
          }
        }
      }
    }
  };

  // src/frame/tween/tween-system.ts
  var _TweenSystem = class _TweenSystem {
    constructor() {
      this.actionMgr = new ActionManager();
    }
    /**
     * @en
     * Gets the action manager.
     * @zh
     * 获取动作管理器。
     */
    get ActionManager() {
      return this.actionMgr;
    }
    /**
     * @en
     * The update will auto execute after all components update.
     * @zh
     * 此方法会在组件 update 之后自动执行。
     * @param dt @en The delta time @zh 间隔时间
     */
    update(dt) {
      this.actionMgr.update(dt);
    }
    static Init() {
      const sys = new _TweenSystem();
      _TweenSystem.instance = sys;
      Laya.timer.frameLoop(1, this, () => {
        _TweenSystem.instance.update(Laya.timer.delta);
      });
    }
  };
  /**
   * @en
   * The ID flag of the system.
   * @zh
   * 此系统的 ID 标记。
   */
  _TweenSystem.ID = "TWEEN";
  var TweenSystem = _TweenSystem;

  // src/frame/tween/actions/action.ts
  var _Action = class _Action {
    constructor() {
      this.originalTarget = null;
      this.target = null;
      this.tag = _Action.TAG_INVALID;
    }
    /**
     * @en
     * to copy object with deep copy.
     * returns a clone of action.
     * @zh 返回一个克隆的动作。
     * @method clone
     * @return {Action}
     */
    clone() {
      const action = new _Action();
      action.originalTarget = null;
      action.target = null;
      action.tag = this.tag;
      return action;
    }
    /**
     * @en
     * return true if the action has finished.
     * @zh 如果动作已完成就返回 true。
     * @method isDone
     * @return {Boolean}
     */
    isDone() {
      return true;
    }
    // called before the action start. It will also set the target.
    startWithTarget(target) {
      this.originalTarget = target;
      this.target = target;
    }
    // called after the action has finished. It will set the 'target' to nil.
    stop() {
      this.target = null;
    }
    // called every frame with it's delta time. <br />
    step(dt) {
    }
    // Called once per frame. Time is the number of seconds of a frame interval.
    update(dt) {
    }
    /**
     * @en get the target.
     * @zh 获取当前目标节点。
     * @method getTarget
     * @return {object}
     */
    getTarget() {
      return this.target;
    }
    /**
     * @en The action will modify the target properties.
     * @zh 设置目标节点。
     * @method setTarget
     * @param {object} target
     */
    setTarget(target) {
      this.target = target;
    }
    /**
     * @en get the original target.
     * @zh 获取原始目标节点。
     * @method getOriginalTarget
     * @return {object}
     */
    getOriginalTarget() {
      return this.originalTarget;
    }
    // Set the original target, since target can be nil.
    // Is the target that were used to run the action.
    // Unless you are doing something complex, like `ActionManager`, you should NOT call this method.
    setOriginalTarget(originalTarget) {
      this.originalTarget = originalTarget;
    }
    /**
     * @en get tag number.
     * @zh 获取用于识别动作的标签。
     * @method getTag
     * @return {Number}
     */
    getTag() {
      return this.tag;
    }
    /**
     * @en set tag number.
     * @zh 设置标签，用于识别动作。
     * @method setTag
     * @param {Number} tag
     */
    setTag(tag) {
      this.tag = tag;
    }
    /**
     * @en
     * Returns a reversed action. <br />
     * For example: <br />
     * - The action will be x coordinates of 0 move to 100. <br />
     * - The reversed action will be x of 100 move to 0.
     * - Will be rewritten
     * @zh 返回一个新的动作，执行与原动作完全相反的动作。
     * @method reverse
     * @return {Action | null}
     */
    reverse() {
      return null;
    }
    // Currently JavaScript Bindigns (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
    // and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
    // This is a hack, and should be removed once JSB fixes the retain/release bug.
    retain() {
    }
    // Currently JavaScript Bindigns (JSB), in some cases, needs to use retain and release. This is a bug in JSB,
    // and the ugly workaround is to use retain/release. So, these 2 methods were added to be compatible with JSB.
    // This is a hack, and should be removed once JSB fixes the retain/release bug.
    release() {
    }
  };
  /**
   * @en Default Action tag.
   * @zh 默认动作标签。
   * @constant
   * @static
   * @default -1
   */
  _Action.TAG_INVALID = -1;
  var Action = _Action;
  var FiniteTimeAction = class _FiniteTimeAction extends Action {
    constructor() {
      super(...arguments);
      this._duration = 0;
      this._timesForRepeat = 1;
    }
    /**
     * @en get duration of the action. (seconds).
     * @zh 获取动作以秒为单位的持续时间。
     * @method getDuration
     * @return {Number}
     */
    getDuration() {
      return this._duration * (this._timesForRepeat || 1);
    }
    /**
     * @en set duration of the action. (seconds).
     * @zh 设置动作以秒为单位的持续时间。
     * @method setDuration
     * @param {Number} duration
     */
    setDuration(duration) {
      this._duration = duration;
    }
    /**
     * @en
     * to copy object with deep copy.
     * returns a clone of action.
     * @zh 返回一个克隆的动作。
     * @method clone
     * @return {FiniteTimeAction}
     */
    clone() {
      return new _FiniteTimeAction();
    }
  };

  // src/frame/tween/actions/action-instant.ts
  var ActionInstant = class _ActionInstant extends FiniteTimeAction {
    isDone() {
      return true;
    }
    step(dt) {
      this.update(1);
    }
    update(dt) {
    }
    /**
     * returns a reversed action. <br />
     * For example: <br />
     * - The action is x coordinates of 0 move to 100. <br />
     * - The reversed action will be x of 100 move to 0.
     * @returns {Action}
     */
    reverse() {
      return this.clone();
    }
    clone() {
      return new _ActionInstant();
    }
  };
  var Show = class _Show extends ActionInstant {
    update(dt) {
    }
    reverse() {
      return new Hide();
    }
    clone() {
      return new _Show();
    }
  };
  function show() {
    return new Show();
  }
  var Hide = class _Hide extends ActionInstant {
    update(dt) {
    }
    reverse() {
      return new Show();
    }
    clone() {
      return new _Hide();
    }
  };
  function hide() {
    return new Hide();
  }
  var RemoveSelf = class _RemoveSelf extends ActionInstant {
    constructor(isNeedCleanUp) {
      super();
      this._isNeedCleanUp = true;
      isNeedCleanUp !== void 0 && this.init(isNeedCleanUp);
    }
    update(dt) {
      this.target.removeSelf();
      if (this._isNeedCleanUp) {
        this.target.destroy();
      }
    }
    init(isNeedCleanUp) {
      this._isNeedCleanUp = isNeedCleanUp;
      return true;
    }
    reverse() {
      return new _RemoveSelf(this._isNeedCleanUp);
    }
    clone() {
      return new _RemoveSelf(this._isNeedCleanUp);
    }
  };
  function removeSelf(isNeedCleanUp) {
    return new RemoveSelf(isNeedCleanUp);
  }
  var CallFunc = class _CallFunc extends ActionInstant {
    /*
     * Constructor function, override it to extend the construction behavior, remember to call "this._super()" in the extended "ctor" function. <br />
     * Creates a CallFunc action with the callback.
     * @param {function} selector
     * @param {object} [selectorTarget=null]
     * @param {*} [data=null] data for function, it accepts all data types.
     */
    constructor(selector, selectorTarget, data) {
      super();
      this._selectorTarget = null;
      this._function = null;
      this._data = null;
      this.initWithFunction(selector, selectorTarget, data);
    }
    /*
     * Initializes the action with a function or function and its target
     * @param {function} selector
     * @param {object|Null} selectorTarget
     * @param {*|Null} [data] data for function, it accepts all data types.
     * @return {Boolean}
     */
    initWithFunction(selector, selectorTarget, data) {
      if (selector) {
        this._function = selector;
      }
      if (selectorTarget) {
        this._selectorTarget = selectorTarget;
      }
      if (data !== void 0) {
        this._data = data;
      }
      return true;
    }
    /*
     * execute the function.
     */
    execute() {
      if (this._function) {
        this._function.call(this._selectorTarget, this.target, this._data);
      }
    }
    update(dt) {
      this.execute();
    }
    /*
     * Get selectorTarget.
     * @return {object}
     */
    getTargetCallback() {
      return this._selectorTarget;
    }
    /*
     * Set selectorTarget.
     * @param {object} sel
     */
    setTargetCallback(sel) {
      if (sel !== this._selectorTarget) {
        if (this._selectorTarget) {
          this._selectorTarget = null;
        }
        this._selectorTarget = sel;
      }
    }
    clone() {
      const action = new _CallFunc();
      action.initWithFunction(this._function, this._selectorTarget, this._data);
      return action;
    }
  };
  function callFunc(selector, selectorTarget, data) {
    return new CallFunc(selector, selectorTarget, data);
  }

  // src/frame/tween/actions/action-interval.ts
  var ActionInterval = class _ActionInterval extends FiniteTimeAction {
    // Compatible with repeat class, Discard after can be deleted
    constructor(d) {
      super();
      this.MAX_VALUE = 2;
      this._elapsed = 0;
      this._firstTick = false;
      this._easeList = [];
      this._speed = 1;
      this._repeatForever = false;
      this._repeatMethod = false;
      // Compatible with repeat class, Discard after can be deleted
      this._speedMethod = false;
      if (d !== void 0 && !isNaN(d)) {
        this.initWithDuration(d);
      }
    }
    /*
     * How many seconds had elapsed since the actions started to run.
     * @return {Number}
     */
    getElapsed() {
      return this._elapsed;
    }
    /*
     * Initializes the action.
     * @param {Number} d duration in seconds
     * @return {Boolean}
     */
    initWithDuration(d) {
      this._duration = d === 0 ? 0.1 : d;
      this._elapsed = 0;
      this._firstTick = true;
      return true;
    }
    isDone() {
      return this._elapsed >= this._duration;
    }
    _cloneDecoration(action) {
      action._repeatForever = this._repeatForever;
      action._speed = this._speed;
      action._timesForRepeat = this._timesForRepeat;
      action._easeList = this._easeList;
      action._speedMethod = this._speedMethod;
      action._repeatMethod = this._repeatMethod;
    }
    _reverseEaseList(action) {
      if (this._easeList) {
        action._easeList = [];
        for (let i = 0; i < this._easeList.length; i++) {
          action._easeList.push(this._easeList[i]);
        }
      }
    }
    clone() {
      const action = new _ActionInterval(this._duration);
      this._cloneDecoration(action);
      return action;
    }
    /**
     * @en Implementation of ease motion.
     * @zh 缓动运动。
     * @method easing
     * @param {Object} easeObj
     * @returns {ActionInterval}
     * @example
     * import { easeIn } from 'cc';
     * action.easing(easeIn(3.0));
     */
    easing(easeObj) {
      if (this._easeList)
        this._easeList.length = 0;
      else
        this._easeList = [];
      for (let i = 0; i < arguments.length; i++)
        this._easeList.push(arguments[i]);
      return this;
    }
    _computeEaseTime(dt) {
      return dt;
    }
    step(dt) {
      if (this._firstTick) {
        this._firstTick = false;
        this._elapsed = 0;
      } else
        this._elapsed += dt;
      let t = this._elapsed / (this._duration > 1192092896e-16 ? this._duration : 1192092896e-16);
      t = t < 1 ? t : 1;
      this.update(t > 0 ? t : 0);
      if (this._repeatMethod && this._timesForRepeat > 1 && this.isDone()) {
        if (!this._repeatForever) {
          this._timesForRepeat--;
        }
        this.startWithTarget(this.target);
        this.step(this._elapsed - this._duration);
      }
    }
    startWithTarget(target) {
      Action.prototype.startWithTarget.call(this, target);
      this._elapsed = 0;
      this._firstTick = true;
    }
    reverse() {
      return this;
    }
    /*
     * Set amplitude rate.
     * @warning It should be overridden in subclass.
     * @param {Number} amp
     */
    setAmplitudeRate(amp) {
    }
    /*
     * Get amplitude rate.
     * @warning It should be overridden in subclass.
     * @return {Number} 0
     */
    getAmplitudeRate() {
      return 0;
    }
    /**
     * @en
     * Changes the speed of an action, making it take longer (speed>1)
     * or less (speed<1) time. <br/>
     * Useful to simulate 'slow motion' or 'fast forward' effect.
     * @zh
     * 改变一个动作的速度，使它的执行使用更长的时间（speed > 1）<br/>
     * 或更少（speed < 1）可以有效得模拟“慢动作”或“快进”的效果。
     * @param {Number} speed
     * @returns {Action}
     */
    speed(speed) {
      if (speed <= 0) {
        return this;
      }
      this._speedMethod = true;
      this._speed *= speed;
      return this;
    }
    /**
     * @en
     * Get this action speed.
     * @zh
     * 返回此动作速度
     * @return {Number}
     */
    getSpeed() {
      return this._speed;
    }
    /**
     * @en
     * Set this action speed.
     * @zh
     * 设置此动作速度
     * @param {Number} speed
     * @returns {ActionInterval}
     */
    setSpeed(speed) {
      this._speed = speed;
      return this;
    }
    /**
     * @en
     * Repeats an action a number of times.
     * To repeat an action forever use the CCRepeatForever action.
     * @zh 重复动作可以按一定次数重复一个动作，使用 RepeatForever 动作来永远重复一个动作。
     * @method repeat
     * @param {Number} times
     * @returns {ActionInterval}
     */
    repeat(times) {
      times = Math.round(times);
      if (isNaN(times) || times < 1) {
        return this;
      }
      this._repeatMethod = true;
      this._timesForRepeat *= times;
      return this;
    }
    /**
     * @en
     * Repeats an action for ever.  <br/>
     * To repeat the an action for a limited number of times use the Repeat action. <br/>
     * @zh 永远地重复一个动作，有限次数内重复一个动作请使用 Repeat 动作。
     * @method repeatForever
     * @returns {ActionInterval}
     */
    repeatForever() {
      this._repeatMethod = true;
      this._timesForRepeat = this.MAX_VALUE;
      this._repeatForever = true;
      return this;
    }
  };
  var _Sequence = class _Sequence extends ActionInterval {
    constructor(tempArray) {
      super();
      this._actions = [];
      this._split = 0;
      this._last = 0;
      this._reversed = false;
      const paramArray = tempArray instanceof Array ? tempArray : arguments;
      if (paramArray.length === 1) {
        return;
      }
      const last = paramArray.length - 1;
      if (last >= 0 && paramArray[last] == null) {
        if (last >= 0) {
          let prev = paramArray[0];
          let action1;
          for (let i = 1; i < last; i++) {
            if (paramArray[i]) {
              action1 = prev;
              prev = _Sequence._actionOneTwo(action1, paramArray[i]);
            }
          }
          this.initWithTwoActions(prev, paramArray[last]);
        }
      }
    }
    /*
     * Initializes the action <br/>
     * @param {FiniteTimeAction} actionOne
     * @param {FiniteTimeAction} actionTwo
     * @return {Boolean}
     */
    initWithTwoActions(actionOne, actionTwo) {
      if (!actionOne || !actionTwo) {
        return false;
      }
      let durationOne = actionOne._duration;
      let durationTwo = actionTwo._duration;
      durationOne *= actionOne._repeatMethod ? actionOne._timesForRepeat : 1;
      durationTwo *= actionTwo._repeatMethod ? actionTwo._timesForRepeat : 1;
      const d = durationOne + durationTwo;
      this.initWithDuration(d);
      this._actions[0] = actionOne;
      this._actions[1] = actionTwo;
      return true;
    }
    clone() {
      const action = new _Sequence();
      this._cloneDecoration(action);
      action.initWithTwoActions(this._actions[0].clone(), this._actions[1].clone());
      return action;
    }
    startWithTarget(target) {
      ActionInterval.prototype.startWithTarget.call(this, target);
      this._split = this._actions[0]._duration / this._duration;
      this._split *= this._actions[0]._repeatMethod ? this._actions[0]._timesForRepeat : 1;
      this._last = -1;
    }
    stop() {
      if (this._last !== -1)
        this._actions[this._last].stop();
      Action.prototype.stop.call(this);
    }
    update(dt) {
      let new_t;
      let found = 0;
      const locSplit = this._split;
      const locActions = this._actions;
      const locLast = this._last;
      let actionFound;
      dt = this._computeEaseTime(dt);
      if (dt < locSplit) {
        new_t = locSplit !== 0 ? dt / locSplit : 1;
        if (found === 0 && locLast === 1 && this._reversed) {
          locActions[1].update(0);
          locActions[1].stop();
        }
      } else {
        found = 1;
        new_t = locSplit === 1 ? 1 : (dt - locSplit) / (1 - locSplit);
        if (locLast === -1) {
          locActions[0].startWithTarget(this.target);
          locActions[0].update(1);
          locActions[0].stop();
        }
        if (locLast === 0) {
          locActions[0].update(1);
          locActions[0].stop();
        }
      }
      actionFound = locActions[found];
      if (locLast === found && actionFound.isDone())
        return;
      if (locLast !== found)
        actionFound.startWithTarget(this.target);
      new_t *= actionFound._timesForRepeat;
      actionFound.update(new_t > 1 ? new_t % 1 : new_t);
      this._last = found;
    }
    reverse() {
      const action = _Sequence._actionOneTwo(this._actions[1].reverse(), this._actions[0].reverse());
      this._cloneDecoration(action);
      this._reverseEaseList(action);
      action._reversed = true;
      return action;
    }
  };
  _Sequence._actionOneTwo = function(actionOne, actionTwo) {
    const sequence2 = new _Sequence();
    sequence2.initWithTwoActions(actionOne, actionTwo);
    return sequence2;
  };
  var Sequence = _Sequence;
  function sequence(tempArray) {
    const paramArray = tempArray instanceof Array ? tempArray : arguments;
    if (paramArray.length === 1) {
      return null;
    }
    const last = paramArray.length - 1;
    if (last >= 0 && paramArray[last] == null)
      var result = null;
    if (last >= 0) {
      result = paramArray[0];
      for (let i = 1; i <= last; i++) {
        if (paramArray[i]) {
          result = Sequence._actionOneTwo(result, paramArray[i]);
        }
      }
    }
    return result;
  }
  var Repeat = class _Repeat extends ActionInterval {
    constructor(action, times) {
      super();
      this._times = 0;
      this._total = 0;
      this._nextDt = 0;
      this._actionInstant = false;
      this._innerAction = null;
      times !== void 0 && this.initWithAction(action, times);
    }
    /*
     * @param {FiniteTimeAction} action
     * @param {Number} times
     * @return {Boolean}
     */
    initWithAction(action, times) {
      const duration = action._duration * times;
      if (this.initWithDuration(duration)) {
        this._times = times;
        this._innerAction = action;
        if (action instanceof ActionInstant) {
          this._actionInstant = true;
          this._times -= 1;
        }
        this._total = 0;
        return true;
      }
      return false;
    }
    clone() {
      const action = new _Repeat();
      this._cloneDecoration(action);
      action.initWithAction(this._innerAction.clone(), this._times);
      return action;
    }
    startWithTarget(target) {
      this._total = 0;
      this._nextDt = this._innerAction._duration / this._duration;
      ActionInterval.prototype.startWithTarget.call(this, target);
      this._innerAction.startWithTarget(target);
    }
    stop() {
      this._innerAction.stop();
      Action.prototype.stop.call(this);
    }
    update(dt) {
      dt = this._computeEaseTime(dt);
      const locInnerAction = this._innerAction;
      const locDuration = this._duration;
      const locTimes = this._times;
      let locNextDt = this._nextDt;
      if (dt >= locNextDt) {
        while (dt > locNextDt && this._total < locTimes) {
          locInnerAction.update(1);
          this._total++;
          locInnerAction.stop();
          locInnerAction.startWithTarget(this.target);
          locNextDt += locInnerAction._duration / locDuration;
          this._nextDt = locNextDt > 1 ? 1 : locNextDt;
        }
        if (dt >= 1 && this._total < locTimes) {
          locInnerAction.update(1);
          this._total++;
        }
        if (!this._actionInstant) {
          if (this._total === locTimes) {
            locInnerAction.stop();
          } else {
            locInnerAction.update(dt - (locNextDt - locInnerAction._duration / locDuration));
          }
        }
      } else {
        locInnerAction.update(dt * locTimes % 1);
      }
    }
    isDone() {
      return this._total === this._times;
    }
    reverse() {
      const action = new _Repeat(this._innerAction.reverse(), this._times);
      this._cloneDecoration(action);
      this._reverseEaseList(action);
      return action;
    }
    /*
     * Set inner Action.
     * @param {FiniteTimeAction} action
     */
    setInnerAction(action) {
      if (this._innerAction !== action) {
        this._innerAction = action;
      }
    }
    /*
     * Get inner Action.
     * @return {FiniteTimeAction}
     */
    getInnerAction() {
      return this._innerAction;
    }
  };
  function repeat(action, times) {
    return new Repeat(action, times);
  }
  var RepeatForever = class _RepeatForever extends ActionInterval {
    constructor(action) {
      super();
      this._innerAction = null;
      action && this.initWithAction(action);
    }
    /*
     * @param {ActionInterval} action
     * @return {Boolean}
     */
    initWithAction(action) {
      if (!action) {
        return false;
      }
      this._innerAction = action;
      return true;
    }
    clone() {
      const action = new _RepeatForever();
      this._cloneDecoration(action);
      action.initWithAction(this._innerAction.clone());
      return action;
    }
    startWithTarget(target) {
      ActionInterval.prototype.startWithTarget.call(this, target);
      this._innerAction.startWithTarget(target);
    }
    step(dt) {
      const locInnerAction = this._innerAction;
      locInnerAction.step(dt);
      if (locInnerAction.isDone()) {
        locInnerAction.startWithTarget(this.target);
        locInnerAction.step(locInnerAction.getElapsed() - locInnerAction._duration);
      }
    }
    isDone() {
      return false;
    }
    reverse() {
      const action = new _RepeatForever(this._innerAction.reverse());
      this._cloneDecoration(action);
      this._reverseEaseList(action);
      return action;
    }
    /*
     * Set inner action.
     * @param {ActionInterval} action
     */
    setInnerAction(action) {
      if (this._innerAction !== action) {
        this._innerAction = action;
      }
    }
    /*
     * Get inner action.
     * @return {ActionInterval}
     */
    getInnerAction() {
      return this._innerAction;
    }
  };
  function repeatForever(action) {
    return new RepeatForever(action);
  }
  var _Spawn = class _Spawn extends ActionInterval {
    constructor(tempArray) {
      super();
      this._one = null;
      this._two = null;
      const paramArray = tempArray instanceof Array ? tempArray : arguments;
      if (paramArray.length === 1) {
        return;
      }
      const last = paramArray.length - 1;
      if (last >= 0 && paramArray[last] == null) {
        if (last >= 0) {
          let prev = paramArray[0];
          let action1;
          for (let i = 1; i < last; i++) {
            if (paramArray[i]) {
              action1 = prev;
              prev = _Spawn._actionOneTwo(action1, paramArray[i]);
            }
          }
          this.initWithTwoActions(prev, paramArray[last]);
        }
      }
    }
    /* initializes the Spawn action with the 2 actions to spawn
     * @param {FiniteTimeAction} action1
     * @param {FiniteTimeAction} action2
     * @return {Boolean}
     */
    initWithTwoActions(action1, action2) {
      if (!action1 || !action2) {
        return false;
      }
      let ret = false;
      const d1 = action1._duration;
      const d2 = action2._duration;
      if (this.initWithDuration(Math.max(d1, d2))) {
        this._one = action1;
        this._two = action2;
        if (d1 > d2) {
          this._two = Sequence._actionOneTwo(action2, delayTime(d1 - d2));
        } else if (d1 < d2) {
          this._one = Sequence._actionOneTwo(action1, delayTime(d2 - d1));
        }
        ret = true;
      }
      return ret;
    }
    clone() {
      const action = new _Spawn();
      this._cloneDecoration(action);
      action.initWithTwoActions(this._one.clone(), this._two.clone());
      return action;
    }
    startWithTarget(target) {
      ActionInterval.prototype.startWithTarget.call(this, target);
      this._one.startWithTarget(target);
      this._two.startWithTarget(target);
    }
    stop() {
      this._one.stop();
      this._two.stop();
      Action.prototype.stop.call(this);
    }
    update(dt) {
      dt = this._computeEaseTime(dt);
      if (this._one)
        this._one.update(dt);
      if (this._two)
        this._two.update(dt);
    }
    reverse() {
      const action = _Spawn._actionOneTwo(this._one.reverse(), this._two.reverse());
      this._cloneDecoration(action);
      this._reverseEaseList(action);
      return action;
    }
  };
  _Spawn._actionOneTwo = function(action1, action2) {
    const pSpawn = new _Spawn();
    pSpawn.initWithTwoActions(action1, action2);
    return pSpawn;
  };
  var Spawn = _Spawn;
  function spawn(tempArray) {
    const paramArray = tempArray instanceof Array ? tempArray : arguments;
    if (paramArray.length === 1) {
      return null;
    }
    if (paramArray.length > 0 && paramArray[paramArray.length - 1] == null)
      var prev = paramArray[0];
    for (let i = 1; i < paramArray.length; i++) {
      if (paramArray[i] != null)
        prev = Spawn._actionOneTwo(prev, paramArray[i]);
    }
    return prev;
  }
  var DelayTime = class _DelayTime extends ActionInterval {
    update(dt) {
    }
    reverse() {
      const action = new _DelayTime(this._duration);
      this._cloneDecoration(action);
      this._reverseEaseList(action);
      return action;
    }
    clone() {
      const action = new _DelayTime();
      this._cloneDecoration(action);
      action.initWithDuration(this._duration);
      return action;
    }
  };
  function delayTime(d) {
    return new DelayTime(d);
  }
  var ReverseTime = class _ReverseTime extends ActionInterval {
    constructor(action) {
      super();
      this._other = null;
      action && this.initWithAction(action);
    }
    /*
     * @param {FiniteTimeAction} action
     * @return {Boolean}
     */
    initWithAction(action) {
      if (!action) {
        return false;
      }
      if (action === this._other) {
        return false;
      }
      if (ActionInterval.prototype.initWithDuration.call(this, action._duration)) {
        this._other = action;
        return true;
      }
      return false;
    }
    clone() {
      const action = new _ReverseTime();
      this._cloneDecoration(action);
      action.initWithAction(this._other.clone());
      return action;
    }
    startWithTarget(target) {
      ActionInterval.prototype.startWithTarget.call(this, target);
      this._other.startWithTarget(target);
    }
    update(dt) {
      dt = this._computeEaseTime(dt);
      if (this._other)
        this._other.update(1 - dt);
    }
    reverse() {
      return this._other.clone();
    }
    stop() {
      this._other.stop();
      Action.prototype.stop.call(this);
    }
  };
  function reverseTime(action) {
    return new ReverseTime(action);
  }

  // src/frame/tween/tween-action.ts
  function TweenEasingAdapter(easingName) {
    const initialChar = easingName.charAt(0);
    if (/[A-Z]/.test(initialChar)) {
      easingName = easingName.replace(initialChar, initialChar.toLowerCase());
      const arr = easingName.split("-");
      if (arr.length === 2) {
        const str0 = arr[0];
        if (str0 === "linear") {
          easingName = "linear";
        } else {
          const str1 = arr[1];
          switch (str0) {
            case "quadratic":
              easingName = `quad${str1}`;
              break;
            case "quartic":
              easingName = `quart${str1}`;
              break;
            case "quintic":
              easingName = `quint${str1}`;
              break;
            case "sinusoidal":
              easingName = `sine${str1}`;
              break;
            case "exponential":
              easingName = `expo${str1}`;
              break;
            case "circular":
              easingName = `circ${str1}`;
              break;
            default:
              easingName = str0 + str1;
              break;
          }
        }
      }
    }
    return easingName;
  }
  function TweenOptionChecker(opts) {
    const header = " [Tween:] ";
    const message = ` option is not support in v`;
    const _opts = opts;
    if (_opts.delay) {
      console.log(`${header}delay${message}`);
    }
    if (_opts.repeat) {
      console.log(`${header}repeat${message}`);
    }
    if (_opts.repeatDelay) {
      console.log(`${header}repeatDelay${message}`);
    }
    if (_opts.interpolation) {
      console.log(`${header}interpolation${message}`);
    }
    if (_opts.onStop) {
      console.log(`${header}onStop${message}`);
    }
  }
  var TweenAction = class _TweenAction extends ActionInterval {
    constructor(duration, props, opts) {
      super();
      if (opts == null) {
        opts = /* @__PURE__ */ Object.create(null);
      } else {
        TweenOptionChecker(opts);
        if (opts.easing && typeof opts.easing === "string") {
          opts.easing = TweenEasingAdapter(opts.easing);
        }
        if (!opts.progress) {
          opts.progress = this.progress;
        }
        if (opts.easing && typeof opts.easing === "string") {
          const easingName = opts.easing;
        }
      }
      this._opts = opts;
      this._props = /* @__PURE__ */ Object.create(null);
      for (const name in props) {
        if (!props.hasOwnProperty(name))
          continue;
        let value = props[name];
        if (typeof value === "function") {
          value = value();
        }
        if (value == null || typeof value === "string")
          continue;
        let customEasing;
        let progress;
        if (value.value !== void 0 && (value.easing || value.progress)) {
          if (typeof value.easing === "string") {
          } else {
            customEasing = value.easing;
          }
          progress = value.progress;
          value = value.value;
        }
        const prop = /* @__PURE__ */ Object.create(null);
        prop.value = value;
        prop.easing = customEasing;
        prop.progress = progress;
        this._props[name] = prop;
      }
      this._originProps = props;
      this.initWithDuration(duration);
    }
    clone() {
      const action = new _TweenAction(this._duration, this._originProps, this._opts);
      this._cloneDecoration(action);
      return action;
    }
    startWithTarget(target) {
      ActionInterval.prototype.startWithTarget.call(this, target);
      const relative = !!this._opts.relative;
      const props = this._props;
      for (const property9 in props) {
        const _t = target[property9];
        if (_t === void 0) {
          continue;
        }
        const prop = props[property9];
        const value = prop.value;
        if (typeof _t === "number") {
          prop.start = _t;
          prop.current = _t;
          prop.end = relative ? _t + value : value;
        } else if (typeof _t === "object") {
          if (prop.start == null) {
            prop.start = {};
            prop.current = {};
            prop.end = {};
          }
          for (const k in value) {
            if (isNaN(_t[k]))
              continue;
            prop.start[k] = _t[k];
            prop.current[k] = _t[k];
            prop.end[k] = relative ? _t[k] + value[k] : value[k];
          }
        }
      }
      if (this._opts.onStart) {
        this._opts.onStart(this.target);
      }
    }
    update(t) {
      const target = this.target;
      if (!target)
        return;
      const props = this._props;
      const opts = this._opts;
      let easingTime = t;
      if (opts.easing)
        easingTime = opts.easing(t);
      const progress = opts.progress;
      for (const name in props) {
        const prop = props[name];
        const time = prop.easing ? prop.easing(t) : easingTime;
        const interpolation = prop.progress ? prop.progress : progress;
        const start = prop.start;
        const end = prop.end;
        if (typeof start === "number") {
          prop.current = interpolation(start, end, prop.current, time);
        } else if (typeof start === "object") {
          for (const k in start) {
            prop.current[k] = interpolation(start[k], end[k], prop.current[k], time);
          }
        }
        target[name] = prop.current;
      }
      if (opts.onUpdate) {
        opts.onUpdate(this.target, t);
      }
      if (t === 1 && opts.onComplete) {
        opts.onComplete(this.target);
      }
    }
    progress(start, end, current, t) {
      return current = start + (end - start) * t;
    }
  };

  // src/frame/tween/set-action.ts
  var SetAction = class _SetAction extends ActionInstant {
    constructor(props) {
      super();
      this._props = {};
      props !== void 0 && this.init(props);
    }
    init(props) {
      for (const name in props) {
        this._props[name] = props[name];
      }
      return true;
    }
    update() {
      const props = this._props;
      const target = this.target;
      for (const name in props) {
        target[name] = props[name];
      }
    }
    clone() {
      const action = new _SetAction();
      action.init(this._props);
      return action;
    }
  };

  // src/frame/tween/tween.ts
  var _Tween = class _Tween {
    constructor(target) {
      this._actions = [];
      this._finalAction = null;
      this._target = null;
      this._tag = Action.TAG_INVALID;
      this._target = target === void 0 ? null : target;
    }
    /**
     * @en Sets tween tag
     * @zh 设置缓动的标签
     * @method tag
     * @param tag @en The tag set for this tween @zh 为当前缓动设置的标签
     */
    tag(tag) {
      this._tag = tag;
      return this;
    }
    /**
     * @en
     * Insert an action or tween to this sequence.
     * @zh
     * 插入一个 tween 到队列中。
     * @method then
     * @param other @en The rear tween of this tween @zh 当前缓动的后置缓动
     */
    then(other) {
      if (other instanceof Action) {
        this._actions.push(other.clone());
      } else {
        this._actions.push(other._union());
      }
      return this;
    }
    /**
     * @en
     * Sets tween target.
     * @zh
     * 设置 tween 的 target。
     * @method target
     * @param target @en The target of this tween @zh 当前缓动的目标对象
     */
    target(target) {
      this._target = target;
      return this;
    }
    /**
     * @en
     * Start this tween.
     * @zh
     * 运行当前 tween。
     */
    start() {
      if (!this._target) {
        console.log("Please set target to tween first");
        return this;
      }
      if (this._finalAction) {
        TweenSystem.instance.ActionManager.removeAction(this._finalAction);
      }
      this._finalAction = this._union();
      this._finalAction.setTag(this._tag);
      TweenSystem.instance.ActionManager.addAction(this._finalAction, this._target, false);
      return this;
    }
    /**
     * @en
     * Stop this tween.
     * @zh
     * 停止当前 tween。
     */
    stop() {
      if (this._finalAction) {
        TweenSystem.instance.ActionManager.removeAction(this._finalAction);
      }
      return this;
    }
    /**
     * @en
     * Clone a tween.
     * @zh
     * 克隆当前 tween。
     * @method clone
     * @param target @en The target of clone tween @zh 克隆缓动的目标对象
     */
    clone(target) {
      const action = this._union();
      return tween(target).then(action.clone());
    }
    /**
     * @en
     * Integrate all previous actions to an action.
     * @zh
     * 将之前所有的 action 整合为一个 action。
     */
    union() {
      const action = this._union();
      this._actions.length = 0;
      this._actions.push(action);
      return this;
    }
    /**
     * @en
     * Add an action which calculate with absolute value.
     * @zh
     * 添加一个对属性进行绝对值计算的 action。
     * @method to
     * @param duration @en Tween time, in seconds @zh 缓动时间，单位为秒
     * @param props @en List of properties of tween @zh 缓动的属性列表
     * @param opts @en Optional functions of tween @zh 可选的缓动功能
     * @param opts.progress @en Interpolation function @zh 缓动的速度插值函数
     * @param opts.easing @en Tween function or a lambda @zh 缓动的曲线函数或lambda表达式
     */
    to(duration, props, opts) {
      opts = opts || /* @__PURE__ */ Object.create(null);
      opts.relative = false;
      const action = new TweenAction(duration, props, opts);
      this._actions.push(action);
      return this;
    }
    /**
     * @en
     * Add an action which calculate with relative value.
     * @zh
     * 添加一个对属性进行相对值计算的 action。
     * @method by
     * @param duration @en Tween time, in seconds @zh 缓动时间，单位为秒
     * @param props @en List of properties of tween @zh 缓动的属性列表
     * @param opts @en Optional functions of tween @zh 可选的缓动功能
     * @param [opts.progress]
     * @param [opts.easing]
     * @return {Tween}
     */
    by(duration, props, opts) {
      opts = opts || /* @__PURE__ */ Object.create(null);
      opts.relative = true;
      const action = new TweenAction(duration, props, opts);
      this._actions.push(action);
      return this;
    }
    /**
     * @en
     * Directly set target properties.
     * @zh
     * 直接设置 target 的属性。
     * @method set
     * @param props @en List of properties of tween @zh 缓动的属性列表
     * @return {Tween}
     */
    set(props) {
      const action = new SetAction(props);
      this._actions.push(action);
      return this;
    }
    /**
     * @en
     * Add an delay action.
     * @zh
     * 添加一个延时 action。
     * @method delay
     * @param duration @en Delay time of this tween @zh 当前缓动的延迟时间
     * @return {Tween}
     */
    delay(duration) {
      const action = delayTime(duration);
      this._actions.push(action);
      return this;
    }
    /**
     * @en
     * Add an callback action.
     * @zh
     * 添加一个回调 action。
     * @method call
     * @param callback @en Callback function at the end of this tween @zh 当前缓动结束时的回调函数
     * @return {Tween}
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    call(callback) {
      const action = callFunc(callback);
      this._actions.push(action);
      return this;
    }
    /**
     * @en
     * Add an sequence action.
     * @zh
     * 添加一个队列 action。
     * @method sequence
     * @param args @en All tween that make up the sequence @zh 组成队列的所有缓动
     */
    sequence(...args) {
      const action = _Tween._wrappedSequence(...args);
      this._actions.push(action);
      return this;
    }
    /**
     * @en
     * Add an parallel action.
     * @zh
     * 添加一个并行 action。
     * @method parallel
     * @param args @en The tween parallel to this tween @zh 与当前缓动并行的缓动
     */
    parallel(...args) {
      const action = _Tween._wrappedParallel(...args);
      this._actions.push(action);
      return this;
    }
    /**
     * @en
     * Add an repeat action.
     * This action will integrate before actions to a sequence action as their parameters.
     * @zh
     * 添加一个重复 action，这个 action 会将前一个动作作为他的参数。
     * @param repeatTimes @en The repeat times of this tween @zh 重复次数
     * @param embedTween @en Optional, embedded tween of this tween @zh 可选，嵌入缓动
     */
    repeat(repeatTimes, embedTween) {
      if (repeatTimes === Infinity) {
        return this.repeatForever(embedTween);
      }
      const actions = this._actions;
      let action;
      if (embedTween instanceof _Tween) {
        action = embedTween._union();
      } else {
        action = actions.pop();
      }
      actions.push(repeat(action, repeatTimes));
      return this;
    }
    /**
     * @en
     * Add an repeat forever action.
     * This action will integrate before actions to a sequence action as their parameters.
     * @zh
     * 添加一个永久重复 action，这个 action 会将前一个动作作为他的参数。
     * @method repeatForever
     * @param embedTween @en Optional, embedded tween of this tween @zh 可选，嵌入缓动
     */
    repeatForever(embedTween) {
      const actions = this._actions;
      let action;
      if (embedTween instanceof _Tween) {
        action = embedTween._union();
      } else {
        action = actions.pop();
      }
      actions.push(repeatForever(action));
      return this;
    }
    /**
     * @en
     * Add an reverse time action.
     * This action will integrate before actions to a sequence action as their parameters.
     * @zh
     * 添加一个倒置时间 action，这个 action 会将前一个动作作为他的参数。
     * @method reverseTime
     * @param embedTween @en Optional, embedded tween of this tween @zh 可选，嵌入缓动
     */
    reverseTime(embedTween) {
      const actions = this._actions;
      let action;
      if (embedTween instanceof _Tween) {
        action = embedTween._union();
      } else {
        action = actions.pop();
      }
      actions.push(reverseTime(action));
      return this;
    }
    /**
     * @en
     * Add an hide action, only for node target.
     * @zh
     * 添加一个隐藏 action，只适用于 target 是节点类型的。
     */
    hide() {
      const action = hide();
      this._actions.push(action);
      return this;
    }
    /**
     * @en
     * Add an show action, only for node target.
     * @zh
     * 添加一个显示 action，只适用于 target 是节点类型的。
     */
    show() {
      const action = show();
      this._actions.push(action);
      return this;
    }
    /**
     * @en
     * Add an removeSelf action, only for node target.
     * @zh
     * 添加一个移除自己 action，只适用于 target 是节点类型的。
     */
    removeSelf() {
      const action = removeSelf(false);
      this._actions.push(action);
      return this;
    }
    /**
     * @en
     * Stop all tweens
     * @zh
     * 停止所有缓动
     */
    static stopAll() {
      TweenSystem.instance.ActionManager.removeAllActions();
    }
    /**
     * @en
     * Stop all tweens by tag
     * @zh
     * 停止所有指定标签的缓动
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    static stopAllByTag(tag, target) {
      TweenSystem.instance.ActionManager.removeAllActionsByTag(tag, target);
    }
    /**
     * @en
     * Stop all tweens by target
     * @zh
     * 停止所有指定对象的缓动
     */
    // eslint-disable-next-line @typescript-eslint/ban-types
    static stopAllByTarget(target) {
      TweenSystem.instance.ActionManager.removeAllActionsFromTarget(target);
    }
    _union() {
      const actions = this._actions;
      let action;
      if (actions.length === 1) {
        action = actions[0];
      } else {
        action = sequence(actions);
      }
      return action;
    }
    _destroy() {
      this.stop();
    }
    static _wrappedSequence(...args) {
      const tmp_args = _Tween._tmp_args;
      tmp_args.length = 0;
      for (let l = args.length, i = 0; i < l; i++) {
        const arg = tmp_args[i] = args[i];
        if (arg instanceof _Tween) {
          tmp_args[i] = arg._union();
        }
      }
      return sequence.apply(sequence, tmp_args);
    }
    static _wrappedParallel(...args) {
      const tmp_args = _Tween._tmp_args;
      tmp_args.length = 0;
      for (let l = args.length, i = 0; i < l; i++) {
        const arg = tmp_args[i] = args[i];
        if (arg instanceof _Tween) {
          tmp_args[i] = arg._union();
        }
      }
      return spawn.apply(spawn, tmp_args);
    }
  };
  _Tween._tmp_args = [];
  var Tween = _Tween;
  window["Tween"] = Tween;
  function tween(target) {
    return new Tween(target);
  }
  window["tween"] = tween;
  function tweenUtil(target) {
    console.log("tweenUtil' is deprecated, please use 'tween' instead ");
    return new Tween(target);
  }
  window["tweenUtil"] = tweenUtil;

  // src/frame/base/ScriptBase.ts
  var ScriptBase = class extends Laya.Script {
    constructor() {
      super(...arguments);
      this.childDic = {};
    }
    onDestroy() {
      Laya.timer.clearAll(this);
      this.owner.offAllCaller(this);
      offAllEvent(this);
      super.onDestroy();
    }
    // 使用例子
    // public updateItemLayer(parentC: Laya.Box, parenX: number, parenY: number) {
    //     //背景层
    //     let layer_1 = [this.bgImg, this.icon.ui_imgQuality];
    //     //icon
    //     let layer_2 = [this.icon.ui_imgIcon];
    //     //文本
    //     let layer_3 = [this.danTxt];
    //     // 顶层img
    //     let layer_4 = [this.upImg];
    //     this.updateLayer(parentC, [layer_1, layer_2, layer_3, layer_4], parenX, parenY, this.scaleX, this.scaleY);
    // }
    /**减少list的dc */
    updateLayer(parentC, args, parenX, parenY, pScaleX = 1, pScaleY = 1) {
      let content;
      for (let i = 0; i < args.length; i++) {
        const name = `content${i}`;
        content = parentC.getChildByName(name);
        if (!content) {
          content = new Laya.Box();
          content.name = name;
          parentC.addChildAt(content, i);
        }
        let boxArr = args[i];
        let item;
        for (let j = 0; j < boxArr.length; j++) {
          item = boxArr[j];
          let key = name + j;
          if (!this.childDic[key]) {
            item.scale(item.scaleX * pScaleX, item.scaleY * pScaleY);
            this.childDic[key] = {};
            this.childDic[key].x = item.x;
            this.childDic[key].y = item.y;
          }
          item.x = this.childDic[key].x * pScaleX + parenX;
          item.y = this.childDic[key].y * pScaleY + parenY;
          content.addChildAt(item, j);
        }
      }
    }
  };

  // src/frame/window/ViewBase.ts
  var ViewBase = class extends ScriptBase {
    constructor() {
      super(...arguments);
      this.needReleaseUrlList = [];
    }
    /**添加需要释放的资源路径 */
    addReleaseUrl(url) {
      if (this.needReleaseUrlList.indexOf(url) != -1)
        return;
      this.needReleaseUrlList.push(url);
    }
    close() {
      offAllEvent(this);
      for (let url of this.needReleaseUrlList) {
        LoaderManager.clearTextureRes(url);
      }
      LoaderManager.gc();
    }
    releaseResources(node) {
      if (node.url) {
        LoaderManager.clearTextureRes(node.url);
      } else if (node.skin) {
        LoaderManager.clearTextureRes(node.skin);
      }
      for (let i = 0; i < node.numChildren; i++) {
        this.releaseResources(node.getChildAt(i));
      }
    }
  };

  // src/frame/window/WindowBase.ts
  var WindowBase = class extends ViewBase {
    constructor() {
      super(...arguments);
      /**被触发onHide时要不要调用hide() */
      this.checkOnHide = true;
      /**被触发onShow时要不要调用show() */
      this.checkOnShow = true;
      // 自己打开或者关闭时否是要触发别的 hide() show()
      this.selfOpenNeedCheckOtherHide = true;
      this.selfCloseNeedCheckOtherShow = true;
      /**打开窗口动画 */
      this.openWinAni = true;
      /**关闭窗口动画 */
      this.closeWinAni = true;
      /**点击背景空白的地方关闭界面 */
      this.clickBgBoxCloseWin = false;
    }
    onAwake() {
      this.owner.size(Laya.stage.width, Laya.stage.height);
      if (this.owner["closeBtn"] != null)
        onClick(this, this.owner["closeBtn"], this.closeWin);
      if (this.clickBgBoxCloseWin)
        this.owner.on(Laya.Event.CLICK, this, this.closeWin);
      this.onInit();
    }
    open(...param) {
      this.owner.visible = true;
      this.onOpen.call(this, ...param);
      if (this.openWinAni) {
        this.owner.x = -this.owner.width;
        tween(this.owner).to(200, { x: 0 }).start();
      } else {
        this.onOpen.call(this, ...param);
      }
    }
    close(...param) {
      if (this.closeWinAni) {
        this.onClose.call(this, ...param);
        super.close();
        this.owner.x = 0;
        tween(this.owner).to(200, { x: this.owner.width }).call(() => {
          this.owner.destroy(true);
        }).start();
      } else {
        this.onClose.call(this, ...param);
        super.close();
        this.owner.destroy(true);
      }
    }
    closeWin() {
      closeWindow(this.winName);
    }
    show() {
      this.owner.visible = true;
    }
    hide() {
      this.owner.visible = false;
    }
    createPanel(url, parent) {
      return __async(this, null, function* () {
        parent = parent || this.owner;
        let prefab = yield LoaderManager.load(url);
        let panel = prefab.create();
        parent.addChild(panel);
        return panel;
      });
    }
    /**
     * 适配列表最终Y方向行数
     * @param itemHeight item的高度
     * @param list 适配的列表
     */
    adapterListRepeatYByY(itemHeight, list) {
      let listHeight = list.height;
      let num = Math.floor(listHeight / itemHeight);
      if (listHeight % itemHeight != 0)
        num += 1;
      list.repeatY = num;
    }
    /**
     * 以上方为对齐点
     * @param node 节点
     */
    adapterTopY(node) {
      node.y = node.y + FrameConfig.fitHeight / 2;
    }
    /**
     * 以下方对齐点
     * @param node 
     */
    adapterButtomY(node) {
      node.y = node.y + FrameConfig.fitHeight;
    }
    /**适配刘海屏的位置 */
    fringeScreenAdapter(node, changeY = 60) {
      if (!FrameConfig.isFringeScreen)
        return;
      node.y += changeY;
    }
    /**窗口初始化 */
    onInit() {
    }
    /**每次打开调用 */
    onOpen(...param) {
    }
    /**每次关闭调用 */
    onClose(...param) {
    }
    /**被覆盖之后再显示到最顶调用 */
    onShow() {
    }
    /**被覆盖时调用 */
    onHide() {
    }
    /**适配最大尺寸 */
    AutoSizeToMax(...arr) {
      for (let item of arr) {
        item.size(Laya.stage.width, Laya.stage.height);
      }
    }
  };

  // src/frame/window/WindowManager.ts
  var LayerType = /* @__PURE__ */ ((LayerType2) => {
    LayerType2["default"] = "default";
    LayerType2["top"] = "top";
    LayerType2["banner"] = "banner";
    LayerType2["debug"] = "debug";
    LayerType2["tips"] = "tips";
    return LayerType2;
  })(LayerType || {});
  var WindowManager = class _WindowManager {
    static get Inst() {
      if (!_WindowManager.inst) {
        _WindowManager.inst = new _WindowManager();
      }
      return _WindowManager.inst;
    }
    init(scene) {
      scene.zOrder = 66 /* UI */;
      this.inLoad = [];
      this.showLayer = {};
      this.showMap = /* @__PURE__ */ new Map();
      this.hideMap = /* @__PURE__ */ new Map();
      this.closeWinCallBack = /* @__PURE__ */ new Map();
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
    isShowWin(winName) {
      return this.showMap.has(winName);
    }
    /**
     * 获取的指定窗口的控制器
     * @param winName 窗口名
     */
    getWinScript(winName) {
      if (!this.isShowWin(winName)) {
        Log.debug(`\u7A97\u53E3\uFF1A${winName}\u672A\u6CE8\u518C\uFF01`);
        return;
      }
      return this.showMap.get(winName);
    }
    /**
     * 注册窗口关闭回调，只作用一次。下一次打开关闭无效
     * @param winName 窗口名
     * @param callBack 回调方法
     * @param caller 执行域
     */
    registerWinCloseCallBack(winName, callBack, caller) {
      this.closeWinCallBack.set(winName, { fun: callBack, caller });
    }
    /**
     * 打开窗口
     * @param winName 窗口名
     * @param args 参数
     */
    openWindow(winName, args, closeCallBack, caller, openCallBack) {
      return __async(this, null, function* () {
        Log.debug("\u6253\u5F00\u7A97\u53E3" + winName);
        if (this.inLoad.indexOf(winName) != -1) {
          Log.debug(`\u7A97\u53E3\uFF1A${winName}\u6B63\u5728\u52A0\u8F7D\uFF01`);
          return;
        }
        if (this.isShowWin(winName)) {
          Log.debug(`\u7A97\u53E3\uFF1A${winName}\u5DF2\u7ECF\u6253\u5F00\uFF01`);
          return;
        }
        let prefabPath = ModuleConfig.getModulePrefabPath(winName);
        if (!prefabPath)
          return;
        let ctr;
        let layer = ModuleConfig.getModuleLayerType(winName);
        if (this.hideMap.has(winName)) {
          ctr = this.hideMap.get(winName);
          this.hideMap.delete(winName);
        } else {
          this.inLoad.push(winName);
          let res = yield LoaderManager.load(prefabPath);
          let win = res.create();
          this.root.getChildByName(layer).addChild(win);
          ctr = win.getComponent(WindowBase);
          if (!ctr.winName)
            ctr.winName = winName;
          let index = this.inLoad.indexOf(winName);
          this.inLoad.splice(index, 1);
        }
        let layerNode = this.root.getChildByName(layer);
        layerNode.setChildIndex(ctr.owner, layerNode.numChildren - 1);
        let layerList = this.showLayer[layer];
        if (!layerList) {
          layerList = [];
        }
        layerList.push(ctr);
        this.showLayer[layer] = layerList;
        this.showMap.set(winName, ctr);
        let onHideCtr;
        if (layerList.length >= 2) {
          onHideCtr = layerList[layerList.length - 2];
        } else {
          let typeList = [];
          for (let item in LayerType) {
            typeList.push(item);
          }
          typeList.reverse();
          let index = typeList.indexOf(layer);
          if (index != -1)
            typeList.splice(0, index + 1);
          for (let key of typeList) {
            layerList = this.showLayer[key] || [];
            if (layerList.length >= 1) {
              onHideCtr = layerList[layerList.length - 1];
              break;
            }
          }
        }
        onHideCtr && onHideCtr.onHide();
        if (closeCallBack) {
          this.registerWinCloseCallBack(winName, closeCallBack, caller);
        }
        ctr.open.apply(ctr, args);
        if (openCallBack)
          caller ? openCallBack.call(caller) : openCallBack();
        ctr.selfOpenNeedCheckOtherHide && onHideCtr && onHideCtr.checkOnHide && onHideCtr.hide();
        return ctr;
      });
    }
    /**
     * 关闭窗口
     * @param winName 窗口名
     * @param args 参数
     */
    closeWindow(winName, args) {
      Log.debug("\u5173\u95ED\u7A97\u53E3" + winName);
      if (!this.showMap.has(winName)) {
        Log.warn("\u7A97\u53E3\u672A\u6253\u5F00:" + winName);
        return;
      }
      let ctr = this.showMap.get(winName);
      this.showMap.delete(winName);
      let layer = ModuleConfig.getModuleLayerType(winName);
      let layerList = this.showLayer[layer];
      let index = layerList.indexOf(ctr);
      if (index != -1)
        layerList.splice(index, 1);
      switch (ModuleConfig.getModuleCloseType(winName)) {
        case 0 /* destroy */:
          ctr.close.apply(ctr, args);
          break;
        case 1 /* hide */:
          ctr.hide();
          this.hideMap.set(winName, ctr);
          break;
      }
      let onShowCtr;
      let typeList = [];
      for (let item in LayerType) {
        if (item == "debug" /* debug */ || item == "tips" /* tips */)
          continue;
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
      if (this.closeWinCallBack.has(winName)) {
        let obj = this.closeWinCallBack.get(winName);
        obj.caller ? obj.fun.call(obj.caller) : obj.fun();
        this.closeWinCallBack.delete(winName);
        obj = null;
      }
    }
  };

  // src/frame/module/ModuleConfig.ts
  var ModuleConfig = class {
    /**
     * 注册窗口
     * @param name 窗口明
     * @param prefab 预制体路径
     * @param layerType 层级类型
     * @param closeType 关闭类型
     */
    static register(name, prefab, layerType, closeType) {
      layerType = layerType || "default" /* default */;
      closeType = closeType || 0 /* destroy */;
      this.registerModule({ name, prefab, layerType, closeType });
    }
    /**
     * 注册窗口
     * @param module 模块数据
     */
    static registerModule(module) {
      this.module[module.name] = module;
    }
    /**
     * 获取模块预设体路劲
     * @param name 模块名
     * @returns 
     */
    static getModulePrefabPath(name) {
      if (!this.hasModule(name))
        return;
      ;
      return this.module[name].prefab;
    }
    /**
     * 获取模块层级
     * @param name 模块名
     * @returns 
     */
    static getModuleLayerType(name) {
      if (!this.hasModule(name))
        return;
      ;
      return this.module[name].layerType;
    }
    /**
     * 获取模块关闭模式
     * @param name 模块名
     * @returns 
     */
    static getModuleCloseType(name) {
      if (!this.hasModule(name))
        return;
      ;
      return this.module[name].closeType;
    }
    /**
     * 判断是否已经注册
     * @param name 模块名称
     * @returns 是否有注册
     */
    static hasModule(name) {
      if (!this.module[name]) {
        Log.error("\u672A\u6CE8\u518C\u6A21\u5757:" + name);
        return false;
      }
      return true;
    }
  };
  ModuleConfig.module = {};

  // src/frame/proxy/ProxyManager.ts
  var ProxyManager = class extends Singleton {
    constructor() {
      super();
      this.proxyList = [];
    }
    init() {
      for (let item of this.proxyList) {
        item.init();
      }
    }
    register(proxy) {
      if (this.proxyList.indexOf(proxy) != -1)
        return;
      this.proxyList.push(proxy);
    }
  };

  // src/frame/sdk/AdBase.ts
  var AdBase = class {
    constructor() {
      this.AdObj = null;
      this.platform = FrameConfig.platform;
      this.Id = null;
      this.Type = "default";
      this.IsCreate = true;
    }
  };

  // src/frame/sdk/SDKUtils.ts
  var SDKUtils = class {
  };
  /**一个banner爆光次数 */
  SDKUtils.updateBannerNum = 3;

  // src/frame/sdk/Banner.ts
  var Banner = class extends AdBase {
    constructor(id) {
      super();
      this.showNum = 0;
      this.Id = id;
      this.OnLoad = this.onLoad;
      this.OnError = this.onError;
      this.OnResize = this.onResize;
      this.create();
    }
    create() {
      this.info = this.platform.getSystemInfoSync();
      var style = {
        top: 0,
        left: 0,
        width: this.info.screenWidth * 0.8,
        height: this.info.screenHeight * 0.1
      };
      style.left = (this.info.screenWidth - style.width) / 2;
      this.AdObj = this.platform.createBannerAd({
        adUnitId: this.Id,
        adIntervals: 30,
        style
      });
      this.AdObj.onLoad(() => {
        this.OnLoad();
      });
      this.AdObj.onError((err) => {
        this.OnError(err);
      });
      this.AdObj.onResize((res) => {
        this.OnResize(res);
      });
    }
    onLoad() {
      console.log("Banner\u52A0\u8F7D\u6210\u529F\uFF01");
      Laya.timer.clear(this, this.create);
      if (this.IsCreate)
        SDKUtils.SDK.mBanner.push(this);
      this.IsCreate = false;
    }
    onError(err) {
      console.error("Banner\u52A0\u8F7D\u5931\u8D25\uFF01", err);
      Laya.timer.clear(this, this.create);
      Laya.timer.once(3e3, this, this.create);
    }
    onResize(res) {
      this.AdObj.style.top = this.info.screenHeight - res.height;
      this.AdObj.offResize();
    }
    show(style) {
      if (style)
        this.AdObj.style = style;
      this.AdObj.show().then(() => {
        console.log("Ban\u663E\u793A");
        this.showNum++;
      }).catch(() => {
        console.error("Ban\u663E\u793A\u5931\u8D25");
      });
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
      if (index == -1)
        return;
      SDKUtils.SDK.mBanner.splice(index, 1);
      this.AdObj.hide();
      this.AdObj.destroy();
    }
  };

  // src/frame/sdk/Custom.ts
  var Custom = class extends AdBase {
    constructor(id, style) {
      super();
      this.isdestroy = false;
      this.createCanShow = false;
      this.showNum = 0;
      this.Id = id;
      this.create(style);
    }
    create(style) {
      var Obj = this.platform.createCustomAd({
        adUnitId: this.Id,
        style
      });
      Obj.onLoad(() => {
        console.log("\u539F\u751F\u5E7F\u544A\u52A0\u8F7D\u6210\u529F\uFF01");
        Laya.timer.clear(this, this.create);
        if (this.isdestroy) {
          Obj.hide();
          Obj.destroy();
          return;
        }
        this.AdObj = Obj;
        if (this.createCanShow)
          this.show();
      });
      Obj.onError((err) => {
        console.error("\u539F\u751F\u5E7F\u544A\u52A0\u8F7D\u5931\u8D25\uFF01");
        Laya.timer.clear(this, this.create);
        Laya.timer.once(3e3, this, () => {
          this.create(style);
        });
      });
    }
    show() {
      this.createCanShow = true;
      if (!this.AdObj)
        return;
      if (this.AdObj.isShow())
        return;
      this.AdObj.show().then(() => {
        this.showNum++;
        console.log("\u539F\u751F\u663E\u793A\u6210\u529F\uFF01");
        if (!this.createCanShow)
          this.hide();
      }).catch((err) => {
        console.log("\u539F\u751F\u663E\u793A\u5931\u8D25\uFF01");
      });
    }
    hide() {
      this.createCanShow = false;
      if (!this.AdObj)
        return;
      this.AdObj.hide();
    }
    destroy() {
      this.isdestroy = true;
      if (this.AdObj) {
        this.AdObj.hide();
        this.AdObj.destroy();
      }
    }
  };

  // src/frame/sdk/Grid.ts
  var Grid = class extends AdBase {
    constructor(id) {
      super();
      this.Id = id;
    }
    create() {
      this.platform.createGridAd({
        adUnitId: this.Id,
        adIntervals: 30
      });
    }
  };

  // src/frame/sdk/InterstitialAd.ts
  var InterstitialAd = class extends AdBase {
    constructor(id) {
      super();
      this.Id = id;
      this.create();
    }
    create() {
      this.AdObj = this.platform.createInterstitialAd({
        adUnitId: this.Id
      });
      this.AdObj.onLoad(() => {
        this.onLoad();
      });
      this.AdObj.onError((err) => {
        this.onError(err);
      });
      this.AdObj.onClose(() => {
        this.onClose();
      });
      SDKUtils.SDK.mInterstitial.push(this);
    }
    onClose() {
    }
    show() {
      this.AdObj.show();
    }
    onLoad() {
      Laya.timer.clear(this, this.show);
      console.log("\u63D2\u5C4F\u52A0\u8F7D\u6210\u529F\uFF01");
      this.IsCreate = false;
    }
    onError(err) {
      console.error("\u63D2\u5C4F\u52A0\u8F7D\u5931\u8D25\uFF01", err);
      Laya.timer.clear(this, this.show);
      Laya.timer.once(3e3, this, this.show);
    }
  };

  // src/frame/sdk/SDKConfig.ts
  var SDKConfig = {
    // BannerId: ["adunit-20b646fb3f267709", "adunit-f97ee75fe9474b04", "adunit-b85f80d0b02cb51b", "adunit-b4bfa2045480a721", "adunit-9194cc945f5c95c5"], //banner广告
    BannerId: [],
    //banner广告
    VideoId: [],
    // VideoId: ["adunit-b42a40811b4fdb53"],
    GridId: [],
    // CustomId: ["adunit-1d12433090c41c91", "adunit-e2ad63c4e40d4ca8", "adunit-782344260b290e56", "adunit-73741d09f87dcfbe"], // 原生
    CustomId: [],
    // 原生
    // 单格子
    singleGridIdsCustomId: [],
    // 全屏格子
    fullGridIdCustomId: [],
    InterstitialId: [],
    // 插屏
    BannerNum: 5,
    InterstitialNum: 5,
    VideoNum: 1,
    CustomInfo: {},
    IsPortrait: true
    //true 为竖屏
  };

  // src/frame/sdk/Video.ts
  var Video = class extends AdBase {
    constructor(id) {
      super();
      this.caller = null;
      this.finishFun = null;
      this.closeFun = null;
      this.Id = id[6] + id[8] + id[1] + id[3] + id[2] + id[5] + id[4] + id[7];
      this.create();
      SDKUtils.SDK.mVideo.push(this);
    }
    create() {
      this.AdObj = this.platform.createRewardedVideoAd({ adUnitId: this.Id });
      this.AdObj.onLoad(() => {
        Laya.timer.clear(this, this.load);
        console.log("\u89C6\u9891\u52A0\u8F7D\u5B8C\u6210");
      });
      this.AdObj.onError((err) => {
        console.log("\u89C6\u9891\u52A0\u8F7D\u5931\u8D25:", err);
        Laya.timer.clear(this, this.load);
        Laya.timer.once(3e3, this, this.load);
      });
      this.AdObj.onClose((isOk) => {
        isOk.isEnded ? this.caller ? this.finishFun && this.finishFun.apply(this.caller) : this.finishFun && this.finishFun() : this.caller ? this.closeFun && this.closeFun.apply(this.caller) : this.closeFun && this.closeFun();
        if (isOk.isEnded)
          this.load();
        sendEvent("VIDEO_CLOSE_PLAYER_BGM");
      });
    }
    load() {
      this.AdObj.load();
    }
    show(caller, finish, close) {
      this.caller = caller ? caller : null;
      this.finishFun = finish ? finish : null;
      this.closeFun = close ? close : null;
      this.AdObj.show().then(() => {
        console.log("\u89C6\u9891show\u6210\u529F");
      }).catch((err) => {
        console.error("\u89C6\u9891show\u5931\u8D25\uFF1A", err);
        SDK.ShowToast("\u89C6\u9891\u62C9\u53D6\u5931\u8D25");
      });
    }
    destroy() {
      var index = SDKUtils.SDK.mVideo.indexOf(this);
      if (index == -1)
        return;
      SDKUtils.SDK.mVideo.splice(index, 1);
      this.AdObj.destroy();
    }
  };

  // src/frame/sdk/SDK.ts
  var _SDK = class _SDK {
    static TimerEvent() {
      for (var item in this.timerList) {
        this.timerList[item] += 1;
      }
    }
    static Init() {
      if (!Laya.Browser._isMiniGame)
        return;
      SDKUtils.SDK = this;
      this.platform = FrameConfig.platform;
      this.PhoneInfo = this.platform.getSystemInfoSync();
      this.StartInfo = this.platform.getLaunchOptionsSync();
      this.onShowInit();
    }
    /**安全高度 */
    static get safeArea() {
      return _SDK.platform.getWindowInfo().safeArea.top;
    }
    static InitAllAd() {
      if (!Laya.Browser._isMiniGame)
        return;
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
    static exposureBanner() {
      if (this.expBanner != null) {
        this.expBanner.destroy();
        this.expBanner = null;
      }
      if (SDKConfig.BannerId.length < 1)
        return;
      this.expBanner = new Banner(SDKConfig.BannerId[++this.expIndex % SDKConfig.BannerId.length]);
      this.expBanner.OnLoad = () => {
        console.log("\u66DD\u5149banner\u52A0\u8F7D\u5B8C\u6210\uFF01");
        this.expBanner.show();
        Laya.timer.once(this.ExposureBannerTimer, this, this.exposureBanner);
      };
      this.expBanner.OnError = () => {
        console.log("\u66DD\u5149banner\u521B\u5EFA\u5931\u8D25\uFF01");
        Laya.timer.once(3e3, this, this.exposureBanner);
      };
      this.expBanner.OnResize = (res) => {
        this.expBanner.AdObj.style.top = -(res.height - 1);
      };
    }
    static onShowInit() {
      if (!this.platform)
        return;
      this.platform.onShow((res) => {
        console.log("onShow\u56DE\u8C03", res);
        if (res && res.scene) {
          FrameConfig.setSceneId(res.scene);
        }
        for (var obj of this.onShowObjList) {
          obj.caller ? obj.backFun.apply(obj.caller) : obj.backFun();
        }
        if (this.mBanner.length - 1 >= this.BannerShowIndex) {
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
      });
    }
    static AddOnShowEvent(backFun, caller) {
      var obj = {
        caller,
        backFun
      };
      this.onShowObjList.push(obj);
    }
    static CreateRewardedVideoAd(id) {
      if (!id && SDKConfig.VideoId.length < 1)
        return;
      id = id ? id : SDKConfig.VideoId[this.VideoUseIndex];
      if (++this.VideoUseIndex >= SDKConfig.VideoId.length)
        this.VideoUseIndex = 0;
      new Video(id);
    }
    static CreateBannerAd(id) {
      if (!id && SDKConfig.BannerId.length < 1)
        return;
      id = id ? id : SDKConfig.BannerId[this.BannerUseIndex];
      if (++this.BannerUseIndex >= SDKConfig.BannerId.length)
        this.BannerUseIndex = 0;
      new Banner(id);
    }
    static CreateGridAd(id) {
      if (!id && SDKConfig.GridId.length < 1)
        return;
      id = id ? id : SDKConfig.GridId[this.GridUseIndex];
      if (++this.GridUseIndex >= SDKConfig.GridId.length)
        this.GridUseIndex = 0;
      new Grid(id);
    }
    static CreateCustomAd(key, id) {
      if (!id && SDKConfig.CustomId.length < 1)
        return;
      id = id ? id : SDKConfig.CustomId[this.CustomUseIndex];
      if (++this.CustomUseIndex >= SDKConfig.CustomId.length)
        this.CustomUseIndex = 0;
      this.mCustom.set(key, new Custom(id, SDKConfig.CustomInfo[key]));
    }
    static CreateInterstitialAd(id) {
      if (!id && SDKConfig.InterstitialId.length < 1)
        return;
      id = id ? id : SDKConfig.InterstitialId[this.InterstitialUseIndex];
      if (++this.InterstitialUseIndex >= SDKConfig.InterstitialId.length)
        this.InterstitialUseIndex = 0;
      new InterstitialAd(id);
    }
    static ShowInterstitialAd() {
      if (this.mInterstitial.length < 1)
        return;
      this.mInterstitial[this.InterstitialShowIndex >= this.mInterstitial.length ? 0 : this.BannerShowIndex].show();
      if (++this.InterstitialShowIndex >= this.mInterstitial.length)
        this.InterstitialShowIndex = 0;
    }
    static ShowVideo(finish, close, no, caller) {
      if (!this.platform && !Laya.Browser._isMiniGame) {
        if (finish)
          caller ? finish.call(caller) : finish();
        return;
      }
      if (this.mVideo.length < 1) {
        caller ? no && no.apply(caller) : no && no();
        this.ShowToast("\u89C6\u9891\u62C9\u53D6\u4E2D\u3002\u3002\u3002");
        return;
      }
      this.mVideo[++this.videoIndex % this.mVideo.length].show(caller, finish, close);
    }
    static ShowBanner(style) {
      if (this.mBanner.length < 1)
        return;
      this.mBanner[this.BannerShowIndex >= this.mBanner.length ? 0 : this.BannerShowIndex].show(style);
      if (++this.BannerShowIndex >= this.mBanner.length)
        this.BannerShowIndex = 0;
    }
    static HideBanner() {
      for (var item of this.mBanner) {
        item.hide();
      }
    }
    static ShowCustomAd(type, id) {
      if (SDKConfig.CustomId.length < 1)
        return;
      if (!this.platform)
        return;
      if (!this.mCustom.has(type)) {
        this.CreateCustomAd(type, id);
      }
      this.mCustom.get(type).show();
    }
    static HideCustomAd() {
      this.hideCustomAdNum++;
      for (var item of this.mCustom) {
        item[1].hide();
        if (this.hideCustomAdNum >= 5)
          item[1].destroy();
      }
      if (this.hideCustomAdNum >= 5)
        this.mCustom.clear();
    }
    static ShowToast(str) {
      if (!Laya.Browser.onMiniGame) {
        console.log(str);
        return;
      }
      this.platform.showToast({
        title: str,
        icon: "none",
        duration: 2e3
      });
    }
    // 分享
    static shareAppMessage(type, title, imageUrl) {
      this._shareType = type;
      if (!Laya.Browser.onMiniGame) {
        return;
      }
      this.platform.shareAppMessage({
        title: title || "\u53EA\u67090.01%\u7684\u4EBA\u80FD\u8FC7\u7B2C\u4E8C\u5173",
        imageUrl: imageUrl || "loading/loading_img/loading_icon.png"
      });
    }
    static vibrateShort(type) {
      if (!this.canVibrate)
        return;
      if (this.platform == null)
        return;
      this.platform.vibrateShort({ type });
    }
    /**
     * 微信上报事件
     * @param eventId 
     * @param data 
     * @returns 
     */
    static reportEvent(eventId, ...args) {
      if (this.platform == null) {
        console.log("\u5FAE\u4FE1\u4E0A\u62A5\u4E8B\u4EF6", eventId, args);
        return;
      }
      let data = {};
      for (let item of args) {
        data[item.key] = item.value;
      }
      this.platform.reportEvent(eventId, data);
    }
    /**订阅信息 */
    static requestSubscribeMessage(...tmplIds) {
      if (this.platform == null) {
        return;
      }
      this.platform.requestSubscribeMessage({
        tmplIds,
        success(res) {
          console.log("\u8BA2\u9605\u6210\u529F", res);
        },
        fail(err) {
          console.log("\u8BA2\u9605\u5931\u8D25", err);
        }
      });
    }
  };
  _SDK.mVideo = [];
  _SDK.mBanner = [];
  _SDK.mInterstitial = [];
  _SDK.mCustom = /* @__PURE__ */ new Map();
  _SDK.platform = null;
  _SDK.BannerUseIndex = 0;
  _SDK.VideoUseIndex = 0;
  _SDK.GridUseIndex = 0;
  _SDK.CustomUseIndex = 0;
  _SDK.InterstitialUseIndex = 0;
  _SDK.onShowObjList = [];
  _SDK.ExposureBannerTimer = 1e4;
  _SDK.timerList = {
    timer: 0
  };
  /**刘海屏下移的高度 */
  _SDK.isFringeScreenTopDownNum = 60;
  _SDK.expBanner = null;
  _SDK.expIndex = -1;
  _SDK.InterstitialShowIndex = 0;
  _SDK.videoIndex = -1;
  _SDK.BannerShowIndex = 0;
  _SDK.hideCustomAdNum = 0;
  /**
   * 震动
   * @param type 震动类型
   * @returns 
   */
  _SDK.canVibrate = true;
  var SDK = _SDK;

  // src/frame/data/LocalStorage.ts
  var LocalStorage = class {
    static setString(key, value) {
      localStorage.setItem(key, value);
    }
    static getString(key, defaultValue) {
      return localStorage.getItem(key) || defaultValue;
    }
    static setNumber(key, num) {
      this.setString(key, num.toString());
    }
    static getNumber(key, defaultValue) {
      var num = this.getString(key);
      if (num == null || num == void 0 || num == "NaN")
        num = defaultValue;
      return Number(num);
    }
    /**只能用于存储基本数据类型的Array */
    static setArray(key, arr) {
      this.setString(key, arr.toString());
    }
    static getArray(key, defaultValue) {
      if (!this.getString(key))
        return defaultValue;
      var arr = new Array();
      var strArr = this.getString(key).split(",");
      for (var i = 0; i < strArr.length; i++) {
        arr.push(strArr[i]);
      }
      return arr;
    }
    static setObject(key, obj) {
      this.setString(key, JSON.stringify(obj));
    }
    static getObject(key, defaultValue) {
      var str = this.getString(key);
      return str ? JSON.parse(str) : defaultValue;
    }
  };

  // src/frame/data/DataUtils.ts
  var DataUtils = class _DataUtils {
    static get Inst() {
      if (_DataUtils.inst == null) {
        _DataUtils.inst = new _DataUtils();
      }
      return _DataUtils.inst;
    }
    initTabel() {
      var obj = {};
      var config = _DataUtils.locaInfoConfig;
      var keys = Object.keys(config);
      let types = LoaderManager.ConfigTable.TbLocalInfo.get("type");
      var item;
      let itemName;
      for (var i = 0; i < keys.length; i++) {
        item = config[keys[i]];
        itemName = keys[i];
        switch (types[keys[i]]) {
          case "number" /* number */:
            obj[itemName] = LocalStorage.getNumber(itemName, item);
            break;
          case "string" /* string */:
            obj[itemName] = LocalStorage.getString(itemName, item);
            break;
          case "array" /* array */:
            var str = LocalStorage.getObject(itemName, item);
            if (typeof str == "string") {
              if (str[0] == '"') {
                str = str.slice(1, -1);
              }
              if (str == "" || str.length == 0 || str == null) {
                obj[itemName] = [];
              } else {
                str = '{"data":' + str + "}";
                obj[itemName] = JSON.parse(str).data;
              }
            } else {
              obj[itemName] = str.data;
            }
            break;
          case "object" /* object */:
            var str = item;
            if (str.indexOf('""') != -1) {
              var reg = new RegExp('""', "g");
              str = str.replace(reg, '"');
            }
            if (str[0] == '"') {
              str = str.slice(1, -1);
            }
            try {
              obj[itemName] = LocalStorage.getObject(itemName, JSON.parse(str));
            } catch (err) {
              console.error("========== \u6570\u636E\u7ED3\u6784\u51FA\u9519 ==========");
              console.error(str);
              console.error(err);
            }
            break;
        }
      }
      this.localData = obj;
    }
    getData(property9) {
      if (!this.localData) {
        this.initTabel();
      }
      return this.localData[property9];
    }
    setData(property9, value, type) {
      this.localData[property9] = value;
      switch (type) {
        case "number" /* number */:
          LocalStorage.setNumber(property9, this.localData[property9]);
          break;
        case "string" /* string */:
          LocalStorage.setString(property9, this.localData[property9]);
          break;
        case "array" /* array */:
          LocalStorage.setObject(property9, { data: this.localData[property9] });
          break;
        case "object" /* object */:
          LocalStorage.setObject(property9, this.localData[property9]);
          break;
      }
    }
    static get locaInfoConfig() {
      return LoaderManager.ConfigTable.TbLocalInfo.get("locaInfo");
    }
    static get locaInfoType() {
      return LoaderManager.ConfigTable.TbLocalInfo.get("type");
    }
    /**设置本地存储 */
    static setLocalInfo(property9, value, type) {
      if (!type) {
        type = this.locaInfoType[property9];
        if (!type) {
          console.error("\u5C5E\u6027", property9, "\u4E0D\u5B58\u5728\u7C7B\u578B\uFF0C\u68C0\u67E5localInfo\u8868");
          return;
        }
      }
      _DataUtils.Inst.setData(property9, value, type);
    }
    /**获取本地存储 */
    static getLocalInfo(property9) {
      return _DataUtils.Inst.getData(property9);
    }
    /**获取常量 */
    static get Constant() {
      return LoaderManager.ConfigTable.TbConstant.get("constValue");
    }
    get LocalData() {
      return _DataUtils.Inst.localData;
    }
  };

  // src/frame/time/TimeManger.ts
  var _TimeManger = class _TimeManger extends Singleton {
    constructor() {
      super();
      /**距离上次离线时间戳(秒级)， 为0则是首次登陆 */
      this.outLineTimeStamp = 0;
      /**在线时长(秒) */
      this.inGameTime = 0;
      this._date = /* @__PURE__ */ new Date();
      this.todayZeroTime = this.getMidnightTimestamp;
      this.outLineTimer();
      setInterval(this.timerHander.bind(this), 1e3);
    }
    init() {
    }
    get date() {
      this._date.setTime(Date.now());
      return this._date;
    }
    // 离线处理
    outLineTimer() {
      var outLineTime = DataUtils.getLocalInfo("outLineTime");
      if (outLineTime == 0) {
        this.saveOutLineTime();
        return;
      }
      this.outLineTimeStamp = this.secondTimeStamp - outLineTime;
    }
    /**当天0点时间戳(秒) */
    get getMidnightTimestamp() {
      const now = this.date;
      now.setHours(0, 0, 0, 0);
      return Math.floor(now.getTime() * 1e-3);
    }
    /**
     * 返回周日0点的时间戳（秒）
     * @param weekOffset 周的偏移，默认0当前周，1下一周，-1上一周
     * @returns 
     */
    getSundayTimestamp(weekOffset = 0) {
      let date = this.date;
      const dayOfWeek = date.getDay();
      let diff = dayOfWeek === 0 ? 0 : -dayOfWeek;
      diff += weekOffset * 7;
      date.setDate(date.getDate() + diff);
      date.setHours(0, 0, 0, 0);
      return Math.floor(date.getTime() * 1e-3);
    }
    /**保存离线时间 */
    saveOutLineTime() {
      if (this.secondTimeStamp % 5 != 0)
        return;
      DataUtils.setLocalInfo("outLineTime", this.secondTimeStamp, "number" /* number */);
    }
    /**每秒处理 */
    timerHander() {
      this.inGameTime++;
      this.saveOutLineTime();
      if (this.todayZeroTime != this.getMidnightTimestamp) {
        this.todayZeroTime = this.getMidnightTimestamp;
        sendEvent(_TimeManger.CROSS_DAY);
      }
      sendEvent(_TimeManger.TIME_SECOND, [this.secondTimeStamp]);
    }
    /**毫秒级时间戳 */
    get time() {
      return Date.now();
    }
    /**秒级时间戳 */
    get secondTimeStamp() {
      return Math.floor(Date.now() * 1e-3);
    }
    /**
     * 获取今天的时间的字符串
     * @param spaceStr 分隔符号，比如 “/” ，2024/6/9
     */
    getTodayTxt(spaceStr = "/") {
      const now = this.date;
      const year = now.getFullYear();
      const month = ("0" + (now.getMonth() + 1)).slice(-2);
      const day = ("0" + now.getDate()).slice(-2);
      return year + spaceStr + month + spaceStr + day;
    }
    /**
     * 00:00
     */
    get todayTime() {
      const now = this.date;
      const hours = ("0" + now.getHours()).slice(-2);
      const minutes = ("0" + now.getMinutes()).slice(-2);
      return hours + ":" + minutes;
    }
    /**type(1将秒数格式化为HH:MM:SS的形式),
     * (2HH时MM分SS秒),
     * (3MM:SS),
     * (4MM分SS秒) 
     * */
    formatSeconds(value, type = 1) {
      value < 1 && (value = 0);
      let secondTime = Number(value);
      let minuteTime = 0;
      let hourTime = 0;
      if (secondTime >= 60) {
        minuteTime = Math.floor(Number(secondTime / 60));
        secondTime = Number(secondTime % 60);
        if (type != 3 && type != 4) {
          if (minuteTime >= 60) {
            hourTime = Math.floor(Number(minuteTime / 60));
            minuteTime = Number(minuteTime % 60);
          }
        }
      }
      let res = "";
      if (type == 3) {
        minuteTime = minuteTime < 10 ? "0" + minuteTime : minuteTime;
        secondTime = secondTime < 10 ? "0" + secondTime : secondTime;
        res = minuteTime + ":" + secondTime;
      } else if (type == 4) {
        if (hourTime != 0 || minuteTime != 0) {
          res += minuteTime + "\u5206";
        }
        if (secondTime != 0)
          res += secondTime + "\u79D2";
      } else if (type == 2) {
        if (hourTime != 0) {
          res += hourTime + "\u65F6";
        }
        if (hourTime != 0 || minuteTime != 0) {
          res += minuteTime + "\u5206";
        }
        if (secondTime != 0)
          res += secondTime + "\u79D2";
      } else {
        hourTime = hourTime < 10 ? "0" + hourTime : hourTime;
        minuteTime = minuteTime < 10 ? "0" + minuteTime : minuteTime;
        secondTime = secondTime < 10 ? "0" + secondTime : secondTime;
        res = hourTime + ":" + minuteTime + ":" + secondTime;
      }
      return res;
    }
    /**
     * x天:x时：x分：x秒
     * @param seconds 时间戳
     * @returns 
     */
    formatTimestamp(seconds) {
      const day = Math.floor(seconds / (24 * 3600));
      const hour = Math.floor(seconds % (24 * 3600) / 3600);
      const minute = Math.floor(seconds % 3600 / 60);
      const second = Math.floor(seconds % 60);
      let result = "";
      if (day > 0) {
        result += `${day}\u5929`;
      }
      if (hour > 0 || day > 0) {
        result += `${hour}\u65F6`;
      }
      if (minute > 0 || hour > 0 || day > 0) {
        result += `${minute}\u5206`;
      }
      result += `${second}\u79D2`;
      return result;
    }
    /**
     * 00:00:00:00
     * @param seconds 时间戳
     * @returns 
     */
    formatTimestamp1(seconds) {
      const day = Math.floor(seconds / (24 * 3600));
      const hour = Math.floor(seconds % (24 * 3600) / 3600);
      const minute = Math.floor(seconds % 3600 / 60);
      const second = Math.floor(seconds % 60);
      let result = "";
      if (day > 0) {
        result += day < 10 ? "0" + day : day;
        result += ":";
      }
      if (hour > 0 || day > 0) {
        result += hour < 10 ? "0" + hour : hour;
        result += ":";
      } else {
        result += "00:";
      }
      if (minute > 0 || hour > 0 || day > 0) {
        result += minute < 10 ? "0" + minute : minute;
        result += ":";
      } else {
        result += "00:";
      }
      result += second < 10 ? "0" + second : second;
      return result;
    }
  };
  /**一天时间戳(秒级) */
  _TimeManger.ONET_DATA_TIME_STAMP = 86400;
  /**每秒触发 */
  _TimeManger.TIME_SECOND = "TIME_SECOND";
  /**离线触发事件 */
  _TimeManger.TIME_OUT_LINE = "TIME_OUT_LINE";
  /**每秒事件 */
  _TimeManger.SECOND_EVENT = "TimeEvent.SECOND_EVENT";
  /**跨天 */
  _TimeManger.CROSS_DAY = "TimeEvent.CROSS_DAY";
  var TimeManger = _TimeManger;

  // src/frame/util/Tools.ts
  var Tools = class {
    /**
     * 添加监听
     * @param region 执行域
     * @param btn 设置监听控件
     * @param clickFunc 监听函数
     * @param data 参数
     * @param mouseDownFunc 按下监听的
     * @param mouseUpFunc 抬起监听
     * @param mouseMoveFunc 移动监听
      * @param isScale 是否缩放
     */
    static onClick(region, btn, clickFunc, data, music = true, isScale = true, maoPao = true, mouseDownFunc, mouseUpFunc, mouseMoveFunc) {
      var maoFun = (e) => {
        if (maoPao && e) {
          e.stopPropagation();
        }
      };
      if (isScale) {
        btn.on(Laya.Event.MOUSE_DOWN, this, (e) => {
          maoFun(e);
          if (!btn["sx"]) {
            btn["sx"] = btn.scaleX;
          }
          btn.scale(btn["sx"] * 0.9, btn["sx"] * 0.9);
        });
        btn.on(Laya.Event.MOUSE_UP, this, (e) => {
          maoFun(e);
          if (btn["sx"])
            btn.scale(btn["sx"], btn["sx"]);
        });
        btn.on(Laya.Event.MOUSE_OUT, this, (e) => {
          maoFun(e);
          if (btn["sx"])
            btn.scale(btn["sx"], btn["sx"]);
        });
        btn.on(Laya.Event.MOUSE_MOVE, this, (e) => {
          maoFun(e);
        });
      }
      if (clickFunc) {
        btn.on(Laya.Event.CLICK, this, (e) => {
          maoFun(e);
          clickFunc.apply(region, data);
        });
      }
      if (mouseDownFunc) {
        btn.on(Laya.Event.MOUSE_DOWN, region, (e) => {
          maoFun(e);
          mouseDownFunc.apply(region);
        });
      }
      if (music) {
        btn.on(Laya.Event.MOUSE_DOWN, region, (e) => {
          maoFun(e);
        });
      }
      if (mouseUpFunc) {
        btn.on(Laya.Event.MOUSE_UP, region, (e) => {
          maoFun(e);
          mouseUpFunc.apply(region);
        });
        btn.on(Laya.Event.MOUSE_OUT, region, (e) => {
          maoFun(e);
          mouseUpFunc.apply(region);
        });
      }
      if (mouseMoveFunc) {
        btn.on(Laya.Event.MOUSE_MOVE, region, (e) => {
          maoFun(e);
          mouseMoveFunc.apply(region);
        });
      }
    }
    /**
     * 根据路径字符串寻找对象节点
     * @param node 根节点
     * @param path 路劲
     * @returns 
     */
    static findChildByPath(node, path) {
      var arr = path.split("/");
      var fun = (node2, arr2) => {
        var childName = arr2.shift();
        node2 = node2.getChildByName(childName);
        if (node2 == null) {
          return null;
        } else if (arr2.length <= 0) {
          return node2;
        } else {
          return fun(node2, arr2);
        }
      };
      return fun(node, arr);
    }
  };

  // src/frame/FrameMain.ts
  var { regClass, property } = Laya;
  var FrameMain = class extends Laya.Script {
    constructor() {
      super(...arguments);
      /**加载创建名称 */
      this.LoadingWindowName = "LoadingWindow";
      /**注册配置文件*/
      this.configList = [];
      /**内置配置文件 */
      this.defaultConfigList = ["game_tblocalinfo", "game_tbconstant"];
      /**图集路径映射配置文件,不打包图片不可放到atlas图集目录下*/
      this.atlasPathList = [];
      /**需要映射路径映射配置文件*/
      this.mappingPathList = [];
      /**内置映射地址 */
      this.defaultBasePaths = ["config", "resources", "images", "audio"];
      /**需要检测的资源文件路径 */
      this.checkAssetsPaths = [];
    }
    /**
     * 资源、配置等全部准备完成，初始化外部完成回调
     * @param callBack 初始化外部的完成后回调方法
     * @param caller 回调执行域
     */
    loadFinishInitOutEvent() {
      this.allInitFinish();
    }
    onAwake() {
      this.initConfig();
      this.initProxy();
      this.initMudule();
      if (!ModuleConfig.hasModule(this.LoadingWindowName)) {
        console.error(this.LoadingWindowName, "\u5FC5\u987B\u6CE8\u518C\uFF0C\u4E0D\u80FD\u4E3A\u7A7A");
        return;
      }
      if (!this.securityEvent())
        return;
      if (!this.StartWindowName) {
        console.error("\u542F\u52A8\u7A97\u53E3\u4E3A\u7A7A\uFF01\u68C0\u67E5frame/FrameMain.ts\u4E2D\u7684StartWindowName\u3002");
        return;
      }
      this.initBasePath();
      this.initModuleEvent();
    }
    // 设置映射地址
    initBasePath() {
      if (FrameConfig.cdn)
        return;
      if (!AMConfig.UseMainZip && AMConfig.UseSubPackge)
        return;
      let basePaths = {};
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
    initModuleEvent() {
      FrameConfig.rootNode = this.owner.parent;
      FrameMain.eventMgr = new Laya.EventDispatcher();
      WindowManager.Inst.init(this.owner);
      WindowManager.Inst.openWindow(this.LoadingWindowName);
      AssetsMgr.Inst.Init(this.checkAssetsPaths);
      AssetsMgr.Inst.LoadAseets(this.loadZipCallBack, this);
      TweenSystem.Init();
      Scene3DManager.Inst().init();
    }
    // 拉取资源包完成回调
    loadZipCallBack() {
      FrameConfig.LoadingInitPro = 75;
      this.configList = this.configList.concat(this.defaultConfigList);
      LoaderManager.init(this.configList).then(() => {
        this.initGlobalFuntion();
      });
    }
    // 处理常用全局方法
    initGlobalFuntion() {
      window["onClick"] = Tools.onClick;
      window["openWindow"] = this.openWindow;
      window["closeWindow"] = this.closeWindow;
      window["isShowWin"] = this.isShowWin;
      window["getWinScript"] = this.getWinScript;
      window["addEvent"] = this.addEvent;
      window["offEvent"] = this.offEvent;
      window["offAllEvent"] = this.offAllEvent;
      window["sendEvent"] = this.sendEvent;
      TimeManger.Inst().init();
      ProxyManager.Inst().init();
      SDK.Init();
      this.loadFinishInitOutEvent();
    }
    // 完成回调
    allInitFinish() {
      this.openStartWindow();
    }
    // 初始化完成都进去指定窗口
    openStartWindow() {
      WindowManager.Inst.openWindow(this.StartWindowName, null, null, this, () => {
        FrameConfig.LoadingInitPro = 100;
      });
    }
    isShowWin(winName) {
      return WindowManager.Inst.isShowWin(winName);
    }
    getWinScript(winName) {
      return WindowManager.Inst.getWinScript(winName);
    }
    openWindow(winName, args, closeCallBack, closeCallBackCaller) {
      return __async(this, null, function* () {
        return yield WindowManager.Inst.openWindow(winName, args, closeCallBack, closeCallBackCaller);
      });
    }
    closeWindow(winName, args) {
      WindowManager.Inst.closeWindow(winName, args);
    }
    addEvent(event, caller, callFun, args) {
      FrameMain.eventMgr.on(event, caller, callFun, args);
    }
    sendEvent(event, data) {
      FrameMain.eventMgr.event(event, data);
    }
    offEvent(event, caller, callFun) {
      FrameMain.eventMgr.off(event, caller, callFun);
    }
    offAllEvent(caller) {
      FrameMain.eventMgr.offAllCaller(caller);
    }
    securityEvent() {
      if (!Laya.Browser._isMiniGame)
        return true;
      if (Laya.Browser.onMiniGame) {
        let sceneId = FrameConfig.sceneId + "";
        if (FrameConfig.debugSceneIdList.indexOf(sceneId) != -1 || FrameConfig.securitySceneIdList.indexOf(sceneId) != -1) {
          let temp = FrameConfig.platform.getAccountInfoSync().miniProgram.appId.toString();
          return temp.slice(2) == FrameConfig.wxId;
        }
        return true;
      } else if (Laya.Browser.onVVMiniGame || Laya.Browser.onQGMiniGame) {
      } else if (Laya.Browser.onQQMiniGame) {
      } else if (Laya.Browser.onTTMiniGame) {
      }
      return false;
    }
  };
  FrameMain = __decorateClass([
    regClass("UEBskf1LRf6NskFgI3zvRw")
  ], FrameMain);

  // src/frame/music/MusicManager.ts
  var MusicManager = class {
    /**播放音效 */
    static onPlaySound(name, base = this.MusicBasePath) {
      Laya.SoundManager.playSound(base + name + ".mp3", 1);
    }
    /**播放音效 */
    static onPlaySoundByNameAndBasePath(name, base = this.MusicBasePath) {
      Laya.SoundManager.playSound(base + name + ".mp3", 1);
    }
    /**播放背景音乐 */
    static onPlayMusic(path, base = this.MusicBasePath) {
      Laya.SoundManager.playMusic(base + path + ".mp3", 0);
    }
    /**停止播放背景音乐 */
    static onStopMusic() {
      Laya.SoundManager.stopMusic();
    }
    /**调节音效音量 */
    static set SoundVolume(volume) {
      Laya.SoundManager.setSoundVolume(volume);
    }
    static get SoundVolume() {
      return Laya.SoundManager.soundVolume;
    }
    /**调节背景音量 */
    static set MusicVolume(volume) {
      Laya.SoundManager.setMusicVolume(volume);
    }
    static get MusicVolume() {
      return Laya.SoundManager.musicVolume;
    }
    /**设置是否为静音 */
    static set IsMusicState(boo) {
      Laya.SoundManager.musicMuted = boo;
    }
    static get IsMusicState() {
      return Laya.SoundManager.musicMuted;
    }
    /**设置音效是否为静音 */
    static set IsSoundState(boo) {
      Laya.SoundManager.soundMuted = boo;
    }
    static get IsSoundState() {
      return Laya.SoundManager.soundMuted;
    }
  };
  // 资源根目录
  MusicManager.MusicBasePath = "resources/audio/";

  // src/game/Start.ts
  var { regClass: regClass2, property: property2 } = Laya;
  var Start = class extends FrameMain {
    initConfig() {
      AMConfig.CacheVersion = "1.1.5";
      AMConfig.UseSubPackge = false;
      AMConfig.forceClearCaChe = true;
      FrameConfig.cdn = false;
      this.StartWindowName = "MainWindow";
      this.configList = [
        // "game_tblevel",
        // "game_tbtube",
        // "game_tbballskin",
        // "game_tbgamebg",
        // "game_tbshop",
        // "game_tbshopitem",
        // "game_tbchallengelevel",
        // "game_tbsignin",
        // "game_tbitem",
        // "game_tbcompetition"
      ];
      this.atlasPathList = [
        "atlas/comp"
      ];
      this.mappingPathList = [];
      FrameConfig.version = "1.0.0";
    }
    // 注册
    initMudule() {
      ModuleConfig.register(this.LoadingWindowName, "resources/view/loading/LoadingWindow.lh", "top" /* top */);
      ModuleConfig.register("MainWindow", "resources/view/main/MainWindow.lh");
      ModuleConfig.register("MainMenuWindow", "resources/view/main/MainMenuWindow.lh");
      ModuleConfig.register("TipsWindow", "resources/view/tips/TipsWindow.lh", "tips" /* tips */);
      ModuleConfig.register("RepairWindow", "resources/view/kxtg/RepairWindow.lh");
      ModuleConfig.register("RepairInfoWindow", "resources/view/kxtg/RepairInfoWindow.lh");
    }
    initProxy() {
    }
    loadFinishInitOutEvent() {
      this.addEvent("VIDEO_CLOSE_PLAYER_BGM", this, this.playBgm);
      this.initMusicState();
      this.playBgm();
      this.allInitFinish();
      this.closeWindow(this.LoadingWindowName);
    }
    // 初始化音乐状态
    initMusicState() {
      MusicManager.IsSoundState = DataUtils.getLocalInfo("soundState") == 0;
      MusicManager.IsMusicState = DataUtils.getLocalInfo("musicState") == 0;
      SDK.canVibrate = DataUtils.getLocalInfo("vibrateState") == 1;
    }
    playBgm() {
      MusicManager.onStopMusic();
      MusicManager.MusicVolume = 0.3;
    }
  };
  Start = __decorateClass([
    regClass2("SJhD9Hf3Qo-D64I2qjKf2A")
  ], Start);

  // src/game/model/loading/view/LoadingWindow.ts
  var { regClass: regClass3, property: property3 } = Laya;
  var LoadingWindow = class extends WindowBase {
    onOpen(...param) {
    }
  };
  LoadingWindow = __decorateClass([
    regClass3("aSzAWA1fR2KsTQMZH9IKMQ")
  ], LoadingWindow);

  // src/game/model/loading/view/LoadingWindowRuntime.generated.ts
  var LoadingWindowRuntimeBase = class extends Laya.Box {
  };

  // src/game/model/loading/view/LoadingWindowRuntime.ts
  var { regClass: regClass4 } = Laya;
  var LoadingWindowRuntime = class extends LoadingWindowRuntimeBase {
  };
  LoadingWindowRuntime = __decorateClass([
    regClass4("cL4ToHm8QdiQSB8el0YFzg")
  ], LoadingWindowRuntime);

  // src/game/model/main/view/MainMenuTabItem.generated.ts
  var MainMenuTabItemBase = class extends Laya.Box {
  };

  // src/game/model/main/view/MainMenuTabItem.ts
  var { regClass: regClass5 } = Laya;
  var MainMenuTabItem = class extends MainMenuTabItemBase {
    onAwake() {
      onClick(this, this.Button, this.onClickHander);
    }
    set_dataSource(data) {
      if (!data)
        return;
      this.data = data;
      this.Button.label = data.txt;
    }
    onClickHander() {
      openWindow(this.data.win);
    }
  };
  MainMenuTabItem = __decorateClass([
    regClass5("FJaH2ibuQyimITS2Isd-ng")
  ], MainMenuTabItem);

  // src/game/model/main/MainModel.ts
  var MainModel = class {
    static get dataIdList() {
      let list = [];
      for (let key in this.data) {
        list.push(Number(key));
      }
      return list;
    }
    static getDataById(id) {
      return this.data[id];
    }
  };
  MainModel.data = {
    1: {
      id: 1,
      title: "\u5F00\u5FC3\u901A\u5173",
      wins: [
        { txt: "\u4FEE\u590D\u5173\u5361", win: "RepairWindow" }
      ]
    }
  };

  // src/game/model/main/view/MainMenuWindow.ts
  var { regClass: regClass6, property: property4 } = Laya;
  var MainMenuWindow = class extends WindowBase {
    onInit() {
    }
    onOpen(id) {
      this.data = MainModel.getDataById(id);
      this.owner.titletxt.text = this.data.title;
      this.owner.List.array = this.data.wins;
    }
    onClose(...param) {
    }
  };
  MainMenuWindow = __decorateClass([
    regClass6("L3BH70PfSJCfEYhp41CWCQ")
  ], MainMenuWindow);

  // src/game/model/main/view/MainMenuWindowRuntime.generated.ts
  var MainMenuWindowRuntimeBase = class extends Laya.Box {
  };

  // src/game/model/main/view/MainMenuWindowRuntime.ts
  var { regClass: regClass7 } = Laya;
  var MainMenuWindowRuntime = class extends MainMenuWindowRuntimeBase {
  };
  MainMenuWindowRuntime = __decorateClass([
    regClass7("SEhkKYsSRamL46N_FVhLXA")
  ], MainMenuWindowRuntime);

  // src/game/model/main/view/MainTabItem.generated.ts
  var MainTabItemBase = class extends Laya.Box {
  };

  // src/game/model/main/view/MainTabItem.ts
  var { regClass: regClass8 } = Laya;
  var MainTabItem = class extends MainTabItemBase {
    onAwake() {
      onClick(this, this.Button, this.onClickHander);
    }
    set_dataSource(id) {
      if (!id)
        return;
      this.data = MainModel.getDataById(id);
      this.Button.label = this.data.title;
    }
    onClickHander() {
      openWindow("MainMenuWindow", [this.data.id]);
    }
  };
  MainTabItem = __decorateClass([
    regClass8("Z46ogzIfQnSJ1msRoEz-mQ")
  ], MainTabItem);

  // src/game/model/main/view/MainWindow.ts
  var { regClass: regClass9, property: property5 } = Laya;
  var MainWindow = class extends WindowBase {
    constructor() {
      super(...arguments);
      this.checkOnShow = false;
      this.checkOnHide = false;
    }
    // private btns = [
    //     {txt: "修复关卡", win: "RepairWindow"}
    // ];
    onInit() {
    }
    onOpen(...param) {
      this.owner.List.array = MainModel.dataIdList;
    }
    onClose(...param) {
    }
  };
  MainWindow = __decorateClass([
    regClass9("BMlBEoGTSk-yDlqUJV9zAg")
  ], MainWindow);

  // src/game/model/main/view/MainWindowRuntime.generated.ts
  var MainWindowRuntimeBase = class extends Laya.Box {
  };

  // src/game/model/main/view/MainWindowRuntime.ts
  var { regClass: regClass10 } = Laya;
  var MainWindowRuntime = class extends MainWindowRuntimeBase {
  };
  MainWindowRuntime = __decorateClass([
    regClass10("COnJlFMuT2eYp5CY0s5w-g")
  ], MainWindowRuntime);

  // src/game/model/kxtg/view/RepairInfoWindow.ts
  var { regClass: regClass11, property: property6 } = Laya;
  var RepairInfoWindow = class extends WindowBase {
    onInit() {
    }
    onOpen(str) {
      this.owner.TextArea.text = str;
    }
    onClose(...param) {
    }
  };
  RepairInfoWindow = __decorateClass([
    regClass11("5_mRJI49Rd6LaoWdvmsCoA")
  ], RepairInfoWindow);

  // src/game/model/kxtg/view/RepairInfoWindowRuntime.generated.ts
  var RepairInfoWindowRuntimeBase = class extends Laya.Box {
  };

  // src/game/model/kxtg/view/RepairInfoWindowRuntime.ts
  var { regClass: regClass12 } = Laya;
  var RepairInfoWindowRuntime = class extends RepairInfoWindowRuntimeBase {
  };
  RepairInfoWindowRuntime = __decorateClass([
    regClass12("GdlBIIMyRIyn9P2FCNaBzA")
  ], RepairInfoWindowRuntime);

  // src/game/model/kxtg/KxtgEvent.ts
  var KxtgEvent = class {
  };
  KxtgEvent.DEL_EVELT = "KxtgEvent.DEL_EVELT";

  // src/game/model/kxtg/view/RepairItem.generated.ts
  var RepairItemBase = class extends Laya.Box {
  };

  // src/game/model/kxtg/view/RepairItem.ts
  var { regClass: regClass13 } = Laya;
  var RepairItem = class extends RepairItemBase {
    onAwake() {
      onClick(this, this.delBtn, this.delOnClick);
      this.idInput.on(Laya.Event.INPUT, this, this.inputChange);
      this.levelInput.on(Laya.Event.INPUT, this, this.inputChange);
      this.versionInput.on(Laya.Event.INPUT, this, this.inputChange);
      this.skinInput.on(Laya.Event.INPUT, this, this.inputChange);
    }
    set_dataSource(data) {
      if (!data)
        return;
      this.data = data;
      this.idInput.text = data.id;
      this.levelInput.text = data.level;
      this.versionInput.text = data.version;
      this.skinInput.text = data.skin;
    }
    delOnClick() {
      sendEvent(KxtgEvent.DEL_EVELT, [this.data]);
    }
    inputChange() {
      this.data.id = this.idInput.text;
      this.data.level = this.levelInput.text;
      this.data.version = this.versionInput.text;
      this.data.skin = this.skinInput.text;
    }
  };
  RepairItem = __decorateClass([
    regClass13("rBhyynjbRKeMhieiA4trBg")
  ], RepairItem);

  // src/game/model/tips/TipsUtils.ts
  var TipsUtils = class {
    /**提示 */
    static showTips(str) {
      return __async(this, null, function* () {
        let ctr;
        if (!isShowWin(this.tipsWinName)) {
          ctr = yield openWindow(this.tipsWinName);
        } else {
          ctr = getWinScript(this.tipsWinName);
        }
        ctr.showTips(str);
      });
    }
    static showFraction(num, worldPos) {
      return __async(this, null, function* () {
        let ctr;
        if (!isShowWin(this.tipsWinName)) {
          ctr = yield openWindow(this.tipsWinName);
        } else {
          ctr = getWinScript(this.tipsWinName);
        }
        ctr.showFraction(num, worldPos);
      });
    }
  };
  TipsUtils.tipsWinName = "TipsWindow";
  TipsUtils.tipsItemPrefabPath = "resources/view/tips/item/TipsItem.lh";
  TipsUtils.fractionItemPrefabPath = "resources/view/tips/item/FractionItem.lh";

  // src/game/model/kxtg/KxtgModel.ts
  var KxtgModel = class {
    static get newRepairDataList() {
      let list = [];
      list.push(this.createRepairInfo());
      return list;
    }
    static createRepairInfo() {
      let obj = {
        id: "",
        level: "",
        version: "",
        skin: ""
      };
      return obj;
    }
    static get version() {
      let version = TimeManger.Inst().secondTimeStamp;
      return version;
    }
    /**生成数据 */
    static generateData(list) {
      let version = this.version;
      let data = {};
      for (let info of list) {
        let obj = {};
        obj.version = !!info.version && info.version != "" ? info.version : version;
        let tempData = {};
        tempData.level = info.level;
        tempData.skin = [];
        if (info.skin.length > 0) {
          let arr = info.skin.split("|");
          for (let item of arr) {
            tempData.skin.push(Number(item));
          }
        }
        obj.data = tempData;
        data[info.id] = obj;
      }
      return JSON.stringify(data);
    }
    /**检测数据 */
    static checkData(list) {
      for (let i = 0; i < list.length; i++) {
        let info = list[i];
        if (info.id.length < 1) {
          TipsUtils.showTips("id\u4E0D\u80FD\u4E3A\u7A7A\uFF0C\u7B2C" + (i + 1) + "\u4E2A");
          return false;
        }
        if (info.level.length < 1) {
          TipsUtils.showTips("\u5173\u5361\u4E0D\u80FD\u4E3A\u7A7A\uFF0C\u7B2C" + (i + 1) + "\u4E2A");
          return false;
        }
        if (info.skin.length > 0) {
          let arr = info.skin.split("|");
          for (let item of arr) {
            if (!Number.isNaN(Number(item)))
              continue;
            TipsUtils.showTips("\u7B2C" + (i + 1) + "\u4E2A\u76AE\u80A4\u683C\u5F0F\u4E0D\u5BF9\uFF0Cid|id");
            return false;
          }
        }
      }
      return true;
    }
  };

  // src/game/model/kxtg/view/RepairWindow.ts
  var { regClass: regClass14, property: property7 } = Laya;
  var RepairWindow = class extends WindowBase {
    onInit() {
      onClick(this, this.owner.addBtn, this.addBtnOnClick);
      onClick(this, this.owner.resetBtn, this.resetBtnOnClick);
      onClick(this, this.owner.generateBtn, this.generateBtnOnClick);
      addEvent(KxtgEvent.DEL_EVELT, this, this.delEvent);
    }
    onOpen(...param) {
      this.resetBtnOnClick();
    }
    onClose(...param) {
    }
    delEvent(data) {
      if (this.data.length == 1) {
        TipsUtils.showTips("\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\uFF01");
        return;
      }
      let index = this.data.indexOf(data);
      if (index == -1)
        return;
      this.data.splice(index, 1);
      this.owner.List.array = this.data;
    }
    addBtnOnClick() {
      let obj = KxtgModel.createRepairInfo();
      this.data.push(obj);
      this.owner.List.array = this.data;
      this.owner.List.tweenTo(this.data.length);
    }
    resetBtnOnClick() {
      this.data = KxtgModel.newRepairDataList;
      this.owner.List.array = this.data;
    }
    generateBtnOnClick() {
      if (!KxtgModel.checkData(this.data)) {
        return;
      }
      let str = KxtgModel.generateData(this.data);
      openWindow("RepairInfoWindow", [str]);
    }
  };
  RepairWindow = __decorateClass([
    regClass14("l0UP6WuRRYCiIFHsBJFmdg")
  ], RepairWindow);

  // src/game/model/kxtg/view/RepairWindowRuntime.generated.ts
  var RepairWindowRuntimeBase = class extends Laya.Box {
  };

  // src/game/model/kxtg/view/RepairWindowRuntime.ts
  var { regClass: regClass15 } = Laya;
  var RepairWindowRuntime = class extends RepairWindowRuntimeBase {
  };
  RepairWindowRuntime = __decorateClass([
    regClass15("4YgkNsegQ0ynmYEgeM1rqQ")
  ], RepairWindowRuntime);

  // src/game/model/tips/TipsWindow.ts
  var { regClass: regClass16, property: property8 } = Laya;
  var TipsWindow = class extends WindowBase {
    constructor() {
      super(...arguments);
      // 开始y值
      this.startY = 568;
      // 间隔
      this.spaceY = 10;
      // 最大显示提示的
      this.maxShowTextNum = 5;
      this.fractionTipNum = 0;
    }
    onInit() {
      this.startY = Math.floor(FrameConfig.realHeight / 2) - 100;
      this.selfCloseNeedCheckOtherShow = false;
      this.selfOpenNeedCheckOtherHide = false;
      this.addReleaseUrl(TipsUtils.tipsItemPrefabPath);
      this.showList = [];
      this.hideList = [];
      this.showFractionList = [];
      this.hideFractionList = [];
      this.itemPrefrab = Laya.loader.getRes(TipsUtils.tipsItemPrefabPath);
      this.fractionPrefab = Laya.loader.getRes(TipsUtils.fractionItemPrefabPath);
      addEvent("TIPS_RESET_ITEM", this, this.reset);
    }
    /**
     * 显示分数
     * @param num 分数
     * @param pos 世界坐标
     */
    showFraction(num, pos) {
      pos = this.owner.globalToLocal(pos);
      let item;
      if (this.hideFractionList.length > 0) {
        item = this.hideFractionList.shift();
        item.visible = true;
      }
      if (!item) {
        item = this.fractionPrefab.create();
        this.owner.addChild(item);
        this.fractionTipNum++;
      }
      item.setFraction(num);
      item.pos(pos.x, pos.y);
      Laya.timer.once(300, this, () => {
        let index = this.showFractionList.indexOf(item);
        if (index != -1)
          this.showFractionList.splice(index, 1);
        item.visible = false;
        this.hideFractionList.push(item);
        this.checkCloseWin();
      });
    }
    showTips(str) {
      let item;
      if (this.hideList.length > 0) {
        item = this.hideList.shift();
      }
      if (this.showList.length >= this.maxShowTextNum) {
        item = this.showList.shift();
        item.clearTime();
      }
      if (!item) {
        item = this.itemPrefrab.create();
        this.owner.addChild(item);
        item.centerX = 0;
      }
      item.visible = true;
      item.setData(str);
      item.y = this.startY;
      this.showList.push(item);
      Laya.timer.callLater(this, this.resetLayout);
    }
    resetLayout() {
      let y = this.startY;
      let item;
      for (let i = this.showList.length - 1; i >= 0; i--) {
        item = this.showList[i];
        item.setLayoutY(y);
        y -= item.height + this.spaceY;
      }
    }
    reset(item) {
      let index = this.showList.indexOf(item);
      if (index == -1)
        return;
      this.showList.splice(index, 1);
      this.hideList.push(item);
      item.visible = false;
      this.checkCloseWin();
    }
    checkCloseWin() {
      if (this.showList.length < 1 && this.hideFractionList.length >= this.fractionTipNum)
        this.closeWin();
    }
  };
  TipsWindow = __decorateClass([
    regClass16("GtRORJafSOWL4f1DsbcYlw")
  ], TipsWindow);

  // src/game/model/tips/runtime/FractionItem.generated.ts
  var FractionItemBase = class extends Laya.Box {
  };

  // src/game/model/tips/runtime/FractionItem.ts
  var { regClass: regClass17 } = Laya;
  var FractionItem = class extends FractionItemBase {
    constructor() {
      super(...arguments);
      this.color = "#0052ff";
    }
    setFraction(num) {
      this.content.graphics.clear();
      this.content.graphics.fillText(`+${num}`, 0, 0, "30px Bahnschrift", this.color, "center");
    }
  };
  FractionItem = __decorateClass([
    regClass17("q464BRQMQcmIQFQTSKLxMg")
  ], FractionItem);

  // src/game/model/tips/runtime/TipsItem.generated.ts
  var TipsItemBase = class extends Laya.Box {
  };

  // src/game/model/tips/runtime/TipsItem.ts
  var { regClass: regClass18 } = Laya;
  var TipsItem = class extends TipsItemBase {
    setData(str) {
      this.content.text = str;
      Laya.timer.once(1e3, this, this.reset);
    }
    reset() {
      sendEvent("TIPS_RESET_ITEM", [this]);
    }
    setLayoutY(y) {
      this.layoutAniCallBack();
      this.tween = Laya.Tween.to(this, { y }, 100, null, Laya.Handler.create(this, this.layoutAniCallBack));
    }
    layoutAniCallBack() {
      if (!this.tween)
        return;
      this.tween.clear();
      this.tween = null;
    }
    clearTime() {
      Laya.timer.clearAll(this);
    }
    onDestroy() {
      this.layoutAniCallBack();
      Laya.timer.clearAll(this);
      this.offAllCaller(this);
      offAllEvent(this);
    }
  };
  TipsItem = __decorateClass([
    regClass18("WMziF6zORoSPS5wUVRAZKg")
  ], TipsItem);

  // src/game/model/tips/runtime/TipsWindowRuntime.generated.ts
  var TipsWindowRuntimeBase = class extends Laya.Box {
  };

  // src/game/model/tips/runtime/TipsWindowRuntime.ts
  var { regClass: regClass19 } = Laya;
  var TipsWindowRuntime = class extends TipsWindowRuntimeBase {
  };
  TipsWindowRuntime = __decorateClass([
    regClass19("I3tfKsPsQX2icQEj2my_og")
  ], TipsWindowRuntime);
})();
