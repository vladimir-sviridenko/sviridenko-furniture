import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProductsOptionsService } from '@services/products-options.service';
import { ProductOptionAlbum } from '@models/ProductOptionAlbum';

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styleUrls: ['./product-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductOptionsComponent implements OnInit {

  @Input()
  public options: ProductOptionAlbum[];

  constructor(public productsOptionsService: ProductsOptionsService) { }

  ngOnInit(): void {
  }
}
