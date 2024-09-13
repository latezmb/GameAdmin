
export class TimeUtils {

    /**倒计时处理 列：传入60 返回 01:00， time 参数最大60 * 59 */
    public static countDownTimeHandler(time: number): string {
        if (time <= 0) return "00:00";
        let hm: any = Math.floor(time / 60);
        hm = (hm + "").length == 1 ? "0" + hm : hm;
        let second: any = Math.ceil(time % 60);
        second = (second + "").length == 1 ? "0" + second : second;
        return hm + ":" + second;
    }

    // 获取当前时间(天)
    public static get nowDayTime() {
        var date = new Date();
        var arr = date.getFullYear().toString() + this.formatting(date.getMonth().toString()) + this.formatting(date.getDate().toString());
        var str = "";
        for (var i = 0; i < arr.length; i++) {
            str += arr[i];
        }
        return Number(str);
    }

    // 获取当前时间
    public static get nowSecondTime() {
        var date = new Date();
        var arr = date.getFullYear().toString() + this.formatting(date.getMonth().toString()) + this.formatting(date.getDate().toString()) + this.formatting(date.getHours().toString()) + this.formatting(date.getMinutes().toString()) + this.formatting(date.getSeconds().toString());
        var str = "";
        for (var i = 0; i < arr.length; i++) {
            str += arr[i];
        }
        return Number(str);
    }

    // 获取时间戳
    public static get timeStamp() {
        var date = new Date();
        return ((date.getFullYear() - 1970) * 31536000) + (date.getMonth() * 2592000) + (date.getDate() * 86400) + (date.getHours() * 3600) + (date.getMinutes() * 60) + date.getSeconds();
    }

    private static formatting(str: any): string {
        return str.length < 2 ? "0" + str : str;
    }

}