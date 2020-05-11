window.addEventListener("DOMContentLoaded", init);

function init() {
  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#canvas")
  });
  // ウィンドウサイズ設定
  width = document.getElementById("main_canvas").getBoundingClientRect().width;
  height = document.getElementById("main_canvas").getBoundingClientRect().height;
  renderer.setPixelRatio(1);
  renderer.setSize(width, height);
  console.log(window.devicePixelRatio);
  console.log(width + ", " + height);

  // シーンを作成
  const scene = new THREE.Scene();

  // カメラを作成
  camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
  camera.position.set(0, 400, -1000);

  const controls = new THREE.OrbitControls(camera, renderer.domElement);

  // Load GLTF or GLB
  const loader = new THREE.GLTFLoader();
  const buildingUrl = "http://127.0.0.1:8080/wood_anemone/scene.gltf";

  const sidelength = 10;
  for (i=0; i<sidelength; i++) {
  let x = i * 50;
  for (j=0; j<sidelength; j++) {
  let z = j * 50;
  loader.load(
    buildingUrl,
    function(gltf) {
      model = gltf.scene;
      model.scale.set(400.0, 400.0, 400.0);
      model.position.set(x, -400, z);
      scene.add(model);
    },
    function(error) {
      console.log("An error happened");
      console.log(error);
    }
  );
  loader.load(
    buildingUrl,
    function(gltf) {
      model = gltf.scene;
      model.scale.set(400.0, 400.0, 400.0);
      model.position.set(x, -400, -z);
      scene.add(model);
    },
    function(error) {
      console.log("An error happened");
      console.log(error);
    }
  );
  loader.load(
    buildingUrl,
    function(gltf) {
      model = gltf.scene;
      model.scale.set(400.0, 400.0, 400.0);
      model.position.set(-x, -400, z);
      scene.add(model);
    },
    function(error) {
      console.log("An error happened");
      console.log(error);
    }
  );
  loader.load(
    buildingUrl,
    function(gltf) {
      model = gltf.scene;
      model.scale.set(400.0, 400.0, 400.0);
      model.position.set(-x, -400, -z);
      scene.add(model);
    },
    function(error) {
      console.log("An error happened");
      console.log(error);
    }
  );
}}


  const droneUrl = "http://127.0.0.1:8080/drone_mavic_2_pro_modified/scene.gltf";
  let drone;
  // ドローンロード
  loader.load(
    droneUrl,
    function(gltf) {
      drone = gltf.scene;
      // model.name = "model_with_cloth";
      drone.scale.set(400.0, 400.0, 400.0);
      drone.position.set(0, -400, 0);

      console.log(drone);
      scene.add(gltf.scene);
    },
    function(error) {
      console.log("An error happened");
      console.log(error);
    }
  );
  renderer.gammaOutput = true;
  renderer.gammaFactor = 2.2;

  // 平行光源
  const light = new THREE.DirectionalLight(0xffffff);
  light.intensity = 1.5; // 光の強さを倍に
  light.position.set(1, 1, 1);

  // シーンに追加
  scene.add(light);

  // SSEから情報を受け取る
  const evtSource = new EventSource(
    "https://webflux-sse-demo.herokuapp.com/stream-sse",
    { withCredentials: false }
  );
  let sseData;
  evtSource.addEventListener("periodic-event", function(e) {
    sseData = JSON.parse(e.data);
  });

  // 初回実行
  tick();

  function tick() {
    controls.update();

    if (typeof sseData !== "undefined") {
      const x = sseData.time.slice(-2) * 2;
      const y = sseData.time.slice(-2) * 2;
      const z = sseData.time.slice(-2) * 2;
      // const x = sseData.time.slice(-2) * 1;
      // const y = sseData.time.slice(-2) * 2;
      // const z = sseData.time.slice(-2) * 10;
      drone.position.set(x, y, z);
      console.log("x:%d, y:%d, z:%d", x, y, z);
    }

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}
