const request= require('supertest')
const app= require("../../app")
const admin= require("../mock-data/adminlogin.json")

const endpointUrl = "/api/v1/users/login"
jest.setTimeout(90000);
describe(endpointUrl, ()=>{
    it("POST" + endpointUrl, async()=>{
        const response = await request(app).post(endpointUrl)
        .send(admin)
        .set("Accept", "application/json");
        console.log(response.body)
        expect(response.statusCode).toBe(500)
        // expect(response.data.status).toBe('success')
    })
})