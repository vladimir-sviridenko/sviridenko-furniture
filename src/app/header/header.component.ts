import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../services/products.service';
import { Info } from '../services/interfaces/Info';

type AlbumLink = {
  id: number,
  title: string,
  onlinePurchase: boolean
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public albumLinks: AlbumLink[] = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit(): void {
    this.productsService.infoObservable.subscribe((infos: Info[]) => {
      infos.forEach((info) => {
        this.albumLinks.push({
          id: info.id,
          title: info.title,
          onlinePurchase: false
        });
      });
    });
  }
}
