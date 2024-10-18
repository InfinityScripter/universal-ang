import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, catchError, tap, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

// Импорт необходимых модулей PrimeNG
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

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

  // Новое свойство для данных прогноза погоды в карусели
  forecastList: any[] = [];

  // Опции для адаптивности карусели
  responsiveOptions: any[];

  constructor(private weatherService: WeatherService) {
    // Инициализация формы с контролем для ввода города
    this.weatherForm = new FormGroup({
      city: new FormControl('')
    });

    // Инициализация опций адаптивности карусели
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
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
      this.forecastList = [];
      return of(null);
    }

    return this.weatherService.getCurrentWeather(city).pipe(
      switchMap(current => {
        this.currentWeather = current;
        const lat = current.coord.lat;
        const lon = current.coord.lon;
        return this.weatherService.getWeatherForecast(city).pipe(
          tap(forecast => {
            this.weatherForecast = forecast;
            this.processForecastData(forecast);
          }),
          switchMap(() => {
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
        this.forecastList = [];
        return of(null);
      })
    );
  }

  /**
   * Обработка данных прогноза для карусели
   * @param forecastData Сырые данные прогноза от API
   */
  processForecastData(forecastData: any) {
    this.forecastList = forecastData.list.map((item: any) => {
      return {
        date: new Date(item.dt_txt),
        temp: item.main.temp,
        feels_like: item.main.feels_like,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        wind_speed: item.wind.speed,
      };
    });
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
    this.weatherForm.get('city')?.setValue(selectedCityName, { emitEvent: false });
    this.getWeatherData(selectedCityName).subscribe();
  }

  /**
   * Получение уровня серьёзности для тега на основе описания погоды
   * @param description Описание погоды
   * @returns Строка с уровнем серьёзности
   */
  getSeverity(description: string) {
    if (description.includes('дождь')) {
      return 'info';
    } else if (description.includes('ясно')) {
      return 'success';
    } else if (description.includes('облачно')) {
      return 'warning';
    } else {
      return 'secondary';
    }
  }
}
