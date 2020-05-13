import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Album } from './interfaces/Album';
import { VkResponse } from './interfaces/VkResponse';

@Injectable()
export class GalleryService {

  public baseUrl = 'https://api.vk.com/method/';
  public ownerId = '-184311662';
  public accessToken = '797c1fca797c1fca797c1fca1e790dc5257797c797c1fca27c62cecb8dcd6ce6f9cf236';
  public apiVersion = '5.103';

  public albums: Observable<Album[]>;

  constructor(private http: HttpClient) {
    this.fetchAlbums();
  }

  public fetchAlbums(): Observable<Album[]> {
    const url = this.generateVkUrl('photos.getAlbums', {
      owner_id: this.ownerId,
      access_token: this.accessToken,
      v: this.apiVersion
    });

    this.albums = this.http.jsonp(url, 'callback').pipe(
      map((vkResponse: VkResponse<Album>) => vkResponse.response.items)
    );
    return this.albums;
  }

  private generateVkUrl(method: string, params: object): string {
    let url: string = this.baseUrl + method + '?';
    for (const [key, value] of Object.entries(params)) {
      url += `${key}=${value}&`;
    }
    return url;
  }
}
