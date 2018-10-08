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
        this._createTree();
        this._createCutter();
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
        var _this = this;
        // 添加开始按钮
        this.startGameButton = new eui.Button;
        this.startGameButton.skinName = 'resource/skin/button/ButtonPlay.exml';
        this.startGameButton.anchorOffsetX = this.startGameButton.width / 2;
        this.startGameButton.anchorOffsetY = this.startGameButton.height / 2;
        this.startGameButton.x = (Const.WIDTH - this.startGameButton.width) / 2 + this.startGameButton.width / 2;
        this.startGameButton.y = Const.HEIGHT - 421 + this.startGameButton.height / 2;
        this.group.addChild(this.startGameButton);
        UIUtils.addButtonScaleEffects(this.startGameButton);
        // 添加帮助按钮
        this.helpButton = new eui.Button;
        this.helpButton.skinName = 'resource/skin/button/ButtonHelp.exml';
        this.helpButton.anchorOffsetX = this.helpButton.width / 2;
        this.helpButton.anchorOffsetY = this.helpButton.height / 2;
        this.helpButton.x = Const.WIDTH - 170 - this.helpButton.width / 2;
        this.helpButton.y = Const.HEIGHT - 120 - this.helpButton.height / 2;
        this.helpButton.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this._initPanelHelp(function () {
                _this.panelHelp.onHide();
            });
        }, this);
        this.group.addChild(this.helpButton);
        UIUtils.addButtonScaleEffects(this.helpButton);
        // 添加排行榜按钮
        this.rankButton = new eui.Button;
        this.rankButton.skinName = 'resource/skin/button/ButtonRank.exml';
        this.rankButton.anchorOffsetX = this.rankButton.width / 2;
        this.rankButton.anchorOffsetY = this.rankButton.height / 2;
        this.rankButton.x = 170 + this.rankButton.width / 2;
        this.rankButton.y = Const.HEIGHT - 120 - this.rankButton.height / 2;
        this.group.addChild(this.rankButton);
        UIUtils.addButtonScaleEffects(this.rankButton);
    };
    WelcomeScene.prototype._createTree = function () {
        this.tree = new eui.Image();
        this.tree.texture = RES.getRes('tree_png');
        this.tree.x = (Const.WIDTH - this.tree.width) / 2;
        var y = Const.HEIGHT * 0.88 - this.tree.height;
        this.tree.y = y < 0 ? y : 0;
        this.group.addChild(this.tree);
    };
    WelcomeScene.prototype._createCutter = function () {
        var cutterData = RES.getRes('updown_json');
        var cutterImg = RES.getRes('updown_png');
        var mcFactory = new egret.MovieClipDataFactory(cutterData, cutterImg);
        var cutter = new egret.MovieClip(mcFactory.generateMovieClipData('cutter'));
        cutter.x = this.tree.x - cutter.width + 100;
        cutter.y = Const.HEIGHT * 0.88 - cutter.height;
        this.group.addChild(cutter);
        cutter.gotoAndPlay('updown', -1);
    };
    WelcomeScene.prototype._initPanelHelp = function (onConfirm) {
        this.panelHelp = new PanelHelp;
        this.panelHelp.init();
        this.panelHelp.onConfirm = function () { return onConfirm(); };
    };
    return WelcomeScene;
}(SceneBase));
__reflect(WelcomeScene.prototype, "WelcomeScene");
//# sourceMappingURL=WelcomeScene.js.map