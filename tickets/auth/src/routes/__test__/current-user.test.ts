import request from 'supertest';
import { app } from '../../app';

it('should respond with details about current user', async () => {
  const cookie = await signin();

  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .send({})
    .expect(200);
  expect(response.body.currentUser.email).toEqual('test@test.com');
});

it('should respond null in user not authenticated', async () => {
  const response = await request(app)
    .get('/api/users/currentuser')
    .send({})
    .expect(200);
  expect(response.body.currentUser).toEqual(null);
});
