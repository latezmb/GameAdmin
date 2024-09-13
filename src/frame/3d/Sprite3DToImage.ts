import { LoaderManager } from "../loader/LoaderManager";
import Camera = Laya.Camera;
import Vector3 = Laya.Vector3;
import Scene3D = Laya.Scene3D;
import Color = Laya.Color;
import RenderTexture = Laya.RenderTexture;
import RenderTargetFormat = Laya.RenderTargetFormat;
import Texture = Laya.Texture;
import Sprite = Laya.Sprite;
import Point = Laya.Point;
import Sprite3D = Laya.Sprite3D;
import { FrameConfig } from "../FrameConfig";
import { WINDOW_LAYER } from "../util/FrameEnum";

export class Sprite3DToImage extends Laya.Sprite {

    private scene3d: Scene3D;
    private camera: Camera;
    private orthographicPos = new Vector3();
    private modelUrl: string;
    private model: Sprite3D;
    private modePos = new Point();
    private renderTexture: RenderTexture;

    constructor(width: number = FrameConfig.realWidth, height: number = FrameConfig.realHeight, orthographicVerticalSize: number = 50) {
        super();

        this.scene3d = new Scene3D();
        this.scene3d.zOrder = WINDOW_LAYER.Scene3D;
        FrameConfig.rootNode.addChild(this.scene3d);

        //创建一个3D摄像机
        var _camera: Camera = new Camera(0, 0.1, 1000);
        this.camera = _camera;
        this.scene3d.addChild(_camera);
        //调整摄像机角度
        _camera.transform.rotationEuler = new Vector3(0, 0, 0);
        _camera.transform.position = new Vector3(0, 0, -10);

        //设置正交相机模式
        _camera.orthographic = true;
        //正交投影垂直矩阵尺寸
        _camera.orthographicVerticalSize = orthographicVerticalSize;
        _camera.clearColor = new Color(0, 0, 0, 0);

        let renderTexture = new RenderTexture(width, height, Laya.RenderTargetFormat.R16G16B16A16, Laya.RenderTargetFormat.DEPTHSTENCIL_24_8, false, 4);
        _camera.renderTarget = renderTexture;
        this.renderTexture = renderTexture;
        //再将离屏3D画到2D节点上，至此，就完成把3D画到2D的基础渲染流程
        this.texture = new Texture(_camera.renderTarget);

        this.modePos.x = width / 2;
        this.modePos.y = height / 2;
    }

    public async loadModel(url: string) {
        this.modelUrl = url;
        let prefab = await LoaderManager.load(url);
        let model = prefab.create();
        this.scene3d.addChild(model);
        model.transform.position = this.orthographicPos;
        this.model = model;
        this.setPos();
    }

    /**
     * 设置位置
     * @param x 世界坐标（全局坐标X）
     * @param y 世界坐标（全局坐标Y）
     * @returns 
     */
    public setPos(x?: number, y?: number) {
        x != undefined && (this.modePos.x = x);
        y != undefined && (this.modePos.y = y);
        if (!this.model) return;
        //转换2D屏幕坐标系统到3D正交投影下的坐标系统
        let pos = new Point(this.modePos.x, this.modePos.y);
        pos = this.localToGlobal(pos);
        this.camera.convertScreenCoordToOrthographicCoord(new Vector3(pos.x, pos.y, 0), this.orthographicPos);
        this.model.transform.position = this.orthographicPos;
    }

    /**
     * 释放数据
     */
    public onDestroy() {
        this.model && this.model.destroy();
        this.camera && this.camera.destroy();
        this.scene3d && this.scene3d.destroy();
        if (this.modelUrl != null) LoaderManager.release(this.modelUrl);
        super.onDestroy();
    }

}