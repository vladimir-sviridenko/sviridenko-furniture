import { Component, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { ProductsService } from '@services/products.service';

import { Album } from '@models/Album';
import { ProductCard } from '@models/ProductCard';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCardComponent } from './product-card/product-card.component';

type AlbumLink = {
  id: number,
  title: string,
  onlinePurchase: boolean
};

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent {
  constructor(public productsService: ProductsService) {}
}
