import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  {path: '', redirectTo: 'products/375686981', pathMatch: 'full'},
  {path: 'products/:albumId', component: ShopComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
