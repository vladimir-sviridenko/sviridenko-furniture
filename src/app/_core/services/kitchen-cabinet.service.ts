import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Product } from '@models/Product';
import { ProductOption } from '@models/enums/ProductOption.enum';
import { Size } from '@models/Size';
import { FacadeService } from './facade.service';
import { SkinService } from './skin.service';
import { Album } from '@models/Album';


@Injectable()
export class KitchenCabinetService {

  public albums$: Observable<Album[]>;

  private productOptions: ProductOption[] = [ProductOption.Skin, ProductOption.Facade];

  private albumId: number = 375686981;
  private albumTitle: string = 'Кухонные шкафы';
  private albumDescription: string = '';

  private photoBaseUrl: string = './assets/images/products/kitchen-cabinets';
  private imagesFormat: string = '.jpg';

  private products: Product[] = [
    this.productFabric(1, 'Шкаф навесной', '72×40×34', 2192),
    this.productFabric(2, 'Шкаф навесной', '72×50×34', 2400),
    this.productFabric(3, 'Шкаф навесной', '72×60×34', 2575),
    this.productFabric(4, 'Шкаф навесной', '72×80×34', 2764),
    this.productFabric(5, 'Шкаф навесной угловой', '72×61×61', 3163),
    this.productFabric(6, 'Шкаф навесной низкий', '36×60×34', 1868),
    this.productFabric(7, 'Шкаф навесной низкий', '36×80×34', 2278),

    this.productFabric(8, 'Шкаф напольный', '82×40×53', 2405),
    this.productFabric(9, 'Шкаф напольный (2 ящика)', '82×40×53', 3884),
    this.productFabric(10, 'Шкаф напольный (3 ящика)', '82×40×53', 4325),
    this.productFabric(11, 'Шкаф напольный', '82×50×53', 2775),
    this.productFabric(12, 'Шкаф напольный', '82×60×53', 3248),
    this.productFabric(13, 'Шкаф напольный (1 ящик)', '82×60×53', 4060),
    this.productFabric(14, 'Шкаф напольный под духовку (1 ящик)', '82×60×53', 3189),
    this.productFabric(15, 'Шкаф напольный', '82×80×53', 3504),
    this.productFabric(16, 'Шкаф напольный угловой', '82×91×53', 4068),
    this.productFabric(17, 'Шкаф-пенал под духовку', '214×60×56', 5564),
    this.productFabric(18, 'Шкаф-пенал', '214×60×56', 7473)
  ];

  constructor(private facadeService: FacadeService, private skinService: SkinService) {
    this.albums$ = this.fetchAlbums();
  }

  private fetchAlbums(): Observable<Album[]> {
    const album: Album[] = [{
      id: this.albumId,
      title: this.albumTitle,
      description: this.albumDescription,
      products: this.products
    }];

    return of(album);
  }

  // public getProductBy(albumId: number, productId: number): Product {
  //   const productCard: Product = this.products.find((product) =>
  //     product.id === productId
  //   );
  //   return productCard;
  // }

  private parseShortSize(shortSize: string): Size {
    const size = shortSize.split('×');
    return {
      height: +size[0],
      width: +size[1],
      depth: +size[2]
    };
  }

  private productFabric(id: number, name: string, shortSize: string, price: number): Product {
    const photoUrl: string = `${this.photoBaseUrl}/${id}${this.imagesFormat}`;
    const size = this.parseShortSize(shortSize);
    const options = new Map([
      [ProductOption.Skin, this.skinService.options[0]],
      [ProductOption.Facade, this.facadeService.options[0]]
    ]);
    return { id, name, size, price, photoUrl, options };
  }
}
