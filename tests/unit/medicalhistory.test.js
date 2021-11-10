const medicalHistoryController =require("../../controllers/medicalHistoryController");
const MedicalHistory = require("../../models/medicalHistoryModel")
const httpMocks=require("node-mocks-http")

MedicalHistory.create = jest.fn();

describe("Medical History Controller - create Medical History",()=>{
    it("shoud have a updateUserInformation function",()=>{
        expect(typeof medicalHistoryController.createMedical).toBe("function")
    })
    it("should call medicalHistoryModel.create",()=>{
        let req, res, next;
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = null;
        medicalHistoryController.createMedical(req, res, next);
        // expect(MedicalHistory.create).toBeCalled();
    })
})