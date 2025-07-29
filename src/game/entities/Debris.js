import Phaser from "phaser";

export class Debris extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, textureKey) {
        super(scene, x, y, textureKey);
        scene.add.existing(this);
        this.setScale(0.25);
    }
    activate(x, y, textureKey) {
        this.setTexture(textureKey);
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);

        if(!this.body) {
            this.scene.physics.world.enable(this);
        }
        else{
            this.body.enable = true;
        }

        const scaledWidth = this.width * this.scaleX;
        const scaledHeight = this.height * this.scaleY;

        this.body.setSize(scaledWidth * 4, scaledHeight * 4, true);

        this.setVelocityX(Phaser.Math.Between(100, 200));
        this.setAngularVelocity(Phaser.Math.Between(-200, 200));

        this.setCollideWorldBounds(false);
        this.body.onWorldBounds = true;

    }
    desactive(){
        this.setActive(false);
        this.setVisible(false);
        this.body.disableBody(true, true);
        this.body.setVelocity(0, 0);
        this.body.setAngularVelocity(0);
    }
}