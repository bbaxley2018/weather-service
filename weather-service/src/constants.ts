/**
 * This file contains a list of constants that are utilized across the entire service.
 */
export const HTTP_OK = 'Ok';
export const ROOT_API = "https://api.weather.gov";
export const TEMPERATURE_UNIT = {
    FARENHEIT: 'F',
    CELCIUS: 'C'
}
export const WEATHER_UI_ENDPOINT = 'http://localhost:4200';

export const CORS_OPTIONS =  {
    origin: [WEATHER_UI_ENDPOINT]
};
  