import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { Album } from './interfaces/Album';
import { VkResponse } from './interfaces/VkResponse';
import { ProductService } from './interfaces/ProductService';
import { ProductCard } from './interfaces/ProductCard';

@Injectable()
export class GalleryService implements ProductService {

  public info: { id: number, title: string }[] = [];

  public baseUrl = 'https://api.vk.com/method/';
  public ownerId = '-184311662';
  public accessToken = '797c1fca797c1fca797c1fca1e790dc5257797c797c1fca27c62cecb8dcd6ce6f9cf236';
  public apiVersion = '5.103';
  public albumsObservable: Observable<Album[]>;

  public products: ProductCard[] = [];

  constructor(private http: HttpClient) {
    this.albumsObservable = this.fetchAlbums();
  }

  public productCardFabric(id: number, name: string, price = null): ProductCard {
    throw new Error('Method not implemented.');
  }

  public getProductCards(id: number): ProductCard[] {
    throw new Error('Method not implemented.');
  }

  private fetchAlbums(): Observable<Album[]> {
    const url = this.generateVkUrl('photos.getAlbums', {
      owner_id: this.ownerId,
      access_token: this.accessToken,
      v: this.apiVersion
    });

    return this.http.jsonp(url, 'callback').pipe(
      catchError((): Observable<VkResponse<Album>> => of({
        response: {
          count: 0,
          items: []
        }
      })),
      map((vkResponse: VkResponse<Album>) => vkResponse.response.items),
      tap((albums) => {
        albums.forEach((album) => this.info.push({ id: album.id, title: album.title }));
      })
    );
  }

  private generateVkUrl(method: string, params: object): string {
    let url: string = this.baseUrl + method + '?';
    for (const [key, value] of Object.entries(params)) {
      url += `${key}=${value}&`;
    }
    return url;
  }
}
