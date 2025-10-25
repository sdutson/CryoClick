export class BeforeCryo extends Phaser.Scene {
    constructor() {
        super('BeforeCryo');
        this.alienAnimationTriggered = false; // ensure only triggers once
    }

    preload() {
        this.load.image('background', 'assets/mars_background.png');
        this.load.image('ship_background', 'assets/ship_background.png');
        this.load.image('dashboard_bottom', 'assets/dashboard_bottom.png');
        this.load.image('dash', 'assets/dash.png');
        this.load.image('dash_left', 'assets/dash_left.png');
        this.load.image('alien', 'assets/alien.png');
        this.load.image('vials', 'assets/vials.png');
        this.load.image('wires_left', 'assets/wires_left.png');
        this.load.image('wires_right', 'assets/wires_right.png');
        this.load.image('side_pannel', 'assets/side_pannel.png');
    }

    create() {
        // --- Background and dashboard layers ---
        this.background = this.add.tileSprite(640, 150, 1280, 720, 'background');
        this.ship_background = this.add.sprite(960, 360, 'ship_background');
        this.ship_background_flipped = this.add.sprite(320, 360, 'ship_background').setFlipX(true);
        this.side_pannel_3 = this.add.sprite(1200, 350, 'side_pannel');
        this.vials = this.add.sprite(100, 150, 'vials');
        this.vials2 = this.add.sprite(100, 250, 'vials');
        this.vials2 = this.add.sprite(100, 350, 'vials');
        this.dash = this.add.sprite(960, 320, 'dash');
        this.dash_left = this.add.sprite(320, 320, 'dash_left').setFlipX(true);
        this.dashboard_bottom = this.add.sprite(960, 615, 'dashboard_bottom');
        this.dashboard_bottom_flipped = this.add.sprite(320, 615, 'dashboard_bottom').setFlipX(true);
        this.side_pannel = this.add.sprite(1200, 50, 'side_pannel');
        this.side_pannel_2 = this.add.sprite(1200, 200, 'side_pannel');
        this.wires_left = this.add.sprite(320, 360, 'wires_left');
        this.wires_right = this.add.sprite(960, 360, 'wires_right');

        // --- Aliens ---
        this.alienLeft = this.add.sprite(900, 195, 'alien').setScale(0.07).setDepth(5);
        this.alienRight = this.add.sprite(925, 195, 'alien').setFlipX(true).setScale(0.07).setDepth(5);

        // --- Flashing clickable box for aliens ---
        // --- Flashing clickable box for aliens ---
    if (!this.registry.get('alienWatched')) {
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
                this.registry.set('alienWatched', true); // Save the flag permanently
                this.alienBox.destroy();
                this.startAlienSequence();
            }
        });
    }

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
<<<<<<< Updated upstream
                // Capture the message after the colon
                const message = cmd.slice("Message Earth:".length).trim();
                termText.text += "Sending message...\nMessage sent: " + message + "\n";
=======
                const userMessage = cmd.slice("Message Earth:".length).trim();
                termText.text += "Sending message...\nMessage sent: " + userMessage + "\n";

                // Array of funny/random Earth responses
                const earthResponses = [
                    "Earth here: Message received loud and clear.",
                    "Earth here: We hope everything is going smoothly up there.",
                    "Earth here: All systems appear normal… except for some strange activity outside.",
                    "Earth here: Copy that. Over and out.",
                    "Earth here: Things look… interesting on your side. Some shadows moved in odd ways.",
                    "Earth here: Noted. Someone—or something—might be misbehaving nearby.",
                    "Earth here: Your last transmission has been logged. There was some unusual… motion observed outside the base.",
                    "Earth here: Received. We can’t confirm, but we saw things that looked… questionable.",
                    "Earth here: Good to hear from you. Activity in the area is… lively and somewhat inappropriate.",
                    "Earth here: Message acknowledged. Let’s hope the creatures outside keep their hands to themselves."
                ];

                // Pick a random response
                const randomResponse = earthResponses[Math.floor(Math.random() * earthResponses.length)];

                termText.text += randomResponse + "\n";

>>>>>>> Stashed changes
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
