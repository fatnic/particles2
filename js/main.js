var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = canvas.width / 16*9;

var Mouse = new Vec2();

var particle_configs = {
    flame: {
        direction: 270,
        direction_variance: 25,
        force: 1.5,
        force_variance: 0.5,
        lifespan: 80,
        lifespan_variance: 10,
        decay: 12,
        decay_variance: 1.5,
        size: 2,
        size_variance: 1,
        rate: 2,
        colour: {r:246, g:207, b:1},
        gravity: [0,0],
        alpha_start: 0.6
    },
    smoke: {
        direction: 270,
        direction_variance: 35,
        force: 0.9,
        force_variance: 0.5,
        lifespan: 200,
        lifespan_variance: 10,
        decay: 4,
        decay_variance: 1.5,
        size: 8,
        size_variance: 2,
        rate: 1,
        colour: {r:100, g:100, b:100},
        gravity: [0,0],
        alpha_start: 0.1
    },
    colours:
        {
            copper: {r:60, g:127, b:253},
            standard: {r:246, g:207, b:1},
            potassium: {r:181, g:79, b:173},
            barium: {r:127,g:249,b:106},
        }
};

var Flame = {
    init: function() {
        this.position = new Vec2(20, canvas.height/2);
        this.speed = 100;

        this.light();
        this.aabb = new Rect(this.position.subtract(this.flame.config.size/2, true), new Vec2(this.flame.config.size/2, this.flame.config.size/2));
    },

    light: function() {
        this.flame = new Particles(this.position, particle_configs.flame);
        this.smoke = new Particles(this.position, particle_configs.smoke);
    },

    extinguish: function() {
        this.flame.setConfig({lifespan:0, alpha_start:0, rate: 0});
        this.smoke.setConfig({lifespan:0, alpha_start:0, rate: 0});
    },

    update: function() {
        this.flame.origin = this.position.clone();

        this.smoke.origin = this.flame.origin.clone();
        this.smoke.origin.y = this.flame.origin.y - 5;

        this.smoke.update();
        this.flame.update();
    },

    draw: function() {
        this.smoke.draw(ctx);
        this.flame.draw(ctx);
    },
};
Flame.init();

function timestamp() {
    if (window.performance && window.performance.now) {
        return window.performance.now();
    } else {
        return new Date().getTime();
    }
}

function init() {
    loop();
}

function update(dt) {
    if (Key.isDown(Key.D)) { Flame.position.add(new Vec2(Flame.speed * dt, 0)); }
    if (Key.isDown(Key.A)) { Flame.position.add(new Vec2(-Flame.speed * dt, 0)); }
    if (Key.isDown(Key.X)) { Flame.extinguish(); }
    if (Key.isDown(Key.R)) { Flame.light(); }

    if (Key.isDown(Key.G)) { Flame.flame.setConfig({size: 10}); }

    Flame.update();
}

function draw(dt) {
    Draw.clear(ctx, 'rgb(51,51,51)');
    Flame.draw(ctx);
    // Draw.circle(ctx, Flame.position, Flame.flame.config.size, 'red');
    Flame.aabb.draw(ctx);

    Draw.text(ctx, new Vec2(20, canvas.height-20), "Particles: " + (Flame.flame.particles.length + Flame.smoke.particles.length));
    Draw.text(ctx, new Vec2(20, canvas.height-6), "Delta: " + dt);
}

var fps = 60;
var step = 1/fps;
var dt = 0;
var now = timestamp();
var last = timestamp();

function loop() {
    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    while (dt > step) {
        dt = dt - step;
        update(step);
    }
    draw(dt);
    last = now;
    requestAnimationFrame(loop, canvas);
}

init();

canvas.onclick = function(e) {

};

canvas.onmousemove = function(event) {
    var rect = canvas.getBoundingClientRect();
    Mouse.x = event.clientX - rect.left;
    Mouse.y = event.clientY - rect.top;
};
