import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {MaskEmailPipe} from "./helpers/pipe/mask-email.pipe";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {DataListComponent} from './components/data-list/data-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {WeatherComponent} from './components/weather/weather.component';
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {CarouselModule} from "primeng/carousel";
import {TagModule} from "primeng/tag";
import {ToolbarModule} from "primeng/toolbar";

@NgModule({ declarations: [
        AppComponent,
        UserProfileComponent,
        DataListComponent,
        PostListComponent,
        HomeComponent,
        AboutComponent,
        ContactComponent,
        CalcComponent,
        NavBarComponent,
        WeatherComponent
    ],
    bootstrap: [AppComponent],
  imports: [BrowserModule,
    AppRoutingModule,
    MaskEmailPipe,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule, CarouselModule, TagModule, ToolbarModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
}
