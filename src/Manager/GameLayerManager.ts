class GameLayerManager {
    public constructor() { }
    private static _instance: GameLayerManager;
    public static get instance(): GameLayerManager {
        if (!GameLayerManager._instance) GameLayerManager._instance = new GameLayerManager;
        return GameLayerManager._instance;
    }

    private _gameLayer: eui.Group;
    private _topLayer: eui.Group;
    private _popLayer: eui.Group;
    private _tipLayer: eui.Group;

    public get gameLayer() {
        return this._gameLayer;
    }
    public get topLayer() {
        return this._gameLayer;
    }
    public get popLayer() {
        return this._popLayer;
    }
    public get tipLayer() {
        return this._tipLayer;
    }

    public init(view: eui.UILayer) {
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

        let label = new eui.Label("v.1.0.0");
        label.textColor = 0xffffff;
        label.size = 12;
        label.x = 10;
        label.y = Const.HEIGHT - 22;

        this.topLayer.addChild(label);
    }

    public showBothScene(scene) {
        const delay = 250;
        let sceneInstance = new scene;
        sceneInstance.x = Const.WIDTH;
        this.gameLayer.addChild(sceneInstance);

        // 动画
        egret.Tween.get(sceneInstance).to({
            x: 0
        }, delay);

        let curScene = SceneManager.instance.getCurrentScene();
        egret.Tween.get(curScene).to({
            x: -Const.WIDTH
        }, delay);
        egret.Tween.get(this.popLayer).to({
            x: -Const.WIDTH
        }, delay)
    }

    public showSingleScene() {
        if (this.gameLayer.numChildren > 1) {
            const delay = 250;
            let gameLayer = this.gameLayer.getChildAt(1);

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
            }, delay)
        }
    }

}