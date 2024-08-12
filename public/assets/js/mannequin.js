const renderMannequin = (shirtHeightValue, shoulderValue, handValue, collarValue, chestValue, stomachValue, hipValue) => {
  const canvas = document.getElementById('mannequinCanvas');
  const engine = new BABYLON.Engine(canvas, true);
  engine.enableOfflineSupport = false;
  const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.98, 0.98, 0.98);

    const camera = new BABYLON.ArcRotateCamera('arcCamera', -Math.PI, Math.PI, 32, new BABYLON.Vector3(0, 10, 0), scene);
    camera.lowerRadiusLimit = 30;
    camera.upperRadiusLimit = 40;
    camera.lowerBetaLimit = Math.PI / 3.05;
    camera.upperBetaLimit = Math.PI / 2.20;
    camera.attachControl(canvas, true);

    const hemisphericLight = new BABYLON.HemisphericLight('hemisphericLight', BABYLON.Vector3.Up(), scene);
    hemisphericLight.intensity = 0.7;
    hemisphericLight.direction = BABYLON.Vector3.Up();

    const ground = BABYLON.MeshBuilder.CreateGround('mannequinBase', { width: 20, height: 20, subdivsions: 2 }, scene);

    const mannequin = BABYLON.SceneLoader.ImportMesh('', '/assets/res/', 'maleMannequin.obj', scene, (meshes) => {
    });

    function drawText(x, y, z, value) {
      const outputplane = BABYLON.Mesh.CreatePlane('outputplane', 2, scene, false);
      outputplane.billboardMode = BABYLON.AbstractMesh.BILLBOARDMODE_ALL;
      outputplane.material = new BABYLON.StandardMaterial('outputplane', scene);
      outputplane.position = new BABYLON.Vector3(x, y, z);
      outputplane.scaling.y = 0.7;

      const outputplaneTexture = new BABYLON.DynamicTexture('dynamic texture', 512, scene, true);
      outputplane.material.diffuseTexture = outputplaneTexture;
      outputplane.material.specularColor = new BABYLON.Color3(1, 1, 1);
      outputplane.material.emissiveColor = new BABYLON.Color3(1, 1, 1);
      outputplane.material.backFaceCulling = false;

      outputplaneTexture.getContext().clearRect(0, 140, 512, 512);
      outputplaneTexture.drawText(value.toString(), null, 140, 'bold 180px verdana', 'black');
      outputplaneTexture.hasAlpha = true;
    }

    function drawEndPointBalls(x1, y1, z1, x2, y2, z2) {
      const sphere1 = BABYLON.Mesh.CreateSphere('sphere', 1, 1, scene);
      sphere1.position.x = x1;
      sphere1.position.y = y1;
      sphere1.position.z = z1;
      sphere1.scaling.x = 0.5;
      sphere1.scaling.y = 0.5;
      sphere1.scaling.z = 0.5;

      const sphere2 = BABYLON.Mesh.CreateSphere('sphere', 1, 1, scene);
      sphere2.position.x = x2;
      sphere2.position.y = y2;
      sphere2.position.z = z2;
      sphere2.scaling.x = 0.5;
      sphere2.scaling.y = 0.5;
      sphere2.scaling.z = 0.5;
    }

    /* Shirt Height starts */
    const shirtHeightEndPoints = [
      new BABYLON.Vector3(-7.8, 10, -0.7),
      new BABYLON.Vector3(-7.5, 17.2, -0.7),
    ];

    const shirtHeightLine = BABYLON.MeshBuilder.CreateLines('lines', { points: shirtHeightEndPoints }, scene);
    shirtHeightLine.enableEdgesRendering();
    shirtHeightLine.edgesWidth = 8.0;
    shirtHeightLine.edgesColor = new BABYLON.Color4(0, 0, 0, 1);

    drawText(-8.20, 14, -0.7, shirtHeightValue);
    drawEndPointBalls(-7.8, 10, -0.7, -7.5, 17.2, -0.7);
    /* Shirt Height ends */

    /* Hand Length starts */
    const handLengthEndPoints = [
      new BABYLON.Vector3(-5.9, 12, -0.7),
      new BABYLON.Vector3(-3.1, 17.2, -0.7),
    ];

    const handLengthLine = BABYLON.MeshBuilder.CreateLines('lines', { points: handLengthEndPoints }, scene);
    handLengthLine.enableEdgesRendering();
    handLengthLine.edgesWidth = 12.0;
    handLengthLine.edgesColor = new BABYLON.Color4(0, 0, 0, 1);

    drawText(-5.3, 14.2, -0.7, handValue);
    drawEndPointBalls(-5.9, 12, -0.7, -3.1, 17.2, -0.7);
    /* Hand Length ends */

    /* Shoulder Length starts */
    const shoulderBezier = BABYLON.Curve3.CreateQuadraticBezier(new BABYLON.Vector3(2.6, 17.4, -0.7), new BABYLON.Vector3(0, 17.4, -3.4), new BABYLON.Vector3(-2.6, 17.4, -0.7), 30);

    const shoulderBezierCurve = BABYLON.Mesh.CreateLines('shoulderBezier', shoulderBezier.getPoints(), scene);
    shoulderBezierCurve.color = new BABYLON.Color3(0, 0, 0);

    drawText(0, 17.4, -2, shoulderValue);
    drawEndPointBalls(2.6, 17.4, -0.7, -2.6, 17.4, -0.7);
    /* Shoulder Length ends */

    /* Neck Length starts */
    const neckBezier = BABYLON.Curve3.CreateQuadraticBezier(new BABYLON.Vector3(1.1, 17.4, 0.3), new BABYLON.Vector3(0, 17.4, 1.3), new BABYLON.Vector3(-1.1, 17.4, 0.3), 30);

    const neckBezierCurve = BABYLON.Mesh.CreateLines('neckBezier', neckBezier.getPoints(), scene);
    neckBezierCurve.color = new BABYLON.Color3(0, 0, 0);

    drawText(0, 16.5, 1.5, collarValue);
    drawEndPointBalls(1.1, 17.4, 0.3, -1.1, 17.4, 0.3);
    /* Neck Length ends */

    /* Chest Length starts */
    const chestBezier = BABYLON.Curve3.CreateQuadraticBezier(new BABYLON.Vector3(0, 15.05, 1.5), new BABYLON.Vector3(-1.2, 15.05, 2.1), new BABYLON.Vector3(-2.3, 15.05, 0.2), 30);

    const chestBezierCurve = BABYLON.Mesh.CreateLines('chestBezier', chestBezier.getPoints(), scene);
    chestBezierCurve.color = new BABYLON.Color3(0, 0, 0);

    drawText(-1.1, 14.7, 1.9, chestValue);
    drawEndPointBalls(0.05, 15.05, 1.5, -2.3, 15.05, 0.2);
    /* Chest Length ends */

    /* Hip Length starts */
    const hipBezier = BABYLON.Curve3.CreateQuadraticBezier(new BABYLON.Vector3(0, 12.7, 1.5), new BABYLON.Vector3(-1.2, 12.7, 2.1), new BABYLON.Vector3(-2, 12.7, 0), 30);

    const hipBezierCurve = BABYLON.Mesh.CreateLines('hipBezier', hipBezier.getPoints(), scene);
    hipBezierCurve.color = new BABYLON.Color3(0, 0, 0);

    drawText(-1.1, 12.7, 1.7, hipValue);
    drawEndPointBalls(0, 12.7, 1.5, -2, 12.7, 0);
    /* Hip Length ends */

    /* Stomach Length starts */
    const stomachBezier = BABYLON.Curve3.CreateQuadraticBezier(new BABYLON.Vector3(0, 11.4, 1.5), new BABYLON.Vector3(-1, 11.4, 2.1), new BABYLON.Vector3(-1.9, 11.4, 0.2), 30);

    const stomachBezierCurve = BABYLON.Mesh.CreateLines('stomachBezier', stomachBezier.getPoints(), scene);
    stomachBezierCurve.color = new BABYLON.Color3(0, 0, 0);

    drawText(-1, 11.2, 1.5, stomachValue);
    drawEndPointBalls(0, 11.4, 1.5, -1.9, 11.4, 0.2);
    /* Stomach Length ends */

    return scene;
  };

  const scene = createScene();
  engine.runRenderLoop(() => {
    scene.render();
  });
};
