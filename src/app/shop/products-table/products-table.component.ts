import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { ProductsService } from '@services/products.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { takeUntil, delay } from 'rxjs/operators';
import { Subject, combineLatest } from 'rxjs';
import { Album } from '@models/Album';
import { ProductCard } from '@models/ProductCard';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(ProductCardComponent)
  private productCardComponents: QueryList<ProductCardComponent>;

  public  productCards: ProductCard[];

  public unsubscriber$: Subject<void> = new Subject();

  constructor(public productsService: ProductsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productsService.productCards$
      .pipe(
        delay(0),
        takeUntil(this.unsubscriber$)
      )
      .subscribe((productCards) => {
      this.productCards = productCards;
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
      this.productsService.isLoading = false;
    });
  }

}
