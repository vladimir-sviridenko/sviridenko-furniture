import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ProductCard } from '@models/ProductCard';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {

  @Input()
  public productCard: ProductCard;

  @Output()
  public imageLoad = new EventEmitter();

  constructor() {}
}
