import * as userService from '../services/user.service';
import mongoose from 'mongoose';
import supertest from 'supertest';
import createServer from '../utils/server.util';
const userId = new mongoose.Types.ObjectId().toString();

const app = createServer();

const userPayload = {
  _id: userId,
  email: 'test@example.com',
  name: 'Jane Doe',
  createdAt: expect.any(String),
  updatedAt: expect.any(String)
};
export const userInput = {
  email: 'test@example.com',
  name: 'Jane Doe',
  password: 'Password456!',
  passwordConfirmation: 'Password456!'
};

describe('user', () => {
  //  user register
  describe('user register', () => {
    describe('given the username and password are valid', () => {
      it('should return user payload', async () => {
        const createUserServiceMock = jest
          .spyOn(userService, 'createUserService')
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post('/api/users')
          .send();

        expect(statusCode).toBe(200);
        expect(body).toEqual(userPayload);

        expect(createUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe('given the password not match', () => {
      it('should return 400', async () => {});
    });

    describe('given the user service throw', () => {
      it('should return 409 error', async () => {});
    });
  });

  describe('create user session', () => {
    describe('given the username and password are valid', () => {
      it('should return a signed accessToken and refreshToken', async () => {});
    });
  });
  //  username and password get validate
  //  verify the passwords must match
  //  very the controllers
  //  create a user session
  //  a user can login with valid email and password
});
