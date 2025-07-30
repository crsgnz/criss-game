const UpgradeMenu = ({ onClose, onUpgrade }) => {

    const handleUpgradeClick = (upgradeId) => {
        onUpgrade(upgradeId);
        onClose();
    }

    return (
        <div className="upgrade-menu-overlay">
            <div className="upgrade-menu-content hud-panel"> {/* Reutilizamos estilos */}
                <h2>Mejoras para el Astrocore</h2>
                <p>Selecciona una mejora para tu nave:</p>
                
                <div className="upgrade-options">
                    {/* Botón de Gancho de Recolección */}
                    <button 
                        className="upgrade-button" 
                        onClick={() => handleUpgradeClick('hook_collector')}
                    >
                        Gancho de Recolección
                        <br/><small>Coste: 20 Scraps, 5 Chips</small>
                    </button>

                    {/* Botón de Escudo Mejorado */}
                    <button 
                        className="upgrade-button" 
                        onClick={() => handleUpgradeClick('enhanced_shield')}
                    >
                        Escudo Mejorado
                        <br/><small>Coste: 30 Scraps, 10 Wiring</small>
                    </button>

                    {/* Botón de Propulsor Extra */}
                    <button 
                        className="upgrade-button" 
                        onClick={() => handleUpgradeClick('extra_thruster')}
                    >
                        Propulsor Extra
                        <br/><small>Coste: 50 Scraps, 15 Chips, 5 Wiring</small>
                    </button>

                    {/* Botón de Batería de Respaldo */}
                    <button 
                        className="upgrade-button" 
                        onClick={() => handleUpgradeClick('backup_battery')}
                    >
                        Batería de Respaldo
                        <br/><small>Coste: 40 Scraps</small>
                    </button>

                    {/* Agrega más mejoras aquí según tus ideas */}

                </div>

                {/* Botón para cerrar el menú */}
                <button 
                    onClick={onClose} 
                    className="close-menu-button"
                >
                    Cerrar
                </button>
            </div>
        </div>
    )
}

export default UpgradeMenu;