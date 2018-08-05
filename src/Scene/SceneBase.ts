class SceneBase extends eui.Component {
    public constructor() {
        super();
        this.width = Const.WIDTH;
        this.height = Const.HEIGHT;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
    }

    public resGroup;

    public onAdded() {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this)
    }

    public onRemoved() {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this),
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this),
            UIUtils.removeButtonScaleEffects(this),
            this.destroy()
    }
    public destroy() {
        this.resGroup && RES.destroyRes(this.resGroup)
    }

    public createChildren() {
        super.createChildren();
        UIUtils.addButtonScaleEffects(this);
    }

    public onTouchTap(eve: egret.Event) { }
}