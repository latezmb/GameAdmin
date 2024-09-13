import { FrameConfig } from "../FrameConfig";
import { LoaderManager } from "../loader/LoaderManager";
import { tween } from "../tween/tween";
import { ViewBase } from "./ViewBase";

export class WindowBase<T extends Laya.Box> extends ViewBase {

    owner: T;
    winName: string;
    /**被触发onHide时要不要调用hide() */
    checkOnHide: boolean = true;
    /**被触发onShow时要不要调用show() */
    checkOnShow: boolean = true;

    // 自己打开或者关闭时否是要触发别的 hide() show()
    selfOpenNeedCheckOtherHide: boolean = true;
    selfCloseNeedCheckOtherShow: boolean = true;

    /**打开窗口动画 */
    openWinAni: boolean = true;
    /**关闭窗口动画 */
    closeWinAni: boolean = true;

    /**点击背景空白的地方关闭界面 */
    clickBgBoxCloseWin: boolean = false;

    onAwake(): void {
        this.owner.size(Laya.stage.width, Laya.stage.height);
        if ((this.owner as any)["closeBtn"] != null) onClick(this, (this.owner as any)["closeBtn"], this.closeWin);
        if (this.clickBgBoxCloseWin) this.owner.on(Laya.Event.CLICK, this, this.closeWin);
        this.onInit();
    }

    open(...param: any[]) {
        this.owner.visible = true;
        this.onOpen.call(this, ...param);
        if (this.openWinAni) {
            this.owner.x = -this.owner.width;
            tween(this.owner as Laya.Box)
                .to(200, { x: 0 })
                .start();
        }
        else {
            this.onOpen.call(this, ...param);
        }
    }

    close(...param: any[]) {
        if (this.closeWinAni) {
            this.onClose.call(this, ...param);
            super.close();
            this.owner.x = 0;
            tween(this.owner as Laya.Box)
                .to(200, { x: this.owner.width })
                .call(() => {
                    this.owner.destroy(true);
                })
                .start();
        }
        else {
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

    async createPanel(url: string, parent?: Laya.UIComponent) {
        parent = parent || this.owner;
        let prefab: Laya.Prefab = await LoaderManager.load(url);
        let panel = prefab.create();
        parent.addChild(panel);
        return panel;
    }

    /**
     * 适配列表最终Y方向行数
     * @param itemHeight item的高度
     * @param list 适配的列表
     */
    public adapterListRepeatYByY(itemHeight: number, list: Laya.List) {
        let listHeight = list.height;
        let num = Math.floor(listHeight / itemHeight);
        if (listHeight % itemHeight != 0) num += 1;
        list.repeatY = num;
    }

    /**
     * 以上方为对齐点
     * @param node 节点
     */
    public adapterTopY(node: Laya.UIComponent) {
        node.y = node.y + FrameConfig.fitHeight / 2;
    }

    /**
     * 以下方对齐点
     * @param node 
     */
    public adapterButtomY(node: Laya.UIComponent) {
        node.y = node.y + FrameConfig.fitHeight;
    }

    /**适配刘海屏的位置 */
    public fringeScreenAdapter(node: Laya.UIComponent, changeY: number = 60) {
        if (!FrameConfig.isFringeScreen) return;
        node.y += changeY;
    }

    /**窗口初始化 */
    protected onInit() { };
    /**每次打开调用 */
    protected onOpen(...param: any) { };
    /**每次关闭调用 */
    protected onClose(...param: any) { };
    /**被覆盖之后再显示到最顶调用 */
    onShow() { };
    /**被覆盖时调用 */
    onHide() { };

    /**适配最大尺寸 */
    protected AutoSizeToMax(...arr: Array<Laya.Sprite>) {
        for (let item of arr) {
            item.size(Laya.stage.width, Laya.stage.height);
        }
    }

}