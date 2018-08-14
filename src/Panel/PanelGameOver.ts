class PanelGameOver extends PanelBase {
    public curScore: eui.BitmapLabel;
    public MaxScore: eui.BitmapLabel;


    public constructor() {
        super(null);
        this.isFullScreen = true;
        this.isVisibleAnimate = false;
    }

    public createChildren() {
        super.createChildren();
        this.addChildren();
    }

    addChildren() {
        
        //添加背景
        let mask = new eui.Rect(Const.WIDTH, Const.HEIGHT, 0x000000);
        mask.alpha = 0.6;
        this.addChild(mask);

        let popComponent = new eui.Component;
        this.addChild(popComponent)

        let gameoverLayer = new eui.Image();
        gameoverLayer.texture = RES.getRes('panel_over_png');
        popComponent.width = gameoverLayer.width;
        popComponent.height = gameoverLayer.height;
        popComponent.x = (Const.WIDTH - gameoverLayer.width) / 2;
        popComponent.y = Const.HEIGHT * 0.19;
        popComponent.addChild(gameoverLayer);

        //本轮得分文字
        let curLabelText = new eui.BitmapLabel;
        curLabelText.text = '本轮分数 ：';
        curLabelText.x = 20;
        curLabelText.y = 280;
        curLabelText.width = popComponent.width / 2;
        curLabelText.textAlign = egret.HorizontalAlign.RIGHT;
        curLabelText.verticalAlign = 'middle';
        curLabelText.font = 'jinhei_fnt';
        popComponent.addChild(curLabelText);


        // 本轮得分分数
        this.curScore = new eui.BitmapLabel;
        this.curScore.text = '190';
        this.curScore.x = popComponent.width / 2 + 50;
        this.curScore.y = curLabelText.y;
        this.curScore.width = popComponent.width / 2;
        this.curScore.textAlign = egret.HorizontalAlign.LEFT;
        this.curScore.font = 'jinhei_fnt';
        popComponent.addChild(this.curScore);


        //最高得分文本
        let maxLabelText = new eui.BitmapLabel;
        maxLabelText.text = '最高分数 ：';
        maxLabelText.x = 20;
        maxLabelText.y = curLabelText.y + curLabelText.height + 60;
        maxLabelText.width = popComponent.width / 2;
        maxLabelText.textAlign = egret.HorizontalAlign.RIGHT;
        maxLabelText.verticalAlign = 'middle';
        maxLabelText.font = 'jinhei_fnt';
        popComponent.addChild(maxLabelText);

        // 最高得分分数
        this.MaxScore = new eui.BitmapLabel;
        this.MaxScore.text = '500';
        this.MaxScore.x = popComponent.width / 2 + 50;
        this.MaxScore.y = maxLabelText.y;
        this.MaxScore.width = popComponent.width / 2;
        this.MaxScore.textAlign = egret.HorizontalAlign.LEFT;
        this.MaxScore.font = 'jinhei_fnt';
        popComponent.addChild(this.MaxScore);

        //确定按钮
        this.confirmBtn = new eui.Button;
        this.confirmBtn.skinName = 'resource/skin/button/ButtonPlay.exml';
        this.confirmBtn.anchorOffsetX = this.confirmBtn.width / 2;
        this.confirmBtn.anchorOffsetY = this.confirmBtn.height / 2;
        this.confirmBtn.x = popComponent.width / 2;
        this.confirmBtn.y = popComponent.height - 10;
        UIUtils.addButtonScaleEffects(this.confirmBtn);
        popComponent.addChild(this.confirmBtn);
    }

}