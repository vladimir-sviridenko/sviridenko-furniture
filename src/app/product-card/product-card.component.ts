import { Component, OnInit, Input } from '@angular/core';
import { ProductCard } from '../services/interfaces/ProductCard';
import { Size } from '../services/interfaces/Size';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, ProductCard {

  @Input()
  id: number;
  @Input()
  name: string;
  @Input()
  image: { low: string; high: string; };
  @Input()
  size: string;
  @Input()
  price: number;

  constructor() { }

  ngOnInit(): void {
  }

}
