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
var TestScene = (function (_super) {
    __extends(TestScene, _super);
    function TestScene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestScene.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.skinName = new WelcomeSkin;
        this.addComponentToRect();
    };
    TestScene.prototype.addComponentToRect = function () {
        this.group.width = Const.WIDTH;
        this.group.height = Const.HEIGHT;
        this.img1.width = Const.WIDTH;
        this.img1.height = Const.HEIGHT;
        this.img1.y = -Const.HEIGHT;
        this.img2.width = Const.WIDTH;
        this.img2.height = Const.HEIGHT;
        this.img2.y = 0;
        this.animation();
    };
    TestScene.prototype.animation = function () {
        var _this = this;
        egret.Tween.get(this.group).to({
            y: Const.HEIGHT
        }, 20000).call(function () {
            _this.group.y = 0;
            _this.animation();
        });
    };
    return TestScene;
}(SceneBase));
__reflect(TestScene.prototype, "TestScene");
//# sourceMappingURL=TestScene.js.map