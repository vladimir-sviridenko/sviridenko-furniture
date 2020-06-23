import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-full-photo',
	templateUrl: './full-photo.component.html',
	styleUrls: ['./full-photo.component.scss']
})
export class FullPhotoComponent {

	constructor(public dialogRef: MatDialogRef<FullPhotoComponent>,
		@Inject(MAT_DIALOG_DATA) public url: string) { }
}
