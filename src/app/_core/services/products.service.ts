import { Injectable } from '@angular/core';
import { Observable, Subject, combineLatest } from 'rxjs';
import { map, share, first, tap } from 'rxjs/operators';

import { GalleryService } from '../http/gallery.service';
import { KitchenCabinetService } from './kitchen-cabinet.service';

import { ProductCard } from '@models/ProductCard';
import { ProductService } from '@models/ProductService';
import { Album } from '@models/Album';

@Injectable()
export class ProductsService {

  public currentProduct$: Subject<ProductCard> = new Subject<ProductCard>();

  public isProductCardsLoaded: boolean = false;
  public currentAlbumId: number;
  public productCards$: Subject<ProductCard[]> = new Subject<ProductCard[]>();
  public albums$: Observable<Album[]>;
  public albums: Album[];

  public mainService: GalleryService;
  public dependencies: ProductService[] = [];

  constructor(private galleryService: GalleryService, private kitchenCabinetService: KitchenCabinetService) {
    this.mainService = this.galleryService;
    this.dependencies = [
      this.kitchenCabinetService,
      this.mainService
    ];
    this.albums$ = this.fetchAlbums();
  }

  public hideCards(linkToAlbumId: number) {
    this.isProductCardsLoaded = (linkToAlbumId === this.currentAlbumId);
  }

  private fetchAlbums(): Observable<Album[]> {
    return combineLatest([this.kitchenCabinetService.albums$, this.mainService.albums$])
    .pipe(
      map(([album1, album2]) => {
        return [...album1, ...album2];
      }),
      share(),
      first()
    );
  }

  private getServiceBy(albumId: number): ProductService {
    return this.dependencies.find(service =>
      service.albums.find(serviceAlbum => serviceAlbum.id === albumId));
  }

  public updateProductCards(albumId: number): boolean {
    const serviceWithAlbum: ProductService = this.getServiceBy(albumId);
    if (!serviceWithAlbum) {
      return false;
    }
    this.currentAlbumId = albumId;
    const currentAlbum: Album = serviceWithAlbum.albums.find(album => album.id === albumId);
    const productCards: ProductCard[] = serviceWithAlbum.getProductCards(currentAlbum);
    this.productCards$.next(productCards);
    return true;
  }

  public updateProduct(albumId: number, productId: number): boolean {
    const serviceWithAlbum: ProductService = this.getServiceBy(albumId);
    if (!serviceWithAlbum) {
      return false;
    }
    const productCard: ProductCard = serviceWithAlbum.getProductCardBy(albumId, productId);
    this.currentProduct$.next(productCard);
    return true;
  }
}
