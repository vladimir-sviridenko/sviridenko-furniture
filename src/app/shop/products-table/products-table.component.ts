import { Component, OnInit, ViewChildren, QueryList, AfterViewInit, OnDestroy } from '@angular/core';
import { ProductsService } from '@services/products.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, combineLatest } from 'rxjs';
import { Album } from '@models/Album';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChildren(ProductCardComponent)
  private productCardComponents: QueryList<ProductCardComponent>;

  public unsubscriber$: Subject<void> = new Subject();

  constructor(public productsService: ProductsService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    combineLatest([this.productsService.albums$, this.route.params]).pipe(takeUntil(this.unsubscriber$))
    .subscribe(([albums, params]) => {
      const albumToShow: Album = albums.find(album => params.albumId === String(album.id));
      if (albumToShow) {
          this.productsService.generateProductCards(albumToShow);
        } else {
          this.router.navigate(['/shop', albums[0].id]);
        }
    });
  }

  ngAfterViewInit(): void {
    this.productCardComponents.changes.subscribe((value) => {
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
      this.productsService.isProductCardsLoaded = true;
    });
  }

}
