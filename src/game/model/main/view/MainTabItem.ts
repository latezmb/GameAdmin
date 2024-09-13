const { regClass } = Laya;
import MainModel, { ProjectMenu } from "../MainModel";
import { MainTabItemBase } from "./MainTabItem.generated";

@regClass()
export class MainTabItem extends MainTabItemBase {

    private data: ProjectMenu;

    onAwake(): void {
        onClick(this, this.Button, this.onClickHander);
    }

    set_dataSource(id: number): void {
        if (!id) return;
        this.data = MainModel.getDataById(id);
        this.Button.label = this.data.title;
    }

    onClickHander() {
        openWindow("MainMenuWindow", [this.data.id]);
    }
}