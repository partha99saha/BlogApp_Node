const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require('mongoose');
const User = require("../models/user");
const authController = require("../controllers/auth");

describe("Auth-Login Test", () => {
  it("Throw error if DB connection fails", (done) => {
    sinon.stub(User, 'findOne');
    User.findOne.throws();
    const req = {
      body: {
        email: 'test@email.com',
        password: 'Test@123'
      }
    };
    authController.login(req, {}, () => { })
      .then(result => {
        expect(result).to.be.an('error');
        expect(result).to.have.property('statusCode', 500);
        done();
      }).catch(done);
    User.findOne.restore();
  });

  it('Send Responce for Exsisting User', (done) => {
    mongoose.connect('mongodb://127.0.0.1:27017/Blog_TestDB')
      .then(result => {
        const user = new User({
          email: 'test@email.com',
          password: 'Test@123',
          name: 'test',
          posts: [],
          _id: '62cb0545137d1cca98673e48'
        });
        return user.save();
      })
      .then(() => {
        const req = {
          userId: '62cb0545137d1cca98673e48'
        };
        const res = {
          statusCode: 500,
          userStatus: null,
          status:(code)=>{
            this.statusCode = code;
            return this;
          },
          json:(data)=>{
            this.userStatus = data.status;
          }
        };
        authController.getUserStatus(req,res,()=>{})
        .then(()=>{
          expect(res.statusCode).to.be.equal(200);
          expect(res.userStatus).to.be.equal('I am new!');
        })
        done();
      }).catch(done);
  });

});
