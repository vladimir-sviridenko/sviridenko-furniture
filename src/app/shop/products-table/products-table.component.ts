import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ProductCard } from '@models/ProductCard';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsTableComponent implements OnInit {

  @Input()
  public productCards: ProductCard[];

  constructor() { }

  ngOnInit(): void {
  }

}
