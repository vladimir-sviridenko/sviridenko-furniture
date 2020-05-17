import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {

  public albumId: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.albumId = params.albumId);
  }

  ngOnInit(): void {}
}
