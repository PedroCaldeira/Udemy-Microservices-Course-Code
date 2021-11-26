import request from 'supertest';
import { app } from '../../app';

it('should get a response a 201 on successful signup', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.test',
      password: 'password',
    })
    .expect(201);
});
