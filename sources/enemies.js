var enemyDirection;
var Meteorite = {};
Meteorite.mesh = new Array();
var newMeteorite;
var nMeteoriti = 0;
var ticks = 2;

Meteorite.create = function (InitPos, type) {

    //var light = new BABYLON.PointLight("metlight", InitPos, scene);
    var material = new BABYLON.StandardMaterial("polyMaterial", scene);

    var meTrail = new BABYLON.ParticleSystem("particles", 500, scene);
    meTrail.particleTexture = new BABYLON.Texture("textures/star.png", scene);
    meTrail.minAngularSpeed = -4.5;
    meTrail.maxAngularSpeed = 4.5;
    meTrail.minSize = 0.5;
    meTrail.maxSize = 2;
    meTrail.minLifeTime = 0.5;
    meTrail.maxLifeTime = 1.0;
    meTrail.minEmitPower = 0.5;
    meTrail.maxEmitPower = 1.0;
    meTrail.emitRate = 20;
    meTrail.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
    meTrail.minEmitBox = new BABYLON.Vector3(0, 0, 0);
    meTrail.maxEmitBox = new BABYLON.Vector3(0, 0, 0);
    meTrail.direction1 = new BABYLON.Vector3(0, 0, 0);
    meTrail.direction2 = new BABYLON.Vector3(0, 0, 0);

    if (type == 0) {
        //palla
        newMeteorite = BABYLON.Mesh.CreateSphere("roundMeth", 16, 1.1, scene, false);
        newMeteorite.speed = 400;//800

        material.diffuseTexture = new BABYLON.Texture("textures/M1.jpg", scene);

        material.diffuseColor = new BABYLON.Color3(1, 0.84, 0, 0.04);
        material.emissiveColor = new BABYLON.Color3(0, 1, 0);

        meTrail.minSize = 1.5;
        meTrail.maxSize = 2;
        meTrail.color1 = new BABYLON.Color4(0.72, 0.525, 0.07);
        meTrail.color2 = new BABYLON.Color3(1, 0, 0);
        meTrail.gravity = new BABYLON.Vector3(-accShip, 0, 0);
        meTrail.emitter = newMeteorite;
        meTrail.start();

    } else if (type == 1) {
        //palla più piccola
        newMeteorite = BABYLON.Mesh.CreateSphere("CylinderMeth", 5, 1, scene);//, false);
        newMeteorite.speed = 300; //600

        material.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
        material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
        material.alpha = 0.2;
        material.specularPower = 16;

        // Fresnel
        material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
        material.reflectionFresnelParameters.bias = 0.1;

        material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
        material.emissiveFresnelParameters.bias = 0.6;
        material.emissiveFresnelParameters.power = 4;
        material.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
        material.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

        material.opacityFresnelParameters = new BABYLON.FresnelParameters();
        material.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
        material.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

        meTrail.minSize = 1;
        meTrail.maxSize = 2;
        meTrail.color2 = new BABYLON.Color3(1,1, 1);
        meTrail.color1 = new BABYLON.Color3(1, 1, 0); 
        meTrail.gravity = new BABYLON.Vector3(-accShip, 0, 0);
        meTrail.emitter = newMeteorite;
        meTrail.start();

    } else if(type == 2) {
        //cubo
        newMeteorite = BABYLON.Mesh.CreateBox("BoxMeth", 0.8, scene);
        newMeteorite.speed = 200;//400
        material.diffuseTexture = new BABYLON.Texture("textures/M3.jpg", scene);
        material.diffuseColor = new BABYLON.Color3(1, 0, 0);
        material.emissiveColor = new BABYLON.Color3(0, 1, 0);

    }  else if(type == 3) {
        //anello
        newMeteorite = BABYLON.Mesh.CreateTorus("torus", 1, 0.5, 20, scene, false);
        newMeteorite.speed = 200;//400
        newMeteorite.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(1.5, 1.5, 0);

        material.diffuseTexture = new BABYLON.Texture("textures/M4.png", scene);


    } else if (type == 4) {
        //pianetino
        newMeteorite = BABYLON.Mesh.CreateSphere("planet", 16, 0.8, scene);
        round = BABYLON.Mesh.CreateTorus("torus", 1.5, 0.03, 20, scene);
        round.position = new BABYLON.Vector3(0, 0, 0);
        round.parent = newMeteorite;
        round.renderingGroupId = 1;
        newMeteorite.speed = 200;//400

        material.diffuseTexture = new BABYLON.Texture("textures/M2.jpg", scene);
        material.emissiveColor = new BABYLON.Color3(0, 0, 0);

        meTrail.color2 = new BABYLON.Color3(1, 1, 1);
        meTrail.color1 = new BABYLON.Color3(1, 0.2, 0);
        meTrail.gravity = new BABYLON.Vector3(-accShip, 0, 0);
        meTrail.emitter = newMeteorite;
        meTrail.start();

    } else if(type == 5) {
        //poligono
        newMeteorite = BABYLON.Mesh.CreateCylinder("cylinder", 1, 1, 1, 6, 1, scene);
        newMeteorite.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(1.5, 1.5, 0);
        newMeteorite.speed = 200;//400
        material.diffuseTexture = new BABYLON.Texture("textures/M1.jpg", scene);
        material.diffuseColor = new BABYLON.Color3(0, 1, 0);

        //material.emissiveColor = new BABYLON.Color3(0, 0, 0);
        meTrail.gravity = new BABYLON.Vector3(-accShip, 0, 0);
        meTrail.emitter = newMeteorite;
        meTrail.start();

    }


    newMeteorite.material = material;

    //posizione del meteorite
    newMeteorite.position = InitPos;
    newMeteorite.type = type;
    newMeteorite.renderingGroupId = 1;
    newMeteorite.Destroy = false;
    newMeteorite.tickDestroy=ticks;

    Meteorite.mesh.push(newMeteorite);

    nMeteoriti++;

};

Meteorite.move = function () {
    //var IncrPos = new BABYLON.Vector3(0.2, 0, 0);
    x = (x > 100) ? 0 : x;
    var rotationToApply = BABYLON.Quaternion.RotationYawPitchRoll(3, x / 2, x / 3);

    for (var i = 0; i < Meteorite.mesh.length; i++) {
        Meteorite.mesh[i].rotationQuaternion = rotationToApply;
        var step = Math.floor((Math.random() * 200) + 0); //(400, 100)
        Meteorite.mesh[i].position.addInPlace(new BABYLON.Vector3(((accShip + Meteorite.mesh[i].speed + step) / 1500), 0, 0));
    }



    direction.scaleInPlace(0.95);

};


//dispose quando il meteorite va fuori la visuale
Meteorite.dispose = function () {

    for (var i = 0; i < Meteorite.mesh.length; i++) {
        //quando il meteorite è fuori dalla visuale fare una dispose
        if (Meteorite.mesh[i].position.x > 15) {
            Meteorite.mesh[i].dispose();
            Meteorite.mesh.splice(i, 1);
            console.log("dispose, limite superato");
        }
    }
};

//distruzione del meteorite alla collisione con un proiettile
Meteorite.Destroy= function (){
    for(var i = 0; i< Meteorite.mesh.length; i++){
        if(Meteorite.mesh[i].destroy){ 
            if (Meteorite.mesh[i].tickDestroy < ticks) {
                if (Meteorite.mesh[i].tickDestroy <= 0) {
                    Meteorite.mesh[i].dispose();
                    Meteorite.mesh.splice(i, 1);
                } else {
                    (Meteorite.mesh[i].tickDestroy)--;
                }
            } else {
                // il meteorite è stato appena colpito.
                //sostituisco il meteorite colpito con l'animazione
                //di esplosione
                Booom(Meteorite.mesh[i]);
                Meteorite.mesh[i].tickDestroy = ticks - 1;
            }
        }
    }
}

var SpawnEnemy = function () {
    var SpawSquare = {};
    var SpawnX = -80;

    SpawSquare.minZ = -6;
    SpawSquare.maxZ = 6;
    SpawSquare.minY = -2;
    SpawSquare.maxY = 3.5;

    var z = Math.random() * (SpawSquare.maxZ - SpawSquare.minZ) + SpawSquare.minZ;
    var y = Math.random() * (SpawSquare.maxY - SpawSquare.minY) + SpawSquare.minY;
    var type = Math.floor((Math.random() * choosen.length));
    //random per numero di elementi nella struttura dati del prescelto, l'i-esimo tipo nell'array va messo invece del 3

    
    Meteorite.create(new BABYLON.Vector3(SpawnX, y, z), choosen[type] );
}

/* to do:
Migliorare la comparsa dei nemici
inventarsi un editor di livello
migliorare il timer
sistemare l'asse z dei meteoriti rispetto al mirino(rendergroup 2);
animazione collisioni
accelerazione incrementale al timer (accmin al posto del valore 5)
forse è meglio fare i controlli con il mouse
e usare wasd

controlli:
w su
a sinistra
s giù
d destra

barra accelerazione
tasto sinistro fuoco
mirino (cerchietto) mouse


*/