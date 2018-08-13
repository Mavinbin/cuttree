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
        let curLabelText = new eui.Label('本轮得分 ：');
        curLabelText.x = 20;
        curLabelText.y = 280;
        curLabelText.size = 40;
        curLabelText.width = popComponent.width / 2;
        // curLabelText.height = 40;
        curLabelText.textAlign = egret.HorizontalAlign.RIGHT;
        curLabelText.fontFamily = "microsoft yahei";
        curLabelText.stroke = 1;
        curLabelText.strokeColor = 0x3a230a;
        popComponent.addChild(curLabelText);


        // 本轮得分分数
        this.curScore = new eui.Label;
        this.curScore.text = '190';
        this.curScore.bold = true;
        this.curScore.x = popComponent.width / 2 + 10;
        this.curScore.y = curLabelText.y;
        this.curScore.textColor = 0xff0000;
        this.curScore.size = 40;
        this.curScore.width = popComponent.width / 2;
        // this.curScore.height = 35;
        this.curScore.textAlign = egret.HorizontalAlign.LEFT;
        this.curScore.fontFamily = "microsoft yahei";
        this.curScore.stroke = 1;
        this.curScore.strokeColor = 0x3a230a;
        popComponent.addChild(this.curScore);


        //最高得分文本
        let maxLabelText = new eui.Label('最高得分 ：');
        maxLabelText.x = 20;
        maxLabelText.y = curLabelText.y + curLabelText.height + 60;
        maxLabelText.size = 40;
        maxLabelText.width = popComponent.width / 2;
        // maxLabelText.height = 40;
        maxLabelText.textAlign = egret.HorizontalAlign.RIGHT;
        maxLabelText.fontFamily = "microsoft yahei";
        maxLabelText.stroke = 1;
        maxLabelText.strokeColor = 0x3a230a;
        popComponent.addChild(maxLabelText);

        // 最高得分分数
        this.MaxScore = new eui.Label;
        this.MaxScore.text = '500';
        this.MaxScore.bold = true;
        this.MaxScore.x = popComponent.width / 2 + 10;
        this.MaxScore.y = maxLabelText.y;
        this.MaxScore.textColor = 0xff0000;
        this.MaxScore.size = 40;
        this.MaxScore.width = popComponent.width / 2;
        // this.MaxScore.height = 35;
        this.MaxScore.textAlign = egret.HorizontalAlign.LEFT;
        this.MaxScore.fontFamily = "microsoft yahei";
        this.MaxScore.stroke = 1;
        this.MaxScore.strokeColor = 0x3a230a;
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