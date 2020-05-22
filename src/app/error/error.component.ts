import { Component, OnInit } from '@angular/core';
import { GlobalErrorHandler } from '@core/interceptors/global-error-handler';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
