import { FrameConfig } from "../FrameConfig";
import SDKUtils from "./SDKUtils";

export default class AdBase {

    public AdObj: any = null;
    public platform: any = FrameConfig.platform;
    public Id: string = null;
    public Type: string = "default";
    public IsCreate: boolean = true;

}