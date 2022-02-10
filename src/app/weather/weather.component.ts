import { Component, OnDestroy, OnInit } from '@angular/core';
import { Weather } from '../weather';
import { WeatherService } from '../weather.service';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  weather!: Weather;
  private destroyed$: Subject<unknown> = new Subject<unknown>();

  constructor(private readonly weatherService: WeatherService) { }

  ngOnInit(): void {
  }


  search(city: string) {
    this.weatherService.getWeather(city)
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(100),
        distinctUntilChanged()

      ).subscribe((weather) => this.weather = weather);
  }

  ngOnDestroy(): void {
    if(this.destroyed$) {
      this.destroyed$.next(null);
      this.destroyed$.unsubscribe();
    }
  }

}
