const { regClass } = Laya;
import { FractionItemBase } from "./FractionItem.generated";

@regClass()
export class FractionItem extends FractionItemBase {

    private color = "#0052ff";

    setFraction(num: number) {
        this.content.graphics.clear();
        this.content.graphics.fillText(`+${num}`, 0, 0, "30px Bahnschrift", this.color, "center");
    }

}