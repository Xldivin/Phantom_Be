import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
chai.use(chaiHttp);
    describe('POST API /api/v1/auth/signup', () => {
        before(() => {
            mongoose.connection.dropCollection('users');
        })
        const user = {
            "username": "shyaka",
            "role": "admin",
            "email": "xldivin@gmail.com",
            "password": "123456"
        }
        it('it should save a user and return 201', (done) => {
            chai.request(app)
                .post('/api/v1/auth/signup')
                .send(user)
                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.status).to.be.equal(201);
                    expect(res.body).to.haveOwnProperty('data')
                    return done();
                })
        });
})
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
                return done();
            })
            
        })
        it("Should get all users", (done) => {
            		chai
            			.request(app)
            			.get('/api/v1/auth/allUsers')
                        .set("Authorization",`Bearer ${token}`)
            			.end((err, res) => {
            				expect(res.status).to.be.equal(401);
            				done();
            			});
            	});
                    it('Should return 401 when email does not exists', (done) => {
        const oldUser = user.email
        chai.request(app).get('/api/v1/auth/login')
            .send(user)
            .end((err, res) => {
                if (oldUser) return done(err);
                expect(res.status).to.be.equal(401)
                return done();
            })
    });
    it('Should return 401 when password is invalid', (done) => {
                const oldUser = user.password
                chai.request(app).post('/api/v1/auth/login')
                    .send(user)
                    .end((err, res) => {
                        if (oldUser) return done(err);
                        expect(res.status).to.be.equal(401)
                        return done();
                    })
            });

            it("Should get user profile", (done) => {
                chai
                    .request(app)
                    .get("/api/v1/auth/user")
                    .set("Authorization",`Bearer ${token}`)
                    .end((err, res) => {
                        expect(res.status).to.be.equal(500);
                        done();
                    });
        });
        it("Should update profile", (done) => {
            const updatableUser = {
                username:"kamali",
                email:"kamali@gmail.com",
                password:"07899999"
            };
            chai
                .request(app)
                .put("/api/v1/auth/users")
                .set("Authorization",`Bearer ${token}`)
                .send(updatableUser)
                .end((err, res) => {
                    expect(res.status).to.be.equal(401);
                    done();
                });
        });
})
