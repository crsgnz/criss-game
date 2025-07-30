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

        this.debrisResourcesMap = {
            'debris': { scraps: Phaser.Math.Between(1, 2), chips: 0, wiring: 0 },
            'debris2': { scraps: Phaser.Math.Between(2, 3), chips: 0, wiring: 0 },
            'debris3': { scraps: Phaser.Math.Between(3, 4), chips: Phaser.Math.Between(1, 3), wiring: 2 },
            'debris4': { scraps: 2, chips: Phaser.Math.Between(1, 3), wiring: 2 },
            'debris5': { scraps: 2, chips: 0, wiring: 0 },
            'debris6': { scraps: 1, chips: 2, wiring: 0 }
        }
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

        const x = -50;
        const y = Phaser.Math.Between(0, gameHeight);

        const randomDebrisKey = Phaser.Math.RND.pick(this.debrisKeys);

        let resourcesToAssign = this.debrisResourcesMap[randomDebrisKey] || { scraps: 0, chips: 0, wiring: 0 };

        if (randomDebrisKey === 'debris'){
            resourcesToAssign = {
                scraps: Phaser.Math.Between(1, 2),
                chips: 0,
                wiring: 0
            };
        }
        if(randomDebrisKey === 'debris2') {
            resourcesToAssign = {
                scraps: Phaser.Math.Between(2, 3),
                chips: 0,
                wiring: 0
            };
        }
        if(randomDebrisKey === 'debris3') {
            resourcesToAssign = {
                scraps: Phaser.Math.Between(3, 4),
                chips: Phaser.Math.Between(1, 3),
                wiring: 2
            };
        }
        if(randomDebrisKey === 'debris4') {
            resourcesToAssign = {
                scraps: 2,
                chips: Phaser.Math.Between(1, 3),
                wiring: 2
            };
        }

        let newDebris = this.debrisGroup.get(x, y, randomDebrisKey);

        if (!newDebris) {
            newDebris = this.debrisGroup.create(x, y, randomDebrisKey);
        }

        newDebris.activate(x, y, randomDebrisKey, resourcesToAssign);
    }
}