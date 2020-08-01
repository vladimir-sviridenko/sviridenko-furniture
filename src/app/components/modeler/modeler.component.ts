import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ThreeService } from './services/three.service';
import { Size } from '@modeler/models/size';
import { Vector3 } from 'three';

@Component({
  selector: 'app-modeler',
  templateUrl: './modeler.component.html',
	styleUrls: ['./modeler.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModelerComponent {

	constructor(public threeService: ThreeService) { }

	public onAddBoard(): void {
		const size: Size = {
			width: 1,
			height: 1,
			depth: 1
		};
		const position: Vector3 = new Vector3(2, 2, 2);
		this.threeService.addBoard(size, position);
		this.threeService.update();
	}
}
