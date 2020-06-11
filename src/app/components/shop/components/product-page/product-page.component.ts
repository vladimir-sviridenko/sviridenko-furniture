import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ShopFacadeService } from '@store/facades/shop.facade';
import { ProductFacadeService } from '@store/facades/product.facade';
import { Product } from '@shop/models/product';
import { take } from 'rxjs/operators';
import { ProductsOptionsService } from '@shop/services/products-options.service';
import { CartProduct } from '@shop/models/cart-product';
import { SelectedOption } from '@shop/models/selected-option';
import { CartFacadeService } from '@store/facades/cart.facade';

@Component({
	selector: 'app-product-page',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPageComponent implements OnInit {

	public product: Product;
	public photoUrl: string;

	constructor(public shopFacadeService: ShopFacadeService,
							public productFacadeService: ProductFacadeService,
							public cartFacadeService: CartFacadeService,
							public productsOptionsService: ProductsOptionsService) { }

	public ngOnInit(): void {
		this.productFacadeService.product$.pipe(take(1))
			.subscribe((currentProduct: Product) => {
				this.product = currentProduct;
				this.photoUrl = currentProduct.photoUrl.high;
		});
	}

	public addProductToCart(): void {
		this.productFacadeService.selectedOptions$.pipe(take(1))
			.subscribe((selectedOptions: SelectedOption[]) => {
				const cartProduct: CartProduct = new CartProduct(this.product, selectedOptions);
				this.cartFacadeService.addCartProduct(cartProduct);
			});
	}
}
