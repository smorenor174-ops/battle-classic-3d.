# Battle Classic 3D — prototipo inicial

Prototipo educativo de arena 3D en navegador, con sincronización multijugador básica mediante servidor propio.

## Requisitos
- Node.js 18 o superior
- Internet al cargar la página (Three.js se obtiene de jsDelivr)
- Para jugar desde fuera de tu red, desplegar en un host compatible con Node.js y HTTPS/WebSockets

## Ejecutar en tu PC
1. Descomprime la carpeta.
2. Entra a `battle_classic_3d`.
3. Ejecuta `npm install`
4. Ejecuta `npm start`
5. Abre `http://localhost:3000`

Para probar desde el Samsung en la misma Wi-Fi, abre `http://IP-LOCAL-DE-TU-PC:3000` (ambos conectados al mismo Wi-Fi).

## Controles
- Móvil: joystick izquierdo, botones SALTAR y DISPARAR.
- PC: WASD para moverte, Enter para disparar, espacio para saltar.

## Qué incluye
- Arena 3D low-poly, casas y árboles sencillos
- Movimiento sincronizado y jugadores visibles
- Disparo de prueba con daño simple al jugador más cercano
- Interfaz básica de vida y cantidad de jugadores

## Limitaciones conocidas
- Es una prueba técnica, no un juego completo: aún no hay colisiones sólidas, loot, inventario, animaciones, audio, zona segura, matchmaking, persistencia ni protección contra trampas.
- La detección de impactos es deliberadamente simple y debe sustituirse por raycasts y lógica autoritativa de servidor.
- La cámara/controles se deben pulir para juego móvil competitivo.
- No incluye assets, mapas ni código de Free Fire; todo debe ser original.
- Para una partida online pública, despliega el servidor y configura HTTPS/WSS, límites de frecuencia, validación de movimiento y control antitrampas.
