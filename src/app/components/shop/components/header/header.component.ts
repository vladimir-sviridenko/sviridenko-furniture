import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactsComponent } from '../contacts/contacts.component';
import { Overlay } from '@angular/cdk/overlay';
import { FocusMonitor } from '@angular/cdk/a11y';
import {BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { last, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements AfterViewInit {

	constructor(public contactsDialog: MatDialog,
							private overlay: Overlay,
							private focusMonitor: FocusMonitor,
							private breakpointObserver: BreakpointObserver) { }

	public ngAfterViewInit(): void {
		this.focusMonitor.stopMonitoring(document.querySelector('.header__contacts-switcher'));
	}

	public openContacts(): void {
		const dialogRef: MatDialogRef<ContactsComponent> = this.contactsDialog.open(ContactsComponent, {
			width: '270px',
			scrollStrategy: this.overlay.scrollStrategies.noop(),
			autoFocus: false,
			panelClass: 'header__contacts-dialog',
			maxHeight: '90vh'
		});

		const layoutChanges: Observable<BreakpointState> = this.breakpointObserver.observe([
			'(min-width: 600px)',
		]);

		layoutChanges.pipe(take(2), last()).subscribe(() => {
			dialogRef.close();
		});
	}
}
