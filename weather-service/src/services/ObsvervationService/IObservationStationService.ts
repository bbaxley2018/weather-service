import { IObservationStationResponse } from "../ObservationResponse/IObservationResponse";

export interface IObservationStationEngine {
    GetObservationStations: () => Promise<IObservationStationResponse>;
}