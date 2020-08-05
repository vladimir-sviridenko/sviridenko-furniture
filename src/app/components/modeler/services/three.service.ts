import { Injectable } from '@angular/core';
import * as THREE from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ClipPlane } from '../models/clip-plane';
import { Room } from '@modeler/models/room';
import { Size } from '@modeler/models/size';
import { Board3D } from '@modeler/models/board-3d';

@Injectable()
export class ThreeService {

	private _room: Room = new Room(new Size(10, 10, 10));

	private _scene: THREE.Scene;
	private _camera: THREE.PerspectiveCamera;
	private _renderer: THREE.WebGLRenderer;
	private _orbitControls: OrbitControls;
	private _dragControls: DragControls;

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

	public get room(): Room {
		return this._room;
	}

  constructor() {
		this._scene = new THREE.Scene();
		this._camera = new THREE.PerspectiveCamera( this.fieldOfView, this.aspectRatio, this.clipPlane.near, this.clipPlane.far);
		this._renderer = new THREE.WebGLRenderer();

		this._camera.position.set(1, 1, 5);
		this._renderer.setSize( window.innerWidth, window.innerHeight );
		this._renderer.setClearColor(this.backgroundColor);

		this.initOrbitControls();
		this.initLights();

		this.initDragControls();

		//  animate workers
		const animate: () => void = () => {
			requestAnimationFrame( animate );

			this._orbitControls.update();

			this.render();
		};
		animate();
	}

	private initDragControls(): void {
		this._dragControls = new DragControls( this.room.boards, this._camera, this.domElement);
		this._dragControls.addEventListener('dragstart', () => {
			this._orbitControls.enabled = false;
		});
		this._dragControls.addEventListener('dragend', () => {
			this._orbitControls.enabled = true;
		});
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
		this.room.boards.forEach((board: Board3D) => {
			this._scene.add(board);
		});
		this._renderer.render( this._scene, this._camera );
	}
}
