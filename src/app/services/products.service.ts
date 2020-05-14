import { Injectable } from '@angular/core';
import { GalleryService } from './gallery.service';
import { KitchenCabinetService } from './kitchen-cabinet.service';
import { ProductCard } from './interfaces/ProductCard';
import { ProductService } from './interfaces/ProductService';
import { Album } from './interfaces/Album';
import { Info } from './interfaces/Info';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ProductsService {

  public infoObservable: Observable<Info[]>;

  public mainService: GalleryService;
  public dependencies: ProductService[] = [];

  constructor(private galleryService: GalleryService, private kitchenCabinetService: KitchenCabinetService) {
    this.mainService = this.galleryService;
    this.dependencies = [
      this.mainService,
      this.kitchenCabinetService
    ];

    this.infoObservable = this.fetchInfo();
  }



  private fetchInfo(): Observable<Info[]> {
    return this.mainService.albumsObservable.pipe(
      map((albums: Album[]) => {
        const info: Info[] = [];
        for (let i = 1; i < this.dependencies.length; i++) {
          info.push(...this.dependencies[i].info);
        }
        albums.forEach((album: Album) => {
          info.push({
            id: album.id,
            title: album.title
          });
        });
        return info;
      })
    );
  }

  public getProductCards(id: number): ProductCard[] {
  let cards: ProductCard[] = [];
  this.dependencies.forEach((service) => {
    service.info.forEach((serviceInfo) => {
      cards = [...cards, ...service.getProductCards(serviceInfo.id)];
    });
  });

  return cards;
}
}
