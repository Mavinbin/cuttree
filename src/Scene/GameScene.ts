
class GameScene extends SceneBase {
  public tree: eui.Image;
  public cutter: eui.Rect;
  public ScoreLabel: eui.Label;
  public timeBar: eui.Rect;
  public levelLabel: eui.Label;
  public overPanel: PanelGameOver;
  public branchs: Array<eui.Rect> = [];
  public constructor() {
    super();
    this.skinName = new GameSkin();
    console.log(this.skinName)
  }

  // 游戏是否暂停
  public timer: egret.Tween;
  public isPause: boolean = false;
  public score: number; // 分数
  public level: number; //当前等级
  public curTime: number; // 最
  public curLong: number;//最大长度

  // 创建子元素
  public createChildren() {
    super.createChildren();
    this._init();
  }

  // 初始化
  private _init() {
    this._initData();
    this._initView();
    this._initEvent();
    this._start();
  }


  // 初始化数据
  private _initData() {
    this.score = 0;
    this.level = 0;
    this.curTime = 10;
    this.isPause = false;
    this.curLong = Const.WIDTH - 150;
    if (this.timer) this.timer.setPaused(true);
    this.timer = null;
  }

  //初始化界面
  private label: eui.Label;
  private _initView() {
    this._createCutter();
    this._createTree();
    this._initBranch();
    this._createScore();
    this._initTimeBar();
    this.label = new eui.Label;
    this.label.backgroundColor = 0xff0000;
    this.label.width = Const.WIDTH / 2;
    this.label.height = 100;
    this.addChild(this.label);
  }

  private _start() {
    this._createTimerEvent();
  }

  // 初始化时间条
  private _initTimeBar() {
    if (!this.timeBar) {


      this.timeBar = new eui.Rect();
      this.timeBar.width = this.curLong;
      this.timeBar.anchorOffsetX = this.timeBar.width / 2;
      this.timeBar.x = Const.WIDTH / 2;
      this.timeBar.y = 50;
      this.timeBar.height = 10;
      this.timeBar.fillColor = 0x873284;
      this.timeBar.ellipseWidth = 10;
      this.timeBar.ellipseHeight = 10;
      this.addChild(this.timeBar);
    }
    this.timeBar.width = this.curLong;
  }

  // 初始化树枝
  private _createTree() {
    this.tree = new eui.Image();
    this.tree.texture = RES.getRes('trunk_png');
    this.tree.x = (Const.WIDTH - this.tree.width) / 2;
    this.addChild(this.tree)
  }

  private _createScore() {
    if (!this.ScoreLabel) {
      this.ScoreLabel = new eui.Label();
      this.ScoreLabel.width = this.tree.width;
      this.ScoreLabel.anchorOffsetX = this.ScoreLabel.width / 2;
      this.ScoreLabel.x = this.tree.x;
      this.ScoreLabel.y = 300;
      this.ScoreLabel.height = 45;
      this.ScoreLabel.size = 36;
      this.ScoreLabel.textAlign = egret.HorizontalAlign.CENTER;
      this.ScoreLabel.textColor = 0xff8930;
      this.addChild(this.ScoreLabel)
    }
    this.ScoreLabel.text = this.score.toString()
  }

  // 创建砍树人员
  private _createCutter() {
    this.cutter = new eui.Rect(120, 200, 0xffe30b);
    this.cutter.y = Const.HEIGHT - this.cutter.height - 240;
    this.cutter.x = 50;
    this.addChild(this.cutter);
  }

  // 获取一根树枝
  private _getOneBranch(y: number = 0, defaultRect?: eui.Rect) {
    let rect = defaultRect || new eui.Rect(150, 40, 0xf57f7f);
    rect.x = Math.random() > 0.5 ? (Const.WIDTH / 2 - 100 - rect.width) : Const.WIDTH / 2 + 100;
    rect.y = y;
    return rect;
  }

  // 初始化树枝
  private _initBranch() {
    let rect = null;
    this.branchs = [];
    for (let i = 0; i < 5; i++) {
      rect = this._getOneBranch(this._getYByIndex())
      this.branchs.push(rect);
      this.addChild(rect);
    }
  }

  // 获取树枝的y坐标
  private _getYByIndex(max?: number) {
    let lastY = this.branchs.length === 0 ? (this.cutter.y - 60) : this.branchs[this.branchs.length - 1].y;
    let distance = this._getOneBranchDistance();
    return lastY - distance
  }

  // 获取树枝与树枝之间的距离
  private _getOneBranchDistance(max?: number, defaultIndex?: number) {

    if (this.level >= 10 && this.level < 20) max = 2;
    else if (this.level >= 20) {
      max = 1;
    } else {
      max = 0;
    }

    let index = defaultIndex || Math.round(Math.random() * (max || 3)) + 1;
    return index * (this.cutter.height)
  }

  // 初始化事件
  private _initEvent() {
    this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._handlerCutTreeEvent, this);
  }

  //初始化时间条
  private _createTimerEvent() {
    if (this.timer) {
      this.timer.setPaused(true);
      this.timer = null;
    }
    this.timer = egret.Tween.get(this.timeBar);
    this.timer.to({
      width: 0
    }, this.curTime * 1000).call(() => {
      // this.gameOver();
    });
  }

  // 砍树事件处理
  private _handlerCutTreeEvent(eve) {
    if (this.isPause) return;
    const stageX = eve.stageX;
    if (stageX > Const.WIDTH / 2) { //右半边
      this.cutter.x = Const.WIDTH - this.cutter.width - 50;
      this.animationCutter();
    } else { //左半边
      this.cutter.x = 50;
      this.animationCutter(true);
    }
    this._TreeCutAnimate();
    this.ScoreLabel.text = (++this.score).toString();
    if (this.score % 20 === 0) this._levelUp();
    this._handleTimeAdd();
  }

  //处理点击时时间增加相关
  private _handleTimeAdd() {
    this.timer.setPaused(true);
    const onclikAddDis = this.curLong / this.curTime / 6;
    const TimeBarWidth = this.timeBar.width;
    this.timeBar.width = TimeBarWidth + onclikAddDis > this.curLong ? this.curLong : TimeBarWidth + onclikAddDis;
    this._createTimerEvent();
  }

  //升级
  private _levelUp() {
    this.level++;
    const tempCurTime = this.curTime - Math.sqrt(this.level + 10 * this.level);
    this.curTime = tempCurTime > 1 ? tempCurTime : 1;
    this._levelUpAnimation();
  }

  private _levelUpAnimation() {
    this.levelLabel = this.levelLabel || new eui.Label();
    this.levelLabel.alpha = 1;
    this.levelLabel.text = this.level.toString();
    this.levelLabel.size = 60;
    this.levelLabel.width = this.tree.width;
    this.levelLabel.height = 80;
    this.levelLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
    this.levelLabel.textAlign = egret.HorizontalAlign.CENTER;
    this.levelLabel.anchorOffsetX = this.levelLabel.width / 2;
    this.levelLabel.anchorOffsetY = this.levelLabel.height / 2;
    this.levelLabel.x = Const.WIDTH / 2;
    this.levelLabel.y = 400 + this.levelLabel.height / 2;
    this.levelLabel.textColor = 0x890239;
    egret.Tween.get(this.levelLabel).to({
      scaleX: 1.3,
      scaleY: 1.3
    }, 150).to({
      scaleX: 1,
      scaleY: 1,
      alpha: 0,
    }, 800);
    this.addChild(this.levelLabel);
  }

  // 砍树人的动画处理
  private animationCutter(flag: boolean = false) {
    let ratotion = 30;
    if (flag) ratotion = -30;
    let tCutter = egret.Tween.get(this.cutter)
    tCutter.wait(10);
    tCutter.to({
      rotation: ratotion
    }, 30).to({
      rotation: 0
    }, 30)
    this._cutedTreeMove(flag);
  }

  // 被砍的树块生成与动画
  private _cutedTreeMove(flag: boolean = false) {
    let rect = new eui.Rect(this.tree.width, 150, 0x832466);
    rect.anchorOffsetX = rect.width / 2;
    rect.x = Const.WIDTH / 2;
    rect.y = this.cutter.y + 20;
    this.addChild(rect);
    let tw = egret.Tween.get(rect);
    tw.to({
      rotation: flag ? 90 : -90,
      x: flag ? Const.WIDTH + rect.width : - rect.width
    }, 500).call(() => { rect = null });

    let lineRect = new eui.Rect(0, 2, 0xffffff);
    lineRect.y = rect.y + rect.height;
    lineRect.x = (Const.WIDTH - this.tree.width) / 2;

    this.addChild(lineRect);
    let lintTw = egret.Tween.get(lineRect)
    if (flag) {
      lintTw.to({
        width: this.tree.width,
        alpha: 0
      }, 200).call(() => { lineRect = null })
    } else {
      lineRect.x = (Const.WIDTH - this.tree.width) / 2 + this.tree.width / 2;
      lintTw.to({
        x: (Const.WIDTH - this.tree.width) / 2,
        width: this.tree.width,
        alpha: 0
      }, 200).call(() => { lineRect = null })
    }
  }
  private _curTime: number = 0;

  // 树枝下降
  private _TreeCutAnimate() {

    const uuu = new Date().getTime()
    if (this._curTime) {
      const detTime = uuu - this._curTime;
      console.log(detTime);
      this.label.text = detTime.toString();

    }
    this._curTime = uuu;


    this.branchs.forEach((branch, index) => {
      egret.Tween.get(branch).to({
        y: branch.y + this._getOneBranchDistance(1, 1)
      }, 50, egret.Ease.bounceInOut).call(() => {
        if (index == 0 && branch.y >= this.cutter.y) {
          if (
            (Const.WIDTH / 2 - branch.x > 0 && Const.WIDTH / 2 - this.cutter.x > 0) ||
            (Const.WIDTH / 2 - branch.x < 0 && Const.WIDTH / 2 - this.cutter.x < 0)
          ) { //撞上了
            this.gameOver();
          } else {
            this.resetBranchs(this.branchs, branch);
            // branchs.shift();
            // branchs.push(this._getOneBranch(this._getYByIndex(), branch));
          }
        }
      })
    })
  }
  // 判断树枝运动后的结果
  private judgeTreeY() {

  }

  //游戏结束
  public gameOver() {
    this.isPause = true;
    const label = new eui.Label('游戏结束');
    label.width = this.cutter.width;
    label.textColor = 0xff0000;
    this.cutter.addChild(label);
    // this.ScoreLabel.text = (--this.score).toString();
    if (this.timer) this.timer.setPaused(true);

    //设置最高分
    const MaxScore = Number(egret.localStorage.getItem('MAX_SCORE'));
    if (MaxScore < this.score) egret.localStorage.setItem('MAX_SCORE', this.score.toString());

    this._initGameOverPanel(() => {
      this._initData();
      this.resetBranchs();
      this._start();
      this.overPanel.onHide();
      UIUtils.removeSelf(label);
    });
  }

  resetBranchs(branchs = this.branchs, branch = this.branchs[0]) {
    branchs.shift();
    branchs.push(this._getOneBranch(this._getYByIndex(), branch));
    this._createScore();
    this._initTimeBar();
  }


  private _initGameOverPanel(onConfirm?: Function) {
    this.overPanel = new PanelGameOver;
    this.overPanel.init();
    this.overPanel.curScore.text = this.score.toString();
    this.overPanel.MaxScore.text = egret.localStorage.getItem('MAX_SCORE');
    this.overPanel.onConfirm = () => onConfirm()
  }
}