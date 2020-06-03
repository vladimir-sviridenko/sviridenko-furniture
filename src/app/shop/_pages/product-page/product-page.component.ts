import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '@models/Product';
import { take } from 'rxjs/operators';
import { ShopFacadeService } from '@store/shop/shop.facade';
import { PhotoUrl } from '@models/PhotoUrl';
import { SelectedOption } from '@models/SelectedOption';
import { ProductFacadeService } from '@store/product/product.facade';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {

  public product: Product;
  public photoUrl: string;

  constructor(public shopFacadeService: ShopFacadeService,
              public productFacadeService: ProductFacadeService) { }

  ngOnInit(): void {
    this.productFacadeService.product$.pipe(take(1))
      .subscribe((currentProduct: Product) => {
        this.product = currentProduct;
        this.photoUrl = currentProduct.photoUrl.high;
      });
  }
}
