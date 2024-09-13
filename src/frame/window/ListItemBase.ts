import { LoaderManager } from "../loader/LoaderManager";

export class ListItemBase extends Laya.Script {

    private skinList = [];

    onAwake(): void {
        Laya.timer.loop(2000, this, this.timer);
    }

    /**注册要释放的url路劲 */
    registerReleseUrl(... urls) {
        for(let url of urls) {
            if (url == null || url == "") continue;
            this.skinList.push(url);
        }
    }

    /**去掉要释放的路劲（如果存在） */
    deleteUrl(url) {
        let index = this.skinList.indexOf(url);
        if (index == -1) return;
        this.skinList.splice(index, 1);
    }

    timer() {
        this.releaseAssets();
    }

    // 释放掉所有注册的路径
    private releaseAssets() {
        if (this.skinList.length < 0) return;
        for (let item of this.skinList) {
            LoaderManager.release(item);
        }
        this.skinList.length = 0;
    }
    
    onDestroy(): void {
        Laya.timer.clear(this, this.releaseAssets);
        this.releaseAssets();
        offAllEvent(this);
    }

}