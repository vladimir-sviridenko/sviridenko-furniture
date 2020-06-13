import { Component, ChangeDetectionStrategy, isDevMode } from '@angular/core';

import { ShopFacadeService } from '@store/facades/shop.facade';
import { CartFacadeService } from '@store/facades/cart.facade';

@Component({
	selector: 'app-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShopComponent {

	constructor(public shopFacadeService: ShopFacadeService, public cartFacadeService: CartFacadeService) {}

	public scrollTop(): void {
		window.scrollTo(0, 0);
		document.body.scrollTop = 0; // 	for mobiles
	}
}
