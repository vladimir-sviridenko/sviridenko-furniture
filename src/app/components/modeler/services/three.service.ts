import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { Interaction } from 'three.interaction';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ClipPlane } from '../models/clip-plane';
import { Room3D } from '@modeler/models/room-3d';
import { Board3D } from '@modeler/models/board-3d';
import { Size } from '@modeler/models/size';
import { Vector3 } from 'three';

@Injectable()
export class ThreeService {

	private _room3D: Room3D = new Room3D(new Size(40, 40, 40), [new Board3D(new Size(3, 0.1, 1), new Vector3(0, 0, 0))]);

	private _scene: THREE.Scene;
	private _camera: THREE.PerspectiveCamera;
	private _renderer: THREE.WebGLRenderer;
	private _orbitControls: OrbitControls;

	private fieldOfView: number = 75;
	private aspectRatio: number = window.innerWidth / window.innerHeight;
	private clipPlane: ClipPlane = {
		near: 0.1,
		far: 1000
	};
	private backgroundColor: number = 0xf5f5f5;

	public get scene(): THREE.Scene {
		return this._scene;
	}

	public get camera(): THREE.Camera {
		return this._camera;
	}

	public get renderer(): THREE.WebGLRenderer {
		return this._renderer;
	}

	public get orbitControls(): OrbitControls {
		return this._orbitControls;
	}

	public get domElement(): HTMLElement {
		return this.renderer.domElement;
	}

	public get room3D(): Room3D {
		return this._room3D;
	}

  constructor() {
		this._scene = new THREE.Scene();
		this._camera = new THREE.PerspectiveCamera( this.fieldOfView, this.aspectRatio, this.clipPlane.near, this.clipPlane.far);
		this._renderer = new THREE.WebGLRenderer();

		this.camera.position.set(1, 1, 5);
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.setClearColor(this.backgroundColor);

		this.initOrbitControls();
		this.initLights();

		//  animate workers
		const animate: () => void = () => {
			requestAnimationFrame( animate );

			this.orbitControls.update();

			this.render();
		};
		animate();

		this.scene.add(this.room3D);
	}

	private initOrbitControls(): void {
		this._orbitControls = new OrbitControls(this.camera, this.renderer.domElement);
		this.orbitControls.update();
	}

	private initLights(): void {
		const ambientLight: THREE.AmbientLight = new THREE.AmbientLight( 0x404040 );
		this.scene.add(ambientLight);
		const light: THREE.PointLight = new THREE.PointLight( 0xfffff, 1, 100 );
		light.position.set(1, 1, 5);
		light.castShadow = true;
		this.scene.add(light);
	}

	public render(): void {
		this.renderer.render( this.scene, this.camera );
	}
}
