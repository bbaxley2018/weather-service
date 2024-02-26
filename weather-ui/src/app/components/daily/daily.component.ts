import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemperatureService } from '../../services/temperature.service';
import { ITemperatureReadingRepsonse } from '../../models/TemperatureReadingResponse/ITemperatureReadingReponse';
import { ITemperatureReading } from '../../models/TemperatureReading/ITemperatureReading';
import { HttpStatusCode } from '@angular/common/http';



@Component({
  selector: 'app-daily',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './daily.component.html',
  styleUrl: './daily.component.css'
})

/**
 * Component utilized to display the latest temperature reading from today.
 * @Input weatherStationId: the id of the weather station whose reading is requested.
 * @Input temperatureUnit: the conversion unit for displaying the temperature. Either 'C' or 'F'.
 */
export class DailyComponent {

  @Input() weatherStationId = '';
  @Input() temperatureUnit = '';

  hasTemperature: boolean = false;
  temperatureReading: ITemperatureReading = {
      date: '',
      temperature: 0
  };

  temperatureService: TemperatureService = inject(TemperatureService);

  /**
   * Default Constructor.
   */
  constructor() {
    this.updateDailyTemperature();
  }

  /**
   * Fired when changes to UI variables are made. 
   * This change will update the daily temperature that is displayed.
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges) {
    this.updateDailyTemperature();
  }

  /**
   * Updates the value of the daily temperature that is displayed.
   * Makes a request to the back-end service given the weatherStationId's current value.
   * @precondition weatherStationId != '' or null.
   * @return a temperature reading if the response is okay. Otherwise, returns nothing.
   *         also, state variable hasTemperature is updated true if a temperature reading is received.
   *         hasTemperature state is set to false if an error is returned.
   */
  private updateDailyTemperature() {
    if(this.weatherStationId != '' && this.weatherStationId != null) {
      this.temperatureService.getDailyTemperature(this.weatherStationId).then((response: ITemperatureReadingRepsonse) => {
        if(response.status == HttpStatusCode.Ok){
          this.temperatureReading = response.temperatureReadings[0];
          this.hasTemperature = true;
        } else {
            this.hasTemperature = false;
        }
      });
    }
  }
}
