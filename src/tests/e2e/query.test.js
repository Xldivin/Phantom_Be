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
//             describe('POST API /api/v1/query', () => {
//                 before(() => {
//                     mongoose.connection.dropCollection('query');
//                 })
//                 const query = {
//                         "Name": "shyaka",
//                         "Message": "message is sent"
//                     }
//                 it('it should send a query and return 201', (done) => {
//                     chai.request(app)
//                         .post('/api/v1/query')
//                         .send(query)
//                         .set("Authorization",`Bearer ${token}`)
//                         .end((err, res) => {
//                             if (err)return done(err);
            
//                             expect(res).to.have.status([201]);
//                             expect(res.body).to.haveOwnProperty('data')
//                             return done();
//                         })
//                 });
                
//                 it('it should get all the queries and return 200', (done) => {
//                     chai.request(app)
//                         .get('/api/v1/query')
//                         .set("Authorization",`Bearer ${token}`)
//                         .end((err, res) => {
//                             if (err) return done(err)
//                             expect(res.status).to.be.equal(200);
//                             expect(res.body).to.be.a('object');
//                             return done();
//                         })
//                 });
//                 let queryId;
//                 it('it should get the query using its id and return 200', (done) => {
//                     chai.request(app)
//                         .post('/api/v1/query')
//                         .send(query)
//                         .set("Authorization",`Bearer ${token}`)
//                         .end((err, res) => {
//                             if (err) return done(err)
//                             queryId = res.body.data._id;
//                             chai.request(app).get('/api/v1/query/' + queryId)
//                             .set("Authorization",`Bearer ${token}`)
//                                 .end((err, res) => {
//                                     if (err) return done(err);
//                                     expect(res.status).to.be.equal(200)
//                                     return done();
//                           })
//                      });
//                 });
//                 it('it should send a 404 when a query not found', (done) => {
//                     const fakeId = "6223b4217952467009d8ff73"
//                     chai.request(app).get('/api/v1/query/' + fakeId)
//                     .set("Authorization",`Bearer ${token}`)
//                                 .end((err, res) => {
//                                     if (err) return done(err);
//                                     expect(res.status).to.be.equal(404)
//                                     return done();
//                       })
//                 })
//                 it('it should delete the query using its id and return 200', (done) => {
//                     chai.request(app)
//                         .post('/api/v1/query')
//                         .send(query)
//                         .set("Authorization",`Bearer ${token}`)
//                         .end((err, res) => {
//                             if (err) return done(err)
//                             queryId = res.body.data._id;
//                             chai.request(app)
//                                 .delete('/api/v1/query/' + queryId)
//                                 .set("Authorization",`Bearer ${token}`)
//                                 .end((err, res) => {
//                                     if (err) return done(err);
//                                     expect(res.status).to.be.equal(200)
//                                     return done();
//                                 })
//                         })
//                 })
//          });
//     }); 
// })