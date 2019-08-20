class StartMenuScene extends Phaser.Scene {
    constructor() {
        super(
            {
                key: 'startMenu',
                active: false
            }
        )
    }
    
    init (config) {
        game.scene.stop('boot');
        
        if (DEBUG)
            console.log('[Start] init', config);
    }
    preload () {
        if (DEBUG)
            console.log('[Start] preload');
    }
    create (config) {
        if (DEBUG)
            console.log('[Start] create', config);
        this.title = this.add.text(GAME_WIDTH*.25, GAME_HEIGHT*.1, 'TIC-TAC-TOE', {fontWeight:'bold', fontSize:65});
        this.singlePlayerBtn = new Button(GAME_WIDTH*.3, GAME_HEIGHT*.3, 350, 150, "Single Player", {"gameContext":this, "baseColor": 0xC0C0C0, "hoverColor": 0x1191ee, "textInfo": {fontSize:25}});
        this.twoPlayerBtn = new Button(GAME_WIDTH*.3, GAME_HEIGHT*.6, 350, 150, "Two Player", {"gameContext":this, "baseColor": 0xC0C0C0, "hoverColor": 0x1191ee, "textInfo": {fontSize:25}});
        this.singlePlayerBtn.AddOnClickEvent(function() {game.scene.start('gameScene', {"type":"single player"})});
        this.twoPlayerBtn.AddOnClickEvent(function() {game.scene.start('gameScene', {"type":"two player"})});
    }
    update () {
        if (DEBUG)
            console.log('[Start] update');
    }
};

class Button extends Phaser.Geom.Rectangle {
    constructor(x, y, width, height, text, config) {
        super(x, y, width, height);
        this.config = config;
        this.onClickEvents = [];
        this.gameContext = config.gameContext;
        this.graphics = config.gameContext.add.graphics({ fillStyle: { color: config.baseColor } });
        this.graphics.fillRectShape(this);
        this.text = config.gameContext.add.text(this.centerX - (15 * text.length * .5), this.centerY, text, config.textInfo);

        this.gameContext.input.on('pointermove', this.CheckForHover, this);
        this.gameContext.input.on('pointerdown', this.CheckForClick, this);
    }

    SetText(text, x, y) {
        this.text.setText(text);
        if (x != undefined && y != undefined) {
            this.text.x = x;
            this.text.y = y;
            console.log(this.text.x);
        }
    }

    CheckForHover(pointer) {
        if (Button.Contains(this, pointer.x, pointer.y)) {
            this.graphics.fillStyle(this.config.hoverColor);
            this.graphics.fillRectShape(this);
        } else {
            this.graphics.fillStyle(this.config.baseColor);
            this.graphics.fillRectShape(this);
        }
    }

    CheckForClick(pointer) {
        if (Button.Contains(this, pointer.x, pointer.y)) {
            this.onClickEvents.forEach(function(func) {
                func.func(func.args);
            });
        }
    }

    AddOnClickEvent(func, args = null) {
        this.onClickEvents.push({func:func, args:args});
    }
};