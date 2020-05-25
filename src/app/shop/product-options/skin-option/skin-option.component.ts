import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SkinService } from '@services/skin.service';

@Component({
  selector: 'app-skin-option',
  templateUrl: './skin-option.component.html',
  styleUrls: ['./skin-option.component.scss']
})
export class SkinOptionComponent implements OnInit {

  public highImageUrl: string;
  public lowImageUrl: string;

  @Output()
  public check = new EventEmitter();

  constructor(public skinService: SkinService) { }

  ngOnInit(): void {
  }

}
