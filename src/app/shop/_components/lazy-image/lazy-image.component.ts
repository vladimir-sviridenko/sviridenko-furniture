import { Component, Input, OnChanges, SimpleChanges, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrls: ['./lazy-image.component.scss'],
})
export class LazyImageComponent implements OnChanges {

  @Input()
  public title: string;

  @Input()
  public src: string;

  public isImageLoaded: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src.previousValue !== changes.src.currentValue && !changes.src.isFirstChange()) {
      this.isImageLoaded = false;
    }
  }
}
