const { expect } = require('chai');
const db = require('./db');
const { User, Department } = db.models;
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
    it('A user belongs to a department', () => {
      expect(seed.users.user1.departmentId).to.equal(seed.departments.HR.id);
    });
  });
  describe('Hooks', () => {
    it('An empty depatmentId will get set to null', async () => {
      const user = await User.create({name: 'user4', departmentId: ''});
      expect(user.departmentId).to.equal(null);
    })
  });
  describe('User Validation', () => {
    it('name cannot be an empty string', () => {
      return User.create({name: ''})
        .then(() => {
          throw new 'Name cannot be empty!';
        })
        .catch(ex => expect(ex.errors[0].path).to.equal('name'));
    });
  });
});

describe('API Routes', () => {
  
});
