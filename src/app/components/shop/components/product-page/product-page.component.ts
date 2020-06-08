import { Component, OnInit } from '@angular/core';
import { ShopFacadeService } from '@store/facades/shop.facade';
import { ProductFacadeService } from '@store/facades/product.facade';
import { Product } from '@shop/models/Product';
import { take } from 'rxjs/operators';
import { ProductsOptionsService } from '@shop/services/products-options.service';
import { Album } from '@shop/models/Album';

@Component({
	selector: 'app-product-page',
	templateUrl: './product-page.component.html',
	styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit{

	public product: Product;
	public photoUrl: string;

	constructor(public shopFacadeService: ShopFacadeService,
							public productFacadeService: ProductFacadeService,
							public productsOptionsService: ProductsOptionsService) { }

	public ngOnInit(): void {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0;
		this.productFacadeService.product$.pipe(take(1))
			.subscribe((currentProduct: Product) => {
				this.product = currentProduct;
				this.photoUrl = currentProduct.photoUrl.high;
		});
	}
}
