import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';

import { ActivatedRoute, Router} from '@angular/router';
import { Info } from '../services/interfaces/Info';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent implements OnInit {

  public id: number;
  public info: Info[];

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe(params => this.id = params.id);
  }

  ngOnInit(): void {
    this.productsService.infoObservable.subscribe((infos: Info[]) => {
      this.info = [...infos];
      this.redirectToExistingTable();
    });
  }

  private redirectToExistingTable() {
    let isExisting: boolean = false;

    for (let i = 0; !isExisting && i < this.info.length; i++) {
      isExisting = this.info[i].id === this.id;
    }

    if (!isExisting) {
      this.router.navigate(['/products', this.info[0].id]);
    }
  }
}
