import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AboutComponent} from "./pages/about/about.component";
import {ContactComponent} from "./pages/contact/contact.component";
import {HomeComponent} from "./pages/home/home.component";
import {CalcComponent} from "./pages/calc/calc.component";
import {WeatherComponent} from "./components/weather/weather.component";

const routes: Routes = [
  {path: 'calc', component: CalcComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: '', component: HomeComponent},
  {path: 'weather', component: WeatherComponent},
  {path: '**', redirectTo: ''}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}