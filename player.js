var x = 184;
var y = 200;
var speed = 5;

function move(direction) {
    if (x >= 0 && y >= 0 && y + 33 <= canvas.height && x + 33 <= canvas.width) {
    if (direction == "left") {
        x -= speed;
        draw(ctx, x, y, spIdx);
    } else if (direction == "right") {
        x += speed;
        draw(ctx, x, y, spIdx)
    } else if (direction == "up") {
        y -= speed;
        draw(ctx, x, y, spIdx);
    } else if (direction == "down") {
        y += speed;
        draw(ctx, x, y, spIdx);
    } 
    } else if (x < 0) {
        x = 1;
        draw(ctx, x, y, spIdx);
    } else if (x + 32 > canvas.width) {
        x = canvas.width - 33;
        draw(ctx, x, y, spIdx);
    } else if (y < 0) {
        y = 1;
        draw(ctx, x, y, spIdx);
    } else if (y + 32 > canvas.height) {
        y = canvas.height - 33;
        draw(ctx, x, y, spIdx);
    }
}

function changeSpeed(newSpeed) {
    speed = newSpeed;
}

function reset() {
    x = 0;
    y = 0;
    speed = defaultSpeed;
}

function draw(c, x, y, sIdx) {
    c.drawImage(img, 32*sIdx, 0, 32, 32, x, y, 32, 32);
}
