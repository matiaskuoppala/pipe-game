    // Sprite
    var img = new Image();
    img.src = "sprite.png";
    var gameOverBg = new Image();
    gameOverBg.src = "game_over_bg.png"

    // Counters etc.
    var eIdx = 0;
    var spIdx = 0;
    var lost = false;
    var win = false;
    var counter = 0;
    var keysDown = {};
    var difficultyChosen = false;
    var started = false;
    var score = 0;
    var lives = 0;
    var difficulty;
    var rect1;
    var rect2;
    var rect3;
    
    // Setup canvas
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = "400";
    canvas.height = "800";
    var background = new Image();
    background.src = "background.png";


    function button(x, y, width, height, text, textX, textY) {
        ctx.fillStyle = "#5A6ED2";
        ctx.fillRect(x, y, width, height); 
        ctx.lineWidth = "5";
        ctx.strokeStyle = "white"; 
        ctx.strokeRect(x, y, width, height);
        ctx.fillStyle = "white";
        ctx.font = "36px Arial";
        ctx.fillText(text, textX, textY);
    }
    
    // Set difficulty
    function setDifficulty(level) {
        difficulty = level
        eSpeed = level;
        lives = (4-level) * 20
        document.getElementById('hard').style.display = "none";
        document.getElementById('easy').style.display = "none";
        document.getElementById('normal').style.display = "none";
        document.getElementById('start').style.display = "block";
        difficultyChosen = true;
    }

    // Update player position
    function update() {
        if (38 in keysDown)  {
            move("up");
        } if (40 in keysDown) {
            move("down");
        } if (37 in keysDown) {
            move("left");
        } if (39 in keysDown) {
            move("right");
        } 
    }
    
    // End game on a loss
    function gameOver() {
    ctx.drawImage(gameOverBg, 0, 0);
    draw(ctx, x, y, spIdx);
    for (i=0; i < enemies.length; i++) {
        drawEnemy(ctx, enemies[i].x, enemies[i].y, 0);
    }
    ctx.font = "60px Arial";
    ctx.fillText("Game Over", 45, 240);
    document.getElementById('newgame').style.display = "block";
    ctx.font = "40px Arial";
    ctx.fillStyle = "#5A6ED2";
    ctx.fillText("Score: " + score, 105, 300);
    if (localStorage.getItem("hiscore" + difficulty) === null) {
        localStorage.setItem("hiscore" + difficulty, score)
        ctx.font = "40px Arial";
        ctx.fillText("New High Score!", 46, 370);
        console.log("lol1")
    } else if (localStorage.getItem("hiscore1") < score && difficulty == 1) {
        localStorage.setItem("hiscore" + difficulty, score);
        ctx.font = "40px Arial";
        ctx.fillText("New High Score!", 46, 370);
        console.log("lol2")
    } else if (localStorage.getItem("hiscore2") < score && difficulty == 2) {
        localStorage.setItem("hiscore" + difficulty, score);
        ctx.font = "40px Arial";
        ctx.fillText("New High Score!", 46, 370);
        console.log("lol3")
    } else if (localStorage.getItem("hiscore3") < score && difficulty == 3) {
        localStorage.setItem("hiscore" + difficulty, score);
        ctx.font = "40px Arial";
        ctx.fillText("New High Score!", 46, 370);
        console.log("lol4")
    }
        
    ctx.font = "40px Arial";
    ctx.fillText("High Scores: ", 70, 620);
    ctx.fillStyle = "white";
    if (localStorage.getItem("hiscore1" === null)) ctx.fillText("Easy: -", 70, 665); else ctx.fillText("Easy: " + localStorage.hiscore1, 70, 665);
    if (localStorage.getItem("hiscore2" === null)) ctx.fillText("Normal: -", 70, 665); else ctx.fillText("Normal: " + localStorage.hiscore2, 70, 705);
    if (localStorage.getItem("hiscore3" === null)) ctx.fillText("Hard: -", 70, 665); else ctx.fillText("Hard: " + localStorage.hiscore3, 70, 745);
    
    }
    
    function begin() {
        started = true;
        document.getElementById('start').style.display = "none";
        infiniteGame();
    }
    
    // Infinite game mode loop
    function infiniteGame() {
    lost = false;
    ctx.drawImage(background, 0, 0);
    if (counter == 30) {
        counter = 0;
        spIdx = 0;
        eIdx = 0;
    } else if (counter == 25) {
        eIdx = 1;
    } else if (counter == 20) {
        eIdx = 0;
        spIdx = 2;
    } else if (counter == 15) {
        eIdx = 1;
    } else if (counter == 10) {
        spIdx = 1;
        eIdx = 0;
    } else if (counter == 5) {
        eIdx = 1
    }

    counter += 1;
    ctx.fillStyle = "#5A6ED2"
    ctx.fillText("Score: " + score, 20, 50);
    ctx.fillStyle = "#D25A5A";
    ctx.fillText("Lives: " + lives, 220, 50);
    update();    
    draw(ctx, x, y, spIdx);
    moveInfinite();
    if (lost == true) {
        gameOver();
    } if (lost == false) {
    requestAnimationFrame(infiniteGame);
    }
    }
    
    function reset() {
    eIdx = 0;
    spIdx = 0;
    lost = false;
    win = false;
    counter = 0;
    keysDown = {};
    difficultyChosen = false;
    started = false;
    x = 184;
    y = 200;
    score = 0;
    chanceForGreen = 41;
    chanceForRed = 41;
    }
    
    function again() {
        document.getElementById('newgame').style.display = "none";
        document.getElementById('easy').style.display = "block";
        document.getElementById('normal').style.display = "block";
        document.getElementById('hard').style.display = "block";
        reset();
        setup();
    }
    
    // Game setup
    function setup() {
        if (!difficultyChosen) {
            ctx.fillStyle = "white";
            ctx.fillRect(25, 18, 350, 80);
            ctx.strokeStyle = "#5A6ED2";
            ctx.lineWidth = "5";
            ctx.strokeRect(25, 18, 350, 80);   
            ctx.font = "40px Arial";
            ctx.fillStyle = "#5A6ED2";
            ctx.fillText("Choose difficulty", 52, 70);
            requestAnimationFrame(setup);
        } else if (!started) {
            ctx.drawImage(background, 0, 0);
            draw(ctx, x, y, 0);
            enemies = Array();
            create(300, 730, (Math.floor(Math.random() * 2) + 1) * eSpeed, "up");
            create(220, 730, (Math.floor(Math.random() * 2) + 1) * eSpeed, "up");
            create(140, 730, (Math.floor(Math.random() * 2) + 1) * eSpeed, "up");
            create(60, 730, (Math.floor(Math.random() * 2) + 1) * eSpeed, "up");
            drawEnemy(ctx, enemies[0].x, enemies[0].y, 0);
            drawEnemy(ctx, enemies[1].x, enemies[1].y, 0);
            drawEnemy(ctx, enemies[2].x, enemies[2].y, 0);
            drawEnemy(ctx, enemies[3].x, enemies[3].y, 0);
            if (13 in keysDown) begin();
            requestAnimationFrame(setup);
        }             
    }


window.onload = function() {    
       
    
    ctx.drawImage(background, 0, 0);
    
    //rect1 = button(100, 270, 150, 100, "Easy", 120, 300);
    //rect2 = button(100, 440, 150, 100, "Normal", 120, 480);
    //rect3 = button(100, 610, 150, 100, "Hard", 120, 650);
    
    setup();
    
    canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);

    if (isInside(mousePos,rect)) {
        alert('clicked inside rect');
    } else {
        alert('clicked outside rect');
    }   
    }, false);
    
    // Listen for key presses
    addEventListener("keydown", function (a) {
	   keysDown[a.keyCode] = true;
    }, false);

    addEventListener("keyup", function (a) {
	   delete keysDown[a.keyCode];
    }, false);
    
    window.addEventListener("keydown", function(e) {
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
        }
    }, false);

}
