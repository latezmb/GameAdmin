import { WindowBase } from "../../../../frame/window/WindowBase";
import { LoadingWindowRuntime } from "./LoadingWindowRuntime";

const { regClass, property } = Laya;

@regClass()
export class LoadingWindow extends WindowBase<LoadingWindowRuntime> {

    protected onOpen(...param: any): void {
        
    }

}