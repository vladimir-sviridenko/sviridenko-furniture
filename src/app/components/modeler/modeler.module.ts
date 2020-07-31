import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelerComponent } from './modeler.component';
import { SceneComponent } from './components/scene/scene.component';
import { ModelerRoutingModule } from './modeler-routing.module';

@NgModule({
  declarations: [
		ModelerComponent,
		SceneComponent
	],
  imports: [
		ModelerRoutingModule,
		CommonModule,
  ]
})
export class ModelerModule { }
