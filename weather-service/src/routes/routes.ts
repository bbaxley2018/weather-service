import cors from "cors";
import express, { Request, Response } from "express";
import { ITemperatureService } from "../services/TemperatureService/ITemperatureService";
import { ITemperatureRepsonse } from "../services/TemperatureReadingResponse/ITemperatureReadingReponse";
import { IObservationStationResponse } from "../services/ObservationResponse/IObservationResponse";

import { CORS_OPTIONS } from "../constants";
import  ObservationStationService  from "../services/ObsvervationService/ObservationStationService";
import  TemperatureService  from "../services/TemperatureService/TemperatureService";


const tempRouter = express.Router();
const corsOptions: cors.CorsOptions = CORS_OPTIONS


/**
 * Returns a response containing the Latest Temperature given a specific Observation Point Id and Unit
 * @param id the identifier of the Observation Station i.e. KATL
 */
tempRouter.get('/daily/:id', cors(corsOptions), async (req: Request, res: Response) => {
    res.send(await getLatestTemperatures(TemperatureService, req)); //Should return the ok status.
  });
  
/**
 * Returns a response containing the Average Temperature for the last seven days
 * given a specific Observation Point Id and Unit
 * @param id the identifier of the Observation Station i.e. KATL
 */
tempRouter.get('/weekly/:id', cors(corsOptions), async (req: Request, res: Response) => {
  res.send(await getWeeklyTemperatures(TemperatureService, req)); //Should return the ok status.
});

/**
 * Returns a response containing the observation stations.
 */
tempRouter.get('/stations', cors(corsOptions), async (req: Request, res: Response) => {
  res.send(await getStations()); //Should return the ok status.
});


//Helper functions for the routes
async function getLatestTemperatures(temperatureService: ITemperatureService, req: Request): Promise<ITemperatureRepsonse> {
  return await temperatureService.GetLatestTemperature(req.params.id.toString());
}

async function getWeeklyTemperatures(temperatureService: ITemperatureService, req: Request): Promise<ITemperatureRepsonse> {
  return await temperatureService.GetWeeklyAverageTemperatures(req.params.id.toString())
}

async function getStations(): Promise<IObservationStationResponse> {
  return await ObservationStationService.GetObservationStations();
}

export default tempRouter;