const { regClass } = Laya;
import KxtgEvent from "../KxtgEvent";
import { RepairInfo } from "../KxtgModel";
import { RepairItemBase } from "./RepairItem.generated";

@regClass()
export class RepairItem extends RepairItemBase {

    private data: RepairInfo;

    onAwake(): void {
        onClick(this, this.delBtn, this.delOnClick);
        this.idInput.on(Laya.Event.INPUT, this, this.inputChange);
        this.levelInput.on(Laya.Event.INPUT, this, this.inputChange);
        this.versionInput.on(Laya.Event.INPUT, this, this.inputChange);
        this.skinInput.on(Laya.Event.INPUT, this, this.inputChange);
    }

    set_dataSource(data: RepairInfo): void {
        if (!data) return;
        this.data = data;
        this.idInput.text = data.id;
        this.levelInput.text = data.level;
        this.versionInput.text =data.version;
        this.skinInput.text = data.skin;
    }

    private delOnClick() {
        sendEvent(KxtgEvent.DEL_EVELT, [this.data]);
    }

    private inputChange() {
        this.data.id = this.idInput.text;
        this.data.level = this.levelInput.text;
        this.data.version = this.versionInput.text;
        this.data.skin = this.skinInput.text;
    }

}