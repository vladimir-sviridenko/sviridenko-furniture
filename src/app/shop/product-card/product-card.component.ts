import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProductCard } from '@models/ProductCard';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {

  @Input()
  productCard: ProductCard;

  constructor() {}
}
