class PanelHelp extends PanelBase {
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
        
        //添加遮罩
        let mask = new eui.Rect(Const.WIDTH, Const.HEIGHT, 0x000000);
        mask.alpha = 0.6;
        this.addChild(mask);

        let popComponent = new eui.Component;
        this.addChild(popComponent)

        let helpLayer = new eui.Image();
        helpLayer.texture = RES.getRes('panel_help_png');
        popComponent.width = helpLayer.width;
        popComponent.height = helpLayer.height;
        popComponent.x = (Const.WIDTH - helpLayer.width) / 2;
        popComponent.y = Const.HEIGHT * 0.05;
        popComponent.addChild(helpLayer);

        //游戏规则
        let ruleText = new eui.Label;
        ruleText.text = `1、游戏操作\n通过点击屏幕左右两边（以屏幕中间线为分界），控制人物的左右移动来砍树；\n\n2、游戏失败\n时间条减少为0或者人物触碰到树枝时游戏结束；\n\n3、得分\n根据砍到的木头数量来计算分数`;
        ruleText.x = 50;
        ruleText.y = 200;
        ruleText.width = helpLayer.width -  ruleText.x - 30;
        ruleText.size = 40;
        ruleText.lineSpacing = 20;
        ruleText.textColor = 0x000000;
        popComponent.addChild(ruleText);

        //确定按钮
        this.confirmBtn = new eui.Button;
        this.confirmBtn.skinName = 'resource/skin/button/ButtonConfirm.exml';
        this.confirmBtn.anchorOffsetX = this.confirmBtn.width / 2;
        this.confirmBtn.anchorOffsetY = this.confirmBtn.height / 2;
        this.confirmBtn.x = popComponent.width / 2;
        this.confirmBtn.y = popComponent.height - 10;
        UIUtils.addButtonScaleEffects(this.confirmBtn);
        popComponent.addChild(this.confirmBtn);
    }

}