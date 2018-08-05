class WelcomeScene extends SceneBase {
    public group: eui.Group;
    private startGameButton: eui.Button;
    public button: eui.Button;
    public constructor() {
        super();
        this.skinName = new WelcomeSkin
    }

    public createChildren() {
        super.createChildren();
        this._init();
    }

    private _init() {
        this._initView();
        this._initEvent();
    }

    private _initView() {
        this._createInfo();
        this._createButton();
    }

    private _initEvent() {
        this.startGameButton.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
            SceneManager.instance.runScene(GameScene);
        }, this.startGameButton);
    }

    private _createInfo() {
        const titleImg = new eui.Image();
        titleImg.texture = RES.getRes('title_png');
        titleImg.width = 690;
        titleImg.height = 323;
        titleImg.x = (Const.WIDTH - titleImg.width) / 2;
        titleImg.y = 393;
        this.group.addChild(titleImg);

        const copyright = new eui.Label('网站中心版权所有');
        copyright.width = Const.WIDTH;
        copyright.height = 45;
        copyright.textColor = 0xffffff;
        copyright.size = 40;
        copyright.x = 10;
        copyright.textAlign = egret.HorizontalAlign.CENTER;
        copyright.y = Const.HEIGHT - 100;
        this.group.addChild(copyright)
    }

    private _createButton() {
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
    }
}