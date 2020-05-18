import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { GalleryService } from '../http/gallery.service';
import { KitchenCabinetService } from './kitchen-cabinet.service';

import { ProductCard } from '@interfaces/ProductCard';
import { ProductService } from '@interfaces/ProductService';
import { Album } from '@interfaces/Album';

@Injectable()
export class ProductsService implements ProductService{

  public albums$: Observable<Album[]>;
  public albums: Album[];

  public mainService: GalleryService;
  public dependencies: ProductService[] = [];

  constructor(private galleryService: GalleryService, private kitchenCabinetService: KitchenCabinetService) {
    this.mainService = this.galleryService;
    this.dependencies = [
      this.mainService,
      this.kitchenCabinetService
    ];
    this.albums$ = this.fetchAlbums();
  }

  private fetchAlbums(): Observable<Album[]> {
    return this.mainService.fetchAlbums().pipe(
      map((albums: Album[]) => {
        for (let i = 1; i < this.dependencies.length; i++) {
          albums = [...this.dependencies[i].albums, ...albums];
        }
        return albums;
      }),
      share()
    );
  }

  public getProductCards(id: number): ProductCard[] {
    throw new Error('not implemented');
  }
}
