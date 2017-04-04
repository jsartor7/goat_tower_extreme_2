
document.addEventListener('keydown', function (event) {
    //left
    if (event.keyCode == 37) {
        goat.move(0, -1);
    }
    //right
    else if (event.keyCode == 39) {
        goat.move(0, 1);
    }
    //up
    else if (event.keyCode == 38) {
        goat.move(1, -1);
    }
    //down
    else if (event.keyCode == 40) {
        goat.move(1, 1);
    }
}, true);

document.addEventListener('keyup', function (event) {
    //left
    if (event.keyCode == 37) {
       goat.move(0, 0);
    }
    //right
    else if (event.keyCode == 39) {
        goat.move(0, 0);
    }
    //up
    else if (event.keyCode == 38) {
        goat.move(1, 0);
    }
    //down
    else if (event.keyCode == 40) {
        goat.move(1, 0);
    }
}, true);
