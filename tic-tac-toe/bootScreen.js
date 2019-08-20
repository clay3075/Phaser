class BootScene extends Phaser.Scene {

    constructor() {
        super(
            {
                key: 'boot',
                active: true
            }
        );
    }

    init (config) {
        if (DEBUG)
            console.log('[BOOT] init', config);
    }
    preload () {
        this.load.spritesheet('loadingWheel', 'loading.png', { frameWidth: 16, frameHeight: 16, endFrame: 8 });
    }
    create () {
        var config = {
            key: 'load',
            frames: this.anims.generateFrameNumbers('loadingWheel', { start: 0, end: 8, first: 8 }),
            frameRate: 20,
            repeat: 50
        };
        this.anims.create(config);
        this.loadingWheel = this.add.sprite(GAME_WIDTH/2, GAME_HEIGHT/2, "loadingWheel");
        this.loadingWheel.setScale(2, 2);
        this.loadingWheel.anims.play('load');
        
        setTimeout(function() {
            console.log('in')
            game.scene.start('startMenu');
        }, 1000);
    }
}
