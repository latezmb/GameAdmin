import AdBase from "./AdBase";

export default class Custom extends AdBase {

    isdestroy: boolean = false;
    createCanShow: boolean = false;
    showNum: number = 0;

    constructor(id, style: CustomType) {
        super();
        this.Id = id;
        this.create(style);
    }

    create(style) {
        var Obj = this.platform.createCustomAd({
            adUnitId: this.Id,
            style: style
        })
        Obj.onLoad(() => {
            console.log("原生广告加载成功！");
            Laya.timer.clear(this, this.create);
            if(this.isdestroy) {
                Obj.hide();
                Obj.destroy();
                return;
            }
            this.AdObj = Obj;
            if (this.createCanShow) this.show();
        })
        Obj.onError((err) => {
            console.error("原生广告加载失败！");
            Laya.timer.clear(this, this.create);
            Laya.timer.once(3000, this, () => {this.create(style)});
        });
    }

    show() {
        this.createCanShow = true;
        if(!this.AdObj) return;
        if(this.AdObj.isShow()) return;
        this.AdObj.show()
            .then(() => {
                this.showNum++;
                console.log("原生显示成功！");
                if(!this.createCanShow) this.hide();
            })
            .catch((err) => {
                console.log("原生显示失败！")
            });
    }

    hide() {
        this.createCanShow = false;
        if(!this.AdObj) return;
        this.AdObj.hide();
    }

    destroy() {
        this.isdestroy = true;
        // var index = SDK.Inst.mCustom.indexOf(this);
        // if (index == -1) return;
        // SDK.Inst.mCustom.splice(index, 1);
        if (this.AdObj) {
            this.AdObj.hide();
            this.AdObj.destroy();
        }
    }

}

export interface CustomType {
    top: number,
    left: number
}