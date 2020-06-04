import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { CanOpenErrorPageGuard } from '@core/guards/can-open-error-page.guard';

const routes: Routes = [
  { path: '', redirectTo: 'shop/375686981', pathMatch: 'full' },
  { path: 'error', component: ErrorComponent, canActivate: [CanOpenErrorPageGuard] },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
