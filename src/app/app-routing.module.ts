import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { CanProceedToErrorPageGuard } from '@core/guards/can-proceed-to-error-page.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'shop/375686981',
    pathMatch: 'full'
  },
  {
    path: 'error',
    component: ErrorComponent,
    canActivate: [CanProceedToErrorPageGuard]
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
