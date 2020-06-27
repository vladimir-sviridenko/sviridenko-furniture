import { Injectable } from '@angular/core';
import { ShopFacadeService } from '@store/facades/shop.facade';
import { CanDeactivate } from '@angular/router';
import { ProductsTableComponent } from '@shop/components/products-table/products-table.component';

@Injectable()
export class CanCloseProductsTableGuard implements CanDeactivate<ProductsTableComponent> {

	constructor(private shopFacadeService: ShopFacadeService) {}

	public canDeactivate(): boolean {
		this.shopFacadeService.clearCurrentProducts();
		return true;
  }
}
