
class GameScene extends SceneBase {
  public tree: eui.Image;
  public cutter;
  public ScoreLabel: eui.BitmapLabel;
  public timeBar: eui.Image;
  public levelLabel: eui.BitmapLabel;
  public overPanel: PanelGameOver;
  public branchs: Array<eui.Image> = [];
  public constructor() {
    super();
    this.skinName = new GameSkin();
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

    if (this.timeBar) {
      this.timeBar.x = 0;
    }

    if (this.timer) this.timer.setPaused(true);
    this.timer = null;
  }

  //初始化界面
  private label: eui.Label;
  private _initView() {
    this._createTree();
    this._createCutter();
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
      let timeBarGroup = new eui.Group();
      let timeBarWrap = new eui.Image();
      timeBarWrap.texture = RES.getRes('timebar_wrap_png');
      timeBarGroup.top = 84;
      timeBarGroup.left = (Const.WIDTH - timeBarWrap.width) / 2;
      timeBarGroup.addChild(timeBarWrap);
      let timeGroup = new eui.Group();
      let timeBarMask = new egret.Shape();
      this.timeBar = new eui.Image();
      timeGroup.left = 14;
      timeGroup.top = 10;
      this.timeBar.texture = RES.getRes('timebar_inner_png');
      timeBarMask.graphics.beginFill(0x000000);
      timeBarMask.graphics.drawRoundRect(0, 0, this.timeBar.width, this.timeBar.height, this.timeBar.height, this.timeBar.height);
      timeBarMask.graphics.endFill();
      this.timeBar.mask = timeBarMask;
      timeGroup.addChild(this.timeBar);
      timeGroup.addChild(timeBarMask);
      timeBarGroup.addChild(timeGroup);
      this.addChild(timeBarGroup);
    }
  }

  // 初始化树干
  private _createTree() {
    this.tree = new eui.Image();
    this.tree.texture = RES.getRes('trunk_png');
    this.tree.x = (Const.WIDTH - this.tree.width) / 2;
    const y = Const.HEIGHT * 0.88 - this.tree.height;
    this.tree.y = y < 0 ? y : 0;
    this.addChild(this.tree);
  }

  private _createScore() {
    if (!this.ScoreLabel) {
      this.ScoreLabel = new eui.BitmapLabel();
      this.ScoreLabel.font = 'score_font_fnt';
      this.ScoreLabel.width = Const.WIDTH / 2;
      this.ScoreLabel.x = this.tree.x + (this.tree.width - 160 - this.ScoreLabel.width) / 2 + 100;
      this.ScoreLabel.y = Const.HEIGHT * 0.34;
      this.ScoreLabel.textAlign = egret.HorizontalAlign.CENTER;
      this.addChild(this.ScoreLabel)
    }
    this.ScoreLabel.text = this.score.toString()
  }

  // 创建砍树人员
  private _createCutter() {
    const cutterData = RES.getRes('cutter_json');
    const cutterImg = RES.getRes('cutter_png');
    const mcFactory = new egret.MovieClipDataFactory(cutterData, cutterImg);
    this.cutter = new egret.MovieClip(mcFactory.generateMovieClipData('cutter'));
    this.addChild(this.cutter);
    this.cutter.gotoAndStop(1);
    this.cutter.x = this.tree.x - this.cutter.width;
    this.cutter.y = Const.HEIGHT * 0.88 - this.cutter.height;
  }

  // 获取一根树枝
  private _getOneBranch(y: number = 0, defaultRect?: eui.Image) {
    let branch = defaultRect || new eui.Image();
    const random = Math.random();

    if (random > 0.5) {
      branch.texture = RES.getRes('branch_left_png');
      branch.x = this.tree.x - branch.width + 100;
    } else {
      branch.texture = RES.getRes('branch_right_png');
      branch.x = this.tree.x + this.tree.width - 60;
    }
    branch.y = y;
    return branch;
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
      x: - this.timeBar.width
    }, this.curTime * 1000).call(() => {
      this.gameOver();
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
    const onclikAddDis = this.timeBar.width / this.curTime / 6;
    const timeBarX = this.timeBar.x;
    this.timeBar.x = timeBarX + onclikAddDis > 0 ? 0 : timeBarX + onclikAddDis;
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
    this.levelLabel = this.levelLabel || new eui.BitmapLabel();
    this.levelLabel.font = 'jinhei_fnt';
    this.levelLabel.text = 'Level ' + this.level.toString();
    this.levelLabel.alpha = 1;
    this.levelLabel.width = Const.WIDTH / 2;
    this.levelLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
    this.levelLabel.textAlign = egret.HorizontalAlign.CENTER;
    this.levelLabel.anchorOffsetX = this.levelLabel.width / 2;
    this.levelLabel.anchorOffsetY = this.levelLabel.height / 2;
    this.levelLabel.x = this.tree.x + (this.tree.width - 160) / 2 + 100;
    this.levelLabel.y = Const.HEIGHT * 0.22;
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
    if (flag) {
      this.cutter.x = this.tree.x - this.cutter.width;
      this.cutter.gotoAndPlay('cut_l', 1);
    } else {
      this.cutter.x = this.tree.x + this.tree.width - 60;
      this.cutter.gotoAndPlay('cut_r', 1);
    }
    this._cutedTreeMove(flag);
  }

  // 被砍的树块生成与动画
  private _cutedTreeMove(flag: boolean = false) {
    let wood = new eui.Image();
    wood.texture = RES.getRes('wood_png');
    wood.anchorOffsetX = wood.width / 2;
    wood.x = Const.WIDTH / 2;
    wood.y = this.cutter.y + 20;
    this.addChild(wood);

    let tw = egret.Tween.get(wood);
    tw.to({
      rotation: flag ? 90 : -90,
      x: flag ? Const.WIDTH + wood.height : - wood.height
    }, 500).call(() => { wood = null });

    let lineRect = new eui.Rect(0, 2, 0xffffff);
    lineRect.y = Const.HEIGHT * 0.78;
    lineRect.x = this.tree.x + 100;

    this.addChild(lineRect);
    let lintTw = egret.Tween.get(lineRect)
    if (flag) {
      lintTw.to({
        width: this.tree.width - 160,
        alpha: 0
      }, 200).call(() => { lineRect = null })
    } else {
      lineRect.x = this.tree.x + this.tree.width - 60;
      lintTw.to({
        x: this.tree.x + 100,
        width: this.tree.width - 160,
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
    // this.cutter.addChild(label);
    // this.ScoreLabel.text = (--this.score).toString();
    if (this.timer) {
      this.timer.setPaused(true);
    }

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