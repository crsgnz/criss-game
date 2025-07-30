import { EventBus } from "../EventBus";

export function setUpDebrisCollection(scene, core, debrisGroup) {
    scene.physics.add.overlap(core, debrisGroup, (c, d) => collectDebris(scene, c, d), null, scene);
}

function collectDebris(scene, core, debris) {
    debris.destroy();
    scene.score += 1;
    if (debris.resources && typeof debris.resources === 'object') {
        const currentResources = { ...scene.resources };

        let collectedAny = false;
        for (const resourceType in debris.resources) {
            const amount = debris.resources[resourceType];
            if (amount > 0) {
                if( currentResources[resourceType] === undefined) {
                    currentResources[resourceType] = 0;
                }
                currentResources[resourceType] += amount;
                collectedAny = true;
            }
        }
        if (collectedAny) {
        scene.resources = currentResources;
        }
    } else {
        const currentResources = { ...scene.resources };
        currentResources.scraps = (currentResources.scraps || 0) + 1;
        scene.resources = currentResources;
    }
    
}