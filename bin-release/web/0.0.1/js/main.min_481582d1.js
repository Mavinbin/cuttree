var __reflect=this&&this.__reflect||function(e,t,n){e.__class__=t,n?n.push(t):n=[t],e.__types__=e.__types__?n.concat(e.__types__):n},__extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);n.prototype=t.prototype,e.prototype=new n},__awaiter=this&&this.__awaiter||function(e,t,n,i){return new(n||(n=Promise))(function(r,o){function a(e){try{h(i.next(e))}catch(t){o(t)}}function s(e){try{h(i["throw"](e))}catch(t){o(t)}}function h(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(a,s)}h((i=i.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function n(e){return function(t){return i([e,t])}}function i(n){if(r)throw new TypeError("Generator is already executing.");for(;h;)try{if(r=1,o&&(a=o[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(o,n[1])).done)return a;switch(o=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return h.label++,{value:n[1],done:!1};case 5:h.label++,o=n[1],n=[0];continue;case 7:n=h.ops.pop(),h.trys.pop();continue;default:if(a=h.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){h=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){h.label=n[1];break}if(6===n[0]&&h.label<a[1]){h.label=a[1],a=n;break}if(a&&h.label<a[2]){h.label=a[2],h.ops.push(n);break}a[2]&&h.ops.pop(),h.trys.pop();continue}n=t.call(e,h)}catch(i){n=[6,i],o=0}finally{r=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var r,o,a,s,h={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:n(0),"throw":n(1),"return":n(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s},PanelBase=function(e){function t(t){var n=e.call(this)||this;return n.isVisibleAnimate=!0,n.isDelayDestroy=!1,n.createChildrened=!1,n.isFullScreen=!1,n.touchEnabled=!0,n._viewParent=t,n.addEventListener(egret.TouchEvent.TOUCH_TAP,n.onTouchTap,n),n.addEventListener(egret.Event.ADDED_TO_STAGE,n.onAdded,n),n.addEventListener(egret.Event.REMOVED_FROM_STAGE,n.onRemoved,n),n}return __extends(t,e),Object.defineProperty(t.prototype,"data",{get:function(){return this._data},set:function(e){this._data=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"animate_startPos",{set:function(e){e&&(this._startPos=e)},enumerable:!0,configurable:!0}),t.prototype.onAdded=function(){this.createChildrened&&this.onShow()},t.prototype.onRemoved=function(){this.isDelayDestroy?this.isDelayDestroy=!1:(this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded,this),this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoved,this),this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this),UIUtils.removeButtonScaleEffects(this))},t.prototype.init=function(){this.onGroupResourceLoadedThenAddToStage()},t.prototype.onGroupResourceLoadedThenAddToStage=function(){this._viewParent?this._viewParent.addChild(this):GameLayerManager.instance.popLayer.addChild(this)},t.prototype.refreshAnyTime=function(){},t.prototype.createChildren=function(){e.prototype.createChildren.call(this),this.isFullScreen&&(this.width=Const.WIDTH,this.height=Const.HEIGHT),UIUtils.addButtonScaleEffects(this),this.onShow(),this.createChildrened=!0},t.prototype.onTouchTap=function(e){var t=e.target;t==this.closeBtn?this.onHide():t==this.confirmBtn&&this.onConfirm()},t.prototype.onShow=function(){if(this.isVisibleAnimate){this.x=Const.WIDTH/2,this.y=Const.HEIGHT/2,this._startPos&&(this.x=this._startPos.x,this.y=this._startPos.y);var e=(Const.WIDTH-this.width)/2,t=(Const.HEIGHT-this.height)/2;this.scaleX=this.scaleY=0,egret.Tween.get(this).to({x:e,y:t,scaleX:1,scaleY:1},250,egret.Ease.backOut).call(this.onShowAnimateOver,this)}else UIManager.instance.popPanel(this),this.onShowAnimateOver()},t.prototype.onConfirm=function(){},t.prototype.onShowAnimateOver=function(){},t.prototype.onHideAnimateOver=function(){},t.prototype.onHide=function(){if(UIManager.instance.hidePanel(this),this.isVisibleAnimate){var e=Const.WIDTH/2,t=Const.HEIGHT/2;this._startPos&&(e=this._startPos.x,t=this._startPos.y),egret.Tween.get(this).to({x:e,y:t,scaleX:0,scaleY:0},250,egret.Ease.backIn).call(this.onHideAnimateOver,this).call(UIUtils.removeSelf,this,[this])}else this.onHideAnimateOver(),UIUtils.removeSelf(this)},t.prototype.hide=function(){this.onHide()},t.prototype.showAgain=function(){this.onShow()},t}(eui.Component);__reflect(PanelBase.prototype,"PanelBase");var SceneBase=function(e){function t(){var t=e.call(this)||this;return t.width=Const.WIDTH,t.height=Const.HEIGHT,t.touchEnabled=!0,t.addEventListener(egret.TouchEvent.TOUCH_TAP,t.onTouchTap,t),t.addEventListener(egret.Event.ADDED_TO_STAGE,t.onAdded,t),t.addEventListener(egret.Event.REMOVED_FROM_STAGE,t.onRemoved,t),t}return __extends(t,e),t.prototype.onAdded=function(){this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAdded,this)},t.prototype.onRemoved=function(){this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemoved,this),this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouchTap,this),UIUtils.removeButtonScaleEffects(this),this.destroy()},t.prototype.destroy=function(){this.resGroup&&RES.destroyRes(this.resGroup)},t.prototype.createChildren=function(){e.prototype.createChildren.call(this),UIUtils.addButtonScaleEffects(this)},t.prototype.onTouchTap=function(e){},t}(eui.Component);__reflect(SceneBase.prototype,"SceneBase");var UIManager=function(){function e(){this.panels=[]}return Object.defineProperty(e,"instance",{get:function(){return e._instance||(e._instance=new e),e._instance},enumerable:!0,configurable:!0}),e.prototype.popPanel=function(e,t,n){e instanceof PanelBase?this.currentPanel=e:this.currentPanel=new e,this.currentPanel.data=t,this.currentPanel.animate_startPos=n,this.panels.push(this.currentPanel),GameLayerManager.instance.popLayer.addChild(this.currentPanel)},e.prototype.popOrHidePanel=function(e,t,n){for(var i=0;i<this.panels.length;i++){var r=this.panels[i];if(r instanceof e)return r.hide()}this.popPanel(e,t,n)},e.prototype.isPanelShow=function(e){for(var t=0;t<this.panels.length;t++){var n=this.panels[t];if(n instanceof e)return!0}return!1},e.prototype.hidePanel=function(e){if(e||(e=this.currentPanel),e){var t=this.panels.indexOf(e);-1!=t&&this.panels.splice(t,1)}},e.prototype.closeLastPanel=function(){this.currentPanel&&(this.currentPanel.isDelayDestroy=!0,this.currentPanel.hide())},e.prototype.reOpenLastPanel=function(){this.currentPanel&&(this.popPanel(this.currentPanel),this.currentPanel.refreshAnyTime())},e.prototype.popSimpleTip=function(){},e}();__reflect(UIManager.prototype,"UIManager");var MainO=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(e){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var t=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",t),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(e){console.log(e)})},t.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(n){switch(n.label){case 0:return[4,this.loadResource()];case 1:return n.sent(),this.createGameScene(),[4,RES.getResAsync("description_json")];case 2:return e=n.sent(),this.startAnimation(e),[4,platform.login()];case 3:return n.sent(),[4,platform.getUserInfo()];case 4:return t=n.sent(),console.log(t),[2]}})})},t.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,4,,5]),e=new LoadingUI,this.stage.addChild(e),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return n.sent(),[4,this.loadTheme()];case 2:return n.sent(),[4,RES.loadGroup("preload",0,e)];case 3:return n.sent(),this.stage.removeChild(e),[3,5];case 4:return t=n.sent(),console.error(t),[3,5];case 5:return[2]}})})},t.prototype.loadTheme=function(){var e=this;return new Promise(function(t,n){var i=new eui.Theme("resource/default.thm.json",e.stage);i.addEventListener(eui.UIEvent.COMPLETE,function(){t()},e)})},t.prototype.createGameScene=function(){var e=this.createBitmapByName("bg_jpg");this.addChild(e);var t=this.stage.stageWidth,n=this.stage.stageHeight;e.width=t,e.height=n;var i=new egret.Shape;i.graphics.beginFill(0,.5),i.graphics.drawRect(0,0,t,172),i.graphics.endFill(),i.y=33,this.addChild(i);var r=this.createBitmapByName("egret_icon_png");this.addChild(r),r.x=26,r.y=33;var o=new egret.Shape;o.graphics.lineStyle(2,16777215),o.graphics.moveTo(0,0),o.graphics.lineTo(0,117),o.graphics.endFill(),o.x=172,o.y=61,this.addChild(o);var a=new egret.TextField;a.textColor=16777215,a.width=t-172,a.textAlign="center",a.text="Hello Egret",a.size=24,a.x=172,a.y=80,this.addChild(a);var s=new egret.TextField;this.addChild(s),s.alpha=0,s.width=t-172,s.textAlign=egret.HorizontalAlign.CENTER,s.size=24,s.textColor=16777215,s.x=172,s.y=135,this.textfield=s;var h=new eui.Button;h.label="Click!",h.horizontalCenter=0,h.verticalCenter=0,this.addChild(h),h.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClick,this)},t.prototype.createBitmapByName=function(e){var t=new egret.Bitmap,n=RES.getRes(e);return t.texture=n,t},t.prototype.startAnimation=function(e){var t=this,n=new egret.HtmlTextParser,i=e.map(function(e){return n.parse(e)}),r=this.textfield,o=-1,a=function(){o++,o>=i.length&&(o=0);var e=i[o];r.textFlow=e;var n=egret.Tween.get(r);n.to({alpha:1},200),n.wait(2e3),n.to({alpha:0},200),n.call(a,t)};a()},t.prototype.onButtonClick=function(e){var t=new eui.Panel;t.title="Test",t.horizontalCenter=0,t.verticalCenter=0,this.addChild(t)},t}(eui.UILayer);__reflect(MainO.prototype,"MainO");var DebugPlatform=function(){function e(){}return e.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,{nickName:"username"}]})})},e.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2]})})},e}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ThemeAdapter=function(){function e(){}return e.prototype.getTheme=function(e,t,n,i){function r(e){t.call(i,e)}function o(t){t.resItem.url==e&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),n.call(i))}"undefined"!=typeof generateEUI?egret.callLater(function(){t.call(i,generateEUI)},this):(RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),RES.getResByUrl(e,r,this,RES.ResourceItem.TYPE_TEXT))},e}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var GameLayerManager=function(){function e(){}return Object.defineProperty(e,"instance",{get:function(){return e._instance||(e._instance=new e),e._instance},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"gameLayer",{get:function(){return this._gameLayer},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"topLayer",{get:function(){return this._gameLayer},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"popLayer",{get:function(){return this._popLayer},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"tipLayer",{get:function(){return this._tipLayer},enumerable:!0,configurable:!0}),e.prototype.init=function(e){this._gameLayer=new eui.Group,this._topLayer=new eui.Group,this._popLayer=new eui.Group,this._tipLayer=new eui.Group,this._gameLayer.name="_gameLayer",this._topLayer.name="_topLayer",this._popLayer.name="_popLayer",this._tipLayer.name="_tipLayer",e.addChild(this._gameLayer),e.addChild(this._topLayer),e.addChild(this._popLayer),e.addChild(this._tipLayer),this._tipLayer.touchChildren=this._tipLayer.touchEnabled=!1,this._topLayer.touchChildren=this._topLayer.touchEnabled=!1,this._popLayer.touchEnabled=!1;var t=new eui.Label("v.1.0.0");t.textColor=16777215,t.size=12,t.x=10,t.y=Const.HEIGHT-22,this.topLayer.addChild(t)},e.prototype.showBothScene=function(e){var t=250,n=new e;n.x=Const.WIDTH,this.gameLayer.addChild(n),egret.Tween.get(n).to({x:0},t);var i=SceneManager.instance.getCurrentScene();egret.Tween.get(i).to({x:-Const.WIDTH},t),egret.Tween.get(this.popLayer).to({x:-Const.WIDTH},t)},e.prototype.showSingleScene=function(){if(this.gameLayer.numChildren>1){var e=250,t=this.gameLayer.getChildAt(1);egret.Tween.get(t).to({x:Const.WIDTH},e).call(UIUtils.removeSelf,this,[t]);var n=SceneManager.instance.getCurrentScene();egret.Tween.get(n).to({x:0},e),egret.Tween.get(this.popLayer).to({x:0},e)}},e}();__reflect(GameLayerManager.prototype,"GameLayerManager");var SceneManager=function(){function e(){if(this.globalColor=11128622,e._instance)throw new Error("SceneManager 使用单例")}return Object.defineProperty(e,"instance",{get:function(){return e._instance||(e._instance=new e),e._instance},enumerable:!0,configurable:!0}),e.prototype.runScene=function(e,t){if(this.removeScene(),this.currentScene=new e,GameLayerManager.instance.gameLayer.addChild(this.currentScene),t=t||this.globalColor,null!=t){var n=new eui.Rect(Const.WIDTH,Const.HEIGHT,2029544);GameLayerManager.instance.gameLayer.addChild(n),egret.Tween.get(n).to({alpha:0},350).call(UIUtils.removeSelf,this,[n])}},e.prototype.removeScene=function(){this.currentScene&&(UIUtils.removeSelf(this.currentScene),this.currentScene=null)},e.prototype.getCurrentScene=function(){return this.currentScene},e._instance=new e,e}();__reflect(SceneManager.prototype,"SceneManager");var LoadingUI=function(e){function t(){var t=e.call(this)||this;return t.addEventListener(egret.Event.ADDED_TO_STAGE,t.createView,t),t}return __extends(t,e),t.prototype.createView=function(){Const.stage=this.stage,Const.WIDTH=this.stage.stageWidth,Const.HEIGHT=this.stage.stageHeight,this.textField=new eui.BitmapLabel,this.addChild(this.textField),this.textField.font="jinhei_fnt",this.textField.text="Loading...0%",this.textField.width=Const.WIDTH,this.textField.textAlign=egret.HorizontalAlign.CENTER,this.textField.y=(Const.HEIGHT-this.textField.height)/2},t.prototype.onProgress=function(e,t){this.textField.text="Loading..."+100*Math.ceil(e/t)+"%"},t}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var AssetAdapter=function(){function e(){}return e.prototype.getAsset=function(e,t,n){function i(i){t.call(n,i,e)}if(RES.hasRes(e)){var r=RES.getRes(e);r?i(r):RES.getResAsync(e,i,this)}else RES.getResByUrl(e,i,this,RES.ResourceItem.TYPE_IMAGE)},e}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var PanelGameOver=function(e){function t(){var t=e.call(this,null)||this;return t.isFullScreen=!0,t.isVisibleAnimate=!1,t}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),this.addChildren()},t.prototype.addChildren=function(){var e=new eui.Rect(Const.WIDTH,Const.HEIGHT,0);e.alpha=.6,this.addChild(e);var t=new eui.Component;this.addChild(t);var n=new eui.Image;n.texture=RES.getRes("panel_over_png"),t.width=n.width,t.height=n.height,t.x=(Const.WIDTH-n.width)/2,t.y=.19*Const.HEIGHT,t.addChild(n);var i=new eui.BitmapLabel;i.text="本轮分数 ：",i.x=20,i.y=280,i.width=t.width/2,i.textAlign=egret.HorizontalAlign.RIGHT,i.verticalAlign="middle",i.font="jinhei_fnt",t.addChild(i),this.curScore=new eui.BitmapLabel,this.curScore.text="190",this.curScore.x=t.width/2+50,this.curScore.y=i.y,this.curScore.width=t.width/2,this.curScore.textAlign=egret.HorizontalAlign.LEFT,this.curScore.font="jinhei_fnt",t.addChild(this.curScore);var r=new eui.BitmapLabel;r.text="最高分数 ：",r.x=20,r.y=i.y+i.height+60,r.width=t.width/2,r.textAlign=egret.HorizontalAlign.RIGHT,r.verticalAlign="middle",r.font="jinhei_fnt",t.addChild(r),this.MaxScore=new eui.BitmapLabel,this.MaxScore.text="500",this.MaxScore.x=t.width/2+50,this.MaxScore.y=r.y,this.MaxScore.width=t.width/2,this.MaxScore.textAlign=egret.HorizontalAlign.LEFT,this.MaxScore.font="jinhei_fnt",t.addChild(this.MaxScore),this.confirmBtn=new eui.Button,this.confirmBtn.skinName="resource/skin/button/ButtonPlay.exml",this.confirmBtn.anchorOffsetX=this.confirmBtn.width/2,this.confirmBtn.anchorOffsetY=this.confirmBtn.height/2,this.confirmBtn.x=t.width/2,this.confirmBtn.y=t.height-10,UIUtils.addButtonScaleEffects(this.confirmBtn),t.addChild(this.confirmBtn)},t}(PanelBase);__reflect(PanelGameOver.prototype,"PanelGameOver");var GameScene=function(e){function t(){var t=e.call(this)||this;return t.branchs=[],t.isPause=!1,t._curTime=0,t.skinName=new GameSkin,t}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),this._init()},t.prototype._init=function(){this._initData(),this._initView(),this._initEvent(),this._start()},t.prototype._initData=function(){this.score=0,this.level=0,this.curTime=10,this.isPause=!1,this.timeBar&&(this.timeBar.x=0),this.timer&&this.timer.setPaused(!0),this.timer=null},t.prototype._initView=function(){this._createTree(),this._createCutter(),this._initBranch(),this._createScore(),this._initTimeBar(),this.label=new eui.Label,this.label.backgroundColor=16711680,this.label.width=Const.WIDTH/2,this.label.height=100,this.addChild(this.label)},t.prototype._start=function(){this._createTimerEvent()},t.prototype._initTimeBar=function(){if(!this.timeBar){var e=new eui.Group,t=new eui.Image;t.texture=RES.getRes("timebar_wrap_png"),e.top=84,e.left=(Const.WIDTH-t.width)/2,e.addChild(t);var n=new eui.Group,i=new egret.Shape;this.timeBar=new eui.Image,n.left=14,n.top=10,this.timeBar.texture=RES.getRes("timebar_inner_png"),i.graphics.beginFill(0),i.graphics.drawRoundRect(0,0,this.timeBar.width,this.timeBar.height,this.timeBar.height,this.timeBar.height),i.graphics.endFill(),this.timeBar.mask=i,n.addChild(this.timeBar),n.addChild(i),e.addChild(n),this.addChild(e)}},t.prototype._createTree=function(){this.tree=new eui.Image,this.tree.texture=RES.getRes("trunk_png"),this.tree.x=(Const.WIDTH-this.tree.width)/2;var e=.88*Const.HEIGHT-this.tree.height;this.tree.y=0>e?e:0,this.addChild(this.tree)},t.prototype._createScore=function(){this.ScoreLabel||(this.ScoreLabel=new eui.BitmapLabel,this.ScoreLabel.font="score_font_fnt",this.ScoreLabel.width=Const.WIDTH/2,this.ScoreLabel.x=this.tree.x+(this.tree.width-160-this.ScoreLabel.width)/2+100,this.ScoreLabel.y=.34*Const.HEIGHT,this.ScoreLabel.textAlign=egret.HorizontalAlign.CENTER,this.addChild(this.ScoreLabel)),this.ScoreLabel.text=this.score.toString()},t.prototype._createCutter=function(){var e=RES.getRes("cutter_json"),t=RES.getRes("cutter_png"),n=new egret.MovieClipDataFactory(e,t);this.cutter=new egret.MovieClip(n.generateMovieClipData("cutter")),this.addChild(this.cutter),this.cutter.gotoAndStop(1),this.cutter.x=this.tree.x-this.cutter.width,this.cutter.y=.88*Const.HEIGHT-this.cutter.height},t.prototype._getOneBranch=function(e,t){void 0===e&&(e=0);var n=t||new eui.Image,i=Math.random();return i>.5?(n.texture=RES.getRes("branch_left_png"),n.x=this.tree.x-n.width+100):(n.texture=RES.getRes("branch_right_png"),n.x=this.tree.x+this.tree.width-60),n.y=e,n},t.prototype._initBranch=function(){var e=null;this.branchs=[];for(var t=0;5>t;t++)e=this._getOneBranch(this._getYByIndex()),this.branchs.push(e),this.addChild(e)},t.prototype._getYByIndex=function(e){var t=0===this.branchs.length?this.cutter.y-60:this.branchs[this.branchs.length-1].y,n=this._getOneBranchDistance();return t-n},t.prototype._getOneBranchDistance=function(e,t){e=this.level>=10&&this.level<20?2:this.level>=20?1:0;var n=t||Math.round(Math.random()*(e||3))+1;return n*this.cutter.height},t.prototype._initEvent=function(){this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this._handlerCutTreeEvent,this)},t.prototype._createTimerEvent=function(){var e=this;this.timer&&(this.timer.setPaused(!0),this.timer=null),this.timer=egret.Tween.get(this.timeBar),this.timer.to({x:-this.timeBar.width},1e3*this.curTime).call(function(){e.gameOver()})},t.prototype._handlerCutTreeEvent=function(e){if(!this.isPause){var t=e.stageX;t>Const.WIDTH/2?(this.cutter.x=Const.WIDTH-this.cutter.width-50,this.animationCutter()):(this.cutter.x=50,this.animationCutter(!0)),this._TreeCutAnimate(),this.ScoreLabel.text=(++this.score).toString(),this.score%20===0&&this._levelUp(),this._handleTimeAdd()}},t.prototype._handleTimeAdd=function(){this.timer.setPaused(!0);var e=this.timeBar.width/this.curTime/6,t=this.timeBar.x;this.timeBar.x=t+e>0?0:t+e,this._createTimerEvent()},t.prototype._levelUp=function(){this.level++;var e=this.curTime-Math.sqrt(this.level+10*this.level);this.curTime=e>1?e:1,this._levelUpAnimation()},t.prototype._levelUpAnimation=function(){this.levelLabel=this.levelLabel||new eui.BitmapLabel,this.levelLabel.font="jinhei_fnt",this.levelLabel.text="Level "+this.level.toString(),this.levelLabel.alpha=1,this.levelLabel.width=Const.WIDTH/2,this.levelLabel.verticalAlign=egret.VerticalAlign.MIDDLE,this.levelLabel.textAlign=egret.HorizontalAlign.CENTER,this.levelLabel.anchorOffsetX=this.levelLabel.width/2,this.levelLabel.anchorOffsetY=this.levelLabel.height/2,this.levelLabel.x=this.tree.x+(this.tree.width-160)/2+100,this.levelLabel.y=.22*Const.HEIGHT,egret.Tween.get(this.levelLabel).to({scaleX:1.3,scaleY:1.3},150).to({scaleX:1,scaleY:1,alpha:0},800),this.addChild(this.levelLabel)},t.prototype.animationCutter=function(e){void 0===e&&(e=!1),e?(this.cutter.x=this.tree.x-this.cutter.width,this.cutter.gotoAndPlay("cut_l",1)):(this.cutter.x=this.tree.x+this.tree.width-60,this.cutter.gotoAndPlay("cut_r",1)),this._cutedTreeMove(e)},t.prototype._cutedTreeMove=function(e){void 0===e&&(e=!1);var t=new eui.Image;t.texture=RES.getRes("wood_png"),t.anchorOffsetX=t.width/2,t.x=Const.WIDTH/2,t.y=this.cutter.y+20,this.addChild(t);var n=egret.Tween.get(t);n.to({rotation:e?90:-90,x:e?Const.WIDTH+t.height:-t.height},500).call(function(){t=null});var i=new eui.Rect(0,2,16777215);i.y=.78*Const.HEIGHT,i.x=this.tree.x+100,this.addChild(i);var r=egret.Tween.get(i);e?r.to({width:this.tree.width-160,alpha:0},200).call(function(){i=null}):(i.x=this.tree.x+this.tree.width-60,r.to({x:this.tree.x+100,width:this.tree.width-160,alpha:0},200).call(function(){i=null}))},t.prototype._TreeCutAnimate=function(){var e=this,t=(new Date).getTime();if(this._curTime){var n=t-this._curTime;this.label.text=n.toString()}this._curTime=t,this.branchs.forEach(function(t,n){egret.Tween.get(t).to({y:t.y+e._getOneBranchDistance(1,1)},50,egret.Ease.bounceInOut).call(function(){0==n&&t.y>=e.cutter.y&&(Const.WIDTH/2-t.x>0&&Const.WIDTH/2-e.cutter.x>0||Const.WIDTH/2-t.x<0&&Const.WIDTH/2-e.cutter.x<0?e.gameOver():e.resetBranchs(e.branchs,t))})})},t.prototype.judgeTreeY=function(){},t.prototype.gameOver=function(){var e=this;this.isPause=!0;var t=new eui.Label("游戏结束");t.width=this.cutter.width,t.textColor=16711680,this.timer&&this.timer.setPaused(!0);var n=Number(egret.localStorage.getItem("MAX_SCORE"));n<this.score&&egret.localStorage.setItem("MAX_SCORE",this.score.toString()),this._initGameOverPanel(function(){e._initData(),e.resetBranchs(),e._start(),e.overPanel.onHide(),UIUtils.removeSelf(t)})},t.prototype.resetBranchs=function(e,t){void 0===e&&(e=this.branchs),void 0===t&&(t=this.branchs[0]),e.shift(),e.push(this._getOneBranch(this._getYByIndex(),t)),this._createScore(),this._initTimeBar()},t.prototype._initGameOverPanel=function(e){this.overPanel=new PanelGameOver,this.overPanel.init(),this.overPanel.curScore.text=this.score.toString(),this.overPanel.MaxScore.text=egret.localStorage.getItem("MAX_SCORE"),this.overPanel.onConfirm=function(){return e()}},t}(SceneBase);__reflect(GameScene.prototype,"GameScene");var Main=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(e){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var t=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",t),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(e){console.log(e)})},t.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var e;return __generator(this,function(t){switch(t.label){case 0:return[4,this.loadResource()];case 1:return t.sent(),this.createGameScene(),[4,platform.login()];case 2:return t.sent(),[4,platform.getUserInfo()];case 3:return e=t.sent(),[2]}})})},t.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,5,,6]),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return n.sent(),[4,RES.loadGroup("loading")];case 2:return n.sent(),e=new LoadingUI,this.stage.addChild(e),[4,this.loadTheme()];case 3:return n.sent(),[4,RES.loadGroup("preload",0,e)];case 4:return n.sent(),this.stage.removeChild(e),[3,6];case 5:return t=n.sent(),console.error(t),[3,6];case 6:return[2]}})})},t.prototype.loadTheme=function(){var e=this;return new Promise(function(t,n){var i=new eui.Theme("resource/default.thm.json",e.stage);i.addEventListener(eui.UIEvent.COMPLETE,function(){t()},e)})},t.prototype.createGameScene=function(){Const.MAXSCORE=Number(egret.localStorage.getItem("MAX_SCORE")||0),GameLayerManager.instance.init(this),SceneManager.instance.runScene(WelcomeScene)},t}(eui.UILayer);__reflect(Main.prototype,"Main");var WelcomeScene=function(e){function t(){var t=e.call(this)||this;return t.skinName=new WelcomeSkin,t}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),this._init()},t.prototype._init=function(){this._initView(),this._initEvent()},t.prototype._initView=function(){this._createTree(),this._createCutter(),this._createInfo(),this._createButton()},t.prototype._initEvent=function(){this.startGameButton.addEventListener(egret.TouchEvent.TOUCH_TAP,function(e){SceneManager.instance.runScene(GameScene)},this.startGameButton)},t.prototype._createInfo=function(){var e=new eui.Image;e.texture=RES.getRes("title_png"),e.width=690,e.height=323,e.x=(Const.WIDTH-e.width)/2,e.y=393,this.group.addChild(e);var t=new eui.Label("网站中心版权所有");t.width=Const.WIDTH,t.height=45,t.textColor=16777215,t.size=40,t.x=10,t.textAlign=egret.HorizontalAlign.CENTER,t.y=Const.HEIGHT-100,this.group.addChild(t)},t.prototype._createButton=function(){this.startGameButton=new eui.Button,this.startGameButton.skinName="resource/skin/button/ButtonPlay.exml",this.startGameButton.anchorOffsetX=this.startGameButton.width/2,this.startGameButton.anchorOffsetY=this.startGameButton.height/2,this.startGameButton.x=(Const.WIDTH-this.startGameButton.width)/2+this.startGameButton.width/2,this.startGameButton.y=Const.HEIGHT-421+this.startGameButton.height/2,this.group.addChild(this.startGameButton),UIUtils.addButtonScaleEffects(this.startGameButton)},t.prototype._createTree=function(){this.tree=new eui.Image,this.tree.texture=RES.getRes("tree_png"),this.tree.x=(Const.WIDTH-this.tree.width)/2;var e=.88*Const.HEIGHT-this.tree.height;this.tree.y=0>e?e:0,this.group.addChild(this.tree)},t.prototype._createCutter=function(){var e=RES.getRes("updown_json"),t=RES.getRes("updown_png"),n=new egret.MovieClipDataFactory(e,t),i=new egret.MovieClip(n.generateMovieClipData("cutter"));i.x=this.tree.x-i.width+100,i.y=.88*Const.HEIGHT-i.height,this.group.addChild(i),i.gotoAndPlay("updown",-1)},t}(SceneBase);__reflect(WelcomeScene.prototype,"WelcomeScene");var Const=function(){function e(){}return e}();__reflect(Const.prototype,"Const");var UIUtils=function(){function e(){}return e.addButtonScaleEffects=function(t,n){if(void 0===n&&(n=!1),t)if(n||egret.is(t,egret.getQualifiedClassName(eui.Button)))t.addEventListener(egret.TouchEvent.TOUCH_BEGIN,e.onButtonTouchBegan,t);else for(var i=0,r=t.numChildren;r>i;i++)e.addButtonScaleEffects(t.getChildAt(i))},e.onButtonTouchBegan=function(e){var t=e.target;egret.Tween.get(t).to({scaleX:.9,scaleY:.9},50).to({scaleX:1,scaleY:1},50)},e.removeButtonScaleEffects=function(t,n){if(void 0===n&&(n=!1),t)if(n||egret.is(t,egret.getQualifiedClassName(eui.Button)))t.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,e.onButtonTouchBegan,t);else for(var i=0,r=t.numChildren;r>i;i++)e.removeButtonScaleEffects(t.getChildAt(i))},e.addShortTouch=function(t,n,i){t.shortTouchCallback=n,t.shortTouchEndCallback=i,t.addEventListener(egret.TouchEvent.TOUCH_BEGIN,e._onShortTouchBegan,t)},e._onShortTouchBegan=function(t){var n=t.currentTarget;n.shortTouchCallback&&n.shortTouchCallback(t),Const.stage.once(egret.TouchEvent.TOUCH_END,e._onShortTouchEnd,this,!0,Number.MAX_VALUE)},e._onShortTouchEnd=function(e){e.stopImmediatePropagation(),e.stopPropagation(),this.shortTouchEndCallback&&this.shortTouchEndCallback(e)},e.addLongTouch=function(t,n,i){t.longTouchCallback=n,t.longTouchEndCallback=i,t.longTouchTrigger=!1,t.addEventListener(egret.TouchEvent.TOUCH_BEGIN,e._onLongTouchBegan,t)},e._onLongTouchBegan=function(t){var n=this,i=t.currentTarget;Const.stage.once(egret.TouchEvent.TOUCH_END,e._onLongTouchEnd,this,!0,Number.MAX_VALUE),egret.clearTimeout(e.longTouchDelayId),e.longTouchDelayId=egret.setTimeout(function(){i.longTouchTrigger=!0,i.longTouchCallback&&i.longTouchCallback(t),i.once(egret.TouchEvent.TOUCH_TAP,e._stopTapEvent,n,!0,Number.MAX_VALUE)},this,350)},e._stopTapEvent=function(e){e.stopImmediatePropagation(),e.stopPropagation()},e._onLongTouchEnd=function(t){t.stopImmediatePropagation(),t.stopPropagation(),this.longTouchTrigger?this.longTouchEndCallback&&this.longTouchEndCallback(t):(egret.clearTimeout(e.longTouchDelayId),this.longTouchTrigger=!1)},e.removeLongTouch=function(t){t.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,e._onLongTouchBegan,t)},e.removeSelf=function(e){e&&e.parent&&e.parent.removeChild(e)},e}();__reflect(UIUtils.prototype,"UIUtils");var Utils=function(){function e(){}return e.getRandomColor=function(){return Math.round(16777215*Math.random())},e.createBitmapByName=function(e){var t=new egret.Bitmap,n=RES.getRes(e);return t.texture=n,t},e}();__reflect(Utils.prototype,"Utils");