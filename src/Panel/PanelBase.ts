class PanelBase extends eui.Component {
    public isVisibleAnimate;
    public createChildrened;
    public isDelayDestroy;
    public closeBtn: eui.Button;
    public confirmBtn: eui.Button;
    public isFullScreen;

    private _viewParent;
    private _startPos;
    private _data;

    public constructor(viewParent) {
        super();
        this.isVisibleAnimate = true;
        this.isDelayDestroy = false;
        this.createChildrened = false;
        this.isFullScreen = false;
        this.touchEnabled = true;
        this._viewParent = viewParent;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
    }

    public get data() {
        return this._data;
    }

    public set data(data) {
        this._data = data;
    }

    public set animate_startPos(pos) {
        if (pos) { this._startPos = pos }
    }

    public onAdded() {
        if (this.createChildrened) this.onShow();
    }

    public onRemoved() {
        if (this.isDelayDestroy) {
            this.isDelayDestroy = false;
        } else {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            UIUtils.removeButtonScaleEffects(this);
        }
    }

    public init() {
        this.onGroupResourceLoadedThenAddToStage();
    }

    public onGroupResourceLoadedThenAddToStage() {
        if (this._viewParent) {
            this._viewParent.addChild(this);
        } else {
            GameLayerManager.instance.popLayer.addChild(this);
        }
    }
    refreshAnyTime() { }
    public createChildren() {
        super.createChildren();
        if (this.isFullScreen) {
            this.width = Const.WIDTH;
            this.height = Const.HEIGHT;
        }
        UIUtils.addButtonScaleEffects(this);
        this.onShow();
        this.createChildrened = true;
    }

    public onTouchTap(eve: egret.Event) {
        let target = eve.target;
        if (target == this.closeBtn) {
            this.onHide();
        } else if (target == this.confirmBtn) {
            this.onConfirm();
        }
    }

    public onShow() {
        if (this.isVisibleAnimate) {
            this.x = Const.WIDTH / 2;
            this.y = Const.HEIGHT / 2;
            if (this._startPos) {
                this.x = this._startPos.x;
                this.y = this._startPos.y;
            }
            let x = (Const.WIDTH - this.width) / 2;
            let y = (Const.HEIGHT - this.height) / 2;
            this.scaleX = this.scaleY = 0;
            egret.Tween.get(this).to({
                x: x,
                y: y,
                scaleX: 1,
                scaleY: 1
            }, 250, egret.Ease.backOut).call(this.onShowAnimateOver, this);
        } else {
            UIManager.instance.popPanel(this)
            this.onShowAnimateOver();
        }
    }

    public onConfirm() { }
    public onShowAnimateOver() { }
    public onHideAnimateOver() { }

    public onHide() {
        UIManager.instance.hidePanel(this);
        if (this.isVisibleAnimate) {
            let x = Const.WIDTH / 2;
            let y = Const.HEIGHT / 2;
            if (this._startPos) {
                x = this._startPos.x;
                y = this._startPos.y;
            }
            egret.Tween.get(this).to({
                x: x,
                y: y,
                scaleX: 0,
                scaleY: 0
            }, 250, egret.Ease.backIn).call(this.onHideAnimateOver, this).call(UIUtils.removeSelf, this, [this])

        } else {
            this.onHideAnimateOver();
            UIUtils.removeSelf(this);
        }
    }

    public hide() {
        this.onHide()
    }
    public showAgain() {
        this.onShow()
    }
}