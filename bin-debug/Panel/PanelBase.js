var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var PanelBase = (function (_super) {
    __extends(PanelBase, _super);
    function PanelBase(viewParent) {
        var _this = _super.call(this) || this;
        _this.isVisibleAnimate = true;
        _this.isDelayDestroy = false;
        _this.createChildrened = false;
        _this.isFullScreen = false;
        _this.touchEnabled = true;
        _this._viewParent = viewParent;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
        return _this;
    }
    Object.defineProperty(PanelBase.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (data) {
            this._data = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelBase.prototype, "animate_startPos", {
        set: function (pos) {
            if (pos) {
                this._startPos = pos;
            }
        },
        enumerable: true,
        configurable: true
    });
    PanelBase.prototype.onAdded = function () {
        if (this.createChildrened)
            this.onShow();
    };
    PanelBase.prototype.onRemoved = function () {
        if (this.isDelayDestroy) {
            this.isDelayDestroy = false;
        }
        else {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            UIUtils.removeButtonScaleEffects(this);
        }
    };
    PanelBase.prototype.init = function () {
        this.onGroupResourceLoadedThenAddToStage();
    };
    PanelBase.prototype.onGroupResourceLoadedThenAddToStage = function () {
        if (this._viewParent) {
            this._viewParent.addChild(this);
        }
        else {
            GameLayerManager.instance.popLayer.addChild(this);
        }
    };
    PanelBase.prototype.refreshAnyTime = function () { };
    PanelBase.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        if (this.isFullScreen) {
            this.width = Const.WIDTH;
            this.height = Const.HEIGHT;
        }
        UIUtils.addButtonScaleEffects(this);
        this.onShow();
        this.createChildrened = true;
    };
    PanelBase.prototype.onTouchTap = function (eve) {
        var target = eve.target;
        if (target == this.closeBtn) {
            this.onHide();
        }
        else if (target == this.confirmBtn) {
            this.onConfirm();
        }
    };
    PanelBase.prototype.onShow = function () {
        if (this.isVisibleAnimate) {
            this.x = Const.WIDTH / 2;
            this.y = Const.HEIGHT / 2;
            if (this._startPos) {
                this.x = this._startPos.x;
                this.y = this._startPos.y;
            }
            var x = (Const.WIDTH - this.width) / 2;
            var y = (Const.HEIGHT - this.height) / 2;
            this.scaleX = this.scaleY = 0;
            egret.Tween.get(this).to({
                x: x,
                y: y,
                scaleX: 1,
                scaleY: 1
            }, 250, egret.Ease.backOut).call(this.onShowAnimateOver, this);
        }
        else {
            UIManager.instance.popPanel(this);
            this.onShowAnimateOver();
        }
    };
    PanelBase.prototype.onConfirm = function () { };
    PanelBase.prototype.onShowAnimateOver = function () { };
    PanelBase.prototype.onHideAnimateOver = function () { };
    PanelBase.prototype.onHide = function () {
        UIManager.instance.hidePanel(this);
        if (this.isVisibleAnimate) {
            var x = Const.WIDTH / 2;
            var y = Const.HEIGHT / 2;
            if (this._startPos) {
                x = this._startPos.x;
                y = this._startPos.y;
            }
            egret.Tween.get(this).to({
                x: x,
                y: y,
                scaleX: 0,
                scaleY: 0
            }, 250, egret.Ease.backIn).call(this.onHideAnimateOver, this).call(UIUtils.removeSelf, this, [this]);
        }
        else {
            this.onHideAnimateOver();
            UIUtils.removeSelf(this);
        }
    };
    PanelBase.prototype.hide = function () {
        this.onHide();
    };
    PanelBase.prototype.showAgain = function () {
        this.onShow();
    };
    return PanelBase;
}(eui.Component));
__reflect(PanelBase.prototype, "PanelBase");
//# sourceMappingURL=PanelBase.js.map