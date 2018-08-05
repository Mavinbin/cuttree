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
var SceneBase = (function (_super) {
    __extends(SceneBase, _super);
    function SceneBase() {
        var _this = _super.call(this) || this;
        _this.width = Const.WIDTH;
        _this.height = Const.HEIGHT;
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
        _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.onAdded, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.onRemoved, _this);
        return _this;
    }
    SceneBase.prototype.onAdded = function () {
        this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAdded, this);
    };
    SceneBase.prototype.onRemoved = function () {
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoved, this),
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this),
            UIUtils.removeButtonScaleEffects(this),
            this.destroy();
    };
    SceneBase.prototype.destroy = function () {
        this.resGroup && RES.destroyRes(this.resGroup);
    };
    SceneBase.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        UIUtils.addButtonScaleEffects(this);
    };
    SceneBase.prototype.onTouchTap = function (eve) { };
    return SceneBase;
}(eui.Component));
__reflect(SceneBase.prototype, "SceneBase");
//# sourceMappingURL=SceneBase.js.map