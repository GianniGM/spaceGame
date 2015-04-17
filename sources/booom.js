

var Booom = function (fountain) {
    /*
    var scene = new BABYLON.Scene(engine);
           
    var fountain = new BABYLON.Mesh.CreateBox("fountain", 0.01, scene, false);
    fountain.position = position;
    */

    // Create a particle system

    fountain.visibility = 0;
    var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
        
    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
        
    // Where the particles come from
    particleSystem.emitter = fountain; // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0); // To...
        
    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(1, 0, 0, 0);
    particleSystem.color2 = new BABYLON.Color4(1, 0.5, 0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(1, 0, 0, 0.0);
        
    // Size of each particle (random between...
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.3;//0.5
        
    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 1.5;
        
    // Emission rate
    particleSystem.emitRate = 1500;
        
    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
        
    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);
        
    // Direction of each particle after it has been emitted
    /*
    particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
    particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);
     */
    particleSystem.direction1 = new BABYLON.Vector3(-7 , -1, 3);
    particleSystem.direction2 = new BABYLON.Vector3(7, 1, -3);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed =  Math.PI;
        
    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.005;
        
    // Start the particle system
    particleSystem.renderingGroupId = 1;
    particleSystem.start();
        
    // Fountain's animation
    var keys = [];
    var animation = new BABYLON.Animation("animation", "rotation.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT,
                                                                    BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    // At the animation key 0, the value of scaling is "1"

    keys.push({
        frame: 0,
        value: 0
    });
        
    // At the animation key 50, the value of scaling is "0.2"
    keys.push({
        frame: 50,
        value: Math.PI
    });
        
    // At the animation key 100, the value of scaling is "1"
    keys.push({
        frame: 100,
        value: 2 * Math.PI
    });
       
    // Launch animation
    animation.setKeys(keys);
    fountain.animations.push(animation);
}



