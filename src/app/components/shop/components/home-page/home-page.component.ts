import { Component, OnInit } from '@angular/core';
import { ShopFacadeService } from '@store/facades/shop.facade';
import { Album } from '@shop/models/album';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private shopFacadeService: ShopFacadeService) { }

  public ngOnInit(): void {
		this.shopFacadeService.changePageTitle('Sviridenko Furniture');
  }
}
