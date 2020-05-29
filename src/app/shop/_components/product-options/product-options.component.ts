import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProductOption, options } from '@models/enums/ProductOption.enum';
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
  public options: Map<ProductOption, options>;

  constructor(public skinService: SkinService, public facadeService: FacadeService) { }

  ngOnInit(): void {
  }

  public isOptionOfProduct(option: string) {
    return this.options.has(ProductOption[option]);
  }
}
