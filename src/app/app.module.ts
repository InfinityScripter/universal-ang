import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {MaskEmailPipe} from "./helpers/pipe/mask-email.pipe";
import {HttpClientModule} from "@angular/common/http";
import { DataListComponent } from './components/data-list/data-list.component';
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        UserProfileComponent,
        DataListComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaskEmailPipe,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
