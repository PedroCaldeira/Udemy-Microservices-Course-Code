import request from 'supertest';
import { app } from '../../app';

it('should get a response with status code 201 on successful signup', async () => {
  return await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.test',
      password: 'password',
    })
    .expect(201);
});

it('should get a response with status code 400 on invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@tessakdmft',
      password: 'password',
    })
    .expect(400);
});

it('should get a response with status code 400 on invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@tessakdmft',
      password: 'pas',
    })
    .expect(400);
});

it('should get a response with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'email@test.test' })
    .expect(400);
  return request(app)
    .post('/api/users/signup')
    .send({ password: 'email@test.test' })
    .expect(400);
});

it('should disallow duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.test',
      password: 'password',
    })
    .expect(201);
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.test',
      password: 'password',
    })
    .expect(400);
});

it('should set a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.test',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});
