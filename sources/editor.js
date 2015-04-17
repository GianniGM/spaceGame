if (BABYLON.Engine.isSupported()) {
    var plan = null;
    var plan2 = null;
    var plan3 = null;
    var m0 = null, m1 = null, m2 = null, m3 = null, m4 = null, m5 = null;
    var choosen = new Array();

    //se non è diverso da play() questa funzione va eliminata
    var PlayEdited = function () {
        started = true;
        document.getElementById("Editor").className = "hidden";
        document.getElementById("HUB").className = "";
        plan.dispose();
        plan2.dispose();
        plan3.dispose();
        plan = null;
        plan2 = null;
        plan3 = null;
        m0.destroy = true;
        m1.destroy = true;
        m2.destroy = true;
        m3.destroy = true;
        m4.destroy = true;
        m5.destroy = true;
    }

    var editormode = function()  {
        //costruire qui dentro tutto l'editor di livello...

        console.log("entrato nell'editormode");

        Meteorite.create(new BABYLON.Vector3(0, 2, 7), 0);
        Meteorite.create(new BABYLON.Vector3(0, 0, 7), 1);
        Meteorite.create(new BABYLON.Vector3(0, -2, 7), 2);
        Meteorite.create(new BABYLON.Vector3(0, 2, -7), 3);
        Meteorite.create(new BABYLON.Vector3(0, 0, -7), 4);
        Meteorite.create(new BABYLON.Vector3(0, -2, -7), 5);

        var material = new BABYLON.StandardMaterial("groundmaterial", scene);
        material.diffuseTexture = new BABYLON.Texture("textures/ground.jpg", scene);
        var material2 = new BABYLON.StandardMaterial("groundmaterial", scene);
        material2.diffuseTexture = new BABYLON.Texture("textures/ground.jpg", scene);
        material2.diffuseColor = new BABYLON.Color4(1, 0, 0, 1);

        m0 = Meteorite.mesh[0];
        m1 = Meteorite.mesh[1];
        m2 = Meteorite.mesh[2];
        m3 = Meteorite.mesh[3];
        m4 = Meteorite.mesh[4];
        m5 = Meteorite.mesh[5];

        plan = BABYLON.Mesh.CreateGround("ground", 3, 7, 2, scene);
        plan.position = new BABYLON.Vector3(-1, 0, 7.5);
        plan.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(1.7, 1.5, 0);
        plan.material = material;

        plan2 = BABYLON.Mesh.CreateGround("ground2", 3, 7, 2, scene);
        plan2.position = new BABYLON.Vector3(-1, 0, -7.5);
        plan2.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(1.3, 1.5, 0);
        plan2.material = material;

        plan3 = BABYLON.Mesh.CreateGround("ground2", 11.5, 4, 7, scene);
        plan3.position = new BABYLON.Vector3(-1.5, 1.3, 0);
        plan3.rotationQuaternion = BABYLON.Quaternion.RotationYawPitchRoll(1.6, 1.5, 0);
        plan3.material = material2;

        var pickedMesh = null;
        var startingPoint;

        // Add event listener
        window.addEventListener("mousedown", function (evt) {
            //mousedown = true;

            var pickinfo = scene.pick(evt.clientX, evt.clientY, function (mesh) { return mesh == m0 || mesh == m1 || mesh == m2 || mesh == m3 || mesh == m4 || mesh == m5 }, null, camera);
            if (pickinfo.hit) {
                console.log("beccato!!");
                startingPoint = pickinfo.pickedPoint;
                pickedMesh = pickinfo.pickedMesh;
            }

        });

        window.addEventListener("mousemove", function (evt) {
            //if ((pickedMesh == m0 || pickedMesh == m1 || pickedMesh == m2) && mousedown) {
            var pick = scene.pick(evt.clientX, evt.clientY, function (mesh) { return mesh == m0 || mesh == m1 || mesh == m2 || mesh == m3 || mesh == m4 || mesh == m5 }, null, camera);

            if (!startingPoint) {
                return;
            }

            var current = pick.pickedPoint;

            if (!current) {
                return;
            }

            if (pickedMesh != null) {
                var diff = current.subtract(startingPoint);
                pickedMesh.position.addInPlace(diff);
                pickedMesh.position.x = 0.5;
                startingPoint = current;

            }
            //pickedMesh.position = new BABYLON.Vector3(0.50, -evt.clientY * 0.0004, evt.clientX * 0.0018);


        });

        window.addEventListener("mouseup", function (evt) {
            var pick = scene.pick(evt.clientX, evt.clientY, function (mesh) { return mesh == m0 || mesh == m1 || mesh == m2 || mesh == m3 || mesh == m4 || mesh == m5 }, null, camera);

            if (pickedMesh != null) {
                if (pick.pickedPoint.y > -5 && pick.pickedPoint.y < 5) {
                    //aggiungi
                    choosen.push(pickedMesh.type);
                } else {
                    choosen.splice(pickedMesh.type);
                }
                pickedMesh = null;
            }

        });
       
    //fine funzione editor mode
    }
}