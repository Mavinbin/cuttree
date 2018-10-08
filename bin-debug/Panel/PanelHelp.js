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
var PanelHelp = (function (_super) {
    __extends(PanelHelp, _super);
    function PanelHelp() {
        var _this = _super.call(this, null) || this;
        _this.isFullScreen = true;
        _this.isVisibleAnimate = false;
        return _this;
    }
    PanelHelp.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.addChildren();
    };
    PanelHelp.prototype.addChildren = function () {
        //添加遮罩
        var mask = new eui.Rect(Const.WIDTH, Const.HEIGHT, 0x000000);
        mask.alpha = 0.6;
        this.addChild(mask);
        var popComponent = new eui.Component;
        this.addChild(popComponent);
        var helpLayer = new eui.Image();
        helpLayer.texture = RES.getRes('panel_help_png');
        popComponent.width = helpLayer.width;
        popComponent.height = helpLayer.height;
        popComponent.x = (Const.WIDTH - helpLayer.width) / 2;
        popComponent.y = Const.HEIGHT * 0.05;
        popComponent.addChild(helpLayer);
        //游戏规则
        var ruleText = new eui.Label;
        ruleText.text = "1\u3001\u6E38\u620F\u64CD\u4F5C\n\u901A\u8FC7\u70B9\u51FB\u5C4F\u5E55\u5DE6\u53F3\u4E24\u8FB9\uFF08\u4EE5\u5C4F\u5E55\u4E2D\u95F4\u7EBF\u4E3A\u5206\u754C\uFF09\uFF0C\u63A7\u5236\u4EBA\u7269\u7684\u5DE6\u53F3\u79FB\u52A8\u6765\u780D\u6811\uFF1B\n\n2\u3001\u6E38\u620F\u5931\u8D25\n\u65F6\u95F4\u6761\u51CF\u5C11\u4E3A0\u6216\u8005\u4EBA\u7269\u89E6\u78B0\u5230\u6811\u679D\u65F6\u6E38\u620F\u7ED3\u675F\uFF1B\n\n3\u3001\u5F97\u5206\n\u6839\u636E\u780D\u5230\u7684\u6728\u5934\u6570\u91CF\u6765\u8BA1\u7B97\u5206\u6570";
        ruleText.x = 50;
        ruleText.y = 200;
        ruleText.width = helpLayer.width - ruleText.x - 30;
        ruleText.size = 40;
        ruleText.lineSpacing = 20;
        ruleText.textColor = 0x000000;
        popComponent.addChild(ruleText);
        //确定按钮
        this.confirmBtn = new eui.Button;
        this.confirmBtn.skinName = 'resource/skin/button/ButtonConfirm.exml';
        this.confirmBtn.anchorOffsetX = this.confirmBtn.width / 2;
        this.confirmBtn.anchorOffsetY = this.confirmBtn.height / 2;
        this.confirmBtn.x = popComponent.width / 2;
        this.confirmBtn.y = popComponent.height - 10;
        UIUtils.addButtonScaleEffects(this.confirmBtn);
        popComponent.addChild(this.confirmBtn);
    };
    return PanelHelp;
}(PanelBase));
__reflect(PanelHelp.prototype, "PanelHelp");
//# sourceMappingURL=PanelHelp.js.map