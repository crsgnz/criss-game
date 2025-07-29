import Phaser from "phaser";

export class Astrocore extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.5);
        this.setOrigin(0.5, 0.5);
        this.setImmovable(true);

        this.flotar();
    }

     flotar() {
        this.scene.tweens.add({
            targets: this,
            y: this.y - 20,
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
    }
}