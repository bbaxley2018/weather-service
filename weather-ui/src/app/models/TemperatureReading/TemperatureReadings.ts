import { ITemperatureReading } from "./ITemperatureReading";

/**
 * List representation containing information for Temperature Readings
 * This class allows for operations to be conducted on a list of Temperature Readings as well
 * 
 */
export class DailyTemperatureReadings {
    private temperatureReadings: Array<number>;
    private date: string;
    
    /**
     * Default constructor
     * @param date the date that the temperature readings were taken
     */
    constructor(date: string, unit: string) {
        this.temperatureReadings = new Array<number>();
        this.date = date;
    }

    /**
     * Adds a new temperature reading to the daily readings.
     * @param temperatureReading the numerical value of the reading:
     *                           assuming the same unit for every reading, determined
     *                           on instantiation of the instance.
     */
    public Add(temperatureReading: number) {
        this.temperatureReadings.push(temperatureReading);
    }

    /**
     * Conducts the average of the temperature readings observed.
     * @returns Returns a single temperature reading with the average results for the day.
     * 
     */
    public Average(): ITemperatureReading {
        var result = {
            "date": this.date,
            "temperature": this.getAverage(),
        }
        return result;
    }


   private getAverage(): number{
        return this.temperatureReadings.reduce((sum, current) => sum + current, 0)/this.temperatureReadings.length;
    }


}
