const chai = require('chai');
const chaiHttp = require('chai-http');
const code = require('../utils/statusCodes.js');

const server = require('../src/app.js').app;

const expect = chai.expect;

chai.use(chaiHttp);

describe('API ROUTES', () => {
  beforeEach(() => {
    process.env.NODE_ENV = 'test';
  });

  describe('POST /api/guess', () => {
    it('should return success status when guessing a letter', async () => {
      const route = '/api/guess';
      const data = {
        letter: 'a'
      };
      const res = await chai
        .request(server)
        .post(route)
        .send(data);

      expect(res).to.have.status(code.STATUS_CREATED);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('success');
      expect(res.body).to.have.property('guess');
      expect(res.body.success).to.eql('true');
      expect(res.body.guess).to.eql('a');
    });

    it('should return an error when the request is invalid', async () => {
      const route = '/api/guess';
      const badData = {
        letter: ''
      };
      const res = await chai
        .request(server)
        .post(route)
        .send(badData);

      expect(res).to.have.status(code.STATUS_USER_ERROR);
      expect(res).to.be.a('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.eql('Error Message');
    });
  });

  describe('GET /api', () => {
    it('should return the word so far and guesses', async () => {
      const route = '/api/';
      const getRes = {
        wordSoFar: '-rt',
        guesses: ['a']
      };

      const res = await chai.request(server).get(route);

      expect(res).to.have.status(code.STATUS_OK);
      expect(res.body).to.be.a('object');
      expect(res.body).to.deep.equal(getRes);
    });
  });

  afterEach(() => {
    process.env.NODE_ENV = 'development';
  });
});
