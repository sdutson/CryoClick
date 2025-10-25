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
    this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');

    // Ship starts offscreen top-left
    const ship = this.add.sprite(-100, -100, 'ship');
    ship.rotation = 0.8; // slight diagonal angle

    // Animate the ship
    ship.anims.create({
        key: 'fly',
        frames: this.anims.generateFrameNumbers('ship', { start: 0, end: 2 }),
        frameRate: 15,
        repeat: -1
    });
    ship.play('fly');

    // Tween to landing spot (fast, 2 seconds)
    this.tweens.add({
        targets: ship,
        x: 640,   // end X position (center-ish)
        y: 600,   // end Y position (bottom area)
        duration: 2000,      // fast speed
        ease: 'Cubic.easeIn',
        onComplete: () => {
            // Explosion exactly at ship’s final position
            const explosion = this.add.image(ship.x, ship.y, 'explosion');
            explosion.setOrigin(0.5, 1);
            explosion.setScale(0.5);

            // Hide ship
            ship.setVisible(false);

            // Show terminal message
            const terminalText = this.add.text(50, 50, '', {
                fontFamily: 'monospace',
                fontSize: '32px',
                color: '#ffffff',
            });

            const message = "Quick! Get to the hab!";
            let charIndex = 0;

            const typingEvent = this.time.addEvent({
                delay: 50,
                callback: () => {
                    terminalText.text += message[charIndex];
                    charIndex++;
                    if (charIndex >= message.length) {
                        typingEvent.remove();

                        // Wait 3 seconds, then move to next scene
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
