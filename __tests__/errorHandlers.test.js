const { app } = require('../src/server');
const supertest = require('supertest');
const mockRequest = supertest(app);

describe('Error Handlers', () => {
    
    // Test for 404 - Not Found.
    it('Should respond with 404 for non-existent routes', async () => {
        const response = await mockRequest.get('/does-not-exist');
        expect(response.status).toBe(404);
        expect(response.body.error).toBe(404);
        expect(response.body.message).toBe("We can't find the page you're looking for.");
    });
});