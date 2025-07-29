import { EventBus } from "../EventBus";

export function setUpDebrisCollection(scene, core, debrisGroup) {
    scene.physics.add.overlap(core, debrisGroup, (c, d) => collectDebris(scene, c, d), null, scene);
}

function collectDebris(scene, core, debris) {
    debris.destroy();
    scene.score += 1;
    scene.scoreText.setText('Scraps: ' + scene.score);
    EventBus.emit('scoreUpdated', scene.score);
}