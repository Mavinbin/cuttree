class SceneManager {
    public constructor() {
        if (SceneManager._instance) throw new Error("SceneManager 使用单例")
    }

    public globalColor = 0xa9cf2e;
    public currentScene: eui.Component;

    private static _instance: SceneManager = new SceneManager;
    public static get instance(): SceneManager {
        if (!SceneManager._instance) SceneManager._instance = new SceneManager
        return SceneManager._instance
    }

    public runScene(scene, color?) {
        this.removeScene();
        this.currentScene = new scene;
        GameLayerManager.instance.gameLayer.addChild(this.currentScene)
        color = color || this.globalColor;
        if (color != null) {
            const rect = new eui.Rect(Const.WIDTH, Const.HEIGHT, 0x1ef7e8);
            GameLayerManager.instance.gameLayer.addChild(rect);

            egret.Tween.get(rect).to({
                alpha: 0
            }, 350).call(UIUtils.removeSelf, this, [rect]);
        }
    }


    public removeScene() {
        if (this.currentScene) {
            UIUtils.removeSelf(this.currentScene);
            this.currentScene = null;
        }
    }

    public getCurrentScene() {
        return this.currentScene;
    }
}