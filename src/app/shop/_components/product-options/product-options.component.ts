import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProductsOptionsService } from '@services/products-options.service';
import { ProductOptionAlbum } from '@models/ProductOptionAlbum';
import { OptionType } from '@models/enums/OptionType.enum';

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styleUrls: ['./product-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductOptionsComponent implements OnInit {

  @Input()
  public optionAlbums: ProductOptionAlbum[];

  public optionTypeEnum: typeof OptionType = OptionType;

  constructor(public productsOptionsService: ProductsOptionsService) { }

  ngOnInit(): void {
  }
}
