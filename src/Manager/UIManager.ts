class UIManager {
    public constructor() { }

    private static _instance: UIManager;
    public static get instance(): UIManager {
        if (!UIManager._instance) UIManager._instance = new UIManager;
        return UIManager._instance;
    }

    public currentPanel: PanelBase;

    public panels: Array<PanelBase> = []

    public popPanel(panel, data?, animate_startPos?) {
        if (panel instanceof PanelBase) this.currentPanel = panel;
        else this.currentPanel = new panel;
        this.currentPanel.data = data;
        this.currentPanel.animate_startPos = animate_startPos;
        this.panels.push(this.currentPanel);
        GameLayerManager.instance.popLayer.addChild(this.currentPanel);
    }

    public popOrHidePanel(panelClass, data?, animate_startPos?) {
        for (let i = 0; i < this.panels.length; i++) {
            let panel = this.panels[i];
            if (panel instanceof panelClass)
                return panel.hide()
        }
        this.popPanel(panelClass, data, animate_startPos);
    }

    public isPanelShow(panelClass) {
        for (let i = 0; i < this.panels.length; i++) {
            var panel = this.panels[i];
            if (panel instanceof panelClass)
                return true
        }
        return false
    }

    public hidePanel(panel) {
        if (!panel) panel = this.currentPanel;
        if (panel) {
            let index = this.panels.indexOf(panel);
            if (index != -1) this.panels.splice(index, 1)
        }
    }

    public closeLastPanel() {
        if (this.currentPanel) {
            this.currentPanel.isDelayDestroy = true;
            this.currentPanel.hide();
        }
    }

    public reOpenLastPanel() {
        if (this.currentPanel) {
            this.popPanel(this.currentPanel)
            this.currentPanel.refreshAnyTime()
        }
    }

    public popSimpleTip(){
        
    }

}