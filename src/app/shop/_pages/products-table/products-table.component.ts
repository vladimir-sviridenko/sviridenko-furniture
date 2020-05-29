import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { ProductCardComponent } from '../../_components/product-card/product-card.component';
import { Subject, BehaviorSubject } from 'rxjs';
import { Product } from '@models/Product';
import { ShopFacadeService } from '@store/shop/shop.facade';
import { takeUntil, delay } from 'rxjs/operators';
import { Album } from '@models/Album';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(ProductCardComponent)
  private productCardComponents: QueryList<ProductCardComponent>;

  public  album: Album;

  public unsubscriber$: Subject<void> = new Subject();

  constructor(public shopFacadeService: ShopFacadeService) { }

  ngOnInit(): void {
    this.shopFacadeService.currentAlbum$
      .pipe(
        delay(0),
        takeUntil(this.unsubscriber$)
      )
      .subscribe((album: Album) => {
      this.album = album;
    });
  }

  ngAfterViewInit(): void {
    this.productCardComponents.changes.pipe(takeUntil(this.unsubscriber$)).subscribe(() => {
      this.showCardsAfterAllLoaded();
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }

  private showCardsAfterAllLoaded(): void {
    const loadingPhotos$ = this.productCardComponents.map((component: ProductCardComponent, index: number) => {
      return new Promise((resolve) => {
        component.imageLoad.subscribe((isSuccessLoading: boolean) => {
          if (isSuccessLoading) {
            resolve();
          } else {
            const elementToDelete = document.querySelectorAll('.products-table__card')[index];
            elementToDelete.parentNode.removeChild(elementToDelete);
          }
        });
      });
    });
    Promise.all(loadingPhotos$).then(() => {
      this.shopFacadeService.hideShopLoader();
    });
  }

}
