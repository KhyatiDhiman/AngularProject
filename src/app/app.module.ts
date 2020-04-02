import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import {MatFormFieldModule, MatInputModule, MatDialogModule} from '@angular/material';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingComponent } from './shopping/shopping.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { PopupModalComponent } from './popup-modal/popup-modal.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

@NgModule({
  declarations: [
    AppComponent,
    ShoppingComponent,
    ContactUsComponent,
    PopupModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTabsModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    NgbModule,
    ScrollToModule.forRoot()
    ],
  providers: [],
  entryComponents: [PopupModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
