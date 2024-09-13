import { FrameConfig } from "../FrameConfig";

export enum AuthorizeType {
    // 用户信息
    userInfo = "userInfo",
    // 模糊地理位置
    userFuzzyLocation = "scope.userFuzzyLocation",
    // 微信朋友信息
    WxFriendInteraction = "WxFriendInteraction",
}

export class OpenDataManager {

    private static configInfo = {
        userInfo: {
            scope: "scope.userInfo",
            tips: "用户信息"
        },
        WxFriendInteraction: {
            scope: "scope.WxFriendInteraction",
            tips: "微信朋友信息"
        }
    }

    /**
     * 获得指定类型是否授权
     * @param type 
     * @param callBack 
     * @param caller 
     * @returns 
     */
    public static getAuthorizeState(type: AuthorizeType, callBack: Function, caller?: any) {
        let platform = FrameConfig.platform;
        if (!platform) {
            return false;
        }
        platform.getSetting({
            success: (res: any) => {
                let scope = OpenDataManager.configInfo[type].scope;
                caller ? callBack.call(caller, [res.authSetting[scope]]) : callBack(res.authSetting[scope]);
            },
            fail: (res) => {
                caller ? callBack.call(caller, [false]) : callBack(false);
            }
        })
    }
    
    /**获得数据授权 */
    public static getAuthorizeByType(type: AuthorizeType, finishCallBack: Function, loseCallBack?: Function, caller?: any) {
        let platform = FrameConfig.platform;
        if (!platform) {
            if (loseCallBack) caller ? loseCallBack.call(caller) : loseCallBack();
            return;
        }
        platform.getSetting({
            success: (res: any) => {
                let scope = OpenDataManager.configInfo[type].scope;
                let currentScope = res.authSetting[scope];
                if (currentScope == undefined || currentScope == null) {
                    // 之前没有申请或该权限
                    platform.authorize({
                        scope: scope,
                        success: (res: any) => {
                            caller ? finishCallBack.call(caller) : finishCallBack();
                        },
                        fail: (err: any) => {
                            console.error(err);
                            if (loseCallBack) caller ? loseCallBack.call(caller) : loseCallBack();
                        }
                    });

                }
                else if (currentScope == false) {
                    // 之前申请过该权限但被拒绝了, 如果配置 deniedFun 函数，则有执行 deniedFun 方法，
                    // 如果没有配置 deniedFun 函数，走默认逻辑，打开设置界面
                    platform.showModal({
                        title: '权限申请',
                        content: `点击 “确定” 按钮，打开 “${OpenDataManager.configInfo[type].tips}” 的权限设置`,
                        cancelText: '取消',
                        confirmText: '确定',
                        success(res: any) {
                            if (res.confirm) {
                                platform.openSetting({
                                    success: function (res: any) {
                                        let cScope = res.authSetting[scope];
                                        if (cScope) {
                                            caller ? finishCallBack.call(caller) : finishCallBack();
                                        }
                                        else {
                                            if (loseCallBack) caller ? loseCallBack.call(caller) : loseCallBack();
                                        }
                                    },
                                    fail: (res) => {
                                        if (loseCallBack) caller ? loseCallBack.call(caller) : loseCallBack();
                                    }
                                });
                            }
                        }
                    });
                }
                else {
                    caller ? finishCallBack.call(caller) : finishCallBack();
                    console.log("已经获得该权限");
                }
            },
            fail: (res) => {
                console.log("失败", res);
                if (loseCallBack) caller ? loseCallBack.call(caller) : loseCallBack();
            }
        });
    }


    /**
     * 对用户托管数据进行写数据操作。允许同时写多组 KV 数据
     * @param args 记录的值
     */
    public static setUserCloudStorage(... args: Array<UserCloundDate>) {
        if (!FrameConfig.platform) return;
        FrameConfig.platform.setUserCloudStorage({
            KVDataList: args
        });
    }

}

export interface UserCloundDate {
    key: string,
    value: string,
}