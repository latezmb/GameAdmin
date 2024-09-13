import { FrameConfig } from "../frame/FrameConfig";
import { FrameMain } from "../frame/FrameMain";
import DataUtils, { DataType } from "../frame/data/DataUtils";
import AssetsMgr, { AMConfig } from "../frame/loader/AssetsMgr";
import { LoaderManager } from "../frame/loader/LoaderManager";
import { ModuleConfig } from "../frame/module/ModuleConfig";
import { MusicManager } from "../frame/music/MusicManager";
import { ProxyManager } from "../frame/proxy/ProxyManager";
import SDK from "../frame/sdk/SDK";
import { SDKConfig } from "../frame/sdk/SDKConfig";
import { CloseType, LayerType } from "../frame/window/WindowManager";

const { regClass, property } = Laya;

@regClass()
export class Start extends FrameMain {

    protected initConfig() {
        
        AMConfig.CacheVersion = "1.1.5";
        AMConfig.UseSubPackge = false;
        AMConfig.forceClearCaChe = true;
        FrameConfig.cdn = false;
        this.StartWindowName = "MainWindow";
        // this.StartWindowName = "MainWindow";
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
            "atlas/comp",
        ];
        this.mappingPathList = [

        ];
        FrameConfig.version = "1.0.0";

    }


    // 注册
    protected initMudule() {
        ModuleConfig.register(this.LoadingWindowName, "resources/view/loading/LoadingWindow.lh", LayerType.top);
        ModuleConfig.register("MainWindow", "resources/view/main/MainWindow.lh");
        ModuleConfig.register("MainMenuWindow", "resources/view/main/MainMenuWindow.lh");

        // 开心通关
        ModuleConfig.register("RepairWindow", "resources/view/kxtg/RepairWindow.lh");
    }

    protected initProxy() {
    }

    protected loadFinishInitOutEvent() {
        this.addEvent("VIDEO_CLOSE_PLAYER_BGM", this, this.playBgm);
        this.initMusicState();
        this.playBgm();
        this.allInitFinish();
        this.closeWindow(this.LoadingWindowName);
    }

    // 初始化音乐状态
    private initMusicState() {
        MusicManager.IsSoundState = DataUtils.getLocalInfo<number>("soundState") == 0;
        MusicManager.IsMusicState = DataUtils.getLocalInfo<number>("musicState") == 0;
        SDK.canVibrate = DataUtils.getLocalInfo<number>("vibrateState") == 1;
    }

    private playBgm() {
        MusicManager.onStopMusic();
        MusicManager.MusicVolume = 0.3;
        // MusicManager.onPlayMusic(MusicPath.bgm);
    }

}