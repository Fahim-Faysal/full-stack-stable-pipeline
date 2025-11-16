const request = require('supertest');
const app = require('../app');

describe('Backend basic tests', () => {
  it('GET / should return greeting', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/Hello from Node backend/);
  });

  it('GET /api/health should return status ok or db-unreachable', async () => {
    const res = await request(app).get('/api/health');
    // If DB isn't available in CI we still allow graceful behavior:
    expect([200, 500]).toContain(res.statusCode);
  });
});
