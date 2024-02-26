import { Component, Output, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DailyComponent } from './components/daily/daily.component';
import { WeeklyComponent } from './components/weekly/weekly.component';
import { ObservationService } from './services/observation.service';
import { IObservationStationResponse } from './models/ObservationResponse/IObservationResponse';
import { TEMPERATURE_UNIT } from './constants';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DailyComponent,
    WeeklyComponent,
    CommonModule,
    SelectDropDownModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrl:  './app.component.css'
})

/**
 * Main Component of the Program. Contains the sub components to track the daily and weekly
 * temperature trends.
 */
export class AppComponent {
  title = 'weather-ui';

  @Output() stationId = '';
  @Output() temperatureUnit = TEMPERATURE_UNIT.FARENHEIT;

  stationIds: string[] = [];
  config: any = {};
  observationService: ObservationService = inject(ObservationService);


  ngOnInit() {
    this.config = {
      search: true,
      height: 'auto',
      placeholder: 'Select a station',
      noResultsFound: 'None',
      limitTo: 10,
      searchPlaceholder: 'Search',
      multiple: false,
      
    };
     this.observationService.getObservations().then((response: IObservationStationResponse) => {
      this.stationIds = response.observations;
      this.stationId = this.stationIds[0];
    });

  }

  /**
   * Updates the station id output parameter used for the subcomponents.
   * @param stationId the station id passed in from the UI.
   */
  updateStationId(stationId: string) {
    if (this.stationIds.includes(stationId)) {
      this.stationId = stationId;
    }
  }

  /**
   * Updates the unit that is used to calculate the temperature
   * in the sub components. Can be either Farenheit or Celcius.
   * Returns either 'F' or 'C'. 
   * @param temperatureUnit the conversion unit passed in from the UI.
   */
  updateTemperatureUnit(temperatureUnit: string) {
    if(temperatureUnit[0] == TEMPERATURE_UNIT.FARENHEIT) {
      this.temperatureUnit = TEMPERATURE_UNIT.FARENHEIT;
    } else {
      this.temperatureUnit = TEMPERATURE_UNIT.CELCIUS;
    }
  }
}
