import { FrameConfig } from "../FrameConfig";
import { Singleton } from "../base/Singleton";
import { LoaderManager } from "../loader/LoaderManager";
import Log from "../log/Log";
import { WINDOW_LAYER } from "../util/FrameEnum";

export default class Scene3DManager extends Singleton {

    private Scene3D: Laya.Scene3D;
    private sceneMap: Map<string, Laya.Sprite3D>;

    public init() {

        this.sceneMap = new Map();

        // 初始化ui3d场景
        let scene = new Laya.Scene3D();
        scene.zOrder = WINDOW_LAYER.Scene3D;
        scene.name = "Scene3D";

        FrameConfig.rootNode.addChild(scene);
        this.Scene3D = scene;
    }

    public async openScene3D(url: string, layer?: number) {
        let prefab: Laya.Prefab = await LoaderManager.load(url);
        let sprite3D = prefab.create() as Laya.Sprite3D;
        this.sceneMap.set(url, sprite3D);
        LoaderManager.release(url);
        layer ? this.Scene3D.addChildAt(sprite3D, layer) : this.Scene3D.addChild(sprite3D);
        return sprite3D;
    }

    public closeScene3D(url: string) {
        if (!this.sceneMap.has(url)) {
            Log.debug("不存在3d场景：" + url);
            return;
        }
        let scene = this.sceneMap.get(url);
        scene.destroy();
        this.sceneMap.delete(url);
    }


}