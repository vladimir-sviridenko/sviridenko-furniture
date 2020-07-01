import { Injectable } from '@angular/core';
import { ProductsTableFacadeService } from '@store/facades/productsTable.facade';
import { CanDeactivate } from '@angular/router';
import { ProductsTableComponent } from '@shop/components/products-table/products-table.component';

@Injectable()
export class CanCloseProductsTableGuard implements CanDeactivate<ProductsTableComponent> {

	constructor(private productsTableFacadeService: ProductsTableFacadeService) {}

	public canDeactivate(): boolean {
		this.productsTableFacadeService.clearTableProducts();
		return true;
  }
}
