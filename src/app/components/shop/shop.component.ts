import { Component } from '@angular/core';

import { ShopFacadeService } from '@store/facades/shop.facade';
import { CartFacadeService } from '@store/facades/cart.facade';

@Component({
	selector: 'app-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

	constructor(public shopFacadeService: ShopFacadeService, public cartFacadeService: CartFacadeService) {}

	public scrollTop(): void {
		window.scrollTo(0, 0);
	}
}
