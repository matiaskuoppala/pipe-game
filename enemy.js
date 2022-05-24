var enemies = new Array();
var eSpeed = 1;
var positions = new Array(20, 50, 80, 110, 140, 170, 200, 230, 260, 290, 320, 350);
var chanceForGreen = 41;
var chanceForRed = 41;

function create(x, y, s, dir) {
    var enemy = {
    x: x,
    y: y,
    speed: s,
    direction: dir,
    counter: 0,
    color: 1
    }
    enemies.push(enemy);
}

function add(i, x, y, s, dir) {
    var enemy = {
    x: x,
    y: y,
    speed: s,
    direction: dir
    
    }
    enemies[i] = enemy
}

function collision(idx) {
    console.log("lol")
    for (i=0; i < enemies.length; i++) {
        if (!(i == idx)) {
            if (enemies[idx].x <= enemies[i].x + 27 &&  enemies[idx].x + 27 >= enemies[i].x && enemies[idx].y <= enemies[i].y + 27 && enemies[idx].y + 27 >= enemies[i].y) {
                if (enemies[idx].direction == "left" && enemies[i].direction == "left") {
                    enemies[idx].direction = "right";
                    enemies[idx].x = enemies[idx].x + (enemies[idx].x - enemies[i].x);
                    enemies[idx].counter = 0;
                } else if (enemies[idx].direction == "right" && enemies[i].direction == "right") {
                    enemies[idx].direction = "left";
                    enemies[idx].x = enemies[idx].x + (enemies[idx].x - enemies[i].x);
                    enemies[idx].counter = 0;
                } else {
                    enemies[idx].counter = 0;
                }
            }
        }
    }
}        

function moveInfinite() {
    for (i=0; i < enemies.length; i++) {
        enemies[i].counter += 1;
        
        // Random wobble for enemies
        var randomNumber = Math.floor(Math.random() * 2) + 1
        if (randomNumber == 1 && enemies[i].counter % 2 == 0 && !(enemies[i].x < 0 + enemies[i].speed)) {
            enemies[i].counter = 0;
            enemies[i].direction = "left";
        } else if (randomNumber == 2 && enemies[i].counter % 2 == 0 && !(enemies[i].x + enemies[i].speed + 32 > canvas.width)) {
            enemies[i].counter = 0;
            enemies[i].direction = "right";
        }
        
        if (enemies[i].direction == "right") {
            enemies[i].x += enemies[i].speed;
        } else if (enemies[i].direction == "left") {
            enemies[i].x -= enemies[i].speed;
        }
        
        // Move enemy forward
        enemies[i].y -= enemies[i].speed;
        drawEnemy(ctx, enemies[i].x, enemies[i].y, eIdx, enemies[i].color);
        
        // Enemy hits gas pipe, check if lost
        if (enemies[i].y <= 160 && lives >= 1) {
             lives -= enemies[i].color;
                enemies[i].x = positions[Math.floor(Math.random() * 12)];
                enemies[i].speed = (Math.floor(Math.random() * eSpeed) + 1);
                enemies[i].y = 730;
                enemies[i].direction = "up";
        
        // Pick new enemy color
        var colorPicker = (Math.floor(Math.random() * 40) + 1)
        if (colorPicker >= chanceForGreen) {
            drawEnemy(ctx, enemies[i].x, enemies[i].y, eIdx);
            enemies[i].color = 3;
        } else if (colorPicker >= chanceForRed) {
            drawRed(ctx, enemies[i].x, enemies[i].y, eIdx);
            enemies[i].color = 2;
        } else {
            drawEnemy(ctx, enemies[i].x, enemies[i].y, eIdx);
            enemies[i].color = 1;
        }
            
        } else if (lives <= 0) {
            lost = true;
        } 
        
        // Check if enemy hits player
        if ((enemies[i].x <= x + 27 &&  enemies[i].x + 27 >= x &&  enemies[i].y <= y + 27 &&  enemies[i].y + 27 >= y)) {
                enemies[i].x = positions[Math.floor(Math.random() * 12)];
                enemies[i].speed = (Math.floor(Math.random() * eSpeed) + 1);
                enemies[i].y = 730;
                enemies[i].direction = "up";
            var colorPicker = (Math.floor(Math.random() * 40) + 1)
            console.log(colorPicker);
        if (colorPicker >= chanceForGreen) {
            drawGreen(ctx, enemies[i].x, enemies[i].y, eIdx);
            enemies[i].color = 3;
        } else if (colorPicker >= chanceForRed) {
            drawRed(ctx, enemies[i].x, enemies[i].y, eIdx);
            enemies[i].color = 2;
            console.log("lol");
        } else {
            drawEnemy(ctx, enemies[i].x, enemies[i].y, eIdx);
            enemies[i].color = 1;
        }
                score += 1;
            }  
    } 
    adjustDifficulty();
}

// Increase game difficulty 
function adjustDifficulty() {
    var adjustmentCounter = score - 50;   
        if (adjustmentCounter == 0) {
            score += 1;
            eSpeed += 1;
            chanceForRed -= 3;
        } else if (adjustmentCounter == 50) {
            create(184, 730, eSpeed, "up");
            score += 1;
            chanceForRed -= 3;
        } else if (adjustmentCounter == 100) {
            create(184, 750, eSpeed, "up");
            score += 1;
            chanceForRed -= 3;
            chanceForGreen -= 3;
        } else if (adjustmentCounter == 150) {
            eSpeed += 1;
            score += 1;
            chanceForRed -= 3;
            chanceForGreen -= 3;
        } else if (adjustmentCounter == 200) {
            create(184, 750, eSpeed, "up");
            score += 1;
            chanceForRed -= 3;
            chanceForGreen -= 3;
        } else if (adjustmentCounter == 250) {
            eSpeed +=1;
            score += 1;
            chanceForRed -= 3;
            chanceForGreen -= 3;
        } else if (adjustmentCounter == 300) {
            chanceForRed -= 3;
            chanceForGreen -= 2;
        } else if (adjustmentCounter == 350) {
            chanceForRed -= 3;
            chanceForGreen -= 2;
        } else if (adjustmentCounter == 400) {
            chanceForRed -= 3;
            chanceForGreen -= 2;
        } else if (adjustmentCounter == 450) {
            chanceForRed -= 3;
            chanceForGreen -= 2;
        }
}

function drawEnemy(c, x, y, sIdx, color) {
    c.drawImage(img, 32*sIdx, 32 * color, 32, 32, x, y, 32, 32);
}

function drawGreen(c, x, y, sIdx){
    c.drawImage(img, 32*sIdx, 96, 32, 32, x, y, 32, 32);
}

function drawRed(c, x, y, sIdx){
    c.drawImage(img, 32*sIdx, 64, 32, 32, x, y, 32, 32);
}
