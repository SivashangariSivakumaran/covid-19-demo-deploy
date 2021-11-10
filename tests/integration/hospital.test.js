const request= require('supertest')
const app= require("../../app")
const hospital= require("../mock-data/hospital.json")

const endpointUrl = "/hospital"

describe(endpointUrl, ()=>{
    it("POST" + endpointUrl, async()=>{
        const response = await request(app)
        .post(endpointUrl)
        .send(hospital);
        // expect(response.statusCode).toBe(201)
        // expect(response.data.status).toBe('success')
    })
})