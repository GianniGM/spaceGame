var canvas = document.getElementById("renderCanvas");
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

var reload = function () {
    location.reload();
}



if (BABYLON.Engine.isSupported()) {
    var score = 0;
    var speed = 0.01;
    var scale = 1;
    var alpha;
    var choosen;

    //var editormode = false;
    //document.getElementById("Menu").className = "hidden";

    var orientationGamma = 0;
    var orientationBeta = 0;
    var initialOrientationGamma = 0;
    var initialOrientationBeta = 0;

    var engine = new BABYLON.Engine(canvas, true);
    var scene = new BABYLON.Scene(engine); //pi / 2.3
    //var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(-15,-10, 5), scene);
    var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(0, -10, 5), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, Math.PI /2.3, 12, new BABYLON.Vector3(0,0,0), scene);


    // ArcRotateCamera >> Camera rotating around a 3D point (here Vector zero)
    // Parameters : name, alpha, beta, radius, target, scene
    // var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
    //camera.setPosition(new BABYLON.Vector3(, 0, 0));

    var PlayGame = function () {
        document.getElementById("Menu").className = "hidden";
        document.getElementById("HUB").className = "";
        choosen = new Array();
        choosen.push(1);
        choosen.push(0);
        choosen.push(4);
        started = true;
    }

    var EditLevel = function () {
        //        editormode = true;
        choosen = new Array();
        started = false;
        document.getElementById("Menu").className = "hidden";
        document.getElementById("Editor").className = "";
        document.getElementById("HUB").className = "hidden";
        editormode();
    }

    var Return = function () {
        //editormode = false;

        document.getElementById("Menu").className = "";
        document.getElementById("Editor").className = "hidden";
        if (plan != null) {
            plan.dispose();
            plan2.dispose();
            plan3.dispose();
            Meteorite.mesh = new Array();
            m0.dispose();
            m1.dispose();
            m2.dispose();
            m3.dispose();
            m4.dispose();
            m5.dispose();
            plan = null;
            plan2 = null;
            plan3 = null;
            m0 = null;
            m1 = null;
            m2 = null;
            m3 = null;
            m4 = null;
            m5 = null;
            choosen = null;

        }
    }

    var MaxaccShip = 3000;
    var accShip = 5;
    var MinaccShip = 5;

    //debugging
    //camera.attachControl(canvas, false);

    scene.activeCamera = camera;
    // scene.clearColor = new BABYLON.Color3(255, 255, 0);

    alpha = camera.alpha;

}