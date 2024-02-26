import { ITemperatureRepsonse } from "../TemperatureReadingResponse/ITemperatureReadingReponse";

export interface ITemperatureService {
    GetLatestTemperature: (city: string) => Promise<ITemperatureRepsonse>;
    GetWeeklyAverageTemperatures: (city: string) => Promise<ITemperatureRepsonse>;
}