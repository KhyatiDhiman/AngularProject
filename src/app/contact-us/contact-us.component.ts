import { Component, OnInit , Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormGroup,FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PopupModalComponent } from '../popup-modal/popup-modal.component';

export interface DialogData {
  message: string;
  name: string;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  phonePattern = "^(?:(?:\\+|0{0,2})91(\\s*[\\-]\\s*)?|[0]?)?[789]\\d{9}$";
  contactUsForm = new FormGroup({
  'name' : new FormControl('', [Validators.required]),
  'email' : new FormControl('', [Validators.required, Validators.email]),
  'phone': new FormControl('', [Validators.required, Validators.pattern(this.phonePattern)]),
  'comment': new FormControl('', [Validators.maxLength(1000)]),
  });

  constructor(private http:HttpClient, public dialog: MatDialog) { }

  ngOnInit() {
    
  }
  getErrorEmailMessage() {
    return this.contactUsForm.controls.email.hasError('required') ? 'You must enter a email' :
        this.contactUsForm.controls.email.hasError('email') ? 'Please enter valid email' :
            '';
  }
  onSubmit() {
    if(this.contactUsForm.status === 'VALID'){
      var formVal = this.contactUsForm.value
      var text = "User Name:->" +formVal.name + " %0d%0a" + "Email:-->"+ formVal.email +
      "%0d%0aPhone Number:-->"+ formVal.phone +" %0d%0aComment:-->" + formVal.comment;
      var mail = document.createElement("a");
      mail.href = "mailto:sample@CottonAvenue.com?subject=Request on Cotton Avenue&body=" +text+"\n";
      mail.click();
    }else {
      const dialogRef = this.dialog.open(PopupModalComponent, {
        width: '250px',
        data: {name: 'error' , message: 'Need correction in field(s)'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }
  }
  cancel() {
    this.contactUsForm = new FormGroup({
      'name' : new FormControl('', [Validators.required]),
      'email' : new FormControl('', [Validators.required, Validators.email]),
      'phone': new FormControl('', [Validators.required, Validators.pattern(this.phonePattern)]),
      'comment': new FormControl('', [Validators.maxLength(1000)]),
      });
  }
}
