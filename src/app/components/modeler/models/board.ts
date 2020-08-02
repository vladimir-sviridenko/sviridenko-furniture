import { Size } from './size';
import { Vector3 } from 'three';

export class Board {
	public size: Size;
	public position: Vector3;

	constructor(size: Size, position: Vector3) {
		this.size = size;
		this.position = position;
	}
}
