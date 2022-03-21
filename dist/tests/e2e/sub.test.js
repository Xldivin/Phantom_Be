"use strict";

var _app = _interopRequireDefault(require("../../app"));

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _mongoose = _interopRequireDefault(require("mongoose"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai.default.use(_chaiHttp.default);

describe('POST API /api/v1/subs', () => {
  before(() => {
    _mongoose.default.connection.dropCollection('subs');
  });
  const sub = {
    "email": "xldivin@gmail.com"
  };
  it('it should subscribe and return 201', done => {
    _chai.default.request(_app.default).post('/api/v1/subs').send(sub).end((err, res) => {
      if (err) return done(err);
      (0, _chai.expect)(res).to.have.status([201]);
      (0, _chai.expect)(res.body).to.haveOwnProperty('data');
      return done();
    });
  });
  describe('POST API /api/v1/auth/login', () => {
    before(() => {
      _mongoose.default.connection.dropCollection('login');
    });
    const user = {
      email: "xldivin@gmail.com",
      password: "123456"
    };
    let token = "";
    it('it should successfully login and return 200', done => {
      _chai.default.request(_app.default).post('/api/v1/auth/login').send(user).end((err, res) => {
        if (err) return done(err);
        token = res.body.token;
        (0, _chai.expect)(res.status).to.be.equal(200);
        (0, _chai.expect)(res.body).to.have.property("token");
        return done();
      });

      it('it should get all the subs and return 200', done => {
        _chai.default.request(_app.default).get('/api/v1/subs').set("Authorization", `Bearer ${token}`);

        console.log("hello").end((err, res) => {
          if (err) return done(err);
          (0, _chai.expect)(res.status).to.be.equal(200);
          (0, _chai.expect)(res.body).to.be.a('object');
          return done();
        });
      });
      let subId;
      it('it should unsubscribe and return 200', done => {
        _chai.default.request(_app.default).post('/api/v1/subs').send(sub).set("Authorization", `Bearer ${token}`).end((err, res) => {
          if (err) return done(err);

          _chai.default.request(_app.default);

          subId = res.body.data._id;

          _chai.default.request(_app.default).delete('/api/v1/subs/' + subId).set("Authorization", `Bearer ${token}`).end((err, res) => {
            if (err) return done(err);
            (0, _chai.expect)(res.status).to.be.equal(200);
            return done();
          });
        });
      });
    });
  });
});