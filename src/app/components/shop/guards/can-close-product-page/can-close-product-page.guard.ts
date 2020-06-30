import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProductPageFacadeService } from '@store/facades/productPage.facade';
import { ProductPageComponent } from '@shop/components/product-page/product-page.component';

@Injectable()
export class CanCloseProductPageGuard implements CanDeactivate<ProductPageComponent> {

	constructor(private productPageFacadeService: ProductPageFacadeService) { }

	public canDeactivate(): boolean {
		this.productPageFacadeService.clearProduct();
		return true;
	}
}
