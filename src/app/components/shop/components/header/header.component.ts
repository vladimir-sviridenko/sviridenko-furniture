import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactsComponent } from '../contacts/contacts.component';
import { Overlay } from '@angular/cdk/overlay';
import { FocusMonitor } from '@angular/cdk/a11y';
import {BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { last, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { DialogService } from '@shop/services/dialog.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements AfterViewInit {

	constructor(public dialogService: DialogService,
							private focusMonitor: FocusMonitor) { }

	public ngAfterViewInit(): void {
		this.focusMonitor.stopMonitoring(document.querySelector('.header__contacts-switcher'));
	}
}
