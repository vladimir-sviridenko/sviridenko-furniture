import { Size } from './size';
import { Vector3 } from 'three';
import * as THREE from 'three';

export class Board3D extends THREE.Mesh {
	constructor(size: Size, position: Vector3) {
		const geometry: THREE.BoxGeometry = new THREE.BoxGeometry( size.width, size.height, size.depth );
		const material: THREE.MeshPhongMaterial = new THREE.MeshPhongMaterial( {color: 0x03a1fc} );

		super( geometry, material );
		this.position.set(position.x, position.y, position.z);
	}
}
