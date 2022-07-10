const expect = require('chai').expect;
const jwt = require('jsonwebtoken');
const isAuth = require('../middleware/is-auth');

describe('Test Cases for AuthMiddleware', () => {
    it('Throw error for UnAuthorized', () => {
        const req = {
            get: (authHeader) => {
                return null;
            }
        };
        expect(isAuth.bind(this, req, {}, () => { }))
            .to.throw('Not authenticated.');
    });

    it('Throw error for Single String', () => {
        const req = {
            get: (authHeader) => {
                return 'token';
            }
        };
        expect(isAuth.bind(this, req, {}, () => { }))
            .to.throw('jwt must be provided');
    });

    it("Throw error for token can't verify", () => {
        const req = {
            get: (authHeader) => {
                return 'Bearer xyz';
            }
        };
        expect(isAuth.bind(this, req, {}, () => { }))
            .to.throw();
    });

    it("Should Yield a UserId after decoding the token", () => {
        const req = {
            get: (authHeader) => {
                return 'Bearer xszfbjebjebfjebfjebfjbejfbejbbfbebf';
            }
        };
        jwt.verify = () => {
            return { userId: 'abc' }
        };
        isAuth(req, {}, () => { })
        expect(req).to.have.property('userId');
    });
});