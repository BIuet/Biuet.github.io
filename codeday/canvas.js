
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

var screen = {
    width: 0,
    height:0,
    mx:0,
    my:0,
    md: !1
};
screen.width = canvas.width = window.innerWidth;
screen.height = canvas.height = window.innerHeight;
window.addEventListener('resize', function() {
    screen.width = canvas.width = window.innerWidth,
    screen.height = canvas.height = window.innerHeight;
    canvas.focus();
});
window.addEventListener('mousemove', function(mouse) {
    screen.mx = mouse.clientX;
    screen.my = mouse.clientY;
    canvas.focus();
});
window.addEventListener('mousedown', function() {
    screen.md = !!1;
    window.clickables.checkClick();
});
window.addEventListener('mouseup', function() {
    screen.md = !1;
});
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
var clickables = {
    clickables: [],
    create: function(x, y, width, height, text, data) {
        this.clickables.push({
            x: x, y: y, width: width, height: height, text: text, data: data, hover: !1,
            checkHover() {
                return this.hover = (
                    screen.mx > this.x &&
                    screen.mx < this.x + this.width &&
                    screen.my > this.y &&
                    screen.my < this.y + this.height
                );
            },
            execute() {
                this.data();
            },
            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.fillStyle = "#964B00";
                ctx.beginPath();
                ctx.globalAlpha = this.hover ? 1 : 0.4;
                ctx.fillRect(0-this.width/2, 0, this.width, this.height);
                drawText(this.text, 0, this.height/2, "#FFFFFF", 20, "center");
                ctx.closePath();
                ctx.restore();
            }
        });
    },
    checkHover: function() {
        for (let i = 0; i < this.clickables.length; i++) {
            let click = this.clickables[i];
            click.checkHover();
        }
    },
    checkClick: function() {
        for (let i = 0; i < this.clickables.length; i++) {
            if (this.clickables[i].hover) {
                this.clickables[i].execute();
                return;
            };
        }
    },
    deleteAll: function() { 
        this.clickables = []; 
    },
    drawButtons: function() {
        for (let i = 0; i < this.clickables.length; i++) {
            this.clickables[i].draw();
        }
    }
};
let t = 0;
function L() {
    particles.update();
    window.clickables.checkHover();
    t++;
    if (t >= 61) t = 0;
    ctx.save();
    ctx.fillStyle = "#222222";
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, screen.width, screen.height);
    if (t%2 == 0) particles.create(Math.abs((Math.random()*35))-Math.abs(Math.random()*5), 600, Math.random()*360, Math.random()*3);
    particles.draw();
    window.Game.draw();
    ctx.restore();
    requestAnimationFrame(L);
};
window.clickables = clickables;
window.drawText = drawText;
window.addEventListener('load', L);
window.canvas = canvas;