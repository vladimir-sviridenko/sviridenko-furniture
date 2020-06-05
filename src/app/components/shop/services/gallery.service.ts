import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, tap, catchError, mergeMap } from 'rxjs/operators';

import { VkAlbum } from '@shop/models/VkAlbum';
import { VkRequest } from '@shop/models/VkRequest';
import { VkResponse } from '@shop/models/VkResponse';
import { Product } from '@shop/models/Product';
import { VkPhoto } from '@shop/models/VkPhoto';

import { VkPhotoQuality } from '@shop/models/enums/VkPhotoQuality.enum';
import { VkPhotoSize } from '@shop/models/VkPhotoSize';
import { Album } from '@shop/models/Album';
import { PhotoUrl } from '@shop/models/PhotoUrl';

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

  private getProductPhotoUrl(photo: VkPhoto): PhotoUrl {
    function getVkPhotoSize(sizeType: VkPhotoQuality): VkPhotoSize {
      return photo.sizes.find((size: VkPhotoSize) => size.type === sizeType);
    }

    const photoLowSize: VkPhotoSize = (photo.sizes[0].width > photo.sizes[0].height)
      ? getVkPhotoSize(VkPhotoQuality.Medium)
      : getVkPhotoSize(VkPhotoQuality.Low);

    const photoUrl: PhotoUrl = {
      low: photoLowSize.url,
      high: getVkPhotoSize(VkPhotoQuality.Large).url,
    };

    return photoUrl;
  }

  public getProductsFrom(album: VkAlbum): Product[] {
    return album.photos.map((photo) => {
      const productCard: Product = {
        id: photo.id,
        name: photo.text || '',
        size: null,
        price: null,
        photoUrl: this.getProductPhotoUrl(photo),
        options: [],
        selectedOptions: []
      };
      return productCard;
    });
  }

  private generateVkRequestUrl(method: string, params: VkRequest): string {
    let url: string = this.baseUrl + method + '?';
    for (const [key, value] of Object.entries(params)) {
      url += `${key}=${value}&`;
    }
    return url;
  }

  private fetchPhotosInto(album: VkAlbum): Observable<VkAlbum> {
    const url = this.generateVkRequestUrl('photos.get', {
      owner_id: this.ownerId,
      album_id: album.id,
      access_token: this.accessToken,
      v: this.apiVersion
    });

    return this.http.jsonp(url, 'callback').pipe(
      catchError((): Observable<VkResponse<VkPhoto[]>> => of(this.emptyVkResponse)),
      map((vkResponse: VkResponse<VkPhoto[]>) => vkResponse.response.items),
      map((photos: VkPhoto[]) => {
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
    const url = this.generateVkRequestUrl('photos.getAlbums', {
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
