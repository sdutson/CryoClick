export class LandingAnimation extends Phaser.Scene {

    constructor() {
        super('LandingAnimation');
    }

    preload() {
        this.load.image('background', 'assets/mars_background.png');

        this.load.image('explosion', 'assets/explosion_scene_2.png');

        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 719, 'background');

        const ship = this.add.sprite(640, 360, 'ship');
        ship.rotation = 45;

        ship.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: -1
        });

        ship.play('fly');

        this.tweens.add({
            targets: ship,
            x: ship.x + 200,  // move forward while falling
            y: 600,           // ground level
            duration: 2000,
            ease: 'Cubic.easeIn',
            onComplete: () => {
                ship.setVisible(false);

                // Optional explosion PNG
                const explosion = this.add.image(ship.x, ship.y, 'explosion');
                explosion.setOrigin(0.5, 1);
                explosion.setScale(0.5);

                // Add text in upper-right corner
                const textX = this.cameras.main.width - 20; // 20px padding from right
                const textY = 20;                           // 20px padding from top
                const infoText = this.add.text(textX, textY, 'Quickly escape to the hab!!!', {
                    fontSize: '45px',
                    color: 'white'
                }).setOrigin(1, 0); // align top-right

                // After 5 seconds, move to next scene
                this.time.delayedCall(5000, () => {
                    this.scene.start('BeforeCryo'); // next scene
                });
            }
        });

    }
    
}
