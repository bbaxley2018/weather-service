import { ITemperatureReading } from "./ITemperatureReading";

/**
 * Representation of the temperature readings.
 * Each Temperature Reading contains a date for the reading
 * the actual temperature, and the unit of degrees 'C' or 'F'.
 */
export class TemperatureReading implements ITemperatureReading {
    date: string;
    temperature: number;
    
    /**
     * Default Constructor
     * @param date string representation of the date for the temperature reading
     * @param temperature numerical value of the temperature data
     */
    constructor(date: string, temperature: number) {
        this.date = date;
        this.temperature = temperature;
    }
};
