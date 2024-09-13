import { WindowBase } from "../../../../frame/window/WindowBase";
import MainModel, { ProjectMenu } from "../MainModel";
import { MainMenuWindowRuntime } from "./MainMenuWindowRuntime";

const { regClass, property } = Laya;

@regClass()
export class MainMenuWindow extends WindowBase<MainMenuWindowRuntime> {

    private data: ProjectMenu;

    protected onInit(): void {
        
    }

    protected onOpen(id: number): void {
        this.data = MainModel.getDataById(id);
        this.owner.titletxt.text = this.data.title;
        this.owner.List.array = this.data.wins;
    }

    protected onClose(...param: any): void {
        
    }

}