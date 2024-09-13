const { regClass } = Laya;
import { ProjectMenuWin } from "../MainModel";
import { MainMenuTabItemBase } from "./MainMenuTabItem.generated";

@regClass()
export class MainMenuTabItem extends MainMenuTabItemBase {

    private data: ProjectMenuWin;

    onAwake(): void {
        onClick(this, this.Button, this.onClickHander);
    }

    set_dataSource(data: ProjectMenuWin): void {
        if (!data) return;
        this.data = data;
        this.Button.label = data.txt;
    }

    onClickHander() {
        openWindow(this.data.win);
    }

}