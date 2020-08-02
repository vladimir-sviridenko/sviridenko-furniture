import { Board } from './board';
import { Size } from './size';
import { Vector3 } from 'three';

export class Room {
	public size: Size;
	public boards: Board[];

	constructor(size: Size, boards: Board[]) {
		this.size = size;
		this.boards = boards;
	}

	public addBoard(size: Size): void {
		const y: number = this.boards.reduce((maxY: number, board: Board) => {
			return board.position.y > maxY ? board.position.y : maxY;
		}, 0);

		const position: Vector3 = new Vector3(0, y, 0);
		this.boards.push(new Board(size, position));
	}
}
