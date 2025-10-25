import { Start } from './scenes/Start.js';
import { LandingAnimation } from './scenes/LandingAnimation.js';
import { BeforeCryo } from './scenes/BeforeCryo.js';
import { FlyAway } from './scenes/FlyAway.js';

const config = {
    type: Phaser.AUTO,
    title: 'Overlord Rising',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: false,
    scene: [
<<<<<<< HEAD
        //Start,
        //LandingAnimation,
        BeforeCryo,
        //FlyAway,
=======
        Start,
        LandingAnimation,
        BeforeCryo,
        FlyAway,
>>>>>>> dc05a07b6a9685ebeda833a00494046c5664e932
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            