export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('start-background', 'assets/space.png');
        this.load.image('logo', 'assets/phaser.png');

        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.background = this.add.tileSprite(640, 360, 1280, 720, 'start-background');
        this.add.text(centerX, centerY - 100, 'Welcome to CryoClick', {
            fontFamily: 'Orbitron',
            fontSize: '64px',
            stroke: '#bcc4ca',
            align: 'center',
            color: '#2457ffff',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Get the width and height of the game canvas
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Add credits text at the bottom center
        this.add.text(width / 2, height - 250, 'Will Jackson, Sam Dutson, Eva Giddings', {
            fontFamily: 'Courier, Courier New, monospace',
            fontSize: '12px',
            color: 'white',
            align: 'center'
        }).setOrigin(0.5, 1); // x centered, y aligned to bottom of text

        const startButton = this.add.text(centerX, centerY, 'Start', { fontSize: '32px', color: 'white' })
            .setOrigin(0.5)
            .setInteractive();

        startButton.on('pointerdown', () => {
            // Move to IntroScene when clicked
            this.scene.start('LandingAnimation');
        });
    }

    update() {
        this.background.tilePositionX += 2;
    }
    
}
