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
    if (ticks%2 == 0) particles.create(Math.abs((Math.random()*35))-Math.abs(Math.random()*5), 600, Math.random()*360, Math.random()*3);
    ticks = ticks > 60 ? 0 : ticks;
    ctx.save();

    ctx.fillRect(0, 0, screen.width, screen.height);
    particles.draw();
    ctx.restore();

    requestAnimationFrame(Z);
}

var drawText = function(text, x, y, color, size=14, align="left") {
    ctx.save();
    let div = document.createElement('div');
    document.body.appendChild(div);
    div.style.font = 'bold '+(size)+'px Maven Pro'; div.style.padding = '0'; div.style.margin = '0'; div.style.position = 'absolute'; div.style.visibility = 'hidden'; div.innerHTML = text;
    let measure = div.clientWidth;
    ctx.font = div.style.font;
    ctx.fillStyle = color;
    ctx.globalAlpha = 1;
    let x2 = x;
    switch (align) {
        case "left":
            break;
        case "center":
            x2 = measure/2;
            x2 = x-x2;
            break;
        case "right":
            x2 -= measure;
            break;
    }
    ctx.strokeText(text, x2, y);
    ctx.fillText(text, x2, y);
    div.remove();
    ctx.restore();
};

var particles = {
    particles: [],
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
            ctx.fillStyle = part.j == 1 ? "#8b0000" : "#111111";
            ctx.beginPath();
            ctx.globalAlpha = part.life/100/5;
            ctx.fillRect(0, 0, part.size/2, part.size/2);
            if (false && screen.mx > part.x &&
                screen.mx < part.x + part.size/2 &&
                screen.my > part.y &&
                screen.my < part.y + part.size/2) drawText(part.life, 0, 0, "#FFFFFF", 14, "center");
            ctx.closePath();
            ctx.restore();
        }
    }
};
