import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ThreeService } from '../../services/three.service';

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
		this.threeService.domElement.style.display = 'block';
		this.sceneContainer.nativeElement.appendChild(this.threeService.domElement);
	}
}
