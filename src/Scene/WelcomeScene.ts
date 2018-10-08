class WelcomeScene extends SceneBase {
    public group: eui.Group;
    private startGameButton: eui.Button;
    private helpButton: eui.Button;
    private rankButton: eui.Button;
    public panelHelp: PanelHelp;
    private tree: eui.Image;
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
        this._createTree();
        this._createCutter();
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
        this.helpButton.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this._initPanelHelp(() => {
                this.panelHelp.onHide();
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
    }

    private _createTree() {
        this.tree = new eui.Image();
        this.tree.texture = RES.getRes('tree_png');
        this.tree.x = (Const.WIDTH - this.tree.width) / 2;
        const y = Const.HEIGHT * 0.88 - this.tree.height;
        this.tree.y = y < 0 ? y : 0;
        this.group.addChild(this.tree);
    }

    private _createCutter() {
        const cutterData = RES.getRes('updown_json');
        const cutterImg = RES.getRes('updown_png');
        const mcFactory = new egret.MovieClipDataFactory(cutterData, cutterImg);
        let cutter = new egret.MovieClip(mcFactory.generateMovieClipData('cutter'));
        cutter.x = this.tree.x - cutter.width + 100;
        cutter.y = Const.HEIGHT * 0.88 - cutter.height;
        this.group.addChild(cutter);
        cutter.gotoAndPlay('updown', -1);
    }

    private _initPanelHelp(onConfirm?: Function) {
        this.panelHelp = new PanelHelp;
        this.panelHelp.init();
        this.panelHelp.onConfirm = () => onConfirm();
    }
}