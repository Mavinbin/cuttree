var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameScene = (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        var _this = _super.call(this) || this;
        _this.branchs = [];
        _this.isPause = false;
        _this._curTime = 0;
        _this.skinName = new GameSkin();
        return _this;
    }
    // 创建子元素
    GameScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this._init();
    };
    // 初始化
    GameScene.prototype._init = function () {
        this._initData();
        this._initView();
        this._initEvent();
        this._start();
        this.gameOver();
    };
    // 初始化数据
    GameScene.prototype._initData = function () {
        this.score = 0;
        this.level = 0;
        this.curTime = 10;
        this.isPause = false;
        this.curLong = Const.WIDTH - 150;
        if (this.timer)
            this.timer.setPaused(true);
        this.timer = null;
    };
    GameScene.prototype._initView = function () {
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
    };
    GameScene.prototype._start = function () {
        this._createTimerEvent();
    };
    // 初始化时间条
    GameScene.prototype._initTimeBar = function () {
        if (!this.timeBar) {
            var timeBarGroup = new eui.Group();
            var timeBarWrap = new eui.Image();
            timeBarWrap.texture = RES.getRes('timebar_wrap_png');
            timeBarGroup.top = 84;
            timeBarGroup.left = (Const.WIDTH - timeBarWrap.width) / 2;
            timeBarGroup.addChild(timeBarWrap);
            var timeGroup = new eui.Group();
            var timeBarMask = new egret.Shape();
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
    };
    // 初始化树干
    GameScene.prototype._createTree = function () {
        this.tree = new eui.Image();
        this.tree.texture = RES.getRes('trunk_png');
        this.tree.x = (Const.WIDTH - this.tree.width) / 2;
        var y = Const.HEIGHT * 0.88 - this.tree.height;
        this.tree.y = y < 0 ? y : 0;
        this.addChild(this.tree);
    };
    GameScene.prototype._createScore = function () {
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
            this.addChild(this.ScoreLabel);
        }
        this.ScoreLabel.text = this.score.toString();
    };
    // 创建砍树人员
    GameScene.prototype._createCutter = function () {
        var cutterData = RES.getRes('cutter_json');
        var cutterImg = RES.getRes('cutter_png');
        var mcFactory = new egret.MovieClipDataFactory(cutterData, cutterImg);
        this.cutter = new egret.MovieClip(mcFactory.generateMovieClipData('cutter'));
        this.addChild(this.cutter);
        this.cutter.gotoAndStop(1);
        this.cutter.x = this.tree.x - this.cutter.width;
        this.cutter.y = Const.HEIGHT * 0.88 - this.cutter.height;
    };
    // 获取一根树枝
    GameScene.prototype._getOneBranch = function (y, defaultRect) {
        if (y === void 0) { y = 0; }
        var branch = defaultRect || new eui.Image();
        var random = Math.random();
        if (random > 0.5) {
            branch.texture = RES.getRes('branch_left_png');
            branch.x = this.tree.x - branch.width + 100;
        }
        else {
            branch.texture = RES.getRes('branch_right_png');
            branch.x = this.tree.x + this.tree.width - 60;
        }
        branch.y = y;
        return branch;
    };
    // 初始化树枝
    GameScene.prototype._initBranch = function () {
        var rect = null;
        this.branchs = [];
        for (var i = 0; i < 5; i++) {
            rect = this._getOneBranch(this._getYByIndex());
            this.branchs.push(rect);
            this.addChild(rect);
        }
    };
    // 获取树枝的y坐标
    GameScene.prototype._getYByIndex = function (max) {
        var lastY = this.branchs.length === 0 ? (this.cutter.y - 60) : this.branchs[this.branchs.length - 1].y;
        var distance = this._getOneBranchDistance();
        return lastY - distance;
    };
    // 获取树枝与树枝之间的距离
    GameScene.prototype._getOneBranchDistance = function (max, defaultIndex) {
        if (this.level >= 10 && this.level < 20)
            max = 2;
        else if (this.level >= 20) {
            max = 1;
        }
        else {
            max = 0;
        }
        var index = defaultIndex || Math.round(Math.random() * (max || 3)) + 1;
        return index * (this.cutter.height);
    };
    // 初始化事件
    GameScene.prototype._initEvent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this._handlerCutTreeEvent, this);
    };
    //初始化时间条
    GameScene.prototype._createTimerEvent = function () {
        var _this = this;
        if (this.timer) {
            this.timer.setPaused(true);
            this.timer = null;
        }
        this.timer = egret.Tween.get(this.timeBar);
        this.timer.to({
            x: -this.timeBar.width
        }, this.curTime * 1000).call(function () {
            _this.gameOver();
        });
    };
    // 砍树事件处理
    GameScene.prototype._handlerCutTreeEvent = function (eve) {
        if (this.isPause)
            return;
        var stageX = eve.stageX;
        if (stageX > Const.WIDTH / 2) {
            this.cutter.x = Const.WIDTH - this.cutter.width - 50;
            this.animationCutter();
        }
        else {
            this.cutter.x = 50;
            this.animationCutter(true);
        }
        this._TreeCutAnimate();
        this.ScoreLabel.text = (++this.score).toString();
        if (this.score % 20 === 0)
            this._levelUp();
        this._handleTimeAdd();
    };
    //处理点击时时间增加相关
    GameScene.prototype._handleTimeAdd = function () {
        this.timer.setPaused(true);
        var onclikAddDis = this.timeBar.width / this.curTime / 6;
        var timeBarX = this.timeBar.x;
        this.timeBar.x = timeBarX + onclikAddDis > 0 ? 0 : timeBarX + onclikAddDis;
        this._createTimerEvent();
    };
    //升级
    GameScene.prototype._levelUp = function () {
        this.level++;
        var tempCurTime = this.curTime - Math.sqrt(this.level + 10 * this.level);
        this.curTime = tempCurTime > 1 ? tempCurTime : 1;
        this._levelUpAnimation();
    };
    GameScene.prototype._levelUpAnimation = function () {
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
    };
    // 砍树人的动画处理
    GameScene.prototype.animationCutter = function (flag) {
        if (flag === void 0) { flag = false; }
        if (flag) {
            this.cutter.x = this.tree.x - this.cutter.width;
            this.cutter.gotoAndPlay('cut_l', 1);
        }
        else {
            this.cutter.x = this.tree.x + this.tree.width - 60;
            this.cutter.gotoAndPlay('cut_r', 1);
        }
        this._cutedTreeMove(flag);
    };
    // 被砍的树块生成与动画
    GameScene.prototype._cutedTreeMove = function (flag) {
        if (flag === void 0) { flag = false; }
        var wood = new eui.Image();
        wood.texture = RES.getRes('wood_png');
        wood.anchorOffsetX = wood.width / 2;
        wood.x = Const.WIDTH / 2;
        wood.y = this.cutter.y + 20;
        this.addChild(wood);
        var tw = egret.Tween.get(wood);
        tw.to({
            rotation: flag ? 90 : -90,
            x: flag ? Const.WIDTH + wood.height : -wood.height
        }, 500).call(function () { wood = null; });
        var lineRect = new eui.Rect(0, 2, 0xffffff);
        lineRect.y = Const.HEIGHT * 0.78;
        lineRect.x = this.tree.x + 100;
        this.addChild(lineRect);
        var lintTw = egret.Tween.get(lineRect);
        if (flag) {
            lintTw.to({
                width: this.tree.width - 160,
                alpha: 0
            }, 200).call(function () { lineRect = null; });
        }
        else {
            lineRect.x = this.tree.x + this.tree.width - 60;
            lintTw.to({
                x: this.tree.x + 100,
                width: this.tree.width - 160,
                alpha: 0
            }, 200).call(function () { lineRect = null; });
        }
    };
    // 树枝下降
    GameScene.prototype._TreeCutAnimate = function () {
        var _this = this;
        var uuu = new Date().getTime();
        if (this._curTime) {
            var detTime = uuu - this._curTime;
            this.label.text = detTime.toString();
        }
        this._curTime = uuu;
        this.branchs.forEach(function (branch, index) {
            egret.Tween.get(branch).to({
                y: branch.y + _this._getOneBranchDistance(1, 1)
            }, 50, egret.Ease.bounceInOut).call(function () {
                if (index == 0 && branch.y >= _this.cutter.y) {
                    if ((Const.WIDTH / 2 - branch.x > 0 && Const.WIDTH / 2 - _this.cutter.x > 0) ||
                        (Const.WIDTH / 2 - branch.x < 0 && Const.WIDTH / 2 - _this.cutter.x < 0)) {
                        _this.gameOver();
                    }
                    else {
                        _this.resetBranchs(_this.branchs, branch);
                        // branchs.shift();
                        // branchs.push(this._getOneBranch(this._getYByIndex(), branch));
                    }
                }
            });
        });
    };
    // 判断树枝运动后的结果
    GameScene.prototype.judgeTreeY = function () {
    };
    //游戏结束
    GameScene.prototype.gameOver = function () {
        var _this = this;
        this.isPause = true;
        var label = new eui.Label('游戏结束');
        label.width = this.cutter.width;
        label.textColor = 0xff0000;
        // this.cutter.addChild(label);
        // this.ScoreLabel.text = (--this.score).toString();
        if (this.timer) {
            this.timer.setPaused(true);
        }
        //设置最高分
        var MaxScore = Number(egret.localStorage.getItem('MAX_SCORE'));
        if (MaxScore < this.score)
            egret.localStorage.setItem('MAX_SCORE', this.score.toString());
        this._initGameOverPanel(function () {
            _this._initData();
            _this.resetBranchs();
            _this._start();
            _this.overPanel.onHide();
            UIUtils.removeSelf(label);
        });
    };
    GameScene.prototype.resetBranchs = function (branchs, branch) {
        if (branchs === void 0) { branchs = this.branchs; }
        if (branch === void 0) { branch = this.branchs[0]; }
        branchs.shift();
        branchs.push(this._getOneBranch(this._getYByIndex(), branch));
        this._createScore();
        this._initTimeBar();
    };
    GameScene.prototype._initGameOverPanel = function (onConfirm) {
        this.overPanel = new PanelGameOver;
        this.overPanel.init();
        this.overPanel.curScore.text = this.score.toString();
        this.overPanel.MaxScore.text = egret.localStorage.getItem('MAX_SCORE');
        this.overPanel.onConfirm = function () { return onConfirm(); };
    };
    return GameScene;
}(SceneBase));
__reflect(GameScene.prototype, "GameScene");
//# sourceMappingURL=GameScene.js.map