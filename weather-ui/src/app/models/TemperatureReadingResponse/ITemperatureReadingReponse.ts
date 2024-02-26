import { ITemperatureReading } from "../TemperatureReading/ITemperatureReading";

export interface ITemperatureReadingRepsonse {
    status: number;
    message: string;
    temperatureReadings: ITemperatureReading[];
}