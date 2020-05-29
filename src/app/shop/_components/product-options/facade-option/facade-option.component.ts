import { Component, OnInit } from '@angular/core';
import { FacadeService } from '@services/facade.service';

@Component({
  selector: 'app-facade-option',
  templateUrl: './facade-option.component.html',
  styleUrls: ['./facade-option.component.scss']
})
export class FacadeOptionComponent implements OnInit {

  constructor(public facadeService: FacadeService) { }

  ngOnInit(): void {
  }

}
