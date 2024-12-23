import { WindowBase } from "../../../../frame/window/WindowBase";
import { kwsczRepairInfoWindowRunetime } from "./kwsczRepairInfoWindowRunetime";

const { regClass, property } = Laya;

@regClass()
export class kwsczRepairInfoWindow extends WindowBase<kwsczRepairInfoWindowRunetime> {

    protected onInit(): void {
        
    }

    protected onOpen(str: string): void {
        this.owner.TextArea.text = str;
    }

    protected onClose(...param: any): void {
        
    }
}