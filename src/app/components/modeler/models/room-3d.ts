import { Size } from './size';
import { Vector3, Object3D } from 'three';
import { Board3D } from './board-3d';

export class Room3D extends Object3D {
	public maxSize: Size;

	constructor(maxSize: Size, boards3D: Board3D[]) {
		super();
		this.maxSize = maxSize;
		if (boards3D) {
			this.children = boards3D;
		}
	}

	public addBoard(size: Size): void {
		const y: number = this.children.reduce((maxY: number, board: Board3D) => {
			return board.position.y > maxY ? board.position.y : maxY;
		}, 0);

		const position: Vector3 = new Vector3(0, y, 0);
		this.children.push(new Board3D(size, position));
	}
}
