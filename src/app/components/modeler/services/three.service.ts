import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { ClipPlane } from '../models/clip-plane';
import { Vector3, Object3D } from 'three';
import { Size } from '../models/size';
import { Room } from '@modeler/models/room';
import { Board } from '@modeler/models/board';

@Injectable()
export class ThreeService {

	private _scene: THREE.Scene;
	private _camera: THREE.PerspectiveCamera;
	private _renderer: THREE.WebGLRenderer;

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

		// 	adjust scene lights
		const ambientLight: THREE.AmbientLight = new THREE.AmbientLight( 0x404040 );
		this.scene.add(ambientLight);
		const light: THREE.PointLight = new THREE.PointLight( 0xff0000, 1, 100 );
		light.position.set( 1, 1, 5 );
		light.castShadow = true;
		this.scene.add(light);
	}

	private addBoard(board: Board): void {
		const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( board.size.width, board.size.height, board.size.depth );
		const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial( {color: 0x03a1fc} );
		const board3d: THREE.Mesh = new THREE.Mesh( geometry, material );
		this.scene.add( board3d );
		this.setPosition(board3d, board.position);
	}

	public renderRoom(room: Room): void {
		this.setPosition(this.camera, room.cameraPosition);
		room.boards.forEach((board: Board) => {
			this.addBoard(board);
		});

		this.update();
	}

	public setPosition(object3d: Object3D, position: Vector3): void {
		object3d.position.setX(position.x);
		object3d.position.setY(position.y);
		object3d.position.setZ(position.z);
	}

	public update(): void {
		this.renderer.render( this.scene, this.camera );
	}
}
