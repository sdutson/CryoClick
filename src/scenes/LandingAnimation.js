export class LandingAnimation extends Phaser.Scene {

    constructor() {
        super('LandingAnimation');
    }

    preload() {
        this.load.image('background', 'assets/mars_background.png');

        this.load.image('explosion', 'assets/explosion_scene_2.png');

        //  The ship sprite is CC0 from https://ansimuz.itch.io/ - check out his other work!
        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
    }

    create() {
        // Terminal text first
        const terminalText = this.add.text(50, 50, '', {
            fontFamily: 'monospace',
            fontSize: '32px',
            color: '#00ff00',
        });

        const message = "Initializing Mars Landing Protocol...\nChecking systems...\nPrepare for descent!";
        let charIndex = 0;

        // Type each character every 50ms
        const typingEvent = this.time.addEvent({
            delay: 50,
            callback: () => {
                terminalText.text += message[charIndex];
                charIndex++;
                if (charIndex >= message.length) {
                    typingEvent.remove(); // stop typing

                    // Once done, show background and ship
                    this.showLanding();
                }
            },
            loop: true
        });
    }

    showLanding() {
        // Background
        this.background = this.add.tileSprite(640, 360, 1280, 719, 'background');

        // Ship
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
            x: ship.x + 200,
            y: 600,
            duration: 2000,
            ease: 'Cubic.easeIn',
            onComplete: () => {
                ship.setVisible(false);

                const explosion = this.add.image(ship.x, ship.y, 'explosion');
                explosion.setOrigin(0.5, 1);
                explosion.setScale(0.5);

                // Terminal text first
                const terminalText = this.add.text(50, 50, '', {
                    fontFamily: 'monospace',
                    fontSize: '32px',
                    color: '#ffffff',
                });

                const message = "Quick! Get to the hab!";
                let charIndex = 0;

                // Type each character every 50ms
                const typingEvent = this.time.addEvent({
                    delay: 50,
                    callback: () => {
                        terminalText.text += message[charIndex];
                        charIndex++;
                        if (charIndex >= message.length) {
                            typingEvent.remove(); // stop typing

                            // Pause 3 seconds before moving to next scene
                            this.time.delayedCall(3000, () => {
                                this.scene.start('BeforeCryo');
                            });
                        }
                    },
                    loop: true
                });
            }
        });
    }

    
}
