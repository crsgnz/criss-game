export function moverJugador(player, cursors, delta) {
    const speed = 250; // Velocidad de movimiento del jugador
    const velocity = new Phaser.Math.Vector2();

    if (cursors.left.isDown || cursors.A.isDown) {
        velocity.x -= speed;
        player.flipX = true;
    }
    if (cursors.right.isDown || cursors.D.isDown) {
        velocity.x += speed;
        player.flipX = false;
    }
    if (cursors.up.isDown || cursors.W.isDown) {
        velocity.y -= speed;
    }
    if (cursors.down.isDown || cursors.S.isDown) {
        velocity.y += speed;
    }

    if (velocity.length() > 0) {
        velocity.normalize().scale(speed);
    }

    if(cursors.shift.isDown) {
        velocity.scale(1.5);
    }

    player.setVelocity(velocity.x, velocity.y);
}