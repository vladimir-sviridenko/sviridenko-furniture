import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmailService } from '@services/email.service';
import { EmailTemplate } from '@models/enums/EmailTemplate';
import { EmailJSResponseStatus } from 'emailjs-com';


@Component({
  selector: 'app-request-call',
  templateUrl: './request-call.component.html',
  styleUrls: ['./request-call.component.scss']
})
export class RequestCallComponent implements OnInit {

  public showLoader: boolean = true;

  public requestCallForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    userPhone: new FormControl('', [Validators.required, Validators.pattern('^((\\+7|7|8)+([0-9]){10})$')]),
    userEmail: new FormControl('', [Validators.required, Validators.pattern('.+@.+\\..+')]),
    productPhotoUrl: new FormControl('')
  });

  constructor(private emailService: EmailService,
              private dialogRef: MatDialogRef<RequestCallComponent>,
              @Inject(MAT_DIALOG_DATA) public productPhotoUrl: string) { }

  ngOnInit(): void {
    this.requestCallForm.controls.productPhotoUrl.setValue(this.productPhotoUrl);
  }

  public requestCall(event: Event): void {
    const form: HTMLFormElement = event.target as HTMLFormElement;
    this.emailService.sendForm(EmailTemplate.RequestCall, form)
      .then(() => {
        this.dialogRef.close(true);
      })
      .catch(() => {
        this.dialogRef.close(false);
      });
  }
}
