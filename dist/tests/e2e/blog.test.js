// import app from '../../app';
// import chai, { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import mongoose from 'mongoose';
// chai.use(chaiHttp);
// describe('POST API /api/v1/auth/login', () => {
//     before(() => {
//         mongoose.connection.dropCollection('login');
//     })
//     const user = {
//         email: "xldivin@gmail.com",
//         password: "123456"
//     }
//     let token = "";
//     it('it should successfully login and return 200', (done) => {
//         chai.request(app)
//             .post('/api/v1/auth/login')
//             .send(user)
//             .end((err, res) => {
//                 if (err) return done(err)
//                 token = res.body.token;
//                 expect(res.status).to.be.equal(200);
//                 expect(res.body).to.have.property("token");
//                 return done();
//             })
//     });
//     describe('POST API /api/v1/blog', () => {
//         before(() => {
//             mongoose.connection.dropCollection('blog');
//         })
//         const blog = {
//                 "title:": "tec in schools",
//                 "message": "cool what are the odds",
//                 //"image": "dddddd"
//             }
//         it('it should send a blog and return 201', (done) => {
//             chai.request(app)
//                 .post('/api/v1/blog')
//                 .send(blog)
//                 .end((err, res) => {
//                     if (err)return done(err);
//                     expect(res).to.have.status([201]);
//                     expect(res.body).to.haveOwnProperty('data')
//                     return done();
//                 })
//         });
//     });
// })
"use strict";