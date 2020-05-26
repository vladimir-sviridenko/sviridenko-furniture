import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductCard } from '@models/ProductCard';
import { MatDialog } from '@angular/material/dialog';
import { RequestCallComponent } from '../request-call/request-call.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {

  @Input()
  public productCard: ProductCard;

  @Input()
  public albumId: number;

  @Output()
  public imageLoad = new EventEmitter();

  constructor(private dialog: MatDialog, private requestStatusTip: MatSnackBar) {}

  public openRequestCallDialog(): void {
    const dialogRef = this.dialog.open(RequestCallComponent, {
      width: '320px',
      data: this.productCard.photoUrl
    });

    const subscription = dialogRef.afterClosed().subscribe(requestSuccess => {
      subscription.unsubscribe();
      if (requestSuccess !== undefined) {
        requestSuccess
          ? this.requestStatusTip.open('Запрос успешно отправлен', 'Ок', {
            duration: 5000
          })
          : this.requestStatusTip.open('Ошибка запроса', 'Ок', {
            duration: 10000
          });
      } else {  // dialog closed by user
        return;
      }
    });
  }
}
