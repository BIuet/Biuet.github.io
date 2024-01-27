var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var particles = {};

window.onload = window.onresize = function() {
    canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;   
}
window.addEventListener('load', Z);

let ticks = 0;
function Z() {
    particles.update();
    ticks++;
    if (ticks%15 == 0) particles.create(700+Math.abs((Math.random()*35)), 600, Math.random()*360, Math.random()*3);
    ticks = ticks > 60 ? 0 : ticks;
    ctx.save();
    ctx.fillStyle = "#9dd6e9";
    ctx.fillRect(0, 0, screen.width, screen.height);
    particles.draw();
    ctx.restore();

    requestAnimationFrame(Z)
}

var particles = {
    particles: [],
    alt: 1,
    update: function() {
        for (let i = 0; i < this.particles.length; i++) {
            let part = this.particles[i];
            part.x += part.xv;
            part.y += part.yv;
            part.life -= 1;
            if (part.life <= 0 || part.x < 0-part.size/2 || part.x > screen.width+part.size/2|| part.y < 0-part.size/2 || part.y > screen.height+part.size/2) this.particles.splice(this.particles.indexOf(part), 1);
        }
    },
    create: function(size, life, dir, speed) {
        this.particles.push({
            x: Math.random() * screen.width,
            y: screen.height,
            size: size,
            life: life,
            xv: speed * Math.cos(dir),
            yv: speed * Math.sin(dir),
            j: Math.abs(Math.round(Math.random()))
        });
    },
    draw: function() {
        for (let i = 0; i < this.particles.length; i++) {
            let part = this.particles[i];
            ctx.save();
            ctx.translate(part.x, part.y);
            ctx.fillStyle = part.j == 1 ? "#207491" : "#add8e6";
            ctx.beginPath();
            ctx.globalAlpha = part.life/100/5;
            ctx.fillRect(0, 0, part.size/2, part.size/2);
            // particle hitbox
            if (false && screen.mx > part.x &&
                screen.mx < part.x + part.size/2 &&
                screen.my > part.y &&
                screen.my < part.y + part.size/2)
            ctx.closePath();
            ctx.restore();
        }
    }
};
