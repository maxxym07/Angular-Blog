import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ModalModule } from 'ngx-bootstrap/modal';
import { Homework16Component } from './homework16/homework16.component';


@NgModule({
  declarations: [
    AppComponent,
    Homework16Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
