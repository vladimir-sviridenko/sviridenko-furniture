import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, tap, catchError, mergeMap } from 'rxjs/operators';

import { Album } from '@models/Album';
import { VkRequest } from '@models/VkRequest';
import { VkResponse } from '@models/VkResponse';
import { ProductService } from '@models/ProductService';
import { ProductCard } from '@models/ProductCard';
import { Photo } from '@models/Photo';

import { PhotoQuality } from '@models/enums/PhotoQuality.enum';
import { PhotoSize } from '@models/PhotoSize';

@Injectable()
export class GalleryService implements ProductService {

  public albums$: Observable<Album[]>;
  public albums: Album[];

  private baseUrl = 'https://api.vk.com/method/';
  private ownerId = -184311662;
  private accessToken = '797c1fca797c1fca797c1fca1e790dc5257797c797c1fca27c62cecb8dcd6ce6f9cf236';
  private apiVersion = 5.103;

  private get emptyVkResponse() {
    const emptyVkResponse = {
      response: {
        count: 0,
        items: []
      }
    };
    return emptyVkResponse;
  }

  constructor(private http: HttpClient) {
    this.albums$ = this.fetchAlbums();
  }

  private getProductCardsPhotoUrl(photo: Photo, photoQuality: PhotoQuality): string {
    let photoSize = photo.sizes.find((size: PhotoSize) => size.type === photoQuality);
    photoSize = (photoQuality === PhotoQuality.Low && photoSize.width > photoSize.height)
      ? photo.sizes.find((size: PhotoSize) => size.type === PhotoQuality.Middle)
      : photoSize;
    return photoSize.url;
  }

  public getProductCardBy(albumId: number, productId: number): ProductCard {
    const albumWithProduct = this.albums.find((album) => album.id === albumId);
    const productPhoto = albumWithProduct
      ? albumWithProduct.photos.find((photo: Photo) => photo.id === productId)
      : null;
    const productCard: ProductCard = productPhoto
      ? {
        id: productPhoto.id,
        name: productPhoto.text || albumWithProduct.title,
        size: null,
        price: null,
        photoUrl: this.getProductCardsPhotoUrl(productPhoto, PhotoQuality.Large),
        productOptions: [],
      }
      : null;
    return productCard;
  }

  public getProductCards(album: Album): ProductCard[] {
    return album.photos.map((photo) => {
      const productCard: ProductCard = {
        id: photo.id,
        name: photo.text || album.title,
        size: null,
        price: null,
        photoUrl: this.getProductCardsPhotoUrl(photo, PhotoQuality.Low),
        productOptions: null
      };
      return productCard;
    });
  }

  private generateVkUrl(method: string, params: VkRequest): string {
    let url: string = this.baseUrl + method + '?';
    for (const [key, value] of Object.entries(params)) {
      url += `${key}=${value}&`;
    }
    return url;
  }

  private sortPhotosByPortrait(albums: Album[]) {
    albums.forEach((album) => {
      album.photos.sort((photo, nextPhoto) => {
        const photoMinHeight: number = Number(photo.sizes[0].height);
        const nextPhotoMinHeight: number = Number(nextPhoto.sizes[0].height);
        return nextPhotoMinHeight - photoMinHeight;
      });
    });
    return albums;
  }

  private fetchPhotosInto(album: Album): Observable<Album> {
    const url = this.generateVkUrl('photos.get', {
      owner_id: this.ownerId,
      album_id: album.id,
      access_token: this.accessToken,
      v: this.apiVersion
    });

    return this.http.jsonp(url, 'callback').pipe(
      catchError((): Observable<VkResponse<Photo[]>> => of(this.emptyVkResponse)),
      map((vkResponse: VkResponse<Photo[]>) => vkResponse.response.items),
      map((photos: Photo[]) => {
        photos.forEach(photo => {
          album.photos.push({
            id: photo.id,
            sizes: photo.sizes,
            text: photo.text
          });
        });
        return album;
      }),
    );
  }

  public fetchAlbums(): Observable<Album[]> {
    const url = this.generateVkUrl('photos.getAlbums', {
      owner_id: this.ownerId,
      access_token: this.accessToken,
      v: this.apiVersion
    });

    return this.http.jsonp(url, 'callback').pipe(
      catchError((): Observable<VkResponse<Album[]>> => of(this.emptyVkResponse)),
      map((vkResponse: VkResponse<Album[]>) => {
        const albums = vkResponse.response.items;
        return albums.map((album: Album) => {
          album.onlinePurchase = false;
          album.photos = [];
          album.productOptions = [];
          return album;
        });
      }),
      mergeMap((albums: Album[]) => {
        return (albums.length === 0) ? of([]) : forkJoin(albums.map(album => this.fetchPhotosInto(album)));
      }),
     // map((albums: Album[]) => this.sortPhotosByPortrait(albums)),
      tap((albums) => { this.albums = albums; })
    );
  }
}
