import request from 'supertest';
import { app } from '../../app';

it('should get a response of 400 if email that does not exist is supplied', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({ email: 'foo@bar.com', password: 'foo' })
    .expect(400);
});

it('should get a response of 400 if password is invalid', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'foo@bar.com', password: 'password' })
    .expect(201);
  return request(app)
    .post('/api/users/signin')
    .send({ email: 'foo@bar.com', password: 'notthispassword' })
    .expect(400);
});

it('should get a response of 200 and set cookie if successfully logged in', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'foo@bar.com', password: 'password' })
    .expect(201);
  const response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'foo@bar.com', password: 'password' })
    .expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});
