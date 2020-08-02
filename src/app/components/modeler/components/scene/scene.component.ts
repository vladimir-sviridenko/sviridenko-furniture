import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ThreeService } from '../../services/three.service';
import { Vector3 } from 'three';
import { Size } from '@modeler/models/size';
import { Room } from '@modeler/models/room';
import { Board } from '@modeler/models/board';

@Component({
	selector: 'app-scene',
	templateUrl: './scene.component.html',
	styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements AfterViewInit {

	@ViewChild('sceneContainer')
	private sceneContainer: ElementRef;

	constructor(private threeService: ThreeService) {}

	public ngAfterViewInit(): void {
		// 	init three scene
		this.threeService.domElement.style.display = 'block';
		this.sceneContainer.nativeElement.appendChild(this.threeService.domElement);

		// 	create Room
		const roomSize: Size = new Size(40, 40, 40);
		const cameraPosition: Vector3 = new Vector3(1, 1, 5);
		const boards: Board[] = [new Board(new Size(3, 0.1, 1), new Vector3(0, 0, 0))];
		const room: Room = new Room(roomSize, boards, cameraPosition);

		// 	render Room
		this.threeService.renderRoom(room);
	}
}
