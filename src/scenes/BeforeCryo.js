export class BeforeCryo extends Phaser.Scene {

    constructor() {
        super('BeforeCryo');
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
    this.dashboard_botttom_flipped = this.add.sprite(320, 615, 'dashboard_bottom').setFlipX(true)

    const alienPositions = [
        { x: 300, y: 180 },
        { x: 600, y: 130 },
    ];

        alienPositions.forEach((pos) => {
            const alien = this.add.sprite(pos.x, pos.y, 'alien')
                .setScale(0.2) // make them tiny
                .setDepth(1);  // ensure they appear above the background

            // Flashing square highlight around alien
            const box = this.add.rectangle(
                pos.x, pos.y, 50, 50, 0xffffff, 0.6
            ).setOrigin(0.5).setDepth(0);

            this.tweens.add({
                targets: box,
                alpha: 0.1,
                duration: 500,
                yoyo: true,
                repeat: -1
            });
        });

        // --- Existing flashing box example ---
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const box = this.add.rectangle(
            centerX - 325,
            centerY + 40,
            175,
            150,
            0xffffff,
            0.80
        ).setOrigin(0.5);

        this.tweens.add({
            targets: box,
            alpha: 0.1,
            duration: 500,
            yoyo: true,
            repeat: -1
        });
    }
    
}
