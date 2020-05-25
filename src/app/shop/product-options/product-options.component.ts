import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProductOptions } from '@models/enums/ProductOptions.enum';
import { FacadeService } from '@services/facade.service';
import { SkinService } from '@services/skin.service';

@Component({
  selector: 'app-product-options',
  templateUrl: './product-options.component.html',
  styleUrls: ['./product-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductOptionsComponent implements OnInit {

  @Input()
  public options: ProductOptions;

  constructor(public skinService: SkinService, public facadeService: FacadeService) { }

  ngOnInit(): void {
  }

  public isOptionOfProduct(option: string) {
    return this.options.includes(ProductOptions[option]);
  }
}
