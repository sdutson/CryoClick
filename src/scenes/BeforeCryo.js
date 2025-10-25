export class BeforeCryo extends Phaser.Scene {

    constructor() {
        super('BeforeCryo');
    }

    preload() {
        this.load.image('background', 'assets/space.png');
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        this.add.text(100, 100, 'Before Cryo Scene', { fontSize: '32px', color: '#fff' });

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const startButton = this.add.text(centerX, centerY, 'Next', { fontSize: '32px', color: 'white' })
            .setOrigin(0.5)
            .setInteractive();

        startButton.on('pointerdown', () => {
            // Move to IntroScene when clicked
            this.scene.start('AfterCryo');
        });
    }

    update() {
        this.background.tilePositionX += 2;
    }
    
}
