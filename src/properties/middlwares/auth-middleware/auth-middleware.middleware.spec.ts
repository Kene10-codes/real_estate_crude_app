import { AuthMiddleware } from './auth-middleware.middleware';

describe('AuthMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(new AuthMiddleware()).toBeDefined();
  });
});
