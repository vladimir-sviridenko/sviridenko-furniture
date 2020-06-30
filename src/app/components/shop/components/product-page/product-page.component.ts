import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ProductsTableFacadeService } from '@store/facades/productsTable.facade';
import { ProductPageFacadeService } from '@store/facades/productPage.facade';
import { Product } from '@shop/models/product';
import { take } from 'rxjs/operators';
import { ProductsOptionsService } from '@shop/services/products-options.service';
import { CartProduct } from '@shop/models/cart-product';
import { SelectedOption } from '@shop/models/selected-option';
import { CartFacadeService } from '@store/facades/cart.facade';
import { Location } from '@angular/common';

@Component({
	selector: 'app-product-page',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent implements OnInit {

	public product: Product;
	public photoUrl: string;

	constructor(public productsOptionsService: ProductsOptionsService,
		public productsTableFacadeService: ProductsTableFacadeService,
		public productPageFacadeService: ProductPageFacadeService,
		public cartFacadeService: CartFacadeService,
		public location: Location) { }

	public ngOnInit(): void {
		this.productPageFacadeService.product$.pipe(take(1))
			.subscribe((currentProduct: Product) => {
				this.product = currentProduct;
				this.photoUrl = currentProduct.photoUrl.high;
			});
	}

	public addProductToCart(): void {
		this.productPageFacadeService.selectedOptions$.pipe(take(1))
			.subscribe((selectedOptions: SelectedOption[]) => {
				const cartProduct: CartProduct = new CartProduct(this.product, selectedOptions);
				this.cartFacadeService.addCartProduct(cartProduct);
			});
	}
}
