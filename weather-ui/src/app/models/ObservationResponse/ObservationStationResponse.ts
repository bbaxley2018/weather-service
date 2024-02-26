import { IObservationStationResponse } from "./IObservationResponse";

/**
 * Encapsulation of the response data from the observation api call.
 * returns a status, message, and list of observation station ID's.
 */
export class ObservationStationResponse implements IObservationStationResponse {
    status: number;
    message: string;
    observations: string[];

    /**
     * Default Constructor.
     */
    constructor() {
        this.status=0;
        this.message="";
        this.observations = [];
    }

}