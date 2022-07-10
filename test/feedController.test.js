const expect = require('chai').expect;
const mongoose = require('mongoose');
const User = require('../models/user');
const FeedController = require('../controllers/feed');

describe('Feed Controller Test', () => {
    before((done) => {
        mongoose.connect('mongodb://127.0.0.1:27017/Blog_TestDB')
            .then(result => {
                const user = new User({
                    email: 'test@test.com',
                    password: 'tester',
                    name: 'Test',
                    posts: [],
                    _id: '5c0f66b979af55031b34728a'
                });
                return user.save();
            })
            .then(() => {
                done();
            });
    });

    it('Add a created post of the creator', (done) => {
        const req = {
            body: {
                title: 'Test Post',
                content: 'A Test Post'
            },
            file: {
                path: 'abc'
            },
            userId: '5c0f66b979af55031b34728a'
        };
        const res = {
            status: function () {
                return this;
            },
            json: function () { }
        };
        FeedController.createPost(req, res, () => { })
            .then(savedUser => {
                expect(savedUser).to.have.property('posts');
                expect(savedUser.posts).to.have.length(1);
                done();
            });
    });

    after((done) => {
        User.deleteMany({})
            .then(() => {
                return mongoose.disconnect();
            })
            .then(() => {
                done();
            });
    });
});
