import { IObservationStationResponse } from "./IObservationResponse";

export class ObservationStationResponse implements IObservationStationResponse {
    status: number;
    message: string;
    observations: string[];

    constructor() {
        this.status=0;
        this.message="";
        this.observations = [];
    }

}