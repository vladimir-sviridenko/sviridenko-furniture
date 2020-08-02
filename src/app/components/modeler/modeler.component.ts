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

	constructor(public threeService: ThreeService) {}

	public onAddBoard(): void {

	}
}
