import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {MaskEmailPipe} from "./helpers/pipe/mask-email.pipe";
import {HttpClientModule} from "@angular/common/http";
import {DataListComponent} from './components/data-list/data-list.component';
import {FormsModule} from "@angular/forms";
import {PostListComponent} from './components/post-list/post-list.component';
import {HomeComponent} from './pages/home/home.component';
import {AboutComponent} from './pages/about/about.component';
import {ContactComponent} from './pages/contact/contact.component';
import {NavBarComponent} from './components/nav-bar/nav-bar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {CalcComponent} from "./pages/calc/calc.component";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    DataListComponent,
    PostListComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    CalcComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaskEmailPipe,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
