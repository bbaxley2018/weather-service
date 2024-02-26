import { ITemperatureService } from './ITemperatureService';
import { TemperatureReadingResponse } from '../TemperatureReadingResponse/TemperatureReadingResponse';
import { DailyTemperatureReadings as DailyTemperatureReadings } from '../../models/TemperatureReading/DailyTemperatureReadings';
import { ITemperatureRepsonse } from '../TemperatureReadingResponse/ITemperatureReadingReponse';
import { HttpStatusCode } from 'axios';
import { HTTP_OK, ROOT_API, TEMPERATURE_UNIT } from '../../constants';

import axios from 'axios';
import moment from 'moment';
import { ITemperatureReading } from '../../models/TemperatureReading/ITemperatureReading';


/**
 * Temperature Engine Service that Retrieves Temperature data for a given 
 * Observation Station
 */
class TemperatureService implements ITemperatureService{

    /**
     * Default Constructor
     */
    constructor() {}


    /**
     * Retrieves the Latest Temperature Data Point For a certain Observation Station
     * @param observationStationId The identifier for the Observation Station: i.e. KATL
     * @param unit The unit of temperature to return. Either 'F' or 'C'
     * @returns The latest temperature point for a given weather station.
     */
    public async GetLatestTemperature(observationStationId: string): Promise<ITemperatureRepsonse> {
        
        if(observationStationId == null) {
            return {
                status: HttpStatusCode.NotFound,
                message: `Error. Observation Station ${observationStationId} cannot be found.`,
                temperatureReadings: []
            };
        }
        
        const api_url = `${ROOT_API}/stations/${observationStationId}/observations/latest`;        
        const data = await axios.get(api_url).then((response) => {
            
            let temperatureReadingResponse = new TemperatureReadingResponse();
            let today = moment();
            let temp = response.data["properties"]["temperature"]["value"];


            let temperatureReading = {
                "date": today.format('YYYY-MM-DDTHH:MM')+':00Z',
                "temperature": temp
            };

            //Build the Response.
            temperatureReadingResponse.message = HTTP_OK;
            temperatureReadingResponse.status = HttpStatusCode.Ok;
            temperatureReadingResponse.temperatureReadings.push(temperatureReading);

            return temperatureReadingResponse;

        }).catch(function (error: any) {
			console.log(error);
            return {
                status: HttpStatusCode.SeeOther, 
                message: "An Error occurred when fetching the Daily Weather. Please try again later.",
                temperatureReadings: []
            };
		});
        
        return data;
    }

    /**
     * Retrieves the last seven days of temperatures for a given observation station.
     * The results are the average of all of the recorded temperatures for each given day.
     * @param observationStationId the identifier for the observation station. i.e. KATL
     * @returns a reponse containing the status, response messsage, and list of average
     *          temperature points from the previous 7 days from today.
     */
    public async GetWeeklyAverageTemperatures(observationStationId: string): Promise<ITemperatureRepsonse> { 
        if(observationStationId == null) {
            return {
                status: HttpStatusCode.NotFound,
                message: 'Error. City cannot be found.',
                temperatureReadings: []
            };
        }

        
        //Setup the Dates for the API Call.
        const today = moment();        
        const todayDateString = today.format('YYYY-MM-DDTHH:MM')+':00Z';
        const prevDateString =  today.subtract(7, 'day').format('YYYY-MM-DDTHH:MM')+':00Z';

        const api_url = `${ROOT_API}/stations/${observationStationId}/observations?start=${prevDateString}&end=${todayDateString}`;


        const data = await axios.get(api_url).then((response) => {
            
            let dailyTemperatureReadings = new Map<string, DailyTemperatureReadings>();
            let temperatureReadingResponse = new TemperatureReadingResponse();
            let averageDailyTemperatureReadings = new Array<ITemperatureReading>();

            //Sort all of the recorded temperatures for each day.
            for (let i=0; i < response.data["features"].length; i++) {
                
                let date = response.data["features"][i]["properties"]["timestamp"].toString().substring(0,10);
                let temperature = response.data["features"][i]["properties"]["temperature"]["value"];

                //If we don't have a record for the current date already. Create the entry
                //Otherwise, add the next temperature record.
                if(dailyTemperatureReadings.has(date)) {
                    dailyTemperatureReadings.get(date)?.Add(temperature);
                
                } else  {
                    dailyTemperatureReadings.set(date, new DailyTemperatureReadings(date));
                    dailyTemperatureReadings.get(date)?.Add(temperature);
                }
            }

            //Calculate the Average Temperature for each day.
            dailyTemperatureReadings.forEach((temperatureReadings: DailyTemperatureReadings) => {
               averageDailyTemperatureReadings.push(temperatureReadings.Average());
            });


            //Build the response.
            temperatureReadingResponse = new TemperatureReadingResponse();
            temperatureReadingResponse.status = HttpStatusCode.Ok;
            temperatureReadingResponse.message = HTTP_OK;
            temperatureReadingResponse.temperatureReadings = averageDailyTemperatureReadings;

            return temperatureReadingResponse;
            
        }).catch(function (error: any) {
            return {
                status: HttpStatusCode.SeeOther, 
                message: "An Error occurred when fetching the Daily Weather. Please try again later.",
                temperatureReadings: []
            };
		});
        
        return data;
    }
}
export default new TemperatureService();