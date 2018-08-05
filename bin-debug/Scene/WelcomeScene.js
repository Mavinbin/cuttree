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
var WelcomeScene = (function (_super) {
    __extends(WelcomeScene, _super);
    function WelcomeScene() {
        var _this = _super.call(this) || this;
        _this.skinName = new WelcomeSkin;
        return _this;
    }
    WelcomeScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._init();
    };
    WelcomeScene.prototype._init = function () {
        this._initView();
        this._initEvent();
    };
    WelcomeScene.prototype._initView = function () {
        this._createInfo();
        this._createButton();
    };
    WelcomeScene.prototype._initEvent = function () {
        this.startGameButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            SceneManager.instance.runScene(GameScene);
        }, this.startGameButton);
    };
    WelcomeScene.prototype._createInfo = function () {
        var titleImg = new eui.Image();
        titleImg.texture = RES.getRes('title_png');
        titleImg.width = 690;
        titleImg.height = 323;
        titleImg.x = (Const.WIDTH - titleImg.width) / 2;
        titleImg.y = 393;
        this.group.addChild(titleImg);
        var copyright = new eui.Label('网站中心版权所有');
        copyright.width = Const.WIDTH;
        copyright.height = 45;
        copyright.textColor = 0xffffff;
        copyright.size = 40;
        copyright.x = 10;
        copyright.textAlign = egret.HorizontalAlign.CENTER;
        copyright.y = Const.HEIGHT - 100;
        this.group.addChild(copyright);
    };
    WelcomeScene.prototype._createButton = function () {
        this.startGameButton = new eui.Button;
        console.log(this.startGameButton);
        this.startGameButton.skinName = 'resource/skin/button/ButtonPlay.exml';
        this.startGameButton.width = 194;
        this.startGameButton.height = 196;
        this.startGameButton.anchorOffsetX = this.startGameButton.width / 2;
        this.startGameButton.anchorOffsetY = this.startGameButton.height / 2;
        this.startGameButton.x = (Const.WIDTH - this.startGameButton.width) / 2 + this.startGameButton.width / 2;
        this.startGameButton.y = Const.HEIGHT - 421 + this.startGameButton.height / 2;
        this.group.addChild(this.startGameButton);
        UIUtils.addButtonScaleEffects(this.startGameButton);
    };
    return WelcomeScene;
}(SceneBase));
__reflect(WelcomeScene.prototype, "WelcomeScene");
//# sourceMappingURL=WelcomeScene.js.map