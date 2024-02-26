import express from 'express';
import bodyParser from 'body-parser';
import request from 'supertest';
import 'jest';
import  ObservationStationService from "../src/services/ObsvervationService/ObservationStationService";
import router from "../src/routes/routes";
import { HTTP_OK } from '../src/constants';
import { afterEach } from 'node:test';


const app = express();
app.use(bodyParser.json());
app.use(router);

afterEach(() => {
    jest.clearAllMocks();
});



describe('Mock Observation Route.', () => {
    const mockObservationStations = jest.spyOn(ObservationStationService, 'GetObservationStations');
    mockObservationStations.mockImplementation(() => {
        return Promise.resolve({
            status: 200,
            message: HTTP_OK,
            observations: []
        });
    });
    it('return 200', async () => {
        const response = await request(app).get('/stations').send();
        console.log(response.status);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe(HTTP_OK);
    });
});


