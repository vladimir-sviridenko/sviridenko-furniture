import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { CanOpenErrorPageGuard } from 'src/app/guards/can-open-error-page/can-open-error-page.guard';

const routes: Routes = [
	{ path: 'error', component: ErrorComponent, canActivate: [CanOpenErrorPageGuard] },
	{
		path: 'modeler',
  	loadChildren: () => import('./components/modeler/modeler.module').then((m: any) => m.ModelerModule)
  },
	{ path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
