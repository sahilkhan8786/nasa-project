const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');


describe("Launches API", () => {
    beforeAll(async () => {
        await mongoConnect()
    });

    afterAll(async () => {
        await mongoDisconnect();
    })



    describe("TEST GET /v1/launches", () => {
        test("It should respond with 200 success", async () => {
            await request(app)
                .get('/v1/launches')
                .expect('Content-Type', /json/)
                .expect(200)
        })
    })

    describe("TEST Post /v1/launches", () => {

        const completeLaunchData = {
            mission: "Keplar Exploration X",
            rocket: "Explorer IS1",
            target: "Kepler-442 b",
            launchDate: "January 17, 2030"
        }


        const launchDataWithoutDate = {
            mission: "Keplar Exploration X",
            rocket: "Explorer IS1",
            target: "Kepler-442 b",
        }
        const launchDataWithInvalidDate = {
            mission: "Keplar Exploration X",
            rocket: "Explorer IS1",
            target: "Kepler-442 b",
            launchDate: "Zeus"
        }

        test("It should respone with 201 created", async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(completeLaunchData)
                .expect('Content-Type', /json/)
                .expect(201)

            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate)

            expect(response.body).toMatchObject(launchDataWithoutDate)
        })

        test('It Should catch missing required properties', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithoutDate)
                .expect('Content-Type', /json/)
                .expect(400)

            expect(response.body).toStrictEqual({
                error: "Missing required launch property "
            })

        })
        test('It Should catch invalid dates', async () => {
            const response = await request(app)
                .post('/v1/launches')
                .send(launchDataWithInvalidDate)
                .expect('Content-Type', /json/)
                .expect(400)

            expect(response.body).toStrictEqual({
                error: "Invalid launch date"
            })
        })
    })
})
