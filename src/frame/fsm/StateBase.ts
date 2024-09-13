import FSMCtr from "./FSMCtr";

export default abstract class StateBase {

    public Ani: string = null;
    public Layer: number = 0;
    public Condition: any = null;
    public IsFade: number = 0;
    public FSMCtr: FSMCtr = null;
    public Priority: number = 0;
    public AniScript: boolean = false;
    public owner: any;//状态机所有者
    public AniScriptIsInit: boolean = false;

    /**
     * @param ani 动画名
     * @param priority 优先级
     * @param aniScript 是否给状态动画添加脚本
     * @param fade 动画切换是否用插值
     * @param layer 当前动画所处与动画控制器的层级，默认是0
     */
    constructor(ani?: string, priority?: number, aniScript?: boolean, fade?: number, layer?: number) {
        this.Ani = ani ? ani : null;
        this.Priority = priority ? priority : 0;
        this.IsFade = fade ? fade : 0;
        this.Layer = layer ? layer : 0;
        this.AniScript = aniScript ? aniScript : false;
    }

    public Init(owner: any, fsmctr: FSMCtr, ani) {
        this.owner = owner;
        this.FSMCtr = fsmctr;
        if (this.Ani == null) this.Ani = ani;
    }

    private InitAniScript() {
        if (this.AniScriptIsInit) return;
        if (!this.FSMCtr.Animator || !this.Ani || !this.AniScript) return;
        var state = this.FSMCtr.Animator.getControllerLayer(this.Layer).getAnimatorState(this.Ani) as Laya.AnimatorState;
        var script = state.addScript(AniMgr) as AniMgr;
        script.caller = this;
        script.Enter = this.AniEnt;
        script.Update = this.AniUpdate;
        script.Exit = this.AniExit;
        this.AniScriptIsInit = true;
    }

    /**
     * 状态切换条件
     * @returns 返回true即可切换当前状态
     */
    public ConditionEvent(): boolean { return true };

    /**
     * 状态切入调用
     */
    public EnterEvent(... parameter) {
        this.playOneAni();
    }

    /**
     * 状态持续调用
     */
    public StayEvent() { };

    /**
     * 状态出调用
     */
    public ExitEvent() { };

    /**
     * 状态动画开始调用
     */
    public AniEnt() { };

    /**
     * 状态动画持续更新调用
     */
    public AniUpdate() { };

    /**
     * 状态动画结束调用
     */
    public AniExit() { };

    /**
     * 默认处理当前状态下默认动画
     */
    public playOneAni() {
        this.InitAniScript();
        if(!this.FSMCtr.Animator || !this.Ani) {
            this.FSMCtr.DebugLog("没有动画控制器或者没有动画片段");
            return;
        }
        if (this.IsFade != 0) {
            this.FSMCtr.Animator.crossFade(this.Ani, this.IsFade, this.Layer, 0);
        }
        else {
            this.FSMCtr.Animator.play(this.Ani, this.Layer, 0);
        }
    }

}

export class AniMgr extends Laya.AnimatorStateScript {

    public caller: any = null;
    public Enter: Function = null;
    public Update: Function = null;
    public Exit: Function = null;

    onStateEnter() {
        this.caller && this.Enter && this.Enter.apply(this.caller);
    }

    onStateUpdate() {
        this.caller && this.Update && this.Update.apply(this.caller);
    }

    onStateExit() {
        this.caller && this.Exit && this.Exit.apply(this.caller);
    }

}