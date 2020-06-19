import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProductFacadeService } from '@store/facades/product.facade';
import { ProductPageComponent } from '@shop/components/product-page/product-page.component';

@Injectable()
export class CanCloseProductPageGuard implements CanDeactivate<ProductPageComponent> {
	constructor(private productFacadeService: ProductFacadeService) {}
	public canDeactivate(): boolean {
		this.productFacadeService.clearProduct();
		return true;
	}
}
