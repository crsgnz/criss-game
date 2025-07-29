import Phaser from "phaser";
import { Debris } from "../entities/Debris";

export class DebrisSpawner {
    constructor(scene, debrisGroup, debrisKeys, spawnDelay = 2500) {
        this.scene = scene;
        this.debrisGroup = debrisGroup;
        this.debrisKeys = debrisKeys;
        this.spawnDelay = spawnDelay;
        this.timer = null;
       
        this.debrisGroup.classType = Debris;
        this.debrisGroup.runChildUpdate = false

        this.setupWorldBoundsListener()
    }

    setupWorldBoundsListener() {
        this.scene.physics.world.on('worldbounds', (body) => {
            if (this.debrisGroup.contains(body.gameObject) && body.gameObject.x > this.scene.sys.game.config.width) {
                body.gameObject.deactivate();
            }
        });
    }

    start(){
        if(this.timer) {
            this.timer.remove();
        }
        this.timer = this.scene.time.addEvent({
            delay: this.spawnDelay,
            callback: this.spawnDebris,
            callbackScope: this,
            loop: true
        });
    }

    stop(){
        if(this.timer) {
            this.timer.remove();
            this.timer = null;
        }
    }

    spawnDebris() {
        const gameWidth = this.scene.sys.game.config.width;
        const gameHeight = this.scene.sys.game.config.height;

        const x = 50;
        const y = Phaser.Math.Between(0, gameHeight);

        const randomDebrisKey = Phaser.Math.RND.pick(this.debrisKeys);

        let newDebris = this.debrisGroup.get(x, y, randomDebrisKey);

        if (!newDebris) {
            newDebris = this.debrisGroup.create(x, y, randomDebrisKey);
        }

        newDebris.activate(x, y, randomDebrisKey);
    }
}