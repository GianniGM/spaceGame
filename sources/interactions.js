//interactions--------------------------------------------------------------------
var acceleration = false;
var ticklose = 7;
var lose = false;
var render = true;
var started = false;

if (BABYLON.Engine.isSupported()) {

    var Speed = function () {
        //quando il tempo sta per scadere 

        if (acceleration) { //accShip > MaxaccShip / 2
            shipTrail0.particleTexture = new BABYLON.Texture("textures/star.png", scene);
            shipTrail1.particleTexture = new BABYLON.Texture("textures/star.png", scene);

            shipTrail1.minSize = 0.5;
            shipTrail1.maxSize = 0.8;
            shipTrail1.color1 = new BABYLON.Color4(0, 0, 1, 1);
            shipTrail1.color2 = new BABYLON.Color4(0, 1, 0, 1);

            shipTrail0.minSize = 0.5;
            shipTrail0.maxSize = 0.8;
            shipTrail0.color1 = new BABYLON.Color4(0, 0, 1, 1);
            shipTrail0.color2 = new BABYLON.Color4(0, 1, 0, 1);

        } else {
            shipTrail1.minSize = 0.3;
            shipTrail1.maxSize = 0.5;
            shipTrail1.color1 = new BABYLON.Color4(1, 0, 0, 1);
            shipTrail1.color2 = new BABYLON.Color4(1, 0.5, 0, 0);

            shipTrail0.minSize = 0.3;
            shipTrail0.maxSize = 0.5;
            shipTrail0.color1 = new BABYLON.Color4(1, 0, 0, 1);
            shipTrail0.color2 = new BABYLON.Color4(1, 0.5, 0, 0);

        }
        shipTrail0.emitRate = 200 + accShip;
        shipTrail1.emitRate =  200 + accShip;

        shipTrail1.gravity = new BABYLON.Vector3(accShip, 0, 0);
        shipTrail0.gravity = new BABYLON.Vector3(accShip, 0, 0);

        starfield.gravity = new BABYLON.Vector3(accShip+5, 0, 0); 
        starfield.start();
        shipTrail0.start();
        shipTrail1.start();
       
    }
    //fine funzioni di movimento


    //TIMER---------------------------------------------------------
    var timer = setInterval(function () {
        //accelerazione

        if (lose) {
            if (ticklose <= 0) {
                started = false;
                onLose();
                ball.visibility = 0;
                ball1.dispose();
                ball2.dispose();
                lines.dispose();
            } else {
                ticklose--;
            }
        }

        if (started == true) {

            if (MinaccShip < MaxaccShip / 2 + 1) MinaccShip+=3;
            if (accShip <= MinaccShip) accShip = MinaccShip;

            Meteorite.Destroy();

            if (acceleration == false) {
                if (accShip - 5 > MinaccShip) {
                    accShip -= 5;
                } else {
                    accShip = MinaccShip;
                }
            }


            //spawn di meteoriti in base alla velocità acquisita

            SpawnEnemy();

            if (accShip > 2 * MaxaccShip / 3) {
                SpawnEnemy();
            }

        }
    }, 550);//450

    // RENDER-LOOP------------------------------------------------ 

    //variabile di incremento per le rotazioni dei vari oggetti;
    var x = 0;

    engine.runRenderLoop(function () {
        checkInput();
        checkCollisions();


        if (render) scene.render();
        displayState();

        if (started) {
            Shot.move();
            move();
            Speed();
            Meteorite.move();
        } else {
           return;
        }
       x += 0.2;

       Meteorite.dispose();
       Shot.dispose();

    });

    window.addEventListener("resize", function () {
        engine.resize();
    });
   
    var displayState = function() {
        document.getElementById("score").innerHTML = "Score: " + score;
        if (accShip >= MaxaccShip) {
            document.getElementById("speed").innerHTML = "speed: " + Math.floor(MaxaccShip);
        } else {
            document.getElementById("speed").innerHTML = "speed: " + Math.floor(accShip);
        }
    };

    // Lose
    var onLose = function () {
        
       // displayState(); 
        document.getElementById("gameOver").className = "";
        document.getElementById("scoreText").innerHTML = "Score: " + score;

        render = false;

        initialOrientationGamma = 0;
        initialOrientationBeta = 0;
        orientationGamma = 0;
        orientationBeta = 0;
        direction = new BABYLON.Vector3(0, 0, 0);
    };

    
    // Collisions
    var checkCollisions = function () {
        //per fare un lavoro più pulito trovare i limiti in base all'apertura della finestra
        var Uplimit = 3.5;
        var Downlimit = -2;
        var LeftLimit = -6;
        var RightLimit = 6;
        var bump = 0;
            
        if (ball.position.z <= LeftLimit) {
            ball.position.z = LeftLimit+bump;
        }
        if (ball.position.y >= Uplimit) {
            ball.position.y = Uplimit+bump;
        }

        if (ball.position.z >= RightLimit) {
            ball.position.z = RightLimit+bump;
        }

        if (ball.position.y <= Downlimit) {
            ball.position.y = Downlimit+bump;
        }

/*        
        if (BABYLON.Vector3.Distance(ball.position, OGGETTO) < 1.2) {
            onWin();
            return;
        }
*/
        var i = 0;

        for (var i = 0; i < Meteorite.mesh.length; i++) {

            /*
            if (Meteorite.mesh[i].intersectsMesh(ball1, true) && !Meteorite.mesh[i].destroy ){
                Booom(ball1);
                ticklose = 5;
                lose = true;
            }

            if (Meteorite.mesh[i].intersectsMesh(ball2, true) && !Meteorite.mesh[i].destroy ) {
                Booom(ball2);
                ticklose = 5;
                lose = true;
            } 
            */

            if (!lose && Meteorite.mesh[i].intersectsMesh(ball, true) && !Meteorite.mesh[i].destroy) {
                Booom(Meteorite.mesh[i]);
                Booom(ball);
                ball.visibility = 1;
                lose = true;
                //onLose();
            }

            if (!lose) {
                for (var j = 0; j < Shot.Shots.length; j++) {
                    if (Shot.Shots[j].intersectsMesh(Meteorite.mesh[i], true)) {
                        console.log("rilevata collisione con meteorite" + j);

                        Meteorite.mesh[i].destroy = true;
                        Shot.Shots[j].dispose();
                        Shot.Shots.splice(j, 1);
                        score++;

                        console.log("disposing collision successfully" + j);
                    }
                }
            }
            //shooter interactions
        }
     
    };
    
    var keys = [];
    var keysUp = [38];
    var keysDown = [40];
    var keysLeft = [37];
    var keysRight = [39];
    var keysAcc = [65];
    var keysStop = [68];
    var keysFire = [83];
    var direction = new BABYLON.Vector3(0, 0, 0);
 
    var checkInput = function () {
        // Keyboard
        var speed = 0.03;//0.05
        for (var index = 0; index < keys.length; index++) {
            var keyCode = keys[index];

            if (keysLeft.indexOf(keyCode) !== -1) {              
                direction.addInPlace(new BABYLON.Vector3(0, 0, -speed * scale));
            } else if (keysUp.indexOf(keyCode) !== -1) {
                direction.addInPlace(new BABYLON.Vector3(0, +speed * scale, 0));
            } else if (keysRight.indexOf(keyCode) !== -1) {
                direction.addInPlace(new BABYLON.Vector3(0, 0, +speed * scale));
            } else if (keysDown.indexOf(keyCode) !== -1) {
                direction.addInPlace(new BABYLON.Vector3(0, -speed * scale, 0));
            } else if (keysAcc.indexOf(keyCode) !== -1) {
                acceleration = true;
                if (accShip <= MaxaccShip) {
                    accShip += 8;
                }
            } else if (keysStop.indexOf(keyCode) !== -1) {
                accShip = MinaccShip;
            }
        }

        // Orientation
 /*       if (orientationGamma) {
            var z = (initialOrientationBeta - orientationBeta) * 0.05;
            var x = (initialOrientationGamma - orientationGamma) * -0.05;
            direction.addInPlace(new BABYLON.Vector3(0, 0, z * speed * scale));
            direction.addInPlace(new BABYLON.Vector3(x * speed * scale, 0, 0));
        }*/
    };
    var move = function() {
        ball.position.addInPlace(direction);
        //var rotationToApply = BABYLON.Quaternion.RotationYawPitchRoll(0, direction.z * 1.5, -direction.x * 1.5);
        //var rotationToApply = BABYLON.Quaternion.RotationYawPitchRoll(0, direction.z * 0.5 , 0);
        //ball.rotationQuaternion = rotationToApply.multiply(ball.rotationQuaternion);

        var rotationToApply = BABYLON.Quaternion.RotationYawPitchRoll(0, direction.z, 0);
        ball.rotationQuaternion = rotationToApply;

        direction.scaleInPlace(0.95);
    };

    var onKeyDown = function (evt) {
        if (keysStop.indexOf(evt.keyCode) !== -1 ||
            keysAcc.indexOf(evt.keyCode) !== -1 ||
            keysUp.indexOf(evt.keyCode) !== -1 ||
            keysDown.indexOf(evt.keyCode) !== -1 ||
            keysLeft.indexOf(evt.keyCode) !== -1 ||
            keysRight.indexOf(evt.keyCode) !== -1) {
            var index = keys.indexOf(evt.keyCode);

            if (index === -1) {
                keys.push(evt.keyCode);
            }
            evt.preventDefault();
        }

        //controllo push del laser
        if (keysFire.indexOf(evt.keyCode !== -1)) {
            var index = keys.indexOf(evt.keyCode);

            if (index === -1) {
                keys.push(evt.keyCode);
                Shot.create();

            }
            evt.preventDefault;
        }


    };

    var onKeyUp = function (evt) {
  
        if (keysAcc.indexOf(evt.keyCode) !== -1) {
            acceleration = false;

            var index = keys.indexOf(evt.keyCode);
            if (index >= 0) {
                keys.splice(index, 1);
            }
            evt.preventDefault();
        }

        if (keysFire.indexOf(evt.keyCode) !== -1) {
            //inserire interazione per quando sollevi il pulsante fuoco
            
            var index = keys.indexOf(evt.keyCode);
            if (index >= 0) {
                keys.splice(index, 1);
            }
            evt.preventDefault();
        }

        if (keysStop.indexOf(evt.keyCode) !== -1 ||
            keysUp.indexOf(evt.keyCode) !== -1 ||
            keysDown.indexOf(evt.keyCode) !== -1 ||
            keysLeft.indexOf(evt.keyCode) !== -1 ||
            keysRight.indexOf(evt.keyCode) !== -1) {
            var index = keys.indexOf(evt.keyCode);


            if (index >= 0) {
                keys.splice(index, 1);
            }
            evt.preventDefault();
        }
    };

    window.addEventListener("keydown", onKeyDown, false);
    window.addEventListener("keyup", onKeyUp, false);

    //Orientation
    function moveBall(evt) {
        if (!started) {
            return;
        }

        if (!initialOrientationGamma) {
            initialOrientationGamma = evt.gamma;
            initialOrientationBeta = evt.beta;
        }

        orientationGamma = evt.gamma;
        orientationBeta = evt.beta;
    }
    window.addEventListener("deviceorientation", moveBall);

    function detectShake(evt) {
        var accl = evt.acceleration;
        if (accl.x > 1.5 || accl.y > 1.5 || accl.z > 1.5) {
            // Tilt :)
            onLose();
        }
    }
    window.addEventListener("devicemotion", detectShake);

}
