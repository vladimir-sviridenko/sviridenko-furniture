import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactsComponent } from './contacts/contacts.component';
import { Overlay } from '@angular/cdk/overlay';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements AfterViewInit {

  constructor(public contactsDialog: MatDialog, private overlay: Overlay, private focusMonitor: FocusMonitor) { }

  ngAfterViewInit() {
    this.focusMonitor.stopMonitoring(document.querySelector('.header__contacts-label'));
  }

  openContacts(): void {
    this.contactsDialog.open(ContactsComponent, {
      width: '240px',
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      autoFocus: false
    });
  }
}
