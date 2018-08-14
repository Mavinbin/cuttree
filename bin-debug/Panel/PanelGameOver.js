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
var PanelGameOver = (function (_super) {
    __extends(PanelGameOver, _super);
    function PanelGameOver() {
        var _this = _super.call(this, null) || this;
        _this.isFullScreen = true;
        _this.isVisibleAnimate = false;
        return _this;
    }
    PanelGameOver.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.addChildren();
    };
    PanelGameOver.prototype.addChildren = function () {
        //添加背景
        var mask = new eui.Rect(Const.WIDTH, Const.HEIGHT, 0x000000);
        mask.alpha = 0.6;
        this.addChild(mask);
        var popComponent = new eui.Component;
        this.addChild(popComponent);
        var gameoverLayer = new eui.Image();
        gameoverLayer.texture = RES.getRes('panel_over_png');
        popComponent.width = gameoverLayer.width;
        popComponent.height = gameoverLayer.height;
        popComponent.x = (Const.WIDTH - gameoverLayer.width) / 2;
        popComponent.y = Const.HEIGHT * 0.19;
        popComponent.addChild(gameoverLayer);
        //本轮得分文字
        var curLabelText = new eui.BitmapLabel;
        curLabelText.text = '本轮分数 ：';
        curLabelText.x = 20;
        curLabelText.y = 280;
        curLabelText.width = popComponent.width / 2;
        curLabelText.textAlign = egret.HorizontalAlign.RIGHT;
        curLabelText.verticalAlign = 'middle';
        curLabelText.font = 'jinhei_fnt';
        popComponent.addChild(curLabelText);
        // 本轮得分分数
        this.curScore = new eui.BitmapLabel;
        this.curScore.text = '190';
        this.curScore.x = popComponent.width / 2 + 50;
        this.curScore.y = curLabelText.y;
        this.curScore.width = popComponent.width / 2;
        this.curScore.textAlign = egret.HorizontalAlign.LEFT;
        this.curScore.font = 'jinhei_fnt';
        popComponent.addChild(this.curScore);
        //最高得分文本
        var maxLabelText = new eui.BitmapLabel;
        maxLabelText.text = '最高分数 ：';
        maxLabelText.x = 20;
        maxLabelText.y = curLabelText.y + curLabelText.height + 60;
        maxLabelText.width = popComponent.width / 2;
        maxLabelText.textAlign = egret.HorizontalAlign.RIGHT;
        maxLabelText.verticalAlign = 'middle';
        maxLabelText.font = 'jinhei_fnt';
        popComponent.addChild(maxLabelText);
        // 最高得分分数
        this.MaxScore = new eui.BitmapLabel;
        this.MaxScore.text = '500';
        this.MaxScore.x = popComponent.width / 2 + 50;
        this.MaxScore.y = maxLabelText.y;
        this.MaxScore.width = popComponent.width / 2;
        this.MaxScore.textAlign = egret.HorizontalAlign.LEFT;
        this.MaxScore.font = 'jinhei_fnt';
        popComponent.addChild(this.MaxScore);
        //确定按钮
        this.confirmBtn = new eui.Button;
        this.confirmBtn.skinName = 'resource/skin/button/ButtonPlay.exml';
        this.confirmBtn.anchorOffsetX = this.confirmBtn.width / 2;
        this.confirmBtn.anchorOffsetY = this.confirmBtn.height / 2;
        this.confirmBtn.x = popComponent.width / 2;
        this.confirmBtn.y = popComponent.height - 10;
        UIUtils.addButtonScaleEffects(this.confirmBtn);
        popComponent.addChild(this.confirmBtn);
    };
    return PanelGameOver;
}(PanelBase));
__reflect(PanelGameOver.prototype, "PanelGameOver");
//# sourceMappingURL=PanelGameOver.js.map