import { Singleton } from "../../frame/base/Singleton";
import DataUtils, { DataType } from "../data/DataUtils";
import { ProxyBase } from "./ProxyBase";

export class ProxyManager extends Singleton {

    private proxyList: Array<ProxyBase>

    constructor() {
        super();
        this.proxyList = [];
    }

    public init() {
        for (let item of this.proxyList) {
            item.init();
        }
    }

    register(proxy: ProxyBase) {
        if (this.proxyList.indexOf(proxy) != -1) return;
        this.proxyList.push(proxy);
    }

}