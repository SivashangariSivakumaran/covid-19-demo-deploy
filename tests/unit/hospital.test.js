const hospitalController= require('../../controllers/hospitalController')
const hospitalModel = require('../../models/hospitalModel')
const httpMocks=require("node-mocks-http")
const hospital= require("../mock-data/hospital.json")

hospitalModel.create = jest.fn()

let req, res, next;
beforeEach(()=>{ 
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});
describe("Hospital Controller",()=>{
    beforeEach(()=>{ 
        req.body=hospital;
    })
    it("should have a createHospital function",()=>{
        expect(typeof hospitalController.createHospital).toBe("function")
    })
    it("should call hospitalModel.create",()=>{
        hospitalController.createHospital(req,res,next);
        expect(hospitalModel.create).toBeCalled();
    })
    it("should return 201 response Code",async()=>{
        await hospitalController.createHospital(req,res);
        expect(res.statusCode).toBe(201);
        expect(res._isEndCalled()).toBeTruthy();
    })
})

