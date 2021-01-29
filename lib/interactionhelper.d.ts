import * as THREE from 'three';
export declare class InteractionHelper {
    private _camera;
    private _raycaster;
    private _mouse;
    private _domElement;
    private objectCallbackPairs;
    constructor(camera: THREE.Camera, renderer: THREE.Renderer);
    addMouseDownListener: (object: THREE.Object3D, callback: Function) => void;
    private _search;
}
