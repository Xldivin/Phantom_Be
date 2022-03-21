import app from '../../app';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
chai.use(chaiHttp);
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
            })
    });
    describe('POST API /api/v1/blog', () => {
        before(() => {
            mongoose.connection.dropCollection('blogs');
        })
        const blog = {
            title: "ATLP RWANDA",
            descrption: "Andela Technical Leadership Program Rwanda",
            image: "Photo url"

        }
        it('it should successfully create blog and return 201', (done) => {
            chai.request(app)
                .post('/api/v1/blog')
                .set("Authorization", `Bearer ${token}`)
                .send(blog)

                .end((err, res) => {
                    if (err) return done(err)
                    expect(res.status).to.be.equal(201);
                    expect(res.body).to.haveOwnProperty('data')
                    return done();
                })
        });

    });
    describe('GET API /api/v1/blog/:id', () => {
        before(() => {
            mongoose.connection.dropCollection('blog');
        })
        const blog = {
            title: "ATLP RWANDA",
            descrption: "Andela Technical Leadership Program Rwanda",
            image: "Photo url"
        }
        let blogId;

        it('Should get single blog by id', (done) => {
            chai.request(app)
                .post('/api/v1/blog')
                .set("Authorization", `Bearer ${token}`)
                .send(blog)
                .end((err, res) => {
                    if (err) return done(err)
                    blogId = res.body.data._id;
                    chai.request(app).get('/api/v1/blog/' + blogId)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.status).to.be.eql(200)
                            return done();
                        })
                })
        })
        it('Should return 404 when blog does not exists', (done) => {
            const fakeId = '1229b52ca50601182da72457';
            chai.request(app).get('/api/v1/blog/' + fakeId)
                .end((err, res) => {
                    if (err) return done(err);
                    expect(res.status).to.be.eql(404)
                    return done();
                })
        })

    });

    describe('Delete API /api/v1/blog/:id', () => {
        before(() => {
            mongoose.connection.dropCollection('blog');
        })
        const blog = {
            title: "ATLP RWANDA",
            descrption: "Andela Technical Leadership Program Rwanda",
            image: "Photo url"
        }
        let blogId;
        it('Should get single blog by id and delete it', (done) => {
            chai.request(app)
                .post('/api/v1/blog')
                .set("Authorization", `Bearer ${token}`)
                .send(blog)

                .end((err, res) => {
                    if (err) return done(err)

                    blogId = res.body.data._id;

                    chai.request(app).delete('/api/v1/blog/' + blogId)
                        .set("Authorization", `Bearer ${token}`)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.status).to.be.eql(200)
                            return done();
                        })
                })
        });
    });

    describe('Update API /api/v1/blog/:id', () => {
        before(() => {
            mongoose.connection.dropCollection('blog');
        })
        const blog = {
            title: "ATLP RWANDA",
            descrption: "Andela Technical Leadership Program Rwanda",
            image: "Photo url"
        }
        let blogId;
        it('Should get single blog by id and update it', (done) => {
            chai.request(app)
                .post('/api/v1/blog')
                .set("Authorization", `Bearer ${token}`)
                .send(blog)
                .end((err, res) => {
                    if (err) return done(err)
                    blogId = res.body.data._id;
                    chai.request(app).put('/api/v1/blog/' + blogId)
                        .set("Authorization", `Bearer ${token}`)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.status).to.be.eql(200)
                            return done();
                        })
                })
                it('Should return 404 when blog does not exists', (done) => {
                    const fakeId = '1229b52ca50601182da72457';
                    chai.request(app).get('/api/v1/blog/' + fakeId)
                        .end((err, res) => {
                            if (err) return done(err);
                            expect(res.status).to.be.eql(404)
                            return done();
                        })
                });
        });

        


    })



    it("should comment on an article", (done) => {
        const comment = {
            inquiry: " this is a good article i ever read",
            name: "bigirimana",
        };
        chai
            .request(app)
            blogId = res.body.data._id
            .put("api/v1/blog/blogId/inquiry/")
            console.log(id)
            .set("Authorization", `Bearer ${token}`)
            .send(comment)
            .end((err, res) => {
                expect(res.status).to.be.equal(201);
                done();
            });
    });
    it("should fail to comment on an article", (done) => {
        const comment = {
            inquiry: " this is a good article i ever read",
            name: "bigirimana"
        };
        chai
            .request(app)
            .put("/api/blog/354345fhfgvgvhr6h55/inquiry")
            .set("Authorization", `Bearer ${token}`)
            .send(comment)
            .end((err, res) => {
               // expect(res.body.message).to.be.equal("");
                expect(res.status).to.be.equal(404);
                done();
            });
    });
});