import { Size } from './size';
import { Vector3, Object3D } from 'three';
import { Board3D } from './board-3d';

export class Room {
	public maxSize: Size;
	public boards: Board3D[] = new Array();

	constructor(maxSize: Size) {
		this.maxSize = maxSize;
	}

	public addBoard(size: Size): void {
		const position: Vector3 = new Vector3(0, 0, 0); //  todo change it
		this.boards.push(new Board3D(size, position));
	}
}
