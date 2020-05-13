import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../services/gallery.service';
import { KitchenCabinetService } from '../services/kitchen-cabinet.service';
import { Album } from '../services/interfaces/Album';

import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {

  public id: number;
  public ids: number[] = [];

  constructor(
    private galleryService: GalleryService,
    private kitchenCabinetService: KitchenCabinetService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => this.id = params.id);
  }

  ngOnInit(): void {
    this.ids.push(this.kitchenCabinetService.albumId);

    this.galleryService.albums.subscribe((albums: Album[]) => {
      this.ids = albums.map(album => album.id);
    });
    this.redirectToExistingAlbum();
  }

  private redirectToExistingAlbum() {
    if (!this.ids.includes(this.id)) {
      this.router.navigate(['/products', this.ids[0]]);
    }
  }
}
