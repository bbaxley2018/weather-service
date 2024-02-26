import { Injectable } from '@angular/core';
import { IObservationStationResponse } from '../models/ObservationResponse/IObservationResponse';

@Injectable({
  providedIn: 'root'
})

/**
 * Service that allows for the UI to receive the observation stations from the API.
 */
export class ObservationService {

  base_url = 'http://localhost:3000';

  /**
   * Gets the observation stations that are available to check readings for.
   * @returns Promise of type IObservationStationResponse. Includes a status, message, and
   *          a list of observation station IDs.
   */
  async getObservations(): Promise<IObservationStationResponse> {
    const data = await fetch(`${this.base_url}/stations`);
    return await data.json() ?? [];
  }
  
  /**
   * Default Constructor.
   */
  constructor() {}
}

