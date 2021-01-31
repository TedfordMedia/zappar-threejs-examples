// IMPORTS //// IMPORTS //// IMPORTS //// IMPORTS //// IMPORTS //  
import { GLTFLoader } from '../jsm/loaders/GLTFLoader.js'; 
import * as THREE from '../build/three.module.js';  
import { TWEEN } from '../jsm/libs/tween.module.min.js';
//import { OrbitControls } from './jsm/controls/OrbitControls.js';  
// IMPORTS //// IMPORTS //// IMPORTS //// IMPORTS //// IMPORTS // 
 

var masterTools = function (xprefix) {   
    this.prefix = ''; 
    this.hasBorder = true;
    this.meetingID = '';
    this.message = '';
    this.currentMeetingID = '';
    this.isBroadcasting = false; 
    this.xscenesarray = [];
    this.spitSpeed = 28;
    this.spitVol = 200;
    this.rolloffFactor = 2;
    this.sceneToAddTo = false;
    this.renderer;
    this.gloader = new GLTFLoader();
    this.tloader = new THREE.TextureLoader; 
    this.logoModelFileList = []; 
    this.objectFolder = '';
    this.mixers = [];  
    //this.manager = new ZapparThree.LoadingManager();
    this.camera;
    this.rotators = [];   
    this.controllers = [];
    this.controls; 
    this.scene = '';
    this.trackerGroups = [];
    this.campaignID = 'defaltdarademoorange';//what to use ? tbc
    let xthis = this; 

    this.guiData = {   
        usersGPS: false, 
        addX: "0",
        addY: "0",
        addZ: "20"
    };
    this.addAnImageTrackerAndGroup = function (){

    }
    this.loadGLTFmodel = function (modelUrl, xxscaleaa, myParams, xcallback){
        var material;
        var rotateY;
        var rotateX;
        var xthis = this;
 
        //use the material if received in myParams
        if (myParams){
            if (myParams.material){
                material = myParams.material;
            }
            if (myParams.rotateY){
                rotateY = myParams.rotateY; 
            }
            if (myParams.rotateX){
                rotateX = myParams.rotateX; 
            }
         
        } else {
            alert('severe error ! 7765A')
        }
        console.log('work in progress:'+modelUrl);
        var xthis = this;

        if (!myParams.addToThisObject){
            alert('System debugS!  addToThisObject hasnt been set ')
        } else {
            xthis.sceneToAddTo = myParams.addToThisObject;
        }
        
        this.gloader.load(
            // resource URL
            modelUrl,
            // called when the resource is loaded
            function ( gltf ) { 
                var cnt = 0;
                // gltf.scene.traverse( function( node ) { 
                //     if ( node.isMesh ) { 
                //         cnt++;
                //       //  console.log('mesh'+cnt+' name: '+node.name);
                //         if (material){
                //             node.material = material;
                //         }
                //         if (node.name == 'sfda'){

                //         }
                //         if (myParams.showMetal){ 
                //             var metalMaterial = new THREE.MeshStandardMaterial( {
                //                 metalness: 1,   // between 0 and 1
                //                 roughness: 0.5, // between 0 and 1
                //                 envMap: myParams.envMap,
                //             } );
                //             node.material = metalMaterial;

                //           //  node.material.metalness = 1;
                //           //  node.material.envMap = myParams.envMap;
                //         }
           
                //         node.castShadow = true;  
                //         node.material.side = THREE.DoubleSide;  
                //     } 
                // });
         
                gltf.scene.scale.set(xxscaleaa, xxscaleaa, xxscaleaa);   
                xthis.sceneToAddTo.add( gltf.scene ); 
                if (myParams.rotatorX){
                    xthis.rotators.push(gltf.scene)
                }
                if (myParams.rotateX){ 
                    gltf.scene.rotation.x = myParams.rotateX;
                }
                if (myParams.rotateZ){ 
                    gltf.scene.rotation.z = myParams.rotateZ;
                }
                if (myParams.posX){ 
                    gltf.scene.position.x = myParams.posX;
                }
                if (myParams.posY){ 
                    gltf.scene.position.y = myParams.posY;
                }
                if (myParams.posZ){ 
                    gltf.scene.position.z = myParams.posZ;
                } 
                if (rotateY){
                    gltf.scene.rotation.y = rotateY;
                }
                if(xcallback){
                    xcallback(gltf.scene, modelUrl);
                }
                return 	 gltf.scene;
            },

            // called while loading is progressing
            function ( xhr ) {
        
                console.log(modelUrl+' '+ ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        
            },
            // called when loading has errors
            function ( error ) { 
                console.log( 'An error happened'+error );
                console.dir(error)
        
            }
        );
    }
    this.addThisActionToMixers = function (xmesh, actnum, xgltf){
        var mixer = new THREE.AnimationMixer( xmesh ); 
        var action = mixer.clipAction(xgltf.animations[actnum]);
        action.stop();//ensure starts at beginning
        action.play();
        action.setLoop( THREE.LoopOnce );
        xthis.mixers.push( mixer ); 
    }
    this.doRenderingMixersStuff = function (clock){
        var delta = clock.getDelta();
 
        for ( var i = 0; i < xthis.mixers.length; ++ i ) { 
          xthis.mixers[ i ].update( delta );
        }
    }
    this.daraLoadGLTFmodel = function (modelUrl, xxscaleaa, myParams, xcallback){
        var xthis = this;
        var xLoaderGltf = xthis.gloader;
        var material;
        var rotateY;
        var rotateX;
        var xthis = this;
        console.log('unfinisjhed');

        xthis.gloader.load(modelUrl, function ( gltf ) { 
            var model = gltf.scene;
            var mesh = gltf.scene.children[ 0 ]; 
            var s = 1;
            mesh.scale.set( s, s, s );
            mesh.position.y = 0; 
            mesh.position.x = 6; 
            mesh.castShadow = true;
            mesh.receiveShadow = true;
    
            const mygroup = new THREE.Group();
            mygroup.add( mesh ); 
            xthis.scene.add( mygroup );  

            var mixer = new THREE.AnimationMixer( model );
            mixer.clipAction( gltf.animations[ 0 ] ).play();

            // model.traverse( function ( child ) {

            //     if ( child.isMesh ) child.material.envMap = envMap;

            // } ); 
        } );
        
    }
    this.createBasicThreeCameraUsingZappa = function (){
        // Setup a Zappar camera instead of one of ThreeJS's cameras
        xthis.camera = new ZapparThree.Camera(); 
        xthis.camera.lookAt (new THREE.Vector3(0,0,0)); 
    }
    this.setZapprCameraRenderBits = function (){
        // The Zappar library needs your WebGL context, so pass it
        ZapparThree.glContextSet(xthis.renderer.getContext());
 
        // Request the necessary permission from the user
        ZapparThree.permissionRequestUI().then(function(granted) {
            if (granted) xthis.camera.start();
            else ZapparThree.permissionDeniedUI();
        });
    }
    this.createSceneWithCameraImage = function (){
        // Create a ThreeJS Scene and set its background to be the camera background texture
        this.scene = new THREE.Scene();
        this.scene.background = xthis.camera.backgroundTexture;
    }
    this.decideImageTrackerFilename = function(){
        var n = 'example-tracking-image.zpt'; 
        var preefix = './images/trackings/';
         switch (this.campaignID) {
            case 'defaltdarademoorange':
                console.log('default Darabase Orange Campaign is used')
                n = 'example-tracking-image.zpt';  
                break; 

            case 'tenetdemo':
                console.log('Darabase Movie-Tenet Campaign is used')
                n = 'tenet_billboard.zpt'; //what to use ???? wonder woman???? or
                break; 

             default:
                 throw new Error('this.campaignID is out of range: ' + this.campaignID);
         }
     
        
        return preefix+n;
    }
    this.setupCubeMaterialArray = function(){
        xthis = this;
        var TedmaterialArray = [
            new THREE.MeshBasicMaterial( { color: 0x000000,map: xthis.tloader.load("./images/zleft.png") } ),//left
            new THREE.MeshBasicMaterial( { color: 0x000000,map: xthis.tloader.load("./images/zright.png") } ),//RIGHT
            new THREE.MeshBasicMaterial( { map: xthis.tloader.load("./images/orange.png") } ),//topo
            new THREE.MeshBasicMaterial( { map: xthis.tloader.load("./images/orange.png") } ),//bottom
            new THREE.MeshBasicMaterial( { map: xthis.tloader.load("./images/znegback.png") } ),//back??????
            new THREE.MeshBasicMaterial( { map: xthis.tloader.load("./images/zposfront.png") } ),//FRONT
        ];
        this.theMaterialArray = TedmaterialArray;
    }
    this.theMaterialArray = [
        new THREE.MeshBasicMaterial( { map: xthis.tloader.load("./images/zleft.png") } ),
        new THREE.MeshBasicMaterial( { map: xthis.tloader.load("./images/zright.png") } ),
        new THREE.MeshBasicMaterial( { map: xthis.tloader.load("./images/orange.png") } ),
        new THREE.MeshBasicMaterial( { map: xthis.tloader.load("./images/orange.png") } ),
        new THREE.MeshBasicMaterial( { map: xthis.tloader.load("./images/znegback.png") } ),
        new THREE.MeshBasicMaterial( { map: xthis.tloader.load("./images/zposfront.png") } ),
    ];
    this.addSettingsIcon = function (){
        console.log('teds debug bits only for testing')
        var xthis = this;
        var h = `  
            <div id="content" class="divForSettings"> 
                <div id="divForSettingsIcons">
                    <img id="iconforSettings" style="cursor:pointer;z-index:9999" src="./images/icons8-settings.svg" width="40" height="40" />
                    <img id="iconforCancel" style="cursor:pointer;z-index:9999;display:none" src="./images/icons8-cancel.svg" width="40" height="40" />
                </div>
            </div>   
        `;// 
        $('#infooverlaybot').html(h);

        var hht = `
            <div id="settingsinner" style="display:none" >
                <div id="settingsinnerin" >  
                    <div class="modal-header mymodalheader" style="padding-left:0;padding-right:0">
                        <h5 class="modal-title bigwriting">
                            Settings
                        </h5>
                        <button   type="button" class="btn-close iconforCancel" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div> 
                    <!-- Checked switch -->
                    <br>

                    <br>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" id="broadcastSwitchCheckChecked" checked />
                        <label class="form-check-label" for="broadcastSwitchCheckChecked">
                            testing 123!
                        </label>
                    </div>
                </div>
            </div>`;
        $('.divForSettings').append(hht);
 

        $("#iconforSettings").on( "click", function(e){  
            alert('TESING123: you clicked settings ');

          //  trigger tween
            $('#iconforSettings').hide(); 
            $('#iconforCancel').show(); 
           // xthis.goShowSettings() ;
        });
        // $(".iconforCancel").on( "click", function(e){   
        //     console.log('xxxx') 
        //     $('#settingsinner').hide(); 
        //     $('#iconforSettings').show(); 
        //     $('#bottominner').remove(); 
        // }); 
    };
    this.basicCubeTween = function (voxel){  
        
        voxel.scale.x = 0;
        voxel.scale.y = 0;
        voxel.scale.z = 0;
        var duration = 800;

        var targetPosition = new THREE.Vector3( 1, 1, 1 );//TEST TEST
        new TWEEN.Tween( voxel.scale )
            .to( targetPosition )
            // .repeat( Infinity )
            .delay( 1000 )
            .duration( duration )
            .yoyo( true )
            .easing( TWEEN.Easing.Bounce.Out )
            .start();
     
        var xtween = new TWEEN.Tween(voxel.position)
            .to({ z: "1" }, 1000) // relative animation 
            .easing( TWEEN.Easing.Bounce.Out ) 
            .delay( 1000 )
            .start();

        //   new TWEEN.Tween( voxel.position.y )
        //     .to( 2 ) 
        //   .delay( 700 )
        //   .duration( duration )
        //   .yoyo( true )
        //   .easing( TWEEN.Easing.Bounce.Out )
        //   .start();

        // xtween1.repeat(Infinity)
        // xtween2.repeat(Infinity)
        // xtween3.repeat(Infinity)  

    }
    this.updateAframeHiroBoxFaces = function (){  
        var el = document.getElementById('hirobox') 
        let mesh = el.getObject3D('mesh'); 

        mesh.traverse(function(node){ 
            if (node.isMesh){    
              console.log('mesh is updated color')
              let mat = new THREE.MeshStandardMaterial;
              let color = new THREE.Color(0xFF0000);
              mat.color = color; 
              node.material = xthis.materialArray;                  
            }
        });
    }
    
    this.makeAframeMainBox = function (position){
        var new_latitude = position.coords.latitude; 
        var new_longitude =position.coords.longitude;  
        var scne = document.querySelector('a-scene');

        var box = document.createElement('a-box'); 
         box.setAttribute('color','purple');
         box.setAttribute('gps-entity-place', `latitude: ${new_latitude}; longitude: ${new_longitude};`) 
         box.setAttribute('depth','1');
         box.setAttribute('height','1');
         box.setAttribute('width','1');
         box.setAttribute('position','0 0 3');
         scne.appendChild(box); 
    }
    this.setupRendererBits = function (renderer){ 
        xthis.renderer = renderer;
        xthis.renderer.setPixelRatio( window.devicePixelRatio );
        document.body.appendChild(xthis.renderer.domElement);
        xthis.renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMapType = THREE.PCFSoftShadowMap;
        renderer.outputEncoding = THREE.sRGBEncoding;
    }
    this.ge
    
    this.createBasicThreeRenderer = function (){ 
        this.renderer = new THREE.WebGLRenderer( { 
            antialias: true, alpha: true 
        } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.shadowMap.enabled = true; 
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        document.body.appendChild(this.renderer.domElement);
    };
    this.listenForWindowResize = function (){
        window.addEventListener("resize", () => {
            xthis.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }
    this.giveMainCubeishModelToUse = function (){
       var x = './models/four_screens_simple_v4.glb';
       return x;
    } 
    this.createDirLightBasic = function (){
        if (!xthis.scene){ 
            alert('system error no scene is set 2xyz123');
            return;
        }
        const directionalLight = new THREE.DirectionalLight( 0xffffff, .5 );
        directionalLight.position.x = 0;
        directionalLight.position.y = 0;
        xthis.scene.add( directionalLight );
    }
    this.addFloorStructuresAndHelpers = function (scene){
        xthis.scene = scene;
        var planeGeometry = new THREE.PlaneBufferGeometry( 100, 100 );
        planeGeometry.rotateX( - Math.PI / 2 );
        var planeMaterial = new THREE.ShadowMaterial( { opacity: 0.2 } );
    
        var plane = new THREE.Mesh( planeGeometry, planeMaterial ); 
        plane.receiveShadow = true;
        xthis.scene.add( plane );


  
        var texture = xthis.tloader.load( './images/teddytedt.png' );   
        var geometry = new THREE.BoxBufferGeometry( 10, .1, 10 );
        var material = new THREE.MeshStandardMaterial( { map: texture } ); 
        var tedmediaCube = new THREE.Mesh( geometry, material );
        tedmediaCube.position.set(0, -.053, 0); 
        tedmediaCube.receiveShadow = true; 
        if (xthis.scene){
            xthis.scene.add( tedmediaCube );
        } else {
            alert('system error no scene is set xyz123');
            return;
        }

        const xxgeometry = new THREE.BoxGeometry( .1, 25, .1 );
        const xxmaterial = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
        const cube = new THREE.Mesh( xxgeometry, xxmaterial );
        cube.position.set(0, 1, 0); 
        xthis.scene.add( cube ); 

        const axesHelper = new THREE.AxesHelper( 15 );
        scene.add( axesHelper );
        const gridHelper = new THREE.GridHelper( 10, 10 );
        scene.add( gridHelper );
    
    }
    this.setupMainConnections = function (renderer, scene) {
        this.sceneToAddTo = scene;
        this.scene = scene;
        this.renderer = renderer;
    };
    this.setupMainCamera = function (camera) {
        this.camera = camera;
    };
    this.showOnscreenGPSMessage = function (){ 
        $('#teddydisplay').html('GPS FOUND');
      //  setTimeout(function(){   $('#teddydisplay').hide(); }, 5000);
    }
    
}
 
 
export {   
    masterTools,
};
