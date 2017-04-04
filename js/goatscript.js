var raw_size = [2048, 1370];
var scale = 0.4;
var scaled_size = [scale * raw_size[0], scale * raw_size[1]];
var accel_const = 1;
var terminal_velocity = 10;



var goat;
var dirt;
var num_grass = 20;
var grass=[];

var game = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = scaled_size[0];
        this.canvas.height = scaled_size[1];
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    }
}

function startGame() {

    dirt = new component("dirt", "pics/dirt.jpg", scaled_size[0]/2, scaled_size[1]/2, 0, 0, scaled_size[0], scaled_size[1]);
    goat = new component("goat", "pics/goat.png", 40, 120, 0, 0, 60, 60);
    for (g = 0; g < num_grass; g++) {
        grass[g] = new component("grass", "pics/grass.png", -1, -1, 0, 0, 60, 60);
    }
    game.start();
}

function component(type, src, x, y, vx, vy, width, height) {
    this.type = type;
    this.image = new Image();
    this.image.src = src;
    this.kill_count=0;

    this.random_pos = function (dir) {
        this.pos[dir] = scaled_size[dir] * Math.random();
    }

    this.respawn = function() {
        for (j = 0; j < 2; j++) {
            this.random_pos(j);
        }
    }


    this.size = [width, height];
    this.pos = [x, y];
    for (i = 0; i < 2; i++) {
        if (this.pos[i] < 0)
            this.random_pos(i);
    }
    this.vel = [vx, vy];
    this.accel = [0, 0];

    this.draw = function() {
        ctx = game.context;
        ctx.drawImage(this.image,
            this.pos[0]-this.size[0]/2, 
            this.pos[1]-this.size[1]/2,
            this.size[0], this.size[1]);
    }

    this.reconfigure = function () {
        for (i = 0; i < 2; i++) {
            this.pos[i] += this.vel[i];
            this.vel[i] += accel_const * this.accel[i];
            if (this.vel[i] > terminal_velocity)
                this.vel[i] -= 1;
            else if (this.vel[i] < -terminal_velocity)
                this.vel[i] += 1;
        }
    }

    this.check_collision = function () {

//first check if were in the overall bounds
for (i= 0; i < 2; i++){
    if (this.pos[i] > scaled_size[i]-this.size[i]/2) {
        this.pos[i] = scaled_size[i]-this.size[i]/2;
        this.vel[i] = 0;
    }
//later with gravity if (i == 0 && pos[i] < min[i]) {
    if (this.pos[i] <this.size[i]/2) {
        this.pos[i] = this.size[i]/2;
        this.vel[i] = 0;
    }
}

var sum;
var dif = [0, 0];
var sdif = [0, 0];
var ddif = [0, 0];

for (g = 0; g < num_grass; g++) {
    sum = 0;
    for (i = 0; i < 2; i++) {
        var ent = grass[g];
//raw position difference,center to center
dif[i] = this.pos[i] - ent.pos[i];
//sizes added together, not really a diff
sdif[i] = this.size[i] / 2 + ent.size[i] / 2;
//how much am i overlapping in this component
ddif[i] = sdif[i] - Math.abs(dif[i]);


var compare = sdif[i];
//    if (i == 1 && ent.collision_flag == 2)
//       compare += 2;
if (Math.abs(dif[i]) < compare)
    sum += 1;
}

if (sum == 2) {
    ent.respawn();
    this.kill_count++;

}
}

}


}

function updateGameArea() {
    game.clear();
//dirt.newPos();
dirt.draw();

goat.reconfigure();
goat.check_collision();
goat.draw();

for (g = 0; g < num_grass; g++)
{ 
    grass[g].reconfigure();
    grass[g].draw();
}

ctx.fillStyle = "white";
ctx.font = "bold italic 16px Helvetica";

ctx.fillText("You have eaten " + goat.kill_count + " grass", 40, 40);

}

function move(dir,val) {
// goat.image.src = "goat.png";
goat.accel[dir] = val;
}

function clearmove() {
//  goat.image.src = "goat.png";
goat.accel[0] = 0; 
goat.accel[1] = 0; 
}

document.addEventListener('keydown', function(event) {
//left
if (event.keyCode == 37) {
    move(0,-1); 
}
//right
else if (event.keyCode == 39) {
    move(0,1);
}
//up
else if (event.keyCode == 38) {
    move(1,-1);
}
//down
else if (event.keyCode == 40) {
    move(1,1);
}
}, true);

document.addEventListener('keyup', function (event) {
//left
if (event.keyCode == 37) {
    move(0,0);
}
//right
else if (event.keyCode == 39) {
    move(0,0);
}
//up
else if (event.keyCode == 38) {
    move(1,0);
}
//down
else if (event.keyCode == 40) {
    move(1,0);
}
}, true);
