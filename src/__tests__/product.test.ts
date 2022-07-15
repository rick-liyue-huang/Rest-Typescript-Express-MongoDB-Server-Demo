import supertest from 'supertest';
import createServer from '../utils/server.util';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { createProductService } from '../services/product.service';

const userId = new mongoose.Types.ObjectId().toString();
const payload = {
  user: userId,
  title: 'Canon EOS 1500D DSLR Camera with 18-55mm Lens',
  description:
    'Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.',
  price: 879.99,
  image: 'https://i.imgur.com/QlRphfQ.jpg'
};

const app = createServer();

describe('product', () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe('get product route', () => {
    describe('given the product does not exist', () => {
      it('should return 404', async () => {
        const productId = 'product_123';

        await supertest(app).get(`/api/products/${productId}`).expect(404);
        // expect(true).toBe(true);
      });
    });

    describe('given the product does exist', () => {
      it('should return 200', async () => {
        const product = await createProductService(payload);

        const { body, statusCode } = await supertest(app)
          .get(`/api/products/${product.productId}`)
          .expect(200);

        expect(statusCode).toBe(200);
        expect(body.productId).toBe(product.productId);

        // expect(true).toBe(true);
      });
    });
  });

  describe('create product route', () => {
    describe('given the user is not login', () => {
      it('should return 403', async () => {
        const { statusCode } = await supertest(app).post('/api/products');
        expect(statusCode).toBe(403);
      });
    });

    describe('given the user is already login', () => {
      it('should return 200 and create the product', async () => {});
    });
  });
});
