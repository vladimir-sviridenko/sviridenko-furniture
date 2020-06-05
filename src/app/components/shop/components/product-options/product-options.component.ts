import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { ProductsOptionsService } from 'src/app/components/shop/services/products-options.service';
import { ProductFacadeService } from '@store/facades/product.facade';
import { ProductOptionAlbum } from '@shop/models/ProductOptionAlbum';
import { OptionType } from '@shop/models/enums/OptionType.enum';

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
