import { Component, ViewChildren, QueryList, AfterViewInit, OnDestroy, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShopFacadeService } from '@store/facades/shop.facade';
import { Product } from '@shop/models/product';

@Component({
	selector: 'app-products-table',
	templateUrl: './products-table.component.html',
	styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements AfterViewInit, OnDestroy {

	@ViewChildren(ProductCardComponent)
	private productCardComponents: QueryList<ProductCardComponent>;

	public unsubscriber$: Subject<void> = new Subject();

	constructor(public shopFacadeService: ShopFacadeService) {}

	private showProductsAfterAllLoaded(): void {
		const loadingPhotos$: Array<Promise<void>>
			= this.productCardComponents.map((component: ProductCardComponent) => {
				return new Promise((resolve: (value?: void | PromiseLike<void>) => void) => {
					component.imageLoad.subscribe((isSuccessLoading: boolean) => {
						resolve();
					});
				});
			});
		Promise.all(loadingPhotos$).then(() => {
			this.shopFacadeService.hideShopLoader();
		});
	}

	public ngAfterViewInit(): void {
		this.productCardComponents.changes.pipe(takeUntil(this.unsubscriber$)).subscribe(() => {
			this.showProductsAfterAllLoaded();
		});
	}

	public ngOnDestroy(): void {
		this.unsubscriber$.next();
		this.unsubscriber$.complete();
	}
}
