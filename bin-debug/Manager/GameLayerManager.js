var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameLayerManager = (function () {
    function GameLayerManager() {
    }
    Object.defineProperty(GameLayerManager, "instance", {
        get: function () {
            if (!GameLayerManager._instance)
                GameLayerManager._instance = new GameLayerManager;
            return GameLayerManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameLayerManager.prototype, "gameLayer", {
        get: function () {
            return this._gameLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameLayerManager.prototype, "topLayer", {
        get: function () {
            return this._gameLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameLayerManager.prototype, "popLayer", {
        get: function () {
            return this._popLayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameLayerManager.prototype, "tipLayer", {
        get: function () {
            return this._tipLayer;
        },
        enumerable: true,
        configurable: true
    });
    GameLayerManager.prototype.init = function (view) {
        this._gameLayer = new eui.Group;
        this._topLayer = new eui.Group;
        this._popLayer = new eui.Group;
        this._tipLayer = new eui.Group;
        this._gameLayer.name = "_gameLayer";
        this._topLayer.name = "_topLayer";
        this._popLayer.name = "_popLayer";
        this._tipLayer.name = "_tipLayer";
        view.addChild(this._gameLayer);
        view.addChild(this._topLayer);
        view.addChild(this._popLayer);
        view.addChild(this._tipLayer);
        this._tipLayer.touchChildren = this._tipLayer.touchEnabled = false;
        this._topLayer.touchChildren = this._topLayer.touchEnabled = false;
        this._popLayer.touchEnabled = false;
        var label = new eui.Label("v.1.0.0");
        label.textColor = 0xffffff;
        label.size = 12;
        label.x = 10;
        label.y = Const.HEIGHT - 22;
        this.topLayer.addChild(label);
    };
    GameLayerManager.prototype.showBothScene = function (scene) {
        var delay = 250;
        var sceneInstance = new scene;
        sceneInstance.x = Const.WIDTH;
        this.gameLayer.addChild(sceneInstance);
        // 动画
        egret.Tween.get(sceneInstance).to({
            x: 0
        }, delay);
        var curScene = SceneManager.instance.getCurrentScene();
        egret.Tween.get(curScene).to({
            x: -Const.WIDTH
        }, delay);
        egret.Tween.get(this.popLayer).to({
            x: -Const.WIDTH
        }, delay);
    };
    GameLayerManager.prototype.showSingleScene = function () {
        if (this.gameLayer.numChildren > 1) {
            var delay = 250;
            var gameLayer = this.gameLayer.getChildAt(1);
            // 动画
            egret.Tween.get(gameLayer).to({
                x: Const.WIDTH
            }, delay).call(UIUtils.removeSelf, this, [gameLayer]);
            var curScene = SceneManager.instance.getCurrentScene();
            egret.Tween.get(curScene).to({
                x: 0
            }, delay);
            egret.Tween.get(this.popLayer).to({
                x: 0
            }, delay);
        }
    };
    return GameLayerManager;
}());
__reflect(GameLayerManager.prototype, "GameLayerManager");
//# sourceMappingURL=GameLayerManager.js.map