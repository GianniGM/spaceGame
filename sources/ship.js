
if (BABYLON.Engine.isSupported()) {
    // Ship-----------------------------------------------------------------------------
    var ball = BABYLON.Mesh.CreateSphere("ball", 16, 1.0, scene, false);
    var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(5, 0, 0), scene);

    var bumpMaterial = new BABYLON.StandardMaterial("ballMaterial", scene);
    bumpMaterial.diffuseColor = new BABYLON.Color3(1,1,1);
    bumpMaterial.specularColor = new BABYLON.Color3(1, 1, 0);
    bumpMaterial.bumpTexture = new BABYLON.Texture("textures/ship.jpg", scene);
    ball.material = bumpMaterial;

    //posizione della navetta
    ball.position = new BABYLON.Vector3(5, 0, 0);
    ball.renderingGroupId = 1;
    ball.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(0, 0, 0);

    var lines = BABYLON.Mesh.CreateLines("lines", [
     new BABYLON.Vector3(0, 0, 1),
     new BABYLON.Vector3(0, 0, -1)
    ], scene);
    lines.material = bumpMaterial;
    lines.parent = ball;
    lines.renderingGroupId = 1;

    var ball1 = BABYLON.Mesh.CreateSphere("ball1", 16, 0.4, scene, false);
    var ball2 = BABYLON.Mesh.CreateSphere("ball2", 16, 0.4, scene, false);
    ball1.material = bumpMaterial;
    ball2.material = bumpMaterial;
    ball1.position = new BABYLON.Vector3(0, 0, 1);
    ball2.position = new BABYLON.Vector3(0, 0, -1);
    ball1.renderingGroupId = 1;
    ball2.renderingGroupId = 1;
    ball1.parent = ball;
    ball2.parent = ball;

    var animationScale = new BABYLON.Animation("scale", "scaling", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
    animationScale.setKeys([{ frame: 0, value: new BABYLON.Vector3(1, 1, 1) }, { frame: 20, value: new BABYLON.Vector3(2.0, 2.0, 2.0) },
                            { frame: 40, value: new BABYLON.Vector3(1, 1, 1) }]);

    ball.animations.push(animationScale);

    // viewfinder
    viewfinder1 = new BABYLON.Mesh.CreateTorus("view", 0.45, 0.02, 10, scene, false);
    viewfinder1.position = new BABYLON.Vector3(-5, 0,0);
    viewfinder1.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(1.5, 1.5, 0);
    viewfinder1.parent = ball;
    viewfinder1.renderingGroupId = 1;

    viewfinder2 = new BABYLON.Mesh.CreateTorus("view", 0.40, 0.02, 10, scene, false);
    viewfinder2.position = new BABYLON.Vector3(-5.5, 0, 0);
    viewfinder2.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(1.5, 1.5, 0);
    viewfinder2.parent = ball;
    viewfinder2.renderingGroupId = 1;

    viewfinder3 = new BABYLON.Mesh.CreateTorus("view", 0.35, 0.02, 10, scene, false);
    viewfinder3.position = new BABYLON.Vector3(-6, 0, 0);
    viewfinder3.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(1.5, 1.5, 0);
    viewfinder3.parent = ball;
    viewfinder3.renderingGroupId = 1;

    line1 = new BABYLON.Mesh.CreateLines("linea", [new BABYLON.Vector3(-5, 0, 0), new BABYLON.Vector3(-7, 0, 0)], scene);
    line1.renderingGroupId = 1;
    line1.parent = ball;

    // Ship trails
    var shipTrail0 = new BABYLON.ParticleSystem("particles", 500, scene);
    shipTrail0.particleTexture = new BABYLON.Texture("textures/star.png", scene);
    shipTrail0.minAngularSpeed = -0.5;
    shipTrail0.maxAngularSpeed = 0.5;
    shipTrail0.minLifeTime = 0.5;
    shipTrail0.maxLifeTime = 0.7;
    shipTrail0.minEmitPower = 0.5;
    shipTrail0.maxEmitPower = 1.5;
    shipTrail0.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    shipTrail0.minEmitBox = new BABYLON.Vector3(0.2, 0, 0);
    shipTrail0.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0);
    shipTrail0.direction1 = new BABYLON.Vector3(1, 0, 0);
    shipTrail0.direction2 = new BABYLON.Vector3(1, 0, 0);
    shipTrail0.gravity = new BABYLON.Vector3(accShip, 0, 0);
    //mettere poi l'oggetto della navicella
    shipTrail0.emitter = ball1;
    shipTrail0.renderingGroupId = 1;
    shipTrail0.start();

    var shipTrail1 = new BABYLON.ParticleSystem("particles", 500, scene);
    shipTrail1.particleTexture = new BABYLON.Texture("textures/star.png", scene);
    shipTrail1.minAngularSpeed = -0.5; //-4.5
    shipTrail1.maxAngularSpeed = 0.5; // 4.5
    shipTrail1.minLifeTime = 0.5; //0.5
    shipTrail1.maxLifeTime = 0.7;//0.75
    shipTrail1.minEmitPower = 0.5;//0.5
    shipTrail1.maxEmitPower = 1.5; //3
    shipTrail1.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    shipTrail1.minEmitBox = new BABYLON.Vector3(0.2, 0, 0);
    shipTrail1.maxEmitBox = new BABYLON.Vector3(0.5, 0, 0);
    shipTrail1.direction1 = new BABYLON.Vector3(1, 0, 0);
    shipTrail1.direction2 = new BABYLON.Vector3(1, 0, 0);
//    shipTrail1.gravity = new BABYLON.Vector3(accShip, 0, 0);
    //mettere poi l'oggetto della navicella
    shipTrail1.emitter = ball2;
    shipTrail1.renderingGroupId = 1;
    shipTrail1.start();
    //------------------------------------------------------------------------------------------------

    // Shadows
    var shadowCaster = new BABYLON.ShadowGenerator(1024, light);
    light.position = new BABYLON.Vector3(-4, 14, -12.5);
    shadowCaster.useVarianceShadowMap = true;
    shadowCaster.getShadowMap().renderList.push(ball);


    // Skybox background
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 1400, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    // Starfield particles
    var starfield = new BABYLON.ParticleSystem("particles", 2000, scene);
    starfield.particleTexture = new BABYLON.Texture("textures/star.png", scene);
    starfield.minAngularSpeed = -4.5;
    starfield.maxAngularSpeed = 4.5;
    starfield.minSize = 0.5;
    starfield.maxSize = 2.0;
    starfield.minLifeTime = 0.5;
    starfield.maxLifeTime = 2.0;
    starfield.minEmitPower = 0.5;
    starfield.maxEmitPower = 2.0;
    starfield.emitRate = 3000;
    starfield.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    starfield.minEmitBox = new BABYLON.Vector3(0, -50, -50);
    starfield.maxEmitBox = new BABYLON.Vector3(0, 50, 50);
    starfield.direction1 = new BABYLON.Vector3(0, 1, 0);
    starfield.direction2 = new BABYLON.Vector3(0, 1, 0);
    starfield.color1 = new BABYLON.Color4(0, 0, 0, 1);
    starfield.color2 = new BABYLON.Color4(1, 1, 1, 1);
    starfield.gravity = new BABYLON.Vector3(accShip, 0, 0);
    starfield.emitter = new BABYLON.Vector3(-10, 0, 0);
    starfield.start();


}