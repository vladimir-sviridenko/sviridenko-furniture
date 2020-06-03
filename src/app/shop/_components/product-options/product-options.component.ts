import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ProductsOptionsService } from '@services/products-options.service';
import { ProductOptionAlbum } from '@models/ProductOptionAlbum';
import { OptionType } from '@models/enums/OptionType.enum';
import { ProductFacadeService } from '@store/product/product.facade';

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styleUrls: ['./product-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductOptionsComponent implements OnInit {

  @Input()
  public optionAlbums: ProductOptionAlbum[];

  @Output()
  public check = new EventEmitter<string>();

  public optionTypeEnum: typeof OptionType = OptionType;

  constructor(public productsOptionsService: ProductsOptionsService,
              public productFacadeService: ProductFacadeService) { }

  ngOnInit(): void {
  }
}
