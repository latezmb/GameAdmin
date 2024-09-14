import { WindowBase } from "../../../../frame/window/WindowBase";
import { TipsUtils } from "../../tips/TipsUtils";
import KxtgEvent from "../KxtgEvent";
import KxtgModel, { RepairInfo } from "../KxtgModel";
import { RepairWindowRuntime } from "./RepairWindowRuntime";

const { regClass, property } = Laya;

@regClass()
export class RepairWindow extends WindowBase<RepairWindowRuntime> {

    data: RepairInfo[]

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

    private delEvent(data: RepairInfo) {
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
        let obj = KxtgModel.createRepairInfo();
        this.data.push(obj);
        this.owner.List.array = this.data;
        this.owner.List.tweenTo(this.data.length);
    }

    private resetBtnOnClick() {
        this.data = KxtgModel.newRepairDataList;
        this.owner.List.array = this.data;
    }

    private generateBtnOnClick() {
        if (!KxtgModel.checkData(this.data)) {
            return;
        }
        let str = KxtgModel.generateData(this.data);
        openWindow("RepairInfoWindow", [str]);
    }

}