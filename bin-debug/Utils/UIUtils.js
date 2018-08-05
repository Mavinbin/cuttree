var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIUtils = (function () {
    function UIUtils() {
    }
    //添加点击特效
    UIUtils.addButtonScaleEffects = function (layer, isChild) {
        if (isChild === void 0) { isChild = false; }
        if (layer) {
            if (isChild || egret.is(layer, egret.getQualifiedClassName(eui.Button))) {
                layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils.onButtonTouchBegan, layer);
            }
            else {
                for (var i = 0, len = layer.numChildren; i < len; i++) {
                    UIUtils.addButtonScaleEffects(layer.getChildAt(i));
                }
            }
        }
    };
    // 点击特效
    UIUtils.onButtonTouchBegan = function (eve) {
        var target = eve.target;
        egret.Tween.get(target).to({
            scaleX: 0.9,
            scaleY: 0.9
        }, 50).to({
            scaleX: 1,
            scaleY: 1
        }, 50);
    };
    // 移除点击特效
    UIUtils.removeButtonScaleEffects = function (layer, isChild) {
        if (isChild === void 0) { isChild = false; }
        if (layer) {
            if (isChild || egret.is(layer, egret.getQualifiedClassName(eui.Button))) {
                layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils.onButtonTouchBegan, layer);
            }
            else {
                for (var i = 0, len = layer.numChildren; i < len; i++) {
                    UIUtils.removeButtonScaleEffects(layer.getChildAt(i));
                }
            }
        }
    };
    // 添加单击
    UIUtils.addShortTouch = function (layer, shortTouchCallback, shortTouchEndCallback) {
        layer.shortTouchCallback = shortTouchCallback;
        layer.shortTouchEndCallback = shortTouchEndCallback;
        layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils._onShortTouchBegan, layer);
    };
    // 私有方法（touchstart）
    UIUtils._onShortTouchBegan = function (eve) {
        var target = eve.currentTarget;
        if (target.shortTouchCallback)
            target.shortTouchCallback(eve);
        Const.stage.once(egret.TouchEvent.TOUCH_END, UIUtils._onShortTouchEnd, this, true, Number.MAX_VALUE);
    };
    // 私有方法（touchend）
    UIUtils._onShortTouchEnd = function (eve) {
        eve.stopImmediatePropagation();
        eve.stopPropagation();
        if (this.shortTouchEndCallback)
            this.shortTouchEndCallback(eve);
    };
    //添加长按事件
    UIUtils.addLongTouch = function (layer, longTouchCallback, longTouchEndCallback) {
        layer.longTouchCallback = longTouchCallback;
        layer.longTouchEndCallback = longTouchEndCallback;
        layer.longTouchTrigger = false;
        layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils._onLongTouchBegan, layer);
    };
    UIUtils._onLongTouchBegan = function (eve) {
        var self = this, target = eve.currentTarget;
        Const.stage.once(egret.TouchEvent.TOUCH_END, UIUtils._onLongTouchEnd, this, true, Number.MAX_VALUE);
        egret.clearTimeout(UIUtils.longTouchDelayId);
        UIUtils.longTouchDelayId = egret.setTimeout(function () {
            target.longTouchTrigger = true;
            if (target.longTouchCallback)
                target.longTouchCallback(eve);
            target.once(egret.TouchEvent.TOUCH_TAP, UIUtils._stopTapEvent, self, true, Number.MAX_VALUE);
        }, this, 350);
    };
    UIUtils._stopTapEvent = function (eve) {
        eve.stopImmediatePropagation();
        eve.stopPropagation();
    };
    UIUtils._onLongTouchEnd = function (eve) {
        eve.stopImmediatePropagation();
        eve.stopPropagation();
        if (this.longTouchTrigger) {
            if (this.longTouchEndCallback)
                this.longTouchEndCallback(eve);
        }
        else {
            egret.clearTimeout(UIUtils.longTouchDelayId);
            this.longTouchTrigger = false;
        }
    };
    UIUtils.removeLongTouch = function (layer) {
        layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils._onLongTouchBegan, layer);
    };
    UIUtils.removeSelf = function (layer) {
        if (layer && layer.parent)
            layer.parent.removeChild(layer);
    };
    return UIUtils;
}());
__reflect(UIUtils.prototype, "UIUtils");
//# sourceMappingURL=UIUtils.js.map