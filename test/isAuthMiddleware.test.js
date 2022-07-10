const expect = require('chai').expect;
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const isAuth = require('../middleware/is-auth');

describe('Test Cases for AuthMiddleware', () => {
    it('Throw error for UnAuthorized', () => {
        const req = {
            get: () => {
                return null;
            }
        };
        expect(isAuth.bind(this, req, {}, () => { }))
            .to.throw('Not authenticated.');
    });

    it('Throw error for Single String', () => {
        const req = {
            get: () => {
                return 'token';
            }
        };
        expect(isAuth.bind(this, req, {}, () => { }))
            .to.throw('jwt must be provided');
    });

    it("Throw error for token can't verify", () => {
        const req = {
            get: () => {
                return 'Bearer xyz';
            }
        };
        expect(isAuth.bind(this, req, {}, () => { }))
            .to.throw();
    });

    it("Should Yield a UserId after decoding the token", () => {
        const req = {
            get: () => {
                return 'Bearer xszfbjebjebfjebfjebfjbejfbejbbfbebf';
            }
        };
        sinon.stub(jwt, 'verify')
        jwt.verify.returns({ userId: 'abc' });
        isAuth(req, {}, () => { })
        expect(req).to.have.property('userId');
        expect(req).to.have.property('userId', 'abc');
        expect(jwt.verify.called).to.be.true;
        jwt.verify.restore();
    });
});