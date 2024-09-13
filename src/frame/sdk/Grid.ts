import AdBase from "./AdBase";

export default class Grid extends AdBase {

    constructor(id) {
        super();
        this.Id = id;
    }

    create() {
        this.platform.createGridAd({
            adUnitId: this.Id,
            adIntervals: 30
        })
    }

}