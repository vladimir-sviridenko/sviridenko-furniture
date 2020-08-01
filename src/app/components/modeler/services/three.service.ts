import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { ClipPlane } from '../models/clip-plane';
import { Vector3, Object3D } from 'three';
import { Size } from '../models/size';

@Injectable()
export class ThreeService {

	private _scene: THREE.Scene;
	private _camera: THREE.PerspectiveCamera;
	private _renderer: THREE.WebGLRenderer;

	private defaultCameraPosition: Vector3 = new Vector3(1, 1, 5);
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

	public get domElement(): HTMLElement {
		return this.renderer.domElement;
	}

  constructor() {
		this._scene = new THREE.Scene();
		this._camera = new THREE.PerspectiveCamera( this.fieldOfView, this.aspectRatio, this.clipPlane.near, this.clipPlane.far);
		this._renderer = new THREE.WebGLRenderer();

		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.setClearColor(this.backgroundColor);
		this.scene.add(new THREE.AxesHelper(5));
		this.setPosition(this.camera, this.defaultCameraPosition);

		// 	adjust scene lights
		const ambientLight: THREE.AmbientLight = new THREE.AmbientLight( 0x404040 );
		this.scene.add(ambientLight);
		const light: THREE.PointLight = new THREE.PointLight( 0xff0000, 1, 100 );
		light.position.set( 1, 1, 5 );
		light.castShadow = true;
		this.scene.add(light);

		this.update();
	}

	public setPosition(object3d: Object3D, position: Vector3): void {
		object3d.position.setX(position.x);
		object3d.position.setY(position.y);
		object3d.position.setZ(position.z);
	}

	public addBoard(size: Size, position: Vector3): void {
		const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( size.width, size.height, size.depth );
		const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial( {color: 0x03a1fc} );
		const board: THREE.Mesh = new THREE.Mesh( geometry, material );
		this.scene.add( board );
		this.setPosition(board, position);
	}

	public update(): void {
		this.renderer.render( this.scene, this.camera );
	}
}
