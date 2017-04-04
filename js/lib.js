
function startGame() {

    dirt = new component("dirt", "pics/dirt.jpg", scaled_size[0] / 2, scaled_size[1] / 2, 0, 0, scaled_size[0], scaled_size[1]);
    goat = new component("goat", "pics/goat.png", 40, 120, 0, 0, 60, 60);
    for (g = 0; g < num_grass; g++) {
        grass[g] = new component("grass", "pics/grass.png", -1, -1, 0, 0, 60, 60);
    }
    game.start();
}

function updateGameArea() {
    game.clear();
    //dirt.newPos();
    dirt.draw();

    goat.reconfigure();
    goat.check_collision();
    goat.draw();

    for (g = 0; g < num_grass; g++) {
        grass[g].reconfigure();
        grass[g].draw();
    }

    ctx.fillStyle = "white";
    ctx.font = "bold italic 16px Helvetica";

    ctx.fillText("You have eaten " + goat.kill_count + " grass", 40, 40);

}
