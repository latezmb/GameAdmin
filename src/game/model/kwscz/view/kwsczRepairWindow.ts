import { WindowBase } from "../../../../frame/window/WindowBase";
import KxtgEvent from "../../kxtg/KxtgEvent";
import { TipsUtils } from "../../tips/TipsUtils";
import kwsczModel, { KwsczRepairInfo } from "../kwsczModel";
import { kwsczRepairWindowRuntime } from "./kwsczRepairWindowRuntime";

const { regClass, property } = Laya;

@regClass()
export class kwsczRepairWindow extends WindowBase<kwsczRepairWindowRuntime> {

    data: KwsczRepairInfo[]

    protected onInit(): void {
        onClick(this, this.owner.addBtn, this.addBtnOnClick);
        onClick(this, this.owner.resetBtn, this.resetBtnOnClick);
        onClick(this, this.owner.generateBtn, this.generateBtnOnClick);
        addEvent(KxtgEvent.DEL_EVELT, this, this.delEvent);
    }

    protected onOpen(...param: any): void {
        this.resetBtnOnClick();
    }

    protected onClose(...param: any): void {
        
    }

    private delEvent(data: KwsczRepairInfo) {
        if (this.data.length == 1) {
            TipsUtils.showTips("至少保留一个！");
            return;
        }
        let index = this.data.indexOf(data);
        if (index == -1) return;
        this.data.splice(index, 1);
        this.owner.List.array = this.data;
    }

    private addBtnOnClick() {
        let obj = kwsczModel.createKwsczRepairInfo();
        this.data.push(obj);
        this.owner.List.array = this.data;
        this.owner.List.tweenTo(this.data.length);
    }

    private resetBtnOnClick() {
        this.data = kwsczModel.newRepairDataList;
        this.owner.List.array = this.data;
    }

    private generateBtnOnClick() {
        if (!kwsczModel.checkData(this.data)) {
            return;
        }
        let str = kwsczModel.generateData(this.data);
        openWindow("KwsczRepairInfoWindow", [str]);
    }

}