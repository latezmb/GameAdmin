import { ScriptBase } from "../base/ScriptBase";
import { LoaderManager } from "../loader/LoaderManager";

export class ViewBase extends ScriptBase {

    private needReleaseUrlList = [];

    /**添加需要释放的资源路径 */
    addReleaseUrl(url: string) {
        if (this.needReleaseUrlList.indexOf(url) != -1) return;
        this.needReleaseUrlList.push(url);
    }

    close() {
        offAllEvent(this);
        // this.releaseResources(this.owner);
        for (let url of this.needReleaseUrlList) {
            LoaderManager.clearTextureRes(url);
        }
        LoaderManager.gc();
    }

    releaseResources(node: any) {
        if (node.url) {
            LoaderManager.clearTextureRes(node.url);
        }
        else if (node.skin) {
            LoaderManager.clearTextureRes(node.skin);
        }
        for (let i = 0; i < node.numChildren; i++) {
            this.releaseResources(node.getChildAt(i));
        }
    }

}