export class FlyAway extends Phaser.Scene {

    constructor() {
        super('FlyAway');
    }

    preload() {
        this.load.image('background', 'assets/mars_background.png');
        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
    }

    create() {
        // Background
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

        // Ship starts offscreen top-left
        const ship = this.add.sprite(800, 500, 'ship');
        ship.rotation = 45; // slight diagonal angle

        // Animate the ship sprite
        ship.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 2 }),
            frameRate: 15,
            repeat: -1
        });
        ship.play('fly');

        // Tween to fly off screen (diagonal up-right)
        this.tweens.add({
            targets: ship,
            x: -200,  // beyond right edge
            y: -200,  // above top edge
            duration: 3000,
            ease: 'Cubic.easeIn',
            onComplete: () => {
                ship.destroy(); // remove ship after flying off

                // Show final message
                this.add.text(300, 150, "Maybe Mars isn't for me.", {
                    fontFamily: 'monospace',
                    fontSize: '48px',
                    color: '#ffffff'
                }).setOrigin(0.5);
            }
        });
    }
}


