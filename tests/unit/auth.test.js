const authController= require('../../controllers/authController')
const userModel = require('../../models/userModel')
const httpMocks=require("node-mocks-http")
const patient = require("../mock-data/patient.json")
const adminlogin = require("../mock-data/adminlogin.json")

userModel.create = jest.fn()
let req, res, next;
beforeEach(()=>{ 
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
});
describe("AuthController",()=>{
    beforeEach(()=>{ 
        req.body=patient;
    })
    it("should have a signToken function",()=>{
        expect(typeof authController.signup).toBe("function")
    })
    it("should call userModel.create",()=>{
        authController.signup(req,res,next);
        expect(userModel.create).toBeCalled();
    })
    it("should return 200 response Code", async()=>{
        await authController.signup(req,res,next);
        expect(res.statusCode).toBe(200);
        // expect(res._isEndCalled()).toBeTruthy();
    })
})

userModel.findOne = jest.fn()
describe("Admin Login",()=>{
    beforeEach(()=>{ 
        req.body=adminlogin;
    })
    it("should have a login function",()=>{
        expect(typeof authController.login).toBe("function")
    })
    it("should call userModel.findOne",()=>{
        authController.login(req,res,next);
        expect(userModel.findOne).toBeCalled();
    })
    it("should return 200 response Code",async()=>{
        const response=await authController.login(req,res,next);
        // console.log(response)
        // console.log(res.body)
        expect(res.statusCode).toBe(200);
        // expect(res._isEndCalled()).toBeTruthy();
    })
})

userModel.findOne = jest.fn()
describe("user forgot password",()=>{
    beforeEach(()=>{ 
        req.body={"email":"dakshitha.sur@gmail.com"};
    })
    it("should have a forgot password function",()=>{
        expect(typeof authController.forgotPassword).toBe("function")
    })
    it("should call userModel.findOne",()=>{
        authController.forgotPassword(req,res,next);
        expect(userModel.findOne).toBeCalled();
    })
    it("should return 200 response Code",async()=>{
        const response=await authController.forgotPassword(req,res,next);
        expect(res.statusCode).toBe(200);
        expect(res._isEndCalled()).toBeTruthy();
    })
})
