import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ClipPlane } from '../models/clip-plane';
import { Room3D } from '@modeler/models/room-3d';
import { Size } from '@modeler/models/size';
import { Interaction } from 'three.interaction';

@Injectable()
export class ThreeService {

	private _room3D: Room3D = new Room3D(new Size(40, 40, 40));

	private _scene: THREE.Scene;
	private _camera: THREE.PerspectiveCamera;
	private _renderer: THREE.WebGLRenderer;
	private _orbitControls: OrbitControls;
	private _interaction: Interaction;

	private fieldOfView: number = 75;
	private aspectRatio: number = window.innerWidth / window.innerHeight;
	private clipPlane: ClipPlane = {
		near: 0.1,
		far: 1000
	};
	private backgroundColor: number = 0xf5f5f5;

	public get domElement(): HTMLElement {
		return this._renderer.domElement;
	}

	public get room3D(): Room3D {
		return this._room3D;
	}

  constructor() {
		this._scene = new THREE.Scene();
		this._camera = new THREE.PerspectiveCamera( this.fieldOfView, this.aspectRatio, this.clipPlane.near, this.clipPlane.far);
		this._renderer = new THREE.WebGLRenderer();

		this._camera.position.set(1, 1, 5);
		this._renderer.setSize( window.innerWidth, window.innerHeight );
		this._renderer.setClearColor(this.backgroundColor);
		this._interaction = new Interaction(this._renderer, this._scene, this._camera);

		this.initOrbitControls();
		this.initLights();

		//  animate workers
		const animate: () => void = () => {
			requestAnimationFrame( animate );

			this._orbitControls.update();

			this.render();
		};
		animate();

		this._scene.add(this.room3D);
	}

	private initOrbitControls(): void {
		this._orbitControls = new OrbitControls(this._camera, this._renderer.domElement);
		this._orbitControls.update();
	}

	private initLights(): void {
		const ambientLight: THREE.AmbientLight = new THREE.AmbientLight( 0x404040 );
		this._scene.add(ambientLight);
		const light: THREE.PointLight = new THREE.PointLight( 0xffffff, 1, 100 );
		light.position.set(1, 1, 5);
		light.castShadow = true;
		this._scene.add(light);
	}

	public render(): void {
		this._renderer.render( this._scene, this._camera );
	}
}
