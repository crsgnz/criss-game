import React, { useState, useEffect } from 'react';
import { EventBus } from './game/EventBus';
import "./css/interfaz.css";
import UpgradeMenu from './Upgrade';

export default function Interfaz() {
    const [gameResources, setGameResources] = useState({
        scraps: 0,
        chips: 0,
        wiring: 0,
    });

    const [showUpgradeMenu, setShowUpgradeMenu] = useState(false);

    useEffect(() => {
        const handleResourcesUpdate = (newResources) => {
            setGameResources(newResources);
        };

        const handleOpenUpgradeMenu = () => {
            setShowUpgradeMenu(true);
        }

        EventBus.on('open-upgrade-menu', handleOpenUpgradeMenu);
        EventBus.on('resources-updated', handleResourcesUpdate);

        return () => {
            EventBus.off('open-upgrade-menu', handleOpenUpgradeMenu);
            EventBus.off('resources-updated', handleResourcesUpdate);
        };
    }, []);

    const closeUpgradeMenu = () => {
        setShowUpgradeMenu(false);
    };

    const handleUpgradeSelected = (upgradeId) => {
        console.log(`Upgrade selected: ${upgradeId}`);
    }

    return (
        <>
            <div className="interfaz">
                <div className="score">
                    {/* <img src="/assets/scrapIcon.png" alt="icon" className='icon'/> */}
                    <p>Scraps: {gameResources.scraps}</p>
                </div>
                <div className="score">
                    <p>Chips: {gameResources.chips}</p>
                </div>
                <div className="score">
                    <p>Wiring: {gameResources.wiring}</p>
                </div>
            </div>

            {showUpgradeMenu && (
                <UpgradeMenu
                    onClose={closeUpgradeMenu}
                    onUpgradeSelected={handleUpgradeSelected}
                />
            )}
        </>
    );
}