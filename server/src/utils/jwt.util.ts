import jwt, { SignOptions } from 'jsonwebtoken';
import config from 'config';

const privateKey = config.get<string>('privateKey');
const publicKey = config.get<string>('publicKey');

export const signJWT = (object: Object, options?: SignOptions) => {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256'
  });
};

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded: decoded
    };
  } catch (err: any) {
    return {
      valid: false,
      expired: err.message === 'jwt expired',
      decoded: null
    };
  }
};
