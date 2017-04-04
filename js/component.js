
function component(type, src, x, y, vx, vy, width, height) {
    this.type = type;
    this.image = new Image();
    this.image.src = src;
    this.kill_count = 0;

    this.move = function (dir, val) {
        // goat.image.src = "goat.png";
        this.accel[dir] = val;
    }

    this.clearmove = function () {
        //  goat.image.src = "goat.png";
        this.accel[0] = 0;
        this.accel[1] = 0;
    }

    this.random_pos = function (dir) {
        this.pos[dir] = scaled_size[dir] * Math.random();
    }

    this.respawn = function () {
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

    this.draw = function () {
        ctx = game.context;
        ctx.drawImage(this.image,
            this.pos[0] - this.size[0] / 2,
            this.pos[1] - this.size[1] / 2,
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
        for (i = 0; i < 2; i++) {
            if (this.pos[i] > scaled_size[i] - this.size[i] / 2) {
                this.pos[i] = scaled_size[i] - this.size[i] / 2;
                this.vel[i] = 0;
            }
            //later with gravity if (i == 0 && pos[i] < min[i]) {
            if (this.pos[i] < this.size[i] / 2) {
                this.pos[i] = this.size[i] / 2;
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
