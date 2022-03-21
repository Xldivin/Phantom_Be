import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';

chai.use(chaiHttp);
describe('POST API /api/v1/subs', () => {
    before(() => {
        mongoose.connection.dropCollection('subs');
    })
    const sub = {
            "email": "xldivin@gmail.com"
        }
    it('it should subscribe and return 201', (done) => {
        chai.request(app)
            .post('/api/v1/subs')
            .send(sub)
            .end((err, res) => {
                if (err)return done(err);
                expect(res).to.have.status([201]);
                expect(res.body).to.haveOwnProperty('data')
                return done();
            })
    });
    describe('POST API /api/v1/auth/login', () => {
    before(() => {
        mongoose.connection.dropCollection('login');
    })
    const user = {
        email: "xldivin@gmail.com",
        password: "123456"
    }
    let token = "";
    it('it should successfully login and return 200', (done) => {
        chai.request(app)
            .post('/api/v1/auth/login')
            .send(user)
            .end((err, res) => {
                if (err) return done(err)
                token = res.body.token;
                expect(res.status).to.be.equal(200);
                expect(res.body).to.have.property("token");
                return done();
});
it('it should get all the subs and return 200', (done) => {
    chai.request(app)
        .get('/api/v1/subs')
        .set("Authorization",`Bearer ${token}`)
        console.log("hello")
        .end((err, res) => {
            if (err) return done(err)
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.a('object');
            return done();
        })
});
let subId;
it('it should unsubscribe and return 200', (done) => {
chai.request(app)
    .post('/api/v1/subs')
    .send(sub)
    .set("Authorization",`Bearer ${token}`)
    .end((err, res) => {
        if (err) return done(err)
        chai.request(app)
        subId = res.body.data._id;
        chai.request(app)
            .delete('/api/v1/subs/' + subId)
            .set("Authorization",`Bearer ${token}`)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.status).to.be.equal(200)
                return done();
            })
    })
})
});
});
})
