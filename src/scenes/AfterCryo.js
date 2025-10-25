export class AfterCryo extends Phaser.Scene {

    constructor() {
        super('AfterCryo');
    }

    preload() {
        this.load.image('background', 'assets/space.png');
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        this.add.text(100, 100, 'After Cryo Scene', { fontSize: '32px', color: '#fff' });

        const startButton = this.add.text(400, 300, 'Start', { fontSize: '32px', color: '#fff' })
        .setOrigin(0.5)
        .setInteractive();

        startButton.on('pointerdown', () => {
            // Move to IntroScene when clicked
            this.scene.start('Start');
        });
    }

    update() {
        this.background.tilePositionX += 2;
    }
    
}
