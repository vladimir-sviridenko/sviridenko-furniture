import { Injectable } from '@angular/core';
import { Observable, Subject, combineLatest, BehaviorSubject, of } from 'rxjs';
import { map, share, first, tap } from 'rxjs/operators';

import { GalleryService } from '../http/gallery.service';
import { KitchenCabinetService } from './kitchen-cabinet.service';

import { ProductCard } from '@models/ProductCard';
import { ProductService } from '@models/ProductService';
import { Album } from '@models/Album';

@Injectable()
export class ProductsService {

  public currentProduct$: BehaviorSubject<ProductCard> = new BehaviorSubject<ProductCard>(undefined);

  public isLoading: boolean = true;
  public currentAlbumId: number;
  public productCards$: BehaviorSubject<ProductCard[]> = new BehaviorSubject<ProductCard[]>(undefined);
  public albums$: Observable<Album[]>;

  public mainService: GalleryService;
  public dependencies: ProductService[] = [];

  constructor(public galleryService: GalleryService, private kitchenCabinetService: KitchenCabinetService) {
    this.dependencies = [
      this.kitchenCabinetService,
      this.galleryService
    ];
    this.albums$ = this.fetchAlbums();
  }

  public hideCards(linkToAlbumId: number) {
    this.isLoading = linkToAlbumId !== this.currentAlbumId;
  }

  private fetchAlbums(): Observable<Album[]> {
    return combineLatest([this.kitchenCabinetService.albums$, this.galleryService.albums$])
      .pipe(
        map(([album1, album2]) => {
          return [...album1, ...album2];
        }),
        tap((albums) => this.albums$ = of(albums)),
        share()
      );
  }

  public getServiceBy(albumId: number): ProductService {
    return this.dependencies
      .find(service => service.albums.find(serviceAlbum => serviceAlbum.id === albumId));
  }

  public updateProductCards(albumId: number): ProductCard[] {
    const serviceWithAlbum: ProductService = this.getServiceBy(albumId);
    if (!serviceWithAlbum) {
      return null;
    }
    this.currentAlbumId = albumId;
    const currentAlbum: Album = serviceWithAlbum.albums.find(album => album.id === albumId);
    const productCards: ProductCard[] = serviceWithAlbum.getProductCards(currentAlbum);
    this.productCards$.next(productCards);
    return productCards;
  }

  public updateProduct(albumId: number, productId: number): ProductCard {
    const serviceWithAlbum: ProductService = this.getServiceBy(albumId);
    const productCard: ProductCard = serviceWithAlbum && (serviceWithAlbum !== this.galleryService)
      ? serviceWithAlbum.getProductCardBy(albumId, productId)
      : null;
    this.currentAlbumId = albumId;
    this.currentProduct$.next(productCard);
    this.isLoading = false;
    return productCard;
  }
}
