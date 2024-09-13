import { ViewBase } from "./ViewBase";

export class PanelBase extends ViewBase {

    owner: Laya.Box;

    open() {
        this.show();
    }

    close() {
        super.close();
        this.owner.destroy(true);
    }

    show() {
        this.owner.visible = true;
    }

    hide() {
        this.owner.visible = false;
    }

}