import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductCard } from '@models/ProductCard';
import { MatDialog } from '@angular/material/dialog';
import { RequestCallComponent } from '../request-call/request-call.component';

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

  constructor(private dialog: MatDialog) {}

  public openRequestCallForm(): void {
    const dialogRef = this.dialog.open(RequestCallComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
