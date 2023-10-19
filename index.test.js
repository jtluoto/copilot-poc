const request = require('supertest');
const app = require('./index');

describe('GET /weather', () => {
  it('should return 400 if city parameter is missing', (done) => {
    request(app)
      .get('/weather')
      .end((err, res) => {
        expect(res.status).toBe(400);
        done(err);
      });
  });

  it('should return 404 if city is not found', (done) => {
    request(app)
      .get('/weather?city=nonexistentcity')
      .end((err, res) => {
        expect(res.status).toBe(404);
        done(err);
      });
  });

  it('should return weather data if city is found', (done) => {
    request(app)
      .get('/weather?city=helsinki')
      .end((err, res) => {
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('description');
        expect(res.body).toHaveProperty('temperature');
        done(err);
      });
  });
});
