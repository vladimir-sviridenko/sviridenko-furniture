import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, tap, catchError, mergeMap } from 'rxjs/operators';

import { VkAlbum } from '@models/VkAlbum';
import { VkRequest } from '@models/VkRequest';
import { VkResponse } from '@models/VkResponse';
import { Product } from '@models/Product';
import { Photo } from '@models/Photo';

import { PhotoQuality } from '@models/enums/PhotoQuality.enum';
import { PhotoSize } from '@models/PhotoSize';
import { Album } from '@models/Album';

@Injectable()
export class GalleryService {

  public vkAlbums: VkAlbum[];

  public productAlbums$: Observable<Album[]>;

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
    this.productAlbums$ = this.fetchAlbums();
  }

  private getProductCardsPhotoUrl(photo: Photo, photoQuality: PhotoQuality): string {
    let photoSize = photo.sizes.find((size: PhotoSize) => size.type === photoQuality);
    photoSize = (photoQuality === PhotoQuality.Low && photoSize.width > photoSize.height)
      ? photo.sizes.find((size: PhotoSize) => size.type === PhotoQuality.Middle)
      : photoSize;
    return photoSize.url;
  }

  // public getProductBy(albumId: number, productId: number): Product {
  //   const albumWithProduct = this.vkAlbums.find((album) => album.id === albumId);
  //   const productPhoto = albumWithProduct
  //     ? albumWithProduct.photos.find((photo: Photo) => photo.id === productId)
  //     : null;
  //   const productCard: Product = productPhoto
  //     ? {
  //       id: productPhoto.id,
  //       name: productPhoto.text || albumWithProduct.title,
  //       size: null,
  //       price: null,
  //       photoUrl: this.getProductCardsPhotoUrl(productPhoto, PhotoQuality.Large),
  //       options: null,
  //     }
  //     : null;
  //   return productCard;
  // }

  public getProductsFrom(album: VkAlbum): Product[] {
    return album.photos.map((photo) => {
      const productCard: Product = {
        id: photo.id,
        name: photo.text || '',
        size: null,
        price: null,
        photoUrl: this.getProductCardsPhotoUrl(photo, PhotoQuality.Low),
        options: new Map()
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

  private fetchPhotosInto(album: VkAlbum): Observable<VkAlbum> {
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
      catchError((): Observable<VkResponse<VkAlbum[]>> => of(this.emptyVkResponse)),
      map((vkResponse: VkResponse<VkAlbum[]>) => {
        const albums = vkResponse.response.items;
        return albums.map((album: VkAlbum) => {
          album.photos = [];
          return album;
        });
      }),
      mergeMap((albums: VkAlbum[]) => {
        return (albums.length === 0) ? of([]) : forkJoin(albums.map(album => this.fetchPhotosInto(album)));
      }),
      tap((albums: VkAlbum[]) => this.vkAlbums = albums),
      map((albums: VkAlbum[]) => {
        const productAlbums = [];
        albums.forEach((album: VkAlbum) => {
          productAlbums.push({
            id: album.id,
            title: album.title,
            description: album.description,
            products: this.getProductsFrom(album)
          });
        });
        return productAlbums;
      })
    );
  }
}
