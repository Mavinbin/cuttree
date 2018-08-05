var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SceneManager = (function () {
    function SceneManager() {
        this.globalColor = 0xa9cf2e;
        if (SceneManager._instance)
            throw new Error("SceneManager 使用单例");
    }
    Object.defineProperty(SceneManager, "instance", {
        get: function () {
            if (!SceneManager._instance)
                SceneManager._instance = new SceneManager;
            return SceneManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    SceneManager.prototype.runScene = function (scene, color) {
        this.removeScene();
        this.currentScene = new scene;
        GameLayerManager.instance.gameLayer.addChild(this.currentScene);
        color = color || this.globalColor;
        if (color != null) {
            var rect = new eui.Rect(Const.WIDTH, Const.HEIGHT, 0x1ef7e8);
            GameLayerManager.instance.gameLayer.addChild(rect);
            egret.Tween.get(rect).to({
                alpha: 0
            }, 350).call(UIUtils.removeSelf, this, [rect]);
        }
    };
    SceneManager.prototype.removeScene = function () {
        if (this.currentScene) {
            UIUtils.removeSelf(this.currentScene);
            this.currentScene = null;
        }
    };
    SceneManager.prototype.getCurrentScene = function () {
        return this.currentScene;
    };
    SceneManager._instance = new SceneManager;
    return SceneManager;
}());
__reflect(SceneManager.prototype, "SceneManager");
//# sourceMappingURL=SceneManager.js.map