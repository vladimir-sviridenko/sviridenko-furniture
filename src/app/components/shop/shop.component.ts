import { Component } from '@angular/core';

import { ShopFacadeService } from '@store/facades/shop.facade';

@Component({
	selector: 'app-shop',
	templateUrl: './shop.component.html',
	styleUrls: ['./shop.component.scss']
})
export class ShopComponent {

	constructor(public shopFacadeService: ShopFacadeService) {}

	public scrollTop(): void {
		window.scrollTo(0, 0);
	}
}
