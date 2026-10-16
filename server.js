const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
const players = {};
const hp = {};
function clamp(v,min,max){return Math.max(min,Math.min(max,v));}
io.on('connection', socket => {
  players[socket.id] = { x: Math.random()*8-4, z: Math.random()*8-4, yaw: 0 };
  hp[socket.id] = 100;
  socket.emit('notice','Conectado al servidor propio');
  socket.on('input', data => {
    const p=players[socket.id]; if(!p || !data) return;
    const x=clamp(Number(data.x)||0,-1,1), z=clamp(Number(data.z)||0,-1,1);
    p.x=clamp(p.x+x*0.18,-52,52); p.z=clamp(p.z+z*0.18,-52,52);
    p.yaw=Number(data.yaw)||0;
  });
  socket.on('shoot', () => {
    // Daño de prueba: dispara al jugador más cercano dentro del alcance.
    const shooter=players[socket.id]; if(!shooter) return;
    let target=null, best=7.5;
    for(const [id,p] of Object.entries(players)){
      if(id===socket.id) continue;
      const d=Math.hypot(p.x-shooter.x,p.z-shooter.z);
      if(d<best){best=d;target=id;}
    }
    if(target){hp[target]=Math.max(0,(hp[target]??100)-20);if(hp[target]===0){players[target].x=Math.random()*8-4;players[target].z=Math.random()*8-4;hp[target]=100;}}
  });
  socket.on('disconnect',()=>{delete players[socket.id];delete hp[socket.id];});
});
setInterval(()=>io.emit('state',{players,hp}),50);
server.listen(PORT,()=>console.log(`Battle Classic 3D escuchando en puerto ${PORT}`));
