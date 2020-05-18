import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { ProductService } from '@interfaces/ProductService';
import { ProductCard } from '@interfaces/ProductCard';
import { Album } from '@interfaces/Album';
import { PhotoSizeTypes } from '@interfaces/enums/PhotoSizeTypes.enum';
import { Photo } from '@interfaces/Photo';
import { PhotoSize } from '@interfaces/PhotoSize';


@Injectable()
export class KitchenCabinetService implements ProductService {

  private albumId: number = 375686981;
  private albumTitle: string = 'Эконом мебель';
  private albumDescription: string = '';

  private photoBaseUrl = '/assets/products/kitchen-cabinets';

  public albums: Album[] = [];
  public albums$: Observable<Album[]>;

  private products: ProductCard[] = [
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

  constructor() {
    this.albums$ = this.fetchAlbums();
  }

  private fetchAlbums(): Observable<Album[]> {
    this.albums = [{
      id: this.albumId,
      title: this.albumTitle,
      description: this.albumDescription,
      size: this.products.length,
      photos: this.products.map(product => product.photo),
      onlinePurchase: true
    }];

    return of(this.albums);
  }

  productFabric(id: number, name: string, size: string, price: number): ProductCard {
    const photoSizes: PhotoSize[] = [];
    for (const photoType in PhotoSizeTypes) {
      if (PhotoSizeTypes.hasOwnProperty(photoType)) {
        photoSizes.push({
          type: PhotoSizeTypes[photoType],
          url: `${this.photoBaseUrl}/${id}`
        });
      }
    }
    const photo: Photo = {
      id,
      sizes: photoSizes
    };
    return { id, name, photo, size, price };
  }

  getProductCards(): ProductCard[] {
    return this.products;
  }
}
