import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { Astrocore } from '../entities/Astrocore.js';
import { DebrisSpawner } from '../systems/DebrisSpawner.js';
import { setUpDebrisCollection} from '../systems/colissionHandler.js';
import { createStars, updateStars } from '../systems/backgroundStars.js';

export class Game extends Scene
{

    constructor ()
    {
        super('Game');
        this.core = null;
        this.debrisGroup = null;
        this._resources = {
            scraps: 0,
            chips: 0,
            wiring: 0,
        };
        this.debrisTimer = 0;
        this.debrisKeys = []
        this.stars = null;
    }

    get resources(){
        return this._resources;
    }

    set resources(newResources){
        const oldResources = { ...this._resources };
        this._resources = { ...newResources };
        EventBus.emit('resources-updated', this._resources);
    }

    preload ()
    {
        this.load.setPath('assets');

        this.load.image('core','core.png');
        this.load.image('debris', 'scrap01.png');
        this.load.image('debris2', 'scrap02.png');
        this.load.image('debris3', 'scrap03.png');
        this.load.image('debris4', 'scrap04.png');
        this.load.image('debris5', 'scrap05.png');
        this.load.image('debris6', 'scrap06.png');
    }
    
    create ()
    {
        this.width = this.sys.game.config.width;
        this.height = this.sys.game.config.height;
        
        this.stars = createStars(this, 250, this.width, this.height);

        this.debrisKeys = ['debris', 'debris2', 'debris3', 'debris4', 'debris5', 'debris6'];

        this.core = new Astrocore(this, this.width / 2, this.height / 2, 'core');
        this.core.setBounce(0.2);

        this.debrisGroup = this.physics.add.group({});

        this.debrisSpawner = new DebrisSpawner(this, this.debrisGroup, this.debrisKeys, 1500);
        this.debrisSpawner.start();

        setUpDebrisCollection(this, this.core, this.debrisGroup);

        this.resources = { ...this.resources };
    }   


    update ()
    {
        if(this.core){
            this.core.update();
        }
        updateStars(this.stars, this.width, this.height);    
    }
}
