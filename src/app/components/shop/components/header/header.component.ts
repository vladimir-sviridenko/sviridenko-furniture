import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { FocusMonitor } from '@angular/cdk/a11y';
import { DialogService } from '@shop/services/dialog.service';
import { ProductsTableFacadeService } from '@store/facades/productsTable.facade';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements AfterViewInit {

	constructor(public dialogService: DialogService,
		private focusMonitor: FocusMonitor,
		public productsTableFacadeService: ProductsTableFacadeService) { }

	public ngAfterViewInit(): void {
		this.focusMonitor.stopMonitoring(document.querySelector('.header__button_contacts'));
	}
}
