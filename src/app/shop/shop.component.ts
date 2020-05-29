import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/_store/AppState';
import { Album } from '@models/Album';


import { ShopFacadeService } from '@store/shop/shop.facade';
import * as SelectorsShop from '@store/shop/shop.selectors';
import * as ActionShop from '@store/shop/shop.actions';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  constructor(public shopFacadeService: ShopFacadeService) {}

  ngOnInit(): void {
    this.shopFacadeService.initializeAlbums();
  }
}
