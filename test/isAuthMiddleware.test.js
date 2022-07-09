const expect = require('chai').expect;
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
    })

    it('Throw error for Single String', () => {
        const req = {
            get: (authHeader) => {
                return 'token';
            }
        };
        expect(isAuth.bind(this, req, {}, () => { }))
            .to.throw('jwt must be provided');
    })

})