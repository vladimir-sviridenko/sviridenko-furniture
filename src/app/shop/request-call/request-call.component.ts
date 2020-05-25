import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-request-call',
  templateUrl: './request-call.component.html',
  styleUrls: ['./request-call.component.scss']
})
export class RequestCallComponent implements OnInit {

  public requestCallForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    userPhone: new FormControl('', [Validators.required, Validators.pattern('^((\\+7|7|8)+([0-9]){10})$')]),
    userEmail: new FormControl('', [Validators.required, Validators.email])
  });

  constructor() { }

  ngOnInit(): void {
  }

}
