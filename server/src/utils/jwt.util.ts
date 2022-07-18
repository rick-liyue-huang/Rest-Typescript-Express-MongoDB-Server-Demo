import config from 'config';
import jwt from 'jsonwebtoken';

const publicJWTKey = config.get<string>('publicKey');
const privateJWTKey = config.get<string>('privateKey');

export const signJWT = (
  payload: Object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(payload, privateJWTKey, {
    ...(options && options),
    algorithm: 'RS256'
  });
};

export const verifyJWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicJWTKey);
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
