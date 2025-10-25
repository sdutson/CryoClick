export class BeforeCryo extends Phaser.Scene {

    constructor() {
        super('BeforeCryo');
    }

    preload() {
        this.load.image('background', 'assets/space.png');
        this.load.image('ship_background', 'assets/ship_background.png');
        this.load.image('dashboard_bottom', 'assets/dashboard_bottom.png');
        this.load.image('dashboard', 'assets/dashboard.png');
    }

    create() {
        this.background = this.add.tileSprite(640, 150, 1280, 720, 'background');
        this.ship_background = this.add.sprite(960, 360, 'ship_background');
        this.ship_background_flipped = this.add.sprite(320, 360, 'ship_background').setFlipX(true);
        this.dashboard = this.add.sprite(960, 400, 'dashboard');
        this.dashboard_flipped = this.add.sprite(320, 400, 'dashboard').setFlipX(true);
        this.dashboard_bottom = this.add.sprite(960, 615, 'dashboard_bottom');
        this.dashboard_botttom_flipped = this.add.sprite(320, 615, 'dashboard_bottom').setFlipX(true);;
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Create a semi-transparent black rectangle
        const box = this.add.rectangle(
            centerX - 325,    // x position
            centerY + 40,    // y position
            175,    // width
            150,    // height
            0xffffff, // color in hex (black)
            0.80      // alpha: 50% transparent
        ).setOrigin(0.5);

        // Tween to flash the box
        this.tweens.add({
            targets: box,    // object to animate
            alpha: 0.1,      // target alpha (more transparent)
            duration: 500,   // 500 ms fade
            yoyo: true,      // fade back to original alpha
            repeat: -1       // repeat forever
        });
    }
    
}
