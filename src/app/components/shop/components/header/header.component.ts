import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DialogService } from '@shop/services/dialog.service';
import { ProductsTableFacadeService } from '@store/facades/productsTable.facade';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

	constructor(public dialogService: DialogService,
		public productsTableFacadeService: ProductsTableFacadeService) { }
}
