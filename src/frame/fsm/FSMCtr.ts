import StateBase from "./StateBase";

export default class FSMCtr {

    private debugLog: boolean = false;  //打印提示开关

    private StateList: Map<any, StateBase> = new Map();
    private lateState: StateBase;
    private currentState: StateBase;
    private lateKey: any;
    private currentKey: any;
    private shouldKey: any;          //应当状态，比如射击完成后，玩家该待机就待机，该奔跑就奔跑

    public Animator: Laya.Animator;
    public owner: any;//状态机所有者
    public TargerState: any;
    
    /**
     * 
     * @param owner 状态机所有者
     * @param animator 动画控制器
     */
    constructor(owner: any, animator?: Laya.Animator) {
        this.owner = owner;
        this.Animator = animator ? animator : null;
    }

    public Update() {
        if(!this.currentState) return;
        this.currentState.StayEvent();
    }

    public setAnimator(value) {
        this.Animator = value;
        this.StateList.forEach(element => {
            element.AniScriptIsInit = false;
        });
    }

    /**
     * 添加状态
     * @param key 状态的key
     * @param state 状态类对象
     * @returns 返回添加的状态
     */
    public AddState(key: any, state: StateBase) {
        if(this.StateList.has(key)) {
            this.DebugLog("状态已存在！");
            return;
        }
        state.Init(this.owner, this, key);
        this.StateList.set(key, state);
        return state;
    }

    /**
     * 删除状态
     * @param key 需要删除状态的key
     * @returns 
     */
    public SubtractState(key: any) {
        if(!this.StateList.has(key)) {
            this.DebugLog("状态不存在！");
            return;
        }
        this.StateList.delete(key);
    }

    public ClearState() {
        this.StateList.clear();
    }

    /**
     * 修改状态
     * @param key 修改状态对应的Key
     * @param force 是否强制修改状态, true 为强制修改
     * @param parameter 后面切换状态调用EnterEvent方法参数，参数个数为自定义（可一直追加）
     * @returns 
     */
    public ChangeState(key: any, force?: boolean, parameter?: Array<any>) {
        if(this.currentState == this.StateList.get(key) && !force) return;
        if(!this.StateList.has(key)) {
            this.DebugLog("状态不存在！");
            return;
        }
        this.shouldKey = null;
        if(!force && (!this.StateList.get(key).ConditionEvent() || (this.currentState && this.StateList.get(key).Priority < this.currentState.Priority))) {
            this.DebugLog("切换状态条件不符合！");
            this.shouldKey = key;
            return;
        }
        if(this.currentState) {
            this.currentState.ExitEvent();
        }
        this.lateState = this.currentState;
        this.lateKey = this.currentKey;
        this.currentKey = key;
        this.currentState = this.StateList.get(key);
        this.currentState.EnterEvent.apply(this.currentState, parameter);
    }

    public DebugLog(str: string) {
        if(this.debugLog) console.log(str);
    }

    public getStateScript(key: any): StateBase {
        if(!this.StateList.has(key)) {
            this.DebugLog("状态不存在！");
            return;
        }
        return this.StateList.get(key);
    }

    /**
     * 获取状态机当前状态
     */
    public get GetState() {
        return this.currentKey;
    }

    /**
     * 获取状态机应当状态（不符合更改条件等）
     */
    public get GetShould() {
        return this.shouldKey;
    }

    /**
     * 上一个状态
     */
    public get LateState() {
        return this.lateKey;
    }

}