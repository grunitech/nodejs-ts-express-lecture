import db from './index';
import { expect } from 'chai';

describe('db', () => {
  it('should throw an error for un initialized client', () => {
    expect(() => db()).to.throws();
  });
});
