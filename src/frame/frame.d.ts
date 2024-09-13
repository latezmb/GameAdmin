/**
 * 添加监听
 * @param region 执行域
 * @param btn 设置监听控件
 * @param clickFunc 监听函数
 * @param data 参数
 * @param music 是否播放音乐
 * @param isScale 是否缩放
 * @param maoPao true阻止冒泡，反之亦然
 * @param mouseDownFunc 按下监听的
 * @param mouseUpFunc 抬起监听
 * @param mouseMoveFunc 移动监听
 */

declare function onClick(
    region: any,
    btn: Laya.UIComponent | any,
    clickFunc?: Function,
    data?: Array<any>,
    music: boolean = true,
    isScale: boolean = true,
    maoPao: boolean = true,
    mouseDownFunc?: Function,
    mouseUpFunc?: Function,
    mouseMoveFunc?: Function,
)
/**
 * 窗口是否开启
 * @param winName 窗口名
 * @returns 
 */
declare function isShowWin(winName: string): boolean;
/**
 * 窗口是否开启
 * @param winName 窗口名
 * @returns 
 */
declare function getWinScript<T>(winName: string): T;
/**
 * 打开窗口
 * @param winName 窗口名
 * @param args 参数
 */
declare function openWindow(winName: string, args?: any[], closeCallBack?: Function, caller?: any, openCallBack?: Function): Promise<any>;
/**
 * 关闭窗口
 * @param winName 窗口名
 * @param args 参数
 */
declare function closeWindow(winName: string, args?: any[]);
/**
 * 添加监听事件
 * @param event 
 * @param caller 
 * @param callFun 
 * @param args 
 */
declare function addEvent(event: string, caller: any, callFun: Function, args?: any[]);
/**
 * 取消监听事件
 * @param event 
 * @param caller 
 * @param callFun 
 * @param args 
 */
declare function offEvent(event: string, caller: any, callFun: Function);
/**
 * 取消指定对象所有监听事件
 * @param caller 
 */
declare function offAllEvent(caller: any);

/**
 * 派发事件
 * @param event 派发事件类型
 * @param data 数据
 */
declare function sendEvent(event: string, data?: any);


declare class Tween<T> {
    constructor(target?: T | null);
    /**
     * @en Sets tween tag
     * @zh 设置缓动的标签
     * @method tag
     * @param tag @en The tag set for this tween @zh 为当前缓动设置的标签
     */
    tag(tag: number): this;
    /**
     * @en
     * Insert an action or tween to this sequence.
     * @zh
     * 插入一个 tween 到队列中。
     * @method then
     * @param other @en The rear tween of this tween @zh 当前缓动的后置缓动
     */
    then(other: Tween<T>): Tween<T>;
    /**
     * @en
     * Sets tween target.
     * @zh
     * 设置 tween 的 target。
     * @method target
     * @param target @en The target of this tween @zh 当前缓动的目标对象
     */
    target(target: T): Tween<T | undefined>;
    /**
     * @en
     * Start this tween.
     * @zh
     * 运行当前 tween。
     */
    start(): Tween<T>;
    /**
     * @en
     * Stop this tween.
     * @zh
     * 停止当前 tween。
     */
    stop(): Tween<T>;
    /**
     * @en
     * Clone a tween.
     * @zh
     * 克隆当前 tween。
     * @method clone
     * @param target @en The target of clone tween @zh 克隆缓动的目标对象
     */
    clone(target: T): Tween<T>;
    /**
     * @en
     * Integrate all previous actions to an action.
     * @zh
     * 将之前所有的 action 整合为一个 action。
     */
    union(): Tween<T>;
    /**
     * @en
     * Add an action which calculate with absolute value.
     * @zh
     * 添加一个对属性进行绝对值计算的 action。
     * @method to
     * @param duration @en Tween time, in seconds @zh 缓动时间，单位为秒
     * @param props @en List of properties of tween @zh 缓动的属性列表
     * @param opts @en Optional functions of tween @zh 可选的缓动功能
     * @param opts.progress @en Interpolation function @zh 缓动的速度插值函数
     * @param opts.easing @en Tween function or a lambda @zh 缓动的曲线函数或lambda表达式
     */
    to(duration: number, props: __private._cocos_tween_tween__ConstructorType<T>, opts?: ITweenOption): Tween<T>;
    /**
     * @en
     * Add an action which calculate with relative value.
     * @zh
     * 添加一个对属性进行相对值计算的 action。
     * @method by
     * @param duration @en Tween time, in seconds @zh 缓动时间，单位为秒
     * @param props @en List of properties of tween @zh 缓动的属性列表
     * @param opts @en Optional functions of tween @zh 可选的缓动功能
     * @param [opts.progress]
     * @param [opts.easing]
     * @return {Tween}
     */
    by(duration: number, props: __private._cocos_tween_tween__ConstructorType<T>, opts?: ITweenOption): Tween<T>;
    /**
     * @en
     * Directly set target properties.
     * @zh
     * 直接设置 target 的属性。
     * @method set
     * @param props @en List of properties of tween @zh 缓动的属性列表
     * @return {Tween}
     */
    set(props: __private._cocos_tween_tween__ConstructorType<T>): Tween<T>;
    /**
     * @en
     * Add an delay action.
     * @zh
     * 添加一个延时 action。
     * @method delay
     * @param duration @en Delay time of this tween @zh 当前缓动的延迟时间
     * @return {Tween}
     */
    delay(duration: number): Tween<T>;
    /**
     * @en
     * Add an callback action.
     * @zh
     * 添加一个回调 action。
     * @method call
     * @param callback @en Callback function at the end of this tween @zh 当前缓动结束时的回调函数
     * @return {Tween}
     */
    call(callback: Function): Tween<T>;
    /**
     * @en
     * Add an sequence action.
     * @zh
     * 添加一个队列 action。
     * @method sequence
     * @param args @en All tween that make up the sequence @zh 组成队列的所有缓动
     */
    sequence(...args: Tween<T>[]): Tween<T>;
    /**
     * @en
     * Add an parallel action.
     * @zh
     * 添加一个并行 action。
     * @method parallel
     * @param args @en The tween parallel to this tween @zh 与当前缓动并行的缓动
     */
    parallel(...args: Tween<T>[]): Tween<T>;
    /**
     * @en
     * Add an repeat action.
     * This action will integrate before actions to a sequence action as their parameters.
     * @zh
     * 添加一个重复 action，这个 action 会将前一个动作作为他的参数。
     * @param repeatTimes @en The repeat times of this tween @zh 重复次数
     * @param embedTween @en Optional, embedded tween of this tween @zh 可选，嵌入缓动
     */
    repeat(repeatTimes: number, embedTween?: Tween<T>): Tween<T>;
    /**
     * @en
     * Add an repeat forever action.
     * This action will integrate before actions to a sequence action as their parameters.
     * @zh
     * 添加一个永久重复 action，这个 action 会将前一个动作作为他的参数。
     * @method repeatForever
     * @param embedTween @en Optional, embedded tween of this tween @zh 可选，嵌入缓动
     */
    repeatForever(embedTween?: Tween<T>): Tween<T>;
    /**
     * @en
     * Add an reverse time action.
     * This action will integrate before actions to a sequence action as their parameters.
     * @zh
     * 添加一个倒置时间 action，这个 action 会将前一个动作作为他的参数。
     * @method reverseTime
     * @param embedTween @en Optional, embedded tween of this tween @zh 可选，嵌入缓动
     */
    reverseTime(embedTween?: Tween<T>): Tween<T>;
    /**
     * @en
     * Add an hide action, only for node target.
     * @zh
     * 添加一个隐藏 action，只适用于 target 是节点类型的。
     */
    hide(): Tween<T>;
    /**
     * @en
     * Add an show action, only for node target.
     * @zh
     * 添加一个显示 action，只适用于 target 是节点类型的。
     */
    show(): Tween<T>;
    /**
     * @en
     * Add an removeSelf action, only for node target.
     * @zh
     * 添加一个移除自己 action，只适用于 target 是节点类型的。
     */
    removeSelf(): Tween<T>;
    /**
     * @en
     * Stop all tweens
     * @zh
     * 停止所有缓动
     */
    static stopAll(): void;
    /**
     * @en
     * Stop all tweens by tag
     * @zh
     * 停止所有指定标签的缓动
     */
    static stopAllByTag(tag: number, target?: object): void;
    /**
     * @en
     * Stop all tweens by target
     * @zh
     * 停止所有指定对象的缓动
     */
    static stopAllByTarget(target?: object): void;
}