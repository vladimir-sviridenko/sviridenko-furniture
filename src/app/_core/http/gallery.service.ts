import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, tap, catchError, switchMap, concatMap, mergeMap } from 'rxjs/operators';

import { Album } from '@models/Album';
import { VkRequest } from '@models/VkRequest';
import { VkResponse } from '@models/VkResponse';
import { ProductService } from '@models/ProductService';
import { ProductCard } from '@models/ProductCard';
import { Photo } from '@models/Photo';

@Injectable()
export class GalleryService implements ProductService {

  public albums: Album[] = [];
  public albums$: Observable<Album[]>;

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

  private generateVkUrl(method: string, params: VkRequest): string {
    let url: string = this.baseUrl + method + '?';
    for (const [key, value] of Object.entries(params)) {
      url += `${key}=${value}&`;
    }
    return url;
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
            sizes: photo.sizes
          });
        });
        return album;
      })
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
          return album;
        });
      }),
      mergeMap((albums: Album[]) => {
        return (albums.length === 0) ? of([]) : forkJoin(albums.map(album => this.fetchPhotosInto(album)));
      }),
      tap((albums: Album[]) => this.albums = albums)
    );
  }

  public productCardFabric(id: number, name: string): ProductCard {
    throw new Error('Method not implemented.');
  }

  public getProductCards(id: number): ProductCard[] {
    throw new Error('Method not implemented.');
  }

}
