if (BABYLON.Engine.isSupported()) {

    var Shot = {};
    Shot.Shots = new Array();
    Shot.create = function () {

        var ShooterBall = BABYLON.Mesh.CreateSphere("Sphere3", 32, 0.4, scene);//0.5
        ShooterBall.position = new BABYLON.Vector3(4, ball.position.y, ball.position.z);
        ShooterBall.renderingGroupId = 1;

        // Sphere3 material
        material = new BABYLON.StandardMaterial("kosh3", scene);
        material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        material.emissiveColor = BABYLON.Color3.White();
        material.specularPower = 64;
        material.alpha = 0.2;

        // Fresnel Shader
        material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
        material.emissiveFresnelParameters.bias = 0.2;
        material.emissiveFresnelParameters.leftColor = BABYLON.Color3.Yellow();
        material.emissiveFresnelParameters.rightColor = new BABYLON.Color3.Red();

        material.opacityFresnelParameters = new BABYLON.FresnelParameters();
        material.opacityFresnelParameters.power = 4;
        material.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
        material.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();

        ShooterBall.material = material;
        Shot.Shots.push(ShooterBall);
        console.log("creato sparo");
    }

    Shot.move = function () {
        for (var i = 0; i < Shot.Shots.length; i++) {
            Shot.Shots[i].position.addInPlace(new BABYLON.Vector3(-1, 0, 0));
        }
    }

    Shot.dispose = function () {

        for (var i = 0; i < Shot.Shots.length; i++) {
            //quando il meteorite è fuori dalla visuale fare una dispose
            if (Shot.Shots[i].position.x < -80) {
                Shot.Shots[i].dispose();
                Shot.Shots.splice(i, 1);
                console.log("shot disposed");
            }
        }
    };
}