import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);

  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;

  // Получение текущей погоды по названию города
  getCurrentWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}/weather?q=${city}&units=metric&lang=ru&appid=${this.apiKey}`;
    return this.http.get(url);
  }

  // Получение прогноза погоды на несколько дней
  getWeatherForecast(city: string): Observable<any> {
    const url = `${this.apiUrl}/forecast?q=${city}&units=metric&lang=ru&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
