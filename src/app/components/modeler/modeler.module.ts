import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelerComponent } from './modeler.component';
import { SceneComponent } from './components/scene/scene.component';
import { ModelerRoutingModule } from './modeler-routing.module';
import { ThreeService } from './services/three.service';

@NgModule({
  declarations: [
		ModelerComponent,
		SceneComponent
	],
  imports: [
		ModelerRoutingModule,
		CommonModule,
	],
	providers: [
		ThreeService
	]
})
export class ModelerModule { }
