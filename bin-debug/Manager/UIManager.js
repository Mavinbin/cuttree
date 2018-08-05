var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var UIManager = (function () {
    function UIManager() {
        this.panels = [];
    }
    Object.defineProperty(UIManager, "instance", {
        get: function () {
            if (!UIManager._instance)
                UIManager._instance = new UIManager;
            return UIManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    UIManager.prototype.popPanel = function (panel, data, animate_startPos) {
        if (panel instanceof PanelBase)
            this.currentPanel = panel;
        else
            this.currentPanel = new panel;
        this.currentPanel.data = data;
        this.currentPanel.animate_startPos = animate_startPos;
        this.panels.push(this.currentPanel);
        GameLayerManager.instance.popLayer.addChild(this.currentPanel);
    };
    UIManager.prototype.popOrHidePanel = function (panelClass, data, animate_startPos) {
        for (var i = 0; i < this.panels.length; i++) {
            var panel = this.panels[i];
            if (panel instanceof panelClass)
                return panel.hide();
        }
        this.popPanel(panelClass, data, animate_startPos);
    };
    UIManager.prototype.isPanelShow = function (panelClass) {
        for (var i = 0; i < this.panels.length; i++) {
            var panel = this.panels[i];
            if (panel instanceof panelClass)
                return true;
        }
        return false;
    };
    UIManager.prototype.hidePanel = function (panel) {
        if (!panel)
            panel = this.currentPanel;
        if (panel) {
            var index = this.panels.indexOf(panel);
            if (index != -1)
                this.panels.splice(index, 1);
        }
    };
    UIManager.prototype.closeLastPanel = function () {
        if (this.currentPanel) {
            this.currentPanel.isDelayDestroy = true;
            this.currentPanel.hide();
        }
    };
    UIManager.prototype.reOpenLastPanel = function () {
        if (this.currentPanel) {
            this.popPanel(this.currentPanel);
            this.currentPanel.refreshAnyTime();
        }
    };
    UIManager.prototype.popSimpleTip = function () {
    };
    return UIManager;
}());
__reflect(UIManager.prototype, "UIManager");
//# sourceMappingURL=UIManager.js.map