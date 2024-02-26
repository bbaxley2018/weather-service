import { Component, Input, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemperatureService as TemperatureReadingService } from '../../services/temperature.service';
import { ITemperatureReadingRepsonse } from '../../models/TemperatureReadingResponse/ITemperatureReadingReponse';
import { ITemperatureReading } from '../../models/TemperatureReading/ITemperatureReading';
import { HttpStatusCode } from '@angular/common/http';


@Component({
  selector: 'app-weekly',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weekly.component.html',
  styleUrl: './weekly.component.css'
})

/**
 * Component that displays the last seven day average temperatures for a given weather station.
 * @Input weatherStationId: the id of the weather station whose reading is requested.
 * @Input temperatureUnit: the conversion unit for displaying the temperature. Either 'C' or 'F'.
 */
export class WeeklyComponent {
  
  @Input() weatherStationId = '';
  @Input() temperatureUnit ='';

  hasTemperatureReadings: boolean = false;
  temperatureReadings: Array<ITemperatureReading> = new Array<ITemperatureReading>();
  temperatureReadingService: TemperatureReadingService = inject(TemperatureReadingService);


  /**
   * Default constructor. Updates weekly temperature with default value on startup.
   */
  constructor() {
    this.updateWeeklyTemperature();
  }

  /**
   * Fired when changes to UI variables are made. 
   * This change will update the weekly temperature that is displayed.
   * @param changes 
   */
  ngOnChanges(changes: SimpleChanges) {
    this.updateWeeklyTemperature();
  }

  /**
   * Updates the value of the weekly temperature that is displayed.
   * Makes a request to the back-end service given the weatherStationId's current value.
   * @precondition weatherStationId != '' or null.
   * @return a list of average temperature readings.
   *         also, state variable hasTemperatureReadings is updated true if a list of temperature readings is received.
   *         hasTemperatureReadings state is set to false if an error is returned or the list is empty.
   */
  private updateWeeklyTemperature() {
    if(this.weatherStationId != '' && this.weatherStationId != null) {
      this.temperatureReadingService.getWeeklyTemperature(this.weatherStationId).then((response: ITemperatureReadingRepsonse) => {
        
        //If we have temperature readings and the response is okay, then populate the temperature readings. 
        if(response.status == HttpStatusCode.Ok && response.temperatureReadings.length > 0) {
          this.temperatureReadings = response.temperatureReadings;
          this.hasTemperatureReadings = true;
        } else {
          this.hasTemperatureReadings = false;
        }
      });
    }
  }
}