const { regClass } = Laya;
import KxtgEvent from "../../kxtg/KxtgEvent";
import { KwsczRepairInfo } from "../kwsczModel";
import { kwsczRepairItemBase } from "./kwsczRepairItem.generated";

@regClass()
export class kwsczRepairItem extends kwsczRepairItemBase {
    private data: KwsczRepairInfo;

    onAwake(): void {
        onClick(this, this.delBtn, this.delOnClick);
        this.idInput.on(Laya.Event.INPUT, this, this.inputChange);
        this.levelInput.on(Laya.Event.INPUT, this, this.inputChange);
        this.versionInput.on(Laya.Event.INPUT, this, this.inputChange);
        this.skinInput.on(Laya.Event.INPUT, this, this.inputChange);
        this.albumInput.on(Laya.Event.INPUT, this, this.inputChange);
    }

    set_dataSource(data: KwsczRepairInfo): void {
        if (!data) return;
        this.data = data;
        this.idInput.text = data.id;
        this.levelInput.text = data.level;
        this.versionInput.text =data.version;
        this.skinInput.text = data.skin;
        this.albumInput.text = data.albumFragNum;
        this.coinInput.text = data.coinNum;
    }

    private delOnClick() {
        sendEvent(KxtgEvent.DEL_EVELT, [this.data]);
    }

    private inputChange() {
        this.data.id = this.idInput.text;
        this.data.level = this.levelInput.text;
        this.data.version = this.versionInput.text;
        this.data.skin = this.skinInput.text;
        this.data.albumFragNum = this.albumInput.text;
        this.data.coinNum = this.coinInput.text;
    }
}