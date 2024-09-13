import { Singleton } from "../base/Singleton";
import DataUtils, { DataType } from "../data/DataUtils";
import { TimeUtils } from "./TimeUtils";

export class TimeManger extends Singleton {

    /**一天时间戳(秒级) */
    public static readonly ONET_DATA_TIME_STAMP: number = 86400;

    /**每秒触发 */
    static TIME_SECOND = "TIME_SECOND";
    /**离线触发事件 */
    static TIME_OUT_LINE = "TIME_OUT_LINE";
    /**每秒事件 */
    static SECOND_EVENT = "TimeEvent.SECOND_EVENT";
    /**跨天 */
    static CROSS_DAY = "TimeEvent.CROSS_DAY";

    /**距离上次离线时间戳(秒级)， 为0则是首次登陆 */
    public outLineTimeStamp: number = 0;
    /**当天0点时间戳 */
    private todayZeroTime: number;
    /**时间对象 */
    private _date: Date;
    /**在线时长(秒) */
    public inGameTime: number = 0;

    constructor() {
        super();
        this._date = new Date();
        this.todayZeroTime = this.getMidnightTimestamp;
        this.outLineTimer();
        setInterval(this.timerHander.bind(this), 1000);
    }

    init() {
    }

    public get date() {
        this._date.setTime(Date.now());
        return this._date;
    }

    // 离线处理
    private outLineTimer() {
        var outLineTime = DataUtils.getLocalInfo<number>("outLineTime");
        if (outLineTime == 0) {
            // 首次登陆
            this.saveOutLineTime();
            return;
        }
        // 处理离线事件
        this.outLineTimeStamp = this.secondTimeStamp - outLineTime;
    }

    /**当天0点时间戳(秒) */
    public get getMidnightTimestamp(): number {
        // const now = new Date();
        const now = this.date;
        now.setHours(0, 0, 0, 0);
        return Math.floor(now.getTime() * 0.001);
    }

    /**
     * 返回周日0点的时间戳（秒）
     * @param weekOffset 周的偏移，默认0当前周，1下一周，-1上一周
     * @returns 
     */
    public getSundayTimestamp(weekOffset: number = 0): number {
        // 获取当前日期的星期几，0 表示周日，1 表示周一，依次类推
        let date = this.date;
        const dayOfWeek = date.getDay();

        // 如果今天是周日，保持为 0，其他情况下向前调整到上个周日
        let diff = dayOfWeek === 0 ? 0 : -dayOfWeek;

        diff += weekOffset * 7;

        // 设置日期为上周日
        date.setDate(date.getDate() + diff);
        date.setHours(0, 0, 0, 0); // 设置时间为 0 点

        return Math.floor(date.getTime() * 0.001);
    }

    /**保存离线时间 */
    private saveOutLineTime() {
        if (this.secondTimeStamp % 5 != 0) return;
        DataUtils.setLocalInfo("outLineTime", this.secondTimeStamp, DataType.number);
    }

    /**每秒处理 */
    private timerHander() {
        this.inGameTime++;
        this.saveOutLineTime();
        if (this.todayZeroTime != this.getMidnightTimestamp) {
            this.todayZeroTime = this.getMidnightTimestamp;
            sendEvent(TimeManger.CROSS_DAY);
        }
        sendEvent(TimeManger.TIME_SECOND, [this.secondTimeStamp]);
    }

    /**毫秒级时间戳 */
    public get time(): number {
        return Date.now();
    }

    /**秒级时间戳 */
    public get secondTimeStamp(): number {
        return Math.floor(Date.now() * 0.001);
    }

    /**
     * 获取今天的时间的字符串
     * @param spaceStr 分隔符号，比如 “/” ，2024/6/9
     */
    public getTodayTxt(spaceStr: string = "/") {
        // const now = new Date();
        const now = this.date;
        const year = now.getFullYear();
        const month = ('0' + (now.getMonth() + 1)).slice(-2);
        const day = ('0' + now.getDate()).slice(-2);
        // const hours = ('0' + now.getHours()).slice(-2);
        // const minutes = ('0' + now.getMinutes()).slice(-2);
        // const seconds = ('0' + now.getSeconds()).slice(-2);
        return year + spaceStr + month + spaceStr + day;
    }

    /**
     * 00:00
     */
    public get todayTime(): string {
        // const now = new Date();
        const now = this.date;
        const hours = ('0' + now.getHours()).slice(-2);
        const minutes = ('0' + now.getMinutes()).slice(-2);
        return hours + ":" + minutes;
    }

    /**type(1将秒数格式化为HH:MM:SS的形式),
     * (2HH时MM分SS秒),
     * (3MM:SS),
     * (4MM分SS秒) 
     * */
    public formatSeconds(value: number, type: number = 1) {
        value < 1 && (value = 0);
        let secondTime: any = Number(value);
        let minuteTime: any = 0;
        let hourTime: any = 0;
        if (secondTime >= 60) {
            minuteTime = Math.floor(Number(secondTime / 60));
            secondTime = Number(secondTime % 60);
            if (type != 3 && type != 4) {
                if (minuteTime >= 60) {
                    hourTime = Math.floor(Number(minuteTime / 60));
                    minuteTime = Number(minuteTime % 60);
                }
            }
        }
        let res = "";
        if (type == 3) {
            minuteTime = minuteTime < 10 ? "0" + minuteTime : minuteTime;
            secondTime = secondTime < 10 ? "0" + secondTime : secondTime;
            res = minuteTime + ":" + secondTime;
        }
        else if (type == 4) {
            if (hourTime != 0 || minuteTime != 0) {
                res += minuteTime + "分";
            }
            if (secondTime != 0) res += secondTime + "秒";
        }
        else if (type == 2) {
            if (hourTime != 0) {
                res += hourTime + "时";
            }
            if (hourTime != 0 || minuteTime != 0) {
                res += minuteTime + "分";
            }
            if (secondTime != 0) res += secondTime + "秒";
        }
        else {
            // 补0
            hourTime = hourTime < 10 ? "0" + hourTime : hourTime;
            minuteTime = minuteTime < 10 ? "0" + minuteTime : minuteTime;
            secondTime = secondTime < 10 ? "0" + secondTime : secondTime;
            res = hourTime + ":" + minuteTime + ":" + secondTime;
        }
        return res;
    }

    /**
     * x天:x时：x分：x秒
     * @param seconds 时间戳
     * @returns 
     */
    public formatTimestamp(seconds: number) {
        // 定义一天、一小时、一分钟的秒数
        const day = Math.floor(seconds / (24 * 3600));
        const hour = Math.floor((seconds % (24 * 3600)) / 3600);
        const minute = Math.floor((seconds % 3600) / 60);
        const second = Math.floor(seconds % 60);
    
        // 构造格式化字符串
        let result = '';
    
        if (day > 0) {
            result += `${day}天`;
        }
    
        if (hour > 0 || day > 0) {
            result += `${hour}时`;
        }
    
        if (minute > 0 || hour > 0 || day > 0) {
            result += `${minute}分`;
        }
    
        result += `${second}秒`;
    
        return result;
    }

    /**
     * 00:00:00:00
     * @param seconds 时间戳
     * @returns 
     */
    public formatTimestamp1(seconds: number) {
        // 定义一天、一小时、一分钟的秒数
        const day = Math.floor(seconds / (24 * 3600));
        const hour = Math.floor((seconds % (24 * 3600)) / 3600);
        const minute = Math.floor((seconds % 3600) / 60);
        const second = Math.floor(seconds % 60);
    
        // 构造格式化字符串
        let result = '';
    
        if (day > 0) {
            result += day < 10 ? "0" + day : day;
            result += ":";
        }
    
        if (hour > 0 || day > 0) {
            result += hour < 10 ? "0" + hour : hour;
            result += ":";
        }
        else {
            result += "00:"
        }
    
        if (minute > 0 || hour > 0 || day > 0) {
            result += minute < 10 ? "0" + minute : minute;
            result += ":";
        }
        else {
            result += "00:"
        }
    
        result += second < 10 ? "0" + second : second;
    
        return result;
    }

}