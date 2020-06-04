import { Component } from '@angular/core';
import { ShopFacadeService } from '@store/shop/shop.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public appTitle = 'sviridenko-furniture';

  constructor() {}
}
