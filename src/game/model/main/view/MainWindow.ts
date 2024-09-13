import { WindowBase } from "../../../../frame/window/WindowBase";
import MainModel from "../MainModel";
import { MainWindowRuntime } from "./MainWindowRuntime";

const { regClass, property } = Laya;

@regClass()
export class MainWindow extends WindowBase<MainWindowRuntime> {

    checkOnShow: boolean = false;
    checkOnHide: boolean = false;

    // private btns = [
    //     {txt: "修复关卡", win: "RepairWindow"}
    // ];

    protected onInit(): void {
        
    }

    protected onOpen(...param: any): void {
        this.owner.List.array = MainModel.dataIdList;
    }

    protected onClose(...param: any): void {
        
    }

}