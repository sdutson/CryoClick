export class BeforeCryo extends Phaser.Scene {
    constructor() {
        super('BeforeCryo');
        this.alienAnimationTriggered = false; // ensure only triggers once
    }

    preload() {
        this.load.image('background', 'assets/mars_background.png');
        this.load.image('ship_background', 'assets/ship_background.png');
        this.load.image('dashboard_bottom', 'assets/dashboard_bottom.png');
        this.load.image('dashboard', 'assets/dashboard.png');
        this.load.image('alien', 'assets/alien.png');
    }

    create() {
        // --- Background and dashboard layers ---
        this.background = this.add.tileSprite(640, 150, 1280, 720, 'background');
        this.ship_background = this.add.sprite(960, 360, 'ship_background');
        this.ship_background_flipped = this.add.sprite(320, 360, 'ship_background').setFlipX(true);
        this.dashboard = this.add.sprite(960, 400, 'dashboard');
        this.dashboard_flipped = this.add.sprite(320, 400, 'dashboard').setFlipX(true);
        this.dashboard_bottom = this.add.sprite(960, 615, 'dashboard_bottom');
        this.dashboard_bottom_flipped = this.add.sprite(320, 615, 'dashboard_bottom').setFlipX(true);

        // --- Aliens ---
        this.alienLeft = this.add.sprite(900, 195, 'alien').setScale(0.07).setDepth(5);
        this.alienRight = this.add.sprite(925, 195, 'alien').setFlipX(true).setScale(0.07).setDepth(5);

        // --- Flashing clickable box for aliens ---
        const boxCenterX = (this.alienLeft.x + this.alienRight.x) / 2;
        const boxCenterY = (this.alienLeft.y + this.alienRight.y) / 2;

        this.alienBox = this.add.rectangle(boxCenterX, boxCenterY, 60, 60, 0xffffff, 0.5)
            .setOrigin(0.5)
            .setDepth(10)
            .setInteractive({ useHandCursor: true });

        this.tweens.add({
            targets: this.alienBox,
            alpha: 0.1,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        this.alienBox.on('pointerdown', () => {
            if (!this.alienAnimationTriggered) {
                this.alienAnimationTriggered = true;
                this.alienBox.destroy(); // remove flashing box immediately
                this.startAlienSequence();
            }
        });

        // --- Regular info box (still flashing) ---
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.infoBox = this.add.rectangle(centerX - 325, centerY + 40, 175, 150, 0xffffff, 0.8)
            .setOrigin(0.5);

        this.tweens.add({
            targets: this.infoBox,
            alpha: 0.1,
            duration: 500,
            yoyo: true,
            repeat: -1
        });
    }

    // --- Alien sequence method ---
    startAlienSequence() {
        // Zoom camera to aliens
        const boxCenterX = (this.alienLeft.x + this.alienRight.x) / 2;
        const boxCenterY = (this.alienLeft.y + this.alienRight.y) / 2;

        this.cameras.main.pan(boxCenterX, boxCenterY, 1200, 'Sine.easeInOut');
        this.cameras.main.zoomTo(4, 1200, 'Sine.easeInOut', true);

        this.time.delayedCall(1300, () => {
            // Move aliens slightly closer
            this.tweens.add({
                targets: this.alienLeft,
                x: this.alienLeft.x + 6,
                duration: 1500,
                ease: 'Sine.easeInOut'
            });
            this.tweens.add({
                targets: this.alienRight,
                x: this.alienRight.x - 6,
                duration: 1500,
                ease: 'Sine.easeInOut',
                onComplete: () => this.cutToBlack()
            });
        });
    }

    cutToBlack() {
        const blackOverlay = this.add.rectangle(0, 0, this.scale.width, this.scale.height, 0x000000)
            .setOrigin(0)
            .setScrollFactor(0)
            .setDepth(999)
            .setAlpha(1);

        this.cameras.main.zoomTo(1, 0);
        this.cameras.main.pan(this.scale.width / 2, this.scale.height / 2, 0);

        this.time.delayedCall(300, () => this.showMessage());
    }

    showMessage() {
        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        const text = this.add.text(centerX, centerY, '', {
            fontFamily: 'monospace',
            fontSize: '36px',
            color: '#00ff00',
        })
        .setOrigin(0.5)
        .setDepth(1000)
        .setScrollFactor(0);

        const message = "Maybe you shouldn't watch...";
        let charIndex = 0;

        const typingEvent = this.time.addEvent({
            delay: 50,
            callback: () => {
                text.text += message[charIndex];
                charIndex++;
                if (charIndex >= message.length) {
                    typingEvent.remove();
                    // Optionally go back to main screen after a delay
                    this.time.delayedCall(2000, () => this.scene.restart());
                }
            },
            loop: true
        });
    }
}
