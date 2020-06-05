import { Injectable } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'src/app/store/AppState';
import * as ActionProduct from '@store/actions/product.actions';
import * as SelectorProduct from '@store/selectors/product.selectors';
import { SelectedOption } from 'src/app/models/SelectedOption';
import { ShopFacadeService } from '@store/facades/shop.facade';

@Injectable({
  providedIn: 'root'
})
export class ProductFacadeService {
  constructor(private store: Store<AppState>, private shopFacadeService: ShopFacadeService) {}

  public get product$(): Observable<Product> {
    return this.store.select(SelectorProduct.selectCurrentProduct);
  }

  public get selectedOptions$(): Observable<SelectedOption[]> {
    return this.store.select(SelectorProduct.selectSelectedOptions);
  }

  public changeProduct(product: Product): void {
    this.store.dispatch(ActionProduct.changeProduct({ product }));
    this.shopFacadeService.hideShopLoader();
  }

  public changeProductOption(option: SelectedOption): void {
    this.store.dispatch(ActionProduct.changeProductOption({ option }));
  }
}
