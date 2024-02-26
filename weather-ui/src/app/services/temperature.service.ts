import { Injectable } from '@angular/core';
import { ITemperatureReadingRepsonse } from '../models/TemperatureReadingResponse/ITemperatureReadingReponse';


@Injectable({
  providedIn: 'root'
})

/**
 * Web service allowing the UI to communicate with the Service containing the 
 * observation stations and temperature readings.
 */
export class TemperatureService {

  constructor() { }

  base_url = 'http://localhost:3000';

  /**
   * Gets the most recent daily temperature reading from the service.
   * @param weatherStationId the weather station whose temperature reading is requested. i.e. KATL
   * @returns Promise of type ITemperatureReadingResponse. Contains status, message, and a temperature reading.
   */
  async getDailyTemperature(weatherStationId: string): Promise<ITemperatureReadingRepsonse> {
    const data = await fetch(`${this.base_url}/daily/${weatherStationId}`)
    return await data.json() ?? [];
  }
  
  /**
   * Gets the average temperature readings from the last seven days from the service.
   * @param weatherStationId the weather station whose temperature reading is requested. i.e. KATL
   * @returns Promise of type ITemperatureReadingResponse. Contains status, message, and 
   * list of average temperature readings from the last seven days.
   */
  async getWeeklyTemperature(weatherStationId: string): Promise<ITemperatureReadingRepsonse> {
    const data = await fetch(`${this.base_url}/weekly/${weatherStationId}`);
    return await data.json() ?? [];
  }
}

