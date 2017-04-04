var raw_size = [2048, 1370];
var scale = 0.4;
var scaled_size = [scale * raw_size[0], scale * raw_size[1]];
var accel_const = 0.1;
var terminal_velocity = 5;
var goat;
var dirt;
var num_grass = 20;
var grass = [];

var game = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = scaled_size[0];
        this.canvas.height = scaled_size[1];
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 1);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}
