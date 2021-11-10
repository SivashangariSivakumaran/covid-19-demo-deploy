const UserController =require("../../controllers/userController");
const UserModel = require("../../models/userModel")

UserModel.create = jest.fn();

describe("User Controller - updateUserInformation",()=>{
    it("shoud have a updateUserInformation function",()=>{
        expect(typeof UserController.updateUserInformation).toBe("function")
    })
})