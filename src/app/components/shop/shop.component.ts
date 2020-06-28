import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';

import { ShopFacadeService } from '@store/facades/shop.facade';
import { CartFacadeService } from '@store/facades/cart.facade';
import { ProductFacadeService } from '@store/facades/product.facade';
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

	constructor(public shopFacadeService: ShopFacadeService,
		public cartFacadeService: CartFacadeService,
		public productFacadeService: ProductFacadeService) { }

	public scrollTop(): void {
		document.body.scrollTop = 0; // 	for mobile browsers
	}

	public ngOnInit(): void {
		this.shopFacadeService.currentProducts$
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
