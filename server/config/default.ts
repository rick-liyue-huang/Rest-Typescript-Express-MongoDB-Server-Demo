/**
 * @define 'config' lib configuration file
 */
export default {
  port: 1336,
  mongoDBUri: `mongodb+srv://rickliyuehuang:passwordpassword@cluster0.q0mdq.mongodb.net/?retryWrites=true&w=majority`,
  passwordSaltFactor: 10,
  publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPHIBSd3bucWjy9b1Uh8eYLk3n
d4fp60Og5nBIrB+YKCH6wL4IZFCpnWak4TJ49s4sF7mMzW2nWKAQKtAi7POi7ATy
QQ+uT3bEmJRtBw5S59E+N+tetRxoaWPSiHsjljHmTDd4LfJkHrfE7Ju5p54ap+vR
EAjR0w4npR3Lil62LwIDAQAB
-----END PUBLIC KEY-----`,
  privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCPHIBSd3bucWjy9b1Uh8eYLk3nd4fp60Og5nBIrB+YKCH6wL4I
ZFCpnWak4TJ49s4sF7mMzW2nWKAQKtAi7POi7ATyQQ+uT3bEmJRtBw5S59E+N+te
tRxoaWPSiHsjljHmTDd4LfJkHrfE7Ju5p54ap+vREAjR0w4npR3Lil62LwIDAQAB
AoGADRWmBeQ2U4a6+bvOG7RuY1OYe9lJ6/E+ta9cBMj3+olw0eRde5bwaRGjGOAe
JUEriIyCwoTlya8os1G2xfq0K8Tm5Be+ls3pchy2/BDn92alvFgs1AnjNiIjHqDm
4ZD9p4e8NA6JowmP6FQ/qKXR1fhKeHNK4b1TCAvjZu/Lf0ECQQD7o1a6XkH0EhyN
ovDqq8UwLgM9XyQ4YpYCAH0q9rVJ4xVYKvgH5RoM+zsKnn6ta4o/Gky3wanftBsu
NbuAE1mjAkEAkZeRVK1iQLkTyO5gFr57Uegk2gcXrfm8TQRIjBtlasKpE1V7Pxne
ROEHe8t2Nu4LXNZFNZ1p6DXubuXkJ5WSBQJBANfiJQjUzt53H1oAHZIm9ZBFGXBw
jGF3atyi0L+oUpXmJSy0CIC1c6kJbHjKy0E6zqsehAzuMDAEk4EMhiT19OMCQG1y
FQwkssGY36iimZU/aBDwhBNqVYCxRb5Xw/me9qRE5Tjlf5q15YK97xQ+pQUx+VS2
tpxRUzX+pNi09MhVBckCQBXE+obws7GPK/QmDe/ncVAPFiV4+fwikcdhNfuBk7nJ
yKKKTz7PX3dXKJ6PH/A1mpDAzmoXeg/PPTCSxOzbsQ0=
-----END RSA PRIVATE KEY-----`,
  accessTokenTimeDuration: '3000s',
  refreshTokenTimeDuration: '1y',
  origin: 'http://localhost:3000',
  googleClientId:
    '23182419665-96oj7qbbg88u0rb0kd9rddtka0tai4o0.apps.googleusercontent.com',
  googleClientSecret: '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',
  googleOAuthRedirectURL: 'http://localhost:1336/api/sessions/oauth/google'
};
