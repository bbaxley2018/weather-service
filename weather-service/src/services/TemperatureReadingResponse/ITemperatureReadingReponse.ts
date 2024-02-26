import { ITemperatureReading } from "../../models/TemperatureReading/ITemperatureReading";

export interface ITemperatureRepsonse {
    status: number;
    message: string;
    temperatureReadings: ITemperatureReading[];
}