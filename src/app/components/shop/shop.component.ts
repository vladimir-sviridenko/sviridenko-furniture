import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';

import { ProductsTableFacadeService } from '@store/facades/productsTable.facade';
import { CartFacadeService } from '@store/facades/cart.facade';
import { ProductPageFacadeService } from '@store/facades/productPage.facade';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopComponent implements OnInit, OnDestroy {

	private unsubscriber$: Subject<void> = new Subject<void>();

	constructor(public productsTableFacadeService: ProductsTableFacadeService,
		public cartFacadeService: CartFacadeService,
		public productPageFacadeService: ProductPageFacadeService) { }

	public scrollTop(): void {
		window.scrollTo(0, 0);
	}

	public ngOnInit(): void {
		this.productsTableFacadeService.tableProducts$
			.pipe(takeUntil(this.unsubscriber$))
			.subscribe(() => {
				this.scrollTop();
			});
	}

	public ngOnDestroy(): void {
		this.unsubscriber$.next();
		this.unsubscriber$.complete();
	}
}
