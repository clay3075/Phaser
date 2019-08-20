class GameOverScene extends Phaser.Scene {

    constructor() {
        super(
            {
                key: 'gameOver',
                active: false
            }
        );
    }

    init (config) {
        if (DEBUG)
            console.log('[gameOver] init', config);
        game.scene.stop('gameScene');
        this.config = config;
    }
    preload () {
        
    }
    create () {
        this.title = this.add.text(GAME_WIDTH*.30, GAME_HEIGHT*.1, 'Game Over', {fontWeight:'bold', fontSize:65});
        this.winnerTitle = this.add.text(GAME_WIDTH*.29, GAME_HEIGHT*.2, 'Player ' + this.config.winner + ' won', {fontSize:50});
        this.homeBtn = new Button(GAME_WIDTH*.3, GAME_HEIGHT*.4, 350, 150, "Start Menu", {"gameContext":this, "baseColor": 0xC0C0C0, "hoverColor": 0x1191ee, "textInfo": {fontSize:25}});
        this.homeBtn.AddOnClickEvent(function() { game.scene.stop('gameOver');setTimeout(function() {game.scene.start('startMenu')}, 200)});
    }
}