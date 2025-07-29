
import Phaser from 'phaser';
import { PhaserGame } from './PhaserGame';
import { EventBus } from './game/EventBus';
import './menu-inicio/menu-inicio.css';

function App ()
{
    
    const cerrarMenu = () => {
        const menu = document.querySelector('.menu-inicio');
        menu.style.opacity = '0';
        menu.style.pointerEvents = 'none';
        menu.style.transition = 'opacity 1s ease';
        setTimeout(() => {
            if (menu) {
             menu.style.display = 'none';
            }
            EventBus.emit('iniciar-juego');
        } , 1000);

    }



    return (
        <div id="app">
            {/* <div className='menu-inicio'>
                <h2>Bienvenido a Criss-Game</h2>
                <p>Haz click en el botón para empezar el juego</p>
                <button onClick={cerrarMenu}>Empezar</button>
            </div> */}
            <PhaserGame />
        </div>
    )
}

export default App
