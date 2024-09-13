/**
 * string 的拓展类
 */
export class StringExpand {

    /**
     * 根据参数替换 %s 占位符
     * @param str 字符串
     * @param param 参数
     * @returns 替换后的字符串
     */
    public static stringFormat(str: string, ...param): string {
        var arr = str.split("%s");
        str = "";
        for (var i = 0; i < arr.length; i++) {
            str += arr[i];
            if (param[i]) str += param[i];
        }
        return str;
    }

}