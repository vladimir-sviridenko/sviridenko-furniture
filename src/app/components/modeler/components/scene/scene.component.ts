import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ThreeService } from '../../services/three.service';
import { Size } from '@modeler/models/size';

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

		this.threeService.room3D.addBoard(new Size(3, 0.1, 1));
	}
}
