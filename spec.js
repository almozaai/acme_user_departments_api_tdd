const { expect } = require('chai');
const db = require('./db');
// const { Product, Category } = db.models;
// const app = require('supertest')(require('./app'));

describe('Models: Users', () => {
  let seed;
  beforeEach(async () => seed = await db.syncAndSeed());
  describe('User Model', () => {
    it('User1, User2, and User3 are users', () => {
      expect(seed.users.user1.name).to.equal('user1');
      expect(seed.users.user2.name).to.equal('user2');
      expect(seed.users.user3.name).to.equal('user3');
    });
  });
});
