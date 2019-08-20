class GameScene extends Phaser.Scene {
    constructor() {
        super(
            {
                key: 'gameScene',
                active: false
            }
        )
    }
    init (config) {
        game.scene.stop('startMenu');
        if (DEBUG)
            console.log('[Game] init');
        this.type = config.type;
    }
    preload () {
        if (DEBUG)
            console.log('[Game] preload');
        this.load.image('gameBoard', 'board.png');
    }
    create (config) {
        if (DEBUG)
            console.log('[Game] create', config);
        this.cameras.main.setBackgroundColor(0xc0c0c0);
        this.gameBoard = new GameBoard(this);
    }
    update () {
        if (DEBUG)
            console.log('[Game] update');
        if (this.gameBoard.CheckForWinner(this.gameBoard.Player1)) {
            console.log('player1 wins');
            this.gameBoard.winner = this.gameBoard.Player1;
        } else if (this.gameBoard.CheckForWinner(this.gameBoard.Player2)) {
            console.log('player2 wins')
            this.gameBoard.winner = this.gameBoard.Player2;
        }
        if (this.gameBoard.winner != null) {
            game.scene.start('gameOver', {winner:this.gameBoard.winner});
        }
    }
}