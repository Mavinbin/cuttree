class PanelGameOver extends PanelBase {
    public curScore: eui.Label;
    public MaxScore: eui.Label;


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
        let rect = new eui.Rect(Const.WIDTH, Const.HEIGHT, 0x000000);
        rect.alpha = 0.6;
        this.addChild(rect);

        let popComponent = new eui.Component;
        popComponent.width = Const.WIDTH - 200;
        popComponent.height = Const.HEIGHT - 500;
        popComponent.anchorOffsetX = popComponent.width / 2;
        popComponent.x = Const.WIDTH / 2;
        popComponent.y = 50;
        this.addChild(popComponent)

        let gameoverLayer = new eui.Label('GAME OVER');
        gameoverLayer.y = 70;
        gameoverLayer.size = 70;
        gameoverLayer.width = popComponent.width;
        gameoverLayer.height = 70;
        gameoverLayer.textAlign = egret.HorizontalAlign.CENTER;
        popComponent.addChild(gameoverLayer);

        //本轮得分
        let curLabelText = new eui.Label('本轮得分');
        curLabelText.y = gameoverLayer.y + gameoverLayer.height + 60;
        curLabelText.size = 40;
        curLabelText.width = popComponent.width;
        curLabelText.height = 40;
        curLabelText.textAlign = egret.HorizontalAlign.CENTER;
        popComponent.addChild(curLabelText);


        // 真正得分
        this.curScore = new eui.Label;
        this.curScore.text = '190';
        this.curScore.bold = true;
        this.curScore.y = curLabelText.y + curLabelText.height + 50;
        this.curScore.textColor = 0xff0000;
        this.curScore.size = 35;
        this.curScore.width = popComponent.width;
        this.curScore.height = 35;
        this.curScore.textAlign = egret.HorizontalAlign.CENTER;
        popComponent.addChild(this.curScore);


        //最高得分
        let maxLabelText = new eui.Label('最高得分');
        maxLabelText.y = this.curScore.y + this.curScore.height + 60;
        maxLabelText.size = 40;
        maxLabelText.width = popComponent.width;
        maxLabelText.height = 40;
        maxLabelText.textAlign = egret.HorizontalAlign.CENTER;
        popComponent.addChild(maxLabelText);

        // 真正得分
        this.MaxScore = new eui.Label;
        this.MaxScore.text = '500';
        this.MaxScore.bold = true;
        this.MaxScore.y = maxLabelText.y + maxLabelText.height + 50;
        this.MaxScore.textColor = 0xff0000;
        this.MaxScore.size = 35;
        this.MaxScore.width = popComponent.width;
        this.MaxScore.height = 35;
        this.MaxScore.textAlign = egret.HorizontalAlign.CENTER;
        popComponent.addChild(this.MaxScore);

        //确定按钮
        this.confirmBtn = new eui.Button;
        this.confirmBtn.label = '重新开始';
        this.confirmBtn.width = popComponent.width - 100;
        this.confirmBtn.height = 60;
        this.confirmBtn.anchorOffsetX = this.confirmBtn.width / 2;
        this.confirmBtn.x = popComponent.width / 2;
        this.confirmBtn.y = this.MaxScore.y + this.MaxScore.height + 40;
        UIUtils.addButtonScaleEffects(this.confirmBtn);
        popComponent.addChild(this.confirmBtn);
    }

}