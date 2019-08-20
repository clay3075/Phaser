class GameBoard extends Phaser.GameObjects.Sprite {
    constructor(gameContext) {
        super(gameContext, 400, 300, 'gameBoard');
        this.setScale(1.5, 1.5);
        this.gameContext = gameContext;
        gameContext.add.existing(this);
        this.initGrid();
        this.board = [[0,0,0],
                      [0,0,0],
                      [0,0,0]];
        this.winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]];
        this.winner = null;
        this.Player1 = 1;
        this.Player2 = 2;
        this.currentPlayer = this.Player1;
    }
    initGrid() {
        this.gridButtons = [Array(3), Array(3), Array(3)];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                this.gridButtons[i][j] = new Button(this.displayOriginX+(i*171), this.displayOriginY-100+(j*171), 140, 139, " ", {"gameContext":this.gameContext, "baseColor": 0xc0c0c0, "hoverColor": 0x1191ee, "textInfo": {fontWeight:'bold', fontSize:120, color:0x080808}});
                this.gameContext.add.existing(this.gridButtons[i][j]);
                var self = this;
                var args = {row:i, col:j};
                this.gridButtons[i][j].AddOnClickEvent(function(args) { self.MakeMove(args.row, args.col, self) }, args);
            }
        }
    }
    MakeMove(row, col, self) {
        var valid = false;
        if (self.board[row][col] == 0 && self.winner == null) {
            self.board[row][col] = self.currentPlayer;
            self.gridButtons[row][col].SetText(self.currentPlayer == self.Player1 ? "X" : "O", self.gridButtons[row][col].x + (self.gridButtons[row][col].width * 0.25), self.gridButtons[row][col].y + + (self.gridButtons[row][col].height * 0.15));
            self.currentPlayer = self.currentPlayer == self.Player1 ? self.Player2 : self.Player1;
            valid = true;
            console.log(self.currentPlayer)
        }
        return valid;
    }
    Clear() {
        this.board = [[0,0,0],
                      [0,0,0],
                      [0,0,0]];
    }
    CheckForWinner(player) {
        var self = this;
        return self.winConditions.some(function(threeInRow) {
            return threeInRow.every(function(square) {
                var same = false;
                switch(square) {
                    case 0:
                        same = self.board[0][0] === player;
                        break;
                    case 1:
                        same = self.board[0][1] === player;
                        break;
                    case 2:
                        same = self.board[0][2] === player;
                        break;
                    case 3:
                        same = self.board[1][0] === player;
                        break;
                    case 4:
                        same = self.board[1][1] === player;
                        break;
                    case 5:
                        same = self.board[1][2] === player;
                        break;
                    case 6:
                        same = self.board[2][0] === player;
                        break;
                    case 7:
                        same = self.board[2][1] === player;
                        break;
                    case 8:
                        same = self.board[2][2] === player;
                        break;
                }
                return same;
            });
        });
    }
}

