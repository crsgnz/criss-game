import { Game as MainGame } from './scenes/Game';
import { AUTO, Game } from 'phaser';


const config = {
    type: AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    render: {
        pixelArt: true,
        antialias: false,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        }
    },
    backgroundColor: '#1A1A2E',
    scene: [
        MainGame
    ]
};

const StartGame = (parent) => {
    return new Game({ ...config, parent });
}

export default StartGame;
