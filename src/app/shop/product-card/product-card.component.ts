import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductCard } from '@models/ProductCard';

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

  constructor() {}
}
