import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProductsTableFacadeService } from '@store/facades/productsTable.facade';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {

	constructor(private productsTableFacadeService: ProductsTableFacadeService) {
		this.productsTableFacadeService.hideTableLoader();
		this.productsTableFacadeService.changePageTitle('Ошибка 404');
	}
}
