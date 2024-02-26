import { ITemperatureReading } from "../TemperatureReading/ITemperatureReading";
import { ITemperatureReadingRepsonse as ITemperatureReadingRepsonse } from "./ITemperatureReadingReponse";

/**
 * Instance encapsulating information retrieved after requesting a temperature reading
 * from the web api.
 */
export class TemperatureReadingResponse implements ITemperatureReadingRepsonse {
    status: number;
    message: string;
    temperatureReadings: ITemperatureReading[];

    /**
     * Default Constructor
     */
    constructor() {
        this.status = 0;
        this.message = "";
        this.temperatureReadings = [];
    }
}
