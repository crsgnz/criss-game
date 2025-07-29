import Phaser from "phaser";

export function createStars (scene, numStars, width, height){
    const stars = [];
    for (let i = 0; i < numStars; i++) {
        const x = Phaser.Math.Between(0, width);
        const y = Phaser.Math.Between(0, height);
        const size = Phaser.Math.Between(1, 3);
        const speed = Phaser.Math.FloatBetween(0.25, 0.5);

        const star = scene.add.graphics({ fillStyle: { color: 0xffffff, alpha: Phaser.Math.FloatBetween(0.6, 1) } });
        star.fillRect(0, 0, size, size);
        star.setX(x);
        star.setY(y);

        star.setData('speed', speed);
        stars.push(star);
    }
    return stars;
}

export function updateStars (stars, width, height) {
    if(stars) {
        stars.forEach(star => {
            star.x += star.getData('speed');
            if (star.x > width) {
                star.x = -50;
                star.y = Phaser.Math.Between(0, height);
                star.setAlpha(Phaser.Math.FloatBetween(0.6, 1));
                star.setData('speed', Phaser.Math.FloatBetween(0.25, 0.5));
            }
        });
    }
}