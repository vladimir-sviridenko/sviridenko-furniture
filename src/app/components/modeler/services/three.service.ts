import { Injectable } from '@angular/core';
import * as THREE from 'three';

@Injectable()
export class ThreeService {

	private scene: THREE.Scene;
	private camera: THREE.PerspectiveCamera;
	private renderer: THREE.WebGLRenderer;

	private fieldOfView: number = 75;
	private aspectRatio: number = window.innerWidth / window.innerHeight;
	private clipPlane: ClipPlane = {
		near: 0.1,
		far: 1000
	};
	private backgroundColor: number = 0xf5f5f5;

	public get domElement(): HTMLElement {
		return this.renderer.domElement;
	}

  constructor() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera( this.fieldOfView, this.aspectRatio, this.clipPlane.near, this.clipPlane.far);

		this.renderer = new THREE.WebGLRenderer({ alpha: true });
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.setClearColor(this.backgroundColor);
	}
}
