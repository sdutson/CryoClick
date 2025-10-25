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
        //Start,
        //LandingAnimation,
        BeforeCryo,
        //FlyAway,
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            