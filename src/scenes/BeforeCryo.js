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
        this.dashboard_botttom_flipped = this.add.sprite(320, 615, 'dashboard_bottom').setFlipX(true);

        // --- Aliens with flashing boxes ---
        const alienPositions = [
            { x: 300, y: 180 },
            { x: 600, y: 130 },
        ];

        alienPositions.forEach((pos) => {
            const alien = this.add.sprite(pos.x, pos.y, 'alien')
                .setScale(0.2)
                .setDepth(1);

            const box = this.add.rectangle(pos.x, pos.y, 50, 50, 0xffffff, 0.6)
                .setOrigin(0.5)
                .setDepth(0);

            this.tweens.add({
                targets: box,
                alpha: 0.1,
                duration: 500,
                yoyo: true,
                repeat: -1
            });
        });

        // --- Large flashing box (clickable) ---
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const terminalBox = this.add.rectangle(
            centerX - 325,
            centerY + 40,
            175,
            150,
            0xffffff,
            0.8
        ).setOrigin(0.5)
         .setInteractive(); // <-- make clickable

        this.tweens.add({
            targets: terminalBox,
            alpha: 0.1,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        // --- Terminal setup (hidden initially) ---
        const termBg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 1)
            .setOrigin(0, 0)
            .setDepth(1000)
            .setVisible(false);

        let termText = this.add.text(20, 20, '', {
            fontFamily: 'monospace',
            fontSize: '24px',
            color: '#00ff00',
            wordWrap: { width: 1240 }
        }).setDepth(1001).setVisible(false);

        let inputText = this.add.text(20, 680, '', {
            fontFamily: 'monospace',
            fontSize: '24px',
            color: '#00ff00'
        }).setDepth(1001).setVisible(false);

        let currentInput = '';

        // Function to handle commands
        const handleCommand = (cmd) => {
            termText.text += '\n> ' + cmd + '\n'; // show user input

            cmd = cmd.trim();

            if (cmd === "Activate Rovers") {
                termText.text += "Activating rovers...\nSuccess\n";
            } else if (cmd === "Check Life Support") {
                termText.text += "Checking life support...\nLife support systems green\n";
            } else if (cmd.startsWith("Message Earth:")) {
                // Capture the message after the colon
                const message = cmd.slice("Message Earth:".length).trim();
                termText.text += "Sending message...\nMessage sent: " + message + "\n";
            } else {
                termText.text += "Unknown command: " + cmd + "\n";
            }

            inputText.text = '';   // clear input field
            currentInput = '';     // reset buffer
        };



        // Keyboard input
        this.input.keyboard.on('keydown', (event) => {
            if (!termBg.visible) return;

            if (event.key === "Backspace") {
                currentInput = currentInput.slice(0, -1);
            } else if (event.key === "Enter") {
                handleCommand(currentInput);
            } else if (event.key.length === 1) {
                currentInput += event.key;
            }
            inputText.text = '> ' + currentInput;
        });

        // Show terminal when box clicked
        terminalBox.on('pointerdown', () => {
            termBg.setVisible(true);
            termText.setVisible(true);
            inputText.setVisible(true);

            typeMessage("What do you want to do first?");
            typeMessage("1. Activate Rovers");
            typeMessage("2. Check Life Support");
            typeMessage("3. Message Earth: {message}")
        });

        const typeMessage = (message) => {
            termText.text += message + '\n';
        };


    }
}
