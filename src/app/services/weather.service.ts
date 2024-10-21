import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError, forkJoin } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);

  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;
  private geocodingUrl = environment.geocodingUrl;
  private pollutionUrl = environment.pollutionUrl;
  private uvUrl = environment.uvUrl;

  constructor() { }

  /**
   * Получение предложений городов для автозаполнения
   * @param city Начальные буквы названия города
   * @returns Observable с предложениями городов
   */
  getCitySuggestions(city: string): Observable<any> {
    const url = `${this.geocodingUrl}/direct`;
    const params = new HttpParams()
      .set('q', city)
      .set('limit', '10')
      .set('lang', 'ru')
      .set('appid', this.apiKey);

    return this.http.get(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Получение текущей погоды по названию города
   * @param city Название города
   * @returns Observable с данными текущей погоды
   */
  getCurrentWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}/weather`;
    const params = new HttpParams()
      .set('q', city)
      .set('units', 'metric')
      .set('lang', 'ru')
      .set('appid', this.apiKey);
    return this.http.get(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Получение прогноза погоды на 5 дней с интервалом в 3 часа
   * @param city Название города
   * @returns Observable с данными прогноза погоды
   */
  getWeatherForecast(city: string): Observable<any> {
    const url = `${this.apiUrl}/forecast`;
    const params = new HttpParams()
      .set('q', city)
      .set('units', 'metric')
      .set('lang', 'ru')
      .set('appid', this.apiKey);
    return this.http.get(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Геокодирование города для получения координат
   * @param city Название города
   * @returns Observable с координатами города
   */
  geocodeCity(city: string): Observable<any> {
    const url = `${this.geocodingUrl}/direct`;
    const params = new HttpParams()
      .set('q', city)
      .set('limit', '5')
      .set('lang', 'ru')
      .set('appid', this.apiKey);
    return this.http.get(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Получение данных о загрязнении воздуха
   * @param lat Широта
   * @param lon Долгота
   * @returns Observable с данными о загрязнении воздуха
   */
  getAirPollution(lat: number, lon: number): Observable<any> {
    const url = `${this.pollutionUrl}/air_pollution`;
    const params = new HttpParams()
      .set('lat', lat.toString())
      .set('lon', lon.toString())
      .set('appid', this.apiKey);
    return this.http.get(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Получение данных UV-индекса
   * @param lat Широта
   * @param lon Долгота
   * @returns Observable с данными UV-индекса
   */
  getUVIndex(lat: number, lon: number): Observable<any> {
    const url = `${this.uvUrl}/forecast`;
    const params = new HttpParams()
      .set('latitude', lat.toString())
      .set('longitude', lon.toString())
      .set('daily', 'uv_index_max,uv_index_clear_sky_max')
      .set('timezone', 'auto')
      .set('forecast_days', '1');
    return this.http.get(url, { params }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Обработка ошибок HTTP-запросов
   * @param error Объект ошибки
   * @returns Observable с ошибкой
   */
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Клиентская или сетевая ошибка
      console.error('Произошла ошибка:', error.error.message);
    } else {
      // Серверная ошибка
      console.error(
        `Сервер вернул код ${error.status}, ` +
        `тело ошибки: ${JSON.stringify(error.error)}`
      );
    }
    // Возвращаем наблюдаемый с ошибкой
    return throwError(`Что-то пошло не так; пожалуйста, попробуйте позже. Код ошибки: ${error.status}`);
  }
}
