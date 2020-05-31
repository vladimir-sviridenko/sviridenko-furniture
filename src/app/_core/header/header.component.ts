import { Component, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactsComponent } from './contacts/contacts.component';
import { Overlay } from '@angular/cdk/overlay';
import { FocusMonitor } from '@angular/cdk/a11y';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { last, take } from 'rxjs/operators';


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

  ngAfterViewInit() {
    this.focusMonitor.stopMonitoring(document.querySelector('.header__contacts-switcher'));
  }

  openContacts(): void {
    const dialogRef = this.contactsDialog.open(ContactsComponent, {
      width: '270px',
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      autoFocus: false,
      panelClass: 'header__contacts-dialog',
      maxHeight: '90vh'
    });

    const layoutChanges = this.breakpointObserver.observe([
      '(min-width: 600px)',
    ]);

    layoutChanges.pipe(take(2), last()).subscribe((result) => {
      dialogRef.close();
    });
  }
}
