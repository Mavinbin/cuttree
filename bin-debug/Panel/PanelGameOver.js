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
        var rect = new eui.Rect(Const.WIDTH, Const.HEIGHT, 0x000000);
        rect.alpha = 0.6;
        this.addChild(rect);
        var popComponent = new eui.Component;
        popComponent.width = Const.WIDTH - 200;
        popComponent.height = Const.HEIGHT - 500;
        popComponent.anchorOffsetX = popComponent.width / 2;
        popComponent.x = Const.WIDTH / 2;
        popComponent.y = 50;
        this.addChild(popComponent);
        var gameoverLayer = new eui.Label('GAME OVER');
        gameoverLayer.y = 70;
        gameoverLayer.size = 70;
        gameoverLayer.width = popComponent.width;
        gameoverLayer.height = 70;
        gameoverLayer.textAlign = egret.HorizontalAlign.CENTER;
        popComponent.addChild(gameoverLayer);
        //本轮得分
        var curLabelText = new eui.Label('本轮得分');
        curLabelText.y = gameoverLayer.y + gameoverLayer.height + 60;
        curLabelText.size = 40;
        curLabelText.width = popComponent.width;
        curLabelText.height = 40;
        curLabelText.textAlign = egret.HorizontalAlign.CENTER;
        popComponent.addChild(curLabelText);
        // 真正得分
        this.curScore = new eui.Label;
        this.curScore.text = '190';
        this.curScore.bold = true;
        this.curScore.y = curLabelText.y + curLabelText.height + 50;
        this.curScore.textColor = 0xff0000;
        this.curScore.size = 35;
        this.curScore.width = popComponent.width;
        this.curScore.height = 35;
        this.curScore.textAlign = egret.HorizontalAlign.CENTER;
        popComponent.addChild(this.curScore);
        //最高得分
        var maxLabelText = new eui.Label('最高得分');
        maxLabelText.y = this.curScore.y + this.curScore.height + 60;
        maxLabelText.size = 40;
        maxLabelText.width = popComponent.width;
        maxLabelText.height = 40;
        maxLabelText.textAlign = egret.HorizontalAlign.CENTER;
        popComponent.addChild(maxLabelText);
        // 真正得分
        this.MaxScore = new eui.Label;
        this.MaxScore.text = '500';
        this.MaxScore.bold = true;
        this.MaxScore.y = maxLabelText.y + maxLabelText.height + 50;
        this.MaxScore.textColor = 0xff0000;
        this.MaxScore.size = 35;
        this.MaxScore.width = popComponent.width;
        this.MaxScore.height = 35;
        this.MaxScore.textAlign = egret.HorizontalAlign.CENTER;
        popComponent.addChild(this.MaxScore);
        //确定按钮
        this.confirmBtn = new eui.Button;
        this.confirmBtn.label = '重新开始';
        this.confirmBtn.width = popComponent.width - 100;
        this.confirmBtn.height = 60;
        this.confirmBtn.anchorOffsetX = this.confirmBtn.width / 2;
        this.confirmBtn.x = popComponent.width / 2;
        this.confirmBtn.y = this.MaxScore.y + this.MaxScore.height + 40;
        UIUtils.addButtonScaleEffects(this.confirmBtn);
        popComponent.addChild(this.confirmBtn);
    };
    return PanelGameOver;
}(PanelBase));
__reflect(PanelGameOver.prototype, "PanelGameOver");
//# sourceMappingURL=PanelGameOver.js.map