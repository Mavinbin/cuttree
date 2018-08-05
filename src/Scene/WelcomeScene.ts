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
        this.button.width = 200;
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
        const title = new eui.Label('砍树不好')
        title.width = Const.WIDTH;
        title.height = 80;
        title.size = 40;
        title.bold = true;
        title.y = 100;
        // title.textColor = 0xc57800;
        title.textColor = 0xffffff;
        title.textAlign = egret.HorizontalAlign.CENTER;
        this.group.addChild(title)

        const imageIcon = Utils.createBitmapByName('icon_jpg');
        imageIcon.width = 200;
        imageIcon.height = 200;
        imageIcon.anchorOffsetX = imageIcon.width / 2;
        imageIcon.anchorOffsetY = imageIcon.height / 2;
        imageIcon.x = Const.WIDTH / 2;
        imageIcon.y = 350;
        this.group.addChild(imageIcon);

        const copyright = new eui.Label('网站中心版权所有');
        copyright.width = Const.WIDTH;
        copyright.height = 45;
        copyright.textColor = 0xffffff;
        copyright.size = 12;
        copyright.x = 10;
        copyright.textAlign = egret.HorizontalAlign.CENTER;
        copyright.y = Const.HEIGHT - 22;
        this.group.addChild(copyright)
    }

    private _createButton() {
        this.startGameButton = new eui.Button;
        this.startGameButton.label = '开始游戏';
        this.startGameButton.width = Const.WIDTH / 2;
        this.startGameButton.height = 50;
        this.startGameButton.x = Const.WIDTH / 2;
        this.startGameButton.y = Const.HEIGHT - 300;
        this.startGameButton.anchorOffsetX = this.startGameButton.width / 2;
        this.startGameButton.anchorOffsetY = this.startGameButton.height / 2;
        this.group.addChild(this.startGameButton)

        UIUtils.addButtonScaleEffects(this.startGameButton);
    }
}