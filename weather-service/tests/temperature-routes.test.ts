import express from 'express';
import bodyParser from 'body-parser';
import request from 'supertest';
import 'jest';
import  TemperatureService  from '../src/services/TemperatureService/TemperatureService';
import  tempRouter  from '../src/routes/routes';
import { HTTP_OK } from '../src/constants';
import { afterEach } from 'node:test';


const app = express();
app.use(bodyParser.json());
app.use(tempRouter);

afterEach(() => {
    jest.clearAllMocks();
});


describe('Mock Daily Route.', () => {
    const mockLatestTemperature = jest.spyOn(TemperatureService, 'GetLatestTemperature');
    
    mockLatestTemperature.mockImplementation((observationId: string) => {
        return Promise.resolve({
            status: 200,
            message: HTTP_OK,
            temperatureReadings: []
        });
    });
    it('should return 200', async () => {
        const response = await request(app).get('/daily/KATL').send();
        console.log(response.status);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe(HTTP_OK);
    });
});


describe('Daily Route Error.', () => {
    const mockLatestTemperature = jest.spyOn(TemperatureService, 'GetLatestTemperature');
    mockLatestTemperature.mockImplementation((observationId: string) => {
        return Promise.resolve({
            status: 200,
            message: HTTP_OK,
            temperatureReadings: []
        });
    });
    it('should return 404.', async () => {
        const response = await request(app).get('/').send();
        console.log(response.status);
        expect(response.status).toBe(404);
    });
});


describe('Mock Weekly Route.', () => {
    const mockWeeklyTemperature = jest.spyOn(TemperatureService, 'GetWeeklyAverageTemperatures');
    mockWeeklyTemperature.mockImplementation((observationId: string) => {
        return Promise.resolve({
            status: 200,
            message: HTTP_OK,
            temperatureReadings: []
        });
    });
    
    it('Should return 200', async () => {
        const response = await request(app).get('/weekly/KATL').send();
        console.log(response.status);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe(HTTP_OK);
    });
});

