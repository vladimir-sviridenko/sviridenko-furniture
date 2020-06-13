import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ShopFacadeService } from '@store/facades/shop.facade';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {

	constructor(private shopFacadeService: ShopFacadeService) {
		this.shopFacadeService.hideShopLoader();
	}
}
