import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  weatherForm: FormGroup;
  currentWeather: any;
  weatherForecast: any;
  airPollution: any;
  uvIndex: any;
  errorMessage: string = '';
  isLoading: boolean = false;

  // Массив предложений городов
  filteredCities$: Observable<any[]> | undefined;

  constructor(private weatherService: WeatherService) {
    // Инициализация формы с контролем для ввода города
    this.weatherForm = new FormGroup({
      city: new FormControl('')
    });
  }

  ngOnInit(): void {
    // Настройка автозаполнения для поля ввода города
    this.filteredCities$ = this.weatherForm.get('city')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => {
        this.errorMessage = '';
      }),
      switchMap((value: string) => {
        if (value.length < 2) {
          // Минимум 2 символа для поиска
          return of([]);
        }
        return this.weatherService.getCitySuggestions(value).pipe(
          catchError(err => {
            this.errorMessage = err;
            return of([]);
          })
        );
      }),
      map((cities: any[]) => cities.slice(0, 5)) // Ограничение до 5 предложений
    );

    // Подписка на изменения в поле ввода города
    this.weatherForm.get('city')?.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => {
        this.isLoading = true;
        this.errorMessage = '';
      }),
      switchMap((city: string) => this.getWeatherData(city))
    ).subscribe(
      () => {
        this.isLoading = false;
      },
      (error: any) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    );
  }

  /**
   * Получение данных о погоде, загрязнении и UV-индексе
   * @param city Название города
   * @returns Observable
   */
  getWeatherData(city: string): Observable<any> {
    if (!city) {
      this.currentWeather = null;
      this.weatherForecast = null;
      this.airPollution = null;
      this.uvIndex = null;
      return of(null);
    }

    return this.weatherService.getCurrentWeather(city).pipe(
      switchMap(current => {
        this.currentWeather = current;
        const lat = current.coord.lat;
        const lon = current.coord.lon;
        return this.weatherService.getWeatherForecast(city).pipe(
          switchMap(forecast => {
            this.weatherForecast = forecast;
            return this.weatherService.getAirPollution(lat, lon).pipe(
              switchMap(pollution => {
                this.airPollution = pollution;
                return this.weatherService.getUVIndex(lat, lon).pipe(
                  tap(uv => {
                    this.uvIndex = uv;
                  })
                );
              })
            );
          })
        );
      }),
      catchError(err => {
        this.errorMessage = err;
        this.currentWeather = null;
        this.weatherForecast = null;
        this.airPollution = null;
        this.uvIndex = null;
        return of(null);
      })
    );
  }

  /**
   * Получение описания AQI по индексу
   * @param aqi Индекс качества воздуха
   * @returns Описание качества воздуха
   */
  getAQIDescription(aqi: number): string {
    switch (aqi) {
      case 1:
        return 'Хорошо';
      case 2:
        return 'Удовлетворительно';
      case 3:
        return 'Средне';
      case 4:
        return 'Плохо';
      case 5:
        return 'Очень плохо';
      default:
        return 'Неизвестно';
    }
  }

  /**
   * Обработка выбора города из предложений
   * @param event Событие выбора
   */
  onOptionSelected(event: any) {
    const selectedCityName = event.option.value;
    // Optionally update the form control if needed
    this.weatherForm.get('city')?.setValue(selectedCityName, { emitEvent: false });
    this.getWeatherData(selectedCityName).subscribe();
  }
}
