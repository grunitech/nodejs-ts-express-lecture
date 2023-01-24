import { expect } from 'chai';
import config from './index';

describe('config', () => {
  it('should return default conf', () => {
    // deep assert 2 objects (check their child properties "deeply")
    expect(config()).to.deep.equals({
      host: '0.0.0.0',
      port: 3003,
      db: {
        host: 'localhost',
        user: 'ziv',
        password: 'ziv',
        database: 'express',
      },
    });
  });

  it('should return env conf', () => {
    process.env['APP_HOST'] = 'test';
    process.env['APP_PORT'] = 'test';
    process.env['APP_DB_HOST'] = 'test';
    process.env['APP_DB_USER'] = 'test';
    process.env['APP_DB_PASS'] = 'test';
    process.env['APP_DB_DB'] = 'test';

    expect(config()).to.deep.equals({
      host: 'test',
      port: 'test',
      db: {
        host: 'test',
        user: 'test',
        password: 'test',
        database: 'test',
      },
    });
  });
});
