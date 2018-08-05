
class UIUtils {

    public static shortTouchEndCallback: Function;
    public static longTouchDelayId: number;
    public static longTouchEndCallback: Function;
    public static longTouchTrigger: boolean;

    //添加点击特效
    public static addButtonScaleEffects(layer, isChild: boolean = false) {
        if (layer) {
            if (isChild || egret.is(layer, egret.getQualifiedClassName(eui.Button))) {
                layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils.onButtonTouchBegan, layer);
            } else {
                for (let i = 0, len = layer.numChildren; i < len; i++) {
                    UIUtils.addButtonScaleEffects(layer.getChildAt(i));
                }
            }
        }
    }
    
    // 点击特效
    public static onButtonTouchBegan(eve: egret.Event) {
        let target = eve.target;
        egret.Tween.get(target).to({
            scaleX: 0.9,
            scaleY: 0.9
        }, 50).to({
            scaleX: 1,
            scaleY: 1
        }, 50)
    }

    // 移除点击特效
    public static removeButtonScaleEffects(layer, isChild: boolean = false) {
        if (layer) {
            if (isChild || egret.is(layer, egret.getQualifiedClassName(eui.Button))) {
                layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils.onButtonTouchBegan, layer);
            } else {
                for (let i = 0, len = layer.numChildren; i < len; i++) {
                    UIUtils.removeButtonScaleEffects(layer.getChildAt(i));
                }
            }
        }
    }


    // 添加单击
    public static addShortTouch(layer, shortTouchCallback?: Function, shortTouchEndCallback?: Function) {
        layer.shortTouchCallback = shortTouchCallback;
        layer.shortTouchEndCallback = shortTouchEndCallback;
        layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils._onShortTouchBegan, layer);
    }


    // 私有方法（touchstart）
    private static _onShortTouchBegan(eve: egret.Event) {
        let target = eve.currentTarget;
        if (target.shortTouchCallback) target.shortTouchCallback(eve);
        Const.stage.once(egret.TouchEvent.TOUCH_END, UIUtils._onShortTouchEnd, this, true, Number.MAX_VALUE);
    }

    // 私有方法（touchend）
    private static _onShortTouchEnd(eve: egret.Event) {
        eve.stopImmediatePropagation();
        eve.stopPropagation();
        if (this.shortTouchEndCallback) this.shortTouchEndCallback(eve)
    }

    //添加长按事件
    public static addLongTouch(layer, longTouchCallback: Function, longTouchEndCallback: Function) {
        layer.longTouchCallback = longTouchCallback;
        layer.longTouchEndCallback = longTouchEndCallback;
        layer.longTouchTrigger = false;
        layer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils._onLongTouchBegan, layer);
    }


    private static _onLongTouchBegan(eve: egret.Event) {
        let self = this, target = eve.currentTarget;

        Const.stage.once(egret.TouchEvent.TOUCH_END, UIUtils._onLongTouchEnd, this, true, Number.MAX_VALUE);
        egret.clearTimeout(UIUtils.longTouchDelayId);

        UIUtils.longTouchDelayId = egret.setTimeout(function () {
            target.longTouchTrigger = true;
            if (target.longTouchCallback) target.longTouchCallback(eve);
            target.once(egret.TouchEvent.TOUCH_TAP, UIUtils._stopTapEvent, self, true, Number.MAX_VALUE)
        }, this, 350)
    }

    private static _stopTapEvent(eve: egret.Event) {
        eve.stopImmediatePropagation();
        eve.stopPropagation();
    }

    public static _onLongTouchEnd(eve: egret.Event) {
        eve.stopImmediatePropagation();
        eve.stopPropagation();
        if (this.longTouchTrigger) {
            if (this.longTouchEndCallback) this.longTouchEndCallback(eve);
        } else {
            egret.clearTimeout(UIUtils.longTouchDelayId);
            this.longTouchTrigger = false;
        }

    }

    public static removeLongTouch(layer) {
        layer.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, UIUtils._onLongTouchBegan, layer);
    }

    public static removeSelf(layer) {
        if (layer && layer.parent) layer.parent.removeChild(layer)
    }
}