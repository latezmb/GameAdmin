import { game } from "../../game/table/Types";
import { LoaderManager } from "../loader/LoaderManager";
import LocalStorage from "./LocalStorage";
export default class DataUtils {

    private static inst: DataUtils;
    static get Inst(): DataUtils {
        if (DataUtils.inst == null) {
            DataUtils.inst = new DataUtils();
        }
        return DataUtils.inst;
    }

    // private tabelName = "userInfo";
    // private userInfoConfig: any;
    // private tabelMap: Map<string, any> = new Map();
    
    private localData;

    initTabel() {
        var obj = {};
        var config = DataUtils.locaInfoConfig;
        var keys = Object.keys(config);
        let types = LoaderManager.ConfigTable.TbLocalInfo.get("type");
        var item;
        let itemName;
        for (var i = 0; i < keys.length; i++) {
            item = config[keys[i]];
            itemName = keys[i];
            switch (types[keys[i]]) {
                case DataType.number:
                    obj[itemName] = LocalStorage.getNumber(itemName, item);
                    break;
                case DataType.string:
                    obj[itemName] = LocalStorage.getString(itemName, item);
                    break;
                case DataType.array:
                    var str = LocalStorage.getObject(itemName, item);
                    if (typeof(str) == "string") {
                        // str = str.slice(1, -1);
                        if (str[0] == '\"') {
                            str = str.slice(1, -1);
                        }
                        if (str == "" || str.length == 0 || str == null) {
                            obj[itemName] = [];
                        }
                        else {
                            str = '{"data":' + str + '}';
                            obj[itemName] = JSON.parse(str).data;
                        }
                    }
                    else {
                        obj[itemName] = str.data;
                    }
                    break;
                case DataType.object:
                    var str = item;
                    if (str.indexOf('\"\"') != -1) {
                        var reg = new RegExp('\"\"', "g");
                        str = str.replace(reg, '\"');
                    }
                    if (str[0] == '\"') {
                        str = str.slice(1, -1);
                    }
                    try{
                        obj[itemName] = LocalStorage.getObject(itemName, JSON.parse(str));
                    }
                    catch(err) {
                        console.error("========== 数据结构出错 ==========");
                        console.error(str);
                        console.error(err);
                    }
                    break
            }
        }
        this.localData = obj;
        // this.tabelMap.set(tabelName, obj);
    }

    public getData(property: string) {
        if (!this.localData) {
            this.initTabel();
        }
        return this.localData[property];
    }

    public setData(property: string, value: any, type: DataType) {
        this.localData[property] = value;
        switch (type) {
            case DataType.number:
                LocalStorage.setNumber(property, this.localData[property]);
                break;
            case DataType.string:
                LocalStorage.setString(property, this.localData[property]);
                break;
            case DataType.array:
                LocalStorage.setObject(property, {data: this.localData[property]});
                break;
            case DataType.object:
                LocalStorage.setObject(property, this.localData[property]);
                break;
        }
    }

    public static get locaInfoConfig(): game.LocalInfo {
        return LoaderManager.ConfigTable.TbLocalInfo.get("locaInfo");
    }

    public static get locaInfoType(): game.LocalInfo {
        return LoaderManager.ConfigTable.TbLocalInfo.get("type");
    }

    /**设置本地存储 */
    public static setLocalInfo(property: string, value: any, type?: DataType) {
        if (!type) {
            type = this.locaInfoType[property];
            if (!type) {
                console.error("属性", property, "不存在类型，检查localInfo表");
                return;
            }
        }
        DataUtils.Inst.setData(property, value, type);
    }

    /**获取本地存储 */
    public static getLocalInfo<T>(property: string) {
        return DataUtils.Inst.getData(property) as T;
    }

    /**获取常量 */
    public static get Constant(): game.Constant {
        return LoaderManager.ConfigTable.TbConstant.get("constValue");
    }

    public get LocalData() {
        return DataUtils.Inst.localData;
    }

}

export enum DataType {
    string = "string",
    number = "number",
    array = "array",
    object = "object"
}