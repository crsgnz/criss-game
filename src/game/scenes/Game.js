import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { moverJugador } from '../systems/moverJugador';

export class Game extends Scene
{

    constructor ()
    {
        super('Game');
    }
    

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.spritesheet('player', 'player.png', {frameWidth: 16, frameHeight: 16});

        this.load.image('dungeon-tilemap','dungeon.png');
        this.load.tilemapTiledJSON('dungeon-map', 'dungeon00.json');
    }
    
    create ()
    {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.cursors.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.map = this.make.tilemap({ key: 'dungeon-map' });
        this.tileset = this.map.addTilesetImage('dungeon', 'dungeon-tilemap');
        this.layer = this.map.createLayer('Capa de patrones 1', this.tileset, 0, 0).setDepth(1);
        const offsetX = (window.innerWidth - this.layer.width) / 2;
        const offsetY = (window.innerHeight - this.layer.height) / 2;
        this.layer.setPosition(offsetX, offsetY);

        this.layer.setCollisionByProperty({ colision: true });
        

        this.scene.pause();

        EventBus.on('iniciar-juego', () => {
            this.scene.resume();
        });
        this.player = this.physics.add.sprite(window.innerWidth/2, window.innerHeight/2, 'player').setOrigin(0.5, 0.5).setDepth(2)
        this.anims.create({
            key: 'stand',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        })
        this.player.anims.play('stand', true);

        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
        this.cameras.main.setZoom(2);
        
        this.player.setScale(3);;
        this.layer.scale = 3;

        this.physics.add.collider(this.player, this.layer);
        
    }   


    update ()
    {  
        const delta = this.game.loop.delta;

        moverJugador(this.player, this.cursors, delta);
    }
}
