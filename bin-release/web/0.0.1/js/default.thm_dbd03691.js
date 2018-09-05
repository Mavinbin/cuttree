window.skins={};
function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() {
            this.constructor = d;
        }
    __.prototype = b.prototype;
    d.prototype = new __();
};
window.generateEUI = {};
generateEUI.paths = {};
generateEUI.skins = {}
generateEUI.paths['resource/skin/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.top = 0;
		t.verticalCenter = 0;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/skin/button/ButtonPlay.exml'] = window.skins.ButtonPlay = (function (_super) {
	__extends(ButtonPlay, _super);
	function ButtonPlay() {
		_super.call(this);
		this.skinParts = [];
		
		this.currentState = "up";
		this.elementsContent = [this._Image1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonPlay.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.bottom = 0;
		t.height = 196;
		t.horizontalCenter = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "btn_play_png";
		t.top = 0;
		t.verticalCenter = 0;
		t.width = 194;
		return t;
	};
	return ButtonPlay;
})(eui.Skin);generateEUI.paths['resource/skin/scene/GameScene.exml'] = window.GameSkin = (function (_super) {
	__extends(GameSkin, _super);
	function GameSkin() {
		_super.call(this);
		this.skinParts = ["bgImg"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this.bgImg_i()];
	}
	var _proto = GameSkin.prototype;

	_proto.bgImg_i = function () {
		var t = new eui.Image();
		this.bgImg = t;
		t.bottom = 0;
		t.height = 1920;
		t.left = 0;
		t.right = 0;
		t.source = "bg_main_jpg";
		t.top = 0;
		t.width = 1080;
		return t;
	};
	return GameSkin;
})(eui.Skin);generateEUI.paths['resource/skin/scene/WelcomeScene.exml'] = window.WelcomeSkin = (function (_super) {
	__extends(WelcomeSkin, _super);
	function WelcomeSkin() {
		_super.call(this);
		this.skinParts = ["bgImg","group"];
		
		this.height = 1920;
		this.width = 1080;
		this.elementsContent = [this.group_i()];
	}
	var _proto = WelcomeSkin.prototype;

	_proto.group_i = function () {
		var t = new eui.Group();
		this.group = t;
		t.height = 1920;
		t.width = 1080;
		t.elementsContent = [this.bgImg_i()];
		return t;
	};
	_proto.bgImg_i = function () {
		var t = new eui.Image();
		this.bgImg = t;
		t.bottom = 0;
		t.height = 1920;
		t.left = 0;
		t.right = 0;
		t.source = "bg_start_jpg";
		t.top = 0;
		t.width = 1080;
		return t;
	};
	return WelcomeSkin;
})(eui.Skin);