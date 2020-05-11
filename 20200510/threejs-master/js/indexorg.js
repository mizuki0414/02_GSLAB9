window.addEventListener('DOMContentLoaded', init);
function init() {
    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#canvas')
    });
    // ウィンドウサイズ設定
    width = document.getElementById('main_canvas').getBoundingClientRect().width;
    height = document.getElementById('main_canvas').getBoundingClientRect().height;
    renderer.setPixelRatio(1);
    renderer.setSize(width, height);
    console.log(window.devicePixelRatio);
    console.log(width+", "+height);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 400, -1000);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    //camera.lookAt(new THREE.Vector3(0, 400, 0));

    // Load GLTF or GLB
    const loader = new THREE.GLTFLoader();
    const url = 'http://localhost:8080/building.glb';

    let model = null;
    loader.load(
        url,
        function ( gltf ){
            model = gltf.scene;
            model.name = "model_with_cloth";
            model.scale.set(400.0, 400.0, 400.0);
            model.position.set(0,-400,0);
            scene.add( gltf.scene );

            model["test"] = 100;
            console.log("model");
        },
        function ( error ) {
            console.log( 'An error happened' );
            console.log( error );
        }
    );
    renderer.gammaOutput = true;
    renderer.gammaFactor = 2.2;


    // 平行光源
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 2; // 光の強さを倍に
    light.position.set(1, 1, 1);
    // シーンに追加
    scene.add(light);

    // 初回実行
    tick();
    function tick() {
        controls.update();

        scene.traverse(function(obj) {
            if(obj.name == "J_Bip_C_Chest"){
                obj.rotation.z += 2 /180*3.1415;
            }
        });
        if (model != null){
            console.log(model);
        }
        renderer.render(scene, camera);
        requestAnimationFrame(tick);
    }


    // 初期化のために実行
    onResize();
    // リサイズイベント発生時に実行
    window.addEventListener('resize', onResize);
    function onResize() {
        // サイズを取得
        width = document.getElementById('main_canvas').getBoundingClientRect().width;
        height = document.getElementById('main_canvas').getBoundingClientRect().height;

        // レンダラーのサイズを調整する
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        // カメラのアスペクト比を正す
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        console.log(width);
    }
}