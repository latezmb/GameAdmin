export default class LocalStorage {

    public static setString(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    public static getString(key: string, defaultValue?: any): string {
        return localStorage.getItem(key) || defaultValue;
    }

    public static setNumber(key: string, num: number) {
        this.setString(key, num.toString());
    }

    public static getNumber(key: string, defaultValue?: any): number {
        var num = this.getString(key);
        if (num == null || num == undefined || num == "NaN") num = defaultValue;
        return Number(num);
    }

    /**只能用于存储基本数据类型的Array */
    public static setArray<T>(key: string, arr: Array<T>) {
        this.setString(key, arr.toString());
    }

    public static getArray<T>(key: string, defaultValue?: any): Array<T> | any {
        if (!this.getString(key)) return defaultValue;
        var arr = new Array();
        var strArr = this.getString(key).split(',');
        for(var i = 0; i < strArr.length; i++) {
            arr.push(strArr[i]);
        }
        return arr;
    }

    public static setObject(key: string, obj: Object) {
        this.setString(key, JSON.stringify(obj));
    }

    public static getObject(key: string, defaultValue?: any) {
        var str = this.getString(key);
        return str ? JSON.parse(str) : defaultValue;
    }

}