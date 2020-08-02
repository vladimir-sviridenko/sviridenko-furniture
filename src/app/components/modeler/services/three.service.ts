import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ClipPlane } from '../models/clip-plane';
import { Vector3, Object3D, AxesHelper } from 'three';
import { Room } from '@modeler/models/room';
import { Board } from '@modeler/models/board';

@Injectable()
export class ThreeService {

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

	private createBoard3D(board: Board): Object3D {
		const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( board.size.width, board.size.height, board.size.depth );
		const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial( {color: 0x03a1fc} );
		const board3D: THREE.Mesh = new THREE.Mesh( geometry, material );
		board3D.position.set(board.position.x, board.position.y, board.position.z);
		return board3D;
	}

	public renderRoom3D(room: Room): void {
		const room3D: Object3D = new Object3D();
		room3D.add(new AxesHelper(3));

		room.boards.forEach((board: Board) => {
			room3D.add(this.createBoard3D(board));
		});
		this.scene.add(room3D);

		this.render();
	}

	public render(): void {
		this.renderer.render( this.scene, this.camera );
	}
}
