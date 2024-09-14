import { WindowBase } from "../../../../frame/window/WindowBase";
import { RepairInfoWindowRuntime } from "./RepairInfoWindowRuntime";

const { regClass, property } = Laya;

@regClass()
export class RepairInfoWindow extends WindowBase<RepairInfoWindowRuntime> {

    protected onInit(): void {
        
    }

    protected onOpen(str: string): void {
        this.owner.TextArea.text = str;
    }

    protected onClose(...param: any): void {
        
    }

}