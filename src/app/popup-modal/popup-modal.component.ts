import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogData } from '../contact-us/contact-us.component';

@Component({
  selector: 'app-popup-modal',
  templateUrl: './popup-modal.component.html',
  styleUrls: ['./popup-modal.component.scss']
})
export class PopupModalComponent implements OnInit {
  isError: boolean;

  constructor( public dialogRef: MatDialogRef<PopupModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      if(data.name === 'error' || data.message.indexOf('issue')> -1){
        this.isError = true;
        setTimeout(()=>{
          document.getElementById(dialogRef.id).classList.add('error');
        },300);
       
      }else {
        this.isError = false;
        setTimeout(()=>{
          document.getElementById(dialogRef.id).classList.remove('error');
        },300);
      
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
   ngOnInit() {
  }

}
