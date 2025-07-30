import Phaser from "phaser";

export class Astrocore extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture){
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.5);
        this.setOrigin(0.5, 0.5);
        this.setImmovable(true);
        this.setDepth(1);

        this.shadowGraphic = null;

        this.setInteractive({ cursor: 'pointer' });

        this.on('pointerover', this.onPointerOver, this);
        this.on('pointerout', this.onPointerOut, this);
        this.on('pointerdown', this.onPointerClick, this);

        this.flotar();
    }

    onPointerOver() {
        if(this.shadowGraphic) {
            this.shadowGraphic.destroy();
        }

        this.shadowGraphic = this.scene.add.image(this.x, this.y, this.texture.key);
        this.shadowGraphic.setOrigin(0.5, 0.5);

        const glowScale = 1.05;

        this.shadowGraphic.setScale(this.scaleX * glowScale, this.scaleY * glowScale);
        this.shadowGraphic.setTintFill(0xffffff);
        this.shadowGraphic.setAlpha(0.25);
        this.shadowGraphic.setDepth(this.depth - 1);
    }

    onPointerOut() {
        if(this.shadowGraphic) {
            this.shadowGraphic.destroy();
            this.shadowGraphic = null;
        }
    }

    onPointerClick() {
        this.scene.events.emit('open-upgrade-menu');
        console.log('Core clicked');
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

    update() {
        if(this.shadowGraphic) {
            this.shadowGraphic.setPosition(this.x, this.y);
        }
    }
}