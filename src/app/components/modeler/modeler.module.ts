import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModules } from '../ui/material/material.modules';
import { ModelerComponent } from './components/modeler/modeler.component';
import { SceneComponent } from './components/scene/scene.component';

@NgModule({
  declarations: [
		ModelerComponent,
		SceneComponent
	],
  imports: [
		CommonModule,
		...MaterialModules,
  ]
})
export class ModelerModule { }
