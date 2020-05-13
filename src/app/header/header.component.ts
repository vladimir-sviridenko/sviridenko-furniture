import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { GalleryService } from '../services/gallery.service';
import { Album } from '../services/interfaces/Album';
import { KitchenCabinetService } from '../services/kitchen-cabinet.service';

type AlbumLink = {
  id: number,
  title: string,
  onlinePurchase: boolean
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public albumLinks: AlbumLink[] = [];

  constructor(
    private galleryService: GalleryService,
    private kitchenKabinetService: KitchenCabinetService,
  ) { }

  ngOnInit(): void {
    this.albumLinks.push({ id: this.kitchenKabinetService.albumId, title: this.kitchenKabinetService.title, onlinePurchase: true });
    this.galleryService.albums.subscribe((albums: Album[]) => {
      albums.forEach((album: Album) => {
        this.albumLinks.push({ id: album.id, title: album.title, onlinePurchase: false });
      });
    });
  }
}
