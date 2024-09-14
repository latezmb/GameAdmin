import { FrameConfig } from "../../../frame/FrameConfig";
import { WindowBase } from "../../../frame/window/WindowBase";
import { TipsUtils } from "./TipsUtils";
import { FractionItem } from "./runtime/FractionItem";
import { TipsItem } from "./runtime/TipsItem";
import { TipsWindowRuntime } from "./runtime/TipsWindowRuntime";

const { regClass, property } = Laya;

@regClass()
export class TipsWindow extends WindowBase<TipsWindowRuntime> {

    // 开始y值
    startY: number = 568;
    // 间隔
    spaceY: number = 10;
    showList: Array<TipsItem>;
    hideList: Array<TipsItem>;
    itemPrefrab: Laya.Prefab;
    // 最大显示提示的
    maxShowTextNum: number = 5;

    // 分数
    showFractionList: Array<FractionItem>;
    hideFractionList: Array<FractionItem>;
    fractionPrefab: Laya.Prefab;
    fractionTipNum: number = 0;

    onInit(): void {
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
    showFraction(num: number, pos: Laya.Point) {
        pos = this.owner.globalToLocal(pos);
        let item: FractionItem;
        if (this.hideFractionList.length > 0) {
            item = this.hideFractionList.shift();
            item.visible = true;
        }
        if (!item) {
            item = this.fractionPrefab.create() as FractionItem;
            this.owner.addChild(item);
            this.fractionTipNum++;
        }
        item.setFraction(num);
        item.pos(pos.x, pos.y);
        Laya.timer.once(300, this, () => {
            let index = this.showFractionList.indexOf(item);
            if (index != -1) this.showFractionList.splice(index, 1);
            item.visible = false;
            this.hideFractionList.push(item);
            this.checkCloseWin();
        })
    }

    showTips(str: string) {
        let item: TipsItem;
        if (this.hideList.length > 0) {
            item = this.hideList.shift();
        }
        if (this.showList.length >= this.maxShowTextNum) {
            item = this.showList.shift();
            item.clearTime();
        }
        if (!item) {
            item = this.itemPrefrab.create() as TipsItem;
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
        let item: TipsItem;
        for (let i = this.showList.length - 1; i >=0 ; i--) {
            item = this.showList[i];
            item.setLayoutY(y);
            y -= item.height + this.spaceY;
        }
    }

    reset(item: TipsItem) {
        let index = this.showList.indexOf(item);
        if (index == -1) return;
        this.showList.splice(index, 1);
        this.hideList.push(item);
        item.visible = false;
        this.checkCloseWin();
    }

    checkCloseWin() {
        if (this.showList.length < 1 && this.hideFractionList.length >= this.fractionTipNum) this.closeWin();
    }

}