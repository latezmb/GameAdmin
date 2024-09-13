import { FrameConfig } from "../FrameConfig";

export default class Log {

    public static log(string: any) {
        if (FrameConfig.Debug) console.log(string);
    }

    public static error(string: any) {
        if (FrameConfig.Debug) console.log("%c" + string, 'color: red');
    }

    public static info(string: any) {
        if (FrameConfig.Debug) console.log("%c" + string, 'color: #29B6F6');
    }

    public static warn(string: any) {
        if (FrameConfig.Debug) console.log("%c" + string, 'color: yellow');
    }

    public static debug(string: any) {
        if (FrameConfig.Debug) console.log("%c" + string, 'color: #81FF00');
    }

}