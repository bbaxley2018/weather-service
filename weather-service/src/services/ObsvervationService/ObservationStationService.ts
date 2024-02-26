
import axios, { HttpStatusCode } from "axios";
import { IObservationStationEngine as IObservationStationService } from "./IObservationStationService";
import { ObservationStationResponse } from "../ObservationResponse/ObservationStationResponse";
import { IObservationStationResponse } from "../ObservationResponse/IObservationResponse";
import { HTTP_OK, ROOT_API } from "../../constants";


/**
 * Data Engine Service that Queries the Weather.gov API to retrieve 
 * Observation Stations.
 */
class ObservationStationService implements IObservationStationService{
    
    /**
     * Retrieves a list of Observation Stations from the Weather.Gov API
     * @preconditions none.
     * @returns Response containing the Observation Station Responses.
     * 1.Response Code
     * 2. Response Message
     * 3. A list of Observation Stations
     * 
     */
    public async GetObservationStations(): Promise<IObservationStationResponse> {
        let api = `${ROOT_API}/zones?type=land`
        const data = await axios.get(api).then((response) => {
            
            let observationResponse = new ObservationStationResponse();
            let features = response.data["features"];

            for(let i = 0; i < features.length; i++) {               

                //Observation stations also don't have radars. We want the ones that have radar.  
                if(features[i]["properties"]["radarStation"] != null) {

                    let observationStations = response.data["features"][i]["properties"]["observationStations"];
                    for(let j = 0; j < observationStations.length; j++) {
                        
                        let station = observationStations[j].split("/")[4];

                        //If the station hasn't been added and it's station code is 4 letters, then add it.
                        if(observationResponse.observations.includes(station) == false && !/\d/.test(station)){
                            observationResponse.observations.push(station);
                        }
                    }
                }
            }

            observationResponse.message = HTTP_OK;
            observationResponse.status = HttpStatusCode.Ok;

            return observationResponse;

        }).catch(function (error: any) {
            return {
                status: HttpStatusCode.SeeOther, 
                message: "An Error occurred when fetching the Observation Stations. Please try again later.",
                observations: []
            };
		});
        
        return data;
    }
  
}export default new ObservationStationService();