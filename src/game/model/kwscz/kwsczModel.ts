import { TimeManger } from "../../../frame/time/TimeManger";
import { TipsUtils } from "../tips/TipsUtils";

export default class kwsczModel {

    public static get newRepairDataList() {
        let list: KwsczRepairInfo[] = [];
        list.push(this.createKwsczRepairInfo());
        return list;
    }

    public static createKwsczRepairInfo() {
        let obj: KwsczRepairInfo = {
            id: "",
            level: "",
            version: "",
            skin: "",
            albumFragNum: "",
            coinNum: ""
        }
        return obj;
    }

    public static get version() {
        let version = TimeManger.Inst().secondTimeStamp;
        return version;
    }

    /**生成数据 */
    public static generateData(list: KwsczRepairInfo[]): string {
        let version = this.version;
        let data = {};
        for(let info of list) {
            let obj: any = {};
            obj.version = (!!info.version && info.version != "") ? info.version : version;
            let tempData: any = {};
            if (info.level) {
                tempData.level = info.level;
            }
            if (info.skin.length > 0) {
                tempData.skin = [];
                let arr = info.skin.split("|");
                for(let item of arr) {
                    tempData.skin.push(Number(item));
                }
            }
            obj.data = tempData;
            data[info.id] = obj;
            
            let rewards = [];
            // 画册碎片
            if (info.albumFragNum) {
                rewards.push([2, Number(info.albumFragNum)]);
            }
            // 金币
            if (info.coinNum) {
                rewards.push([1, Number(info.coinNum)]);
            }
            if (rewards.length > 0) {
                tempData["rewards"] = rewards;
            }
        }
        return JSON.stringify(data);
    }

    /**检测数据 */
    public static checkData(list: KwsczRepairInfo[]): boolean {
        for(let i = 0; i < list.length; i++) {
            let info = list[i];
            if (info.id.length < 1) {
                TipsUtils.showTips("id不能为空，第" + (i + 1) + "个");
                return false;
            }
            // if (info.level.length < 1) {
            //     TipsUtils.showTips("关卡不能为空，第" + (i + 1) + "个");
            //     return false;
            // }
            if (info.skin.length > 0) {
                let arr = info.skin.split("|");
                for(let item of arr) {
                    if (!Number.isNaN(Number(item))) continue;
                    TipsUtils.showTips("第" + (i + 1) + "个" + "皮肤格式不对，id|id");
                    return false;
                }
            }
        }
        return true;
    }

}

export interface KwsczRepairInfo {
    id: string,
    level?: string,
    version: string,
    skin?: string,
    albumFragNum?: string,
    coinNum?: string,
}  